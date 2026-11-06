import fs from 'fs';
import { po } from 'gettext-parser';

import { forEachTranslatable, TAG_CONTEXT } from './strings.js';

/** Changed English text keeps its old translation as a fuzzy suggestion above this similarity. */
export const FUZZY_THRESHOLD = 0.8;
const MAX_POINTER_COMMENTS = 3;

/**
 * In-memory catalog: Map of key(msgctxt, msgid) -> entry, plus obsolete entries.
 * entry = { msgctxt, msgid, msgstr, fuzzy, previous, translatorComment, pointers }
 */
export function entryKey(msgctxt, msgid) {
  return `${msgctxt || ''}\u0004${msgid}`;
}

export function emptyCatalog(language) {
  return { language, entries: new Map(), obsolete: new Map() };
}

function fromPoBlock(block) {
  const comments = block.comments || {};
  return {
    msgctxt: block.msgctxt || '',
    msgid: block.msgid,
    msgstr: (block.msgstr && block.msgstr[0]) || '',
    fuzzy: /\bfuzzy\b/.test(comments.flag || ''),
    previous: comments.previous || '',
    translatorComment: comments.translator || '',
    pointers: [],
  };
}

export function readCatalog(file, language) {
  const catalog = emptyCatalog(language);
  if (!fs.existsSync(file)) return catalog;

  const parsed = po.parse(fs.readFileSync(file));
  for (const [section, target] of [
    [parsed.translations, catalog.entries],
    [parsed.obsolete || {}, catalog.obsolete],
  ]) {
    for (const byId of Object.values(section)) {
      for (const block of Object.values(byId)) {
        if (!block.msgid) continue; // header
        const entry = fromPoBlock(block);
        target.set(entryKey(entry.msgctxt, entry.msgid), entry);
      }
    }
  }
  return catalog;
}

/** Collects the translatable strings of `doc` in document order, one entry per unique string. */
export function extractEntries(doc) {
  const entries = new Map();
  forEachTranslatable(doc, ({ pointer, msgid, msgctxt }) => {
    const key = entryKey(msgctxt, msgid);
    if (!entries.has(key)) entries.set(key, { msgctxt, msgid, pointers: [] });
    entries.get(key).pointers.push(pointer);
  });
  return entries;
}

function levenshtein(a, b) {
  let prev = new Array(b.length + 1);
  let curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    const ca = a.charCodeAt(i - 1);
    for (let j = 1; j <= b.length; j++) {
      const cost = ca === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

export function similarity(a, b) {
  const longest = Math.max(a.length, b.length);
  if (longest === 0) return 1;
  if (Math.min(a.length, b.length) / longest < FUZZY_THRESHOLD) return 0;
  return 1 - levenshtein(a, b) / longest;
}

function quotePo(text) {
  return `"${text.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}"`;
}

/**
 * Returns a new catalog whose entries are exactly the strings of `doc`.
 * - Unchanged strings keep their translation, flags and translator comments.
 * - A new string that was translated before (now obsolete) gets that translation back.
 * - A new string similar to a translated string that disappeared gets that translation as
 *   fuzzy, with the old English in `#| msgid`. Fuzzy entries are not used in the output.
 * - Translated strings that disappeared become obsolete (`#~`); untranslated ones are dropped.
 */
export function updateCatalog(old, doc) {
  const extracted = extractEntries(doc);
  const next = emptyCatalog(old.language);

  const gone = [];
  for (const [key, entry] of old.entries) {
    if (!extracted.has(key) && entry.msgstr) gone.push(entry);
  }
  for (const [key, entry] of old.obsolete) {
    if (!extracted.has(key) && entry.msgstr) gone.push(entry);
  }

  for (const [key, { msgctxt, msgid, pointers }] of extracted) {
    const kept = old.entries.get(key) || old.obsolete.get(key);
    if (kept) {
      next.entries.set(key, { ...kept, pointers });
      continue;
    }

    let best = null;
    let bestScore = FUZZY_THRESHOLD;
    for (const candidate of gone) {
      if (candidate.msgctxt !== msgctxt) continue;
      const score = similarity(candidate.msgid, msgid);
      if (score >= bestScore) {
        best = candidate;
        bestScore = score;
      }
    }

    next.entries.set(key, {
      msgctxt,
      msgid,
      msgstr: best ? best.msgstr : '',
      fuzzy: Boolean(best),
      previous: best ? `msgid ${quotePo(best.msgid)}` : '',
      translatorComment: best ? best.translatorComment : '',
      pointers,
    });
  }

  for (const entry of gone) {
    next.obsolete.set(entryKey(entry.msgctxt, entry.msgid), { ...entry, pointers: [] });
  }

  return next;
}

function toPoBlock(entry, withPointers) {
  const comments = {};
  if (entry.translatorComment) comments.translator = entry.translatorComment;
  if (withPointers && entry.pointers.length) {
    const shown = entry.pointers.slice(0, MAX_POINTER_COMMENTS);
    const more = entry.pointers.length - shown.length;
    comments.extracted = shown.join('\n') + (more > 0 ? `\n(+${more} more)` : '');
    if (entry.msgctxt === TAG_CONTEXT) {
      comments.extracted = `Tag name, shown in the menu. Translated into x-displayName.\n${comments.extracted}`;
    }
  }
  if (entry.fuzzy) comments.flag = 'fuzzy';
  if (entry.fuzzy && entry.previous) comments.previous = entry.previous;

  const block = { msgid: entry.msgid, msgstr: [entry.msgstr || ''], comments };
  if (entry.msgctxt) block.msgctxt = entry.msgctxt;
  return block;
}

function toSection(entries, withPointers) {
  const section = {};
  for (const entry of entries.values()) {
    const ctx = entry.msgctxt || '';
    section[ctx] = section[ctx] || {};
    section[ctx][entry.msgid] = toPoBlock(entry, withPointers);
  }
  return section;
}

export function serializeCatalog(catalog) {
  const order = new Map([...catalog.entries.keys()].map((key, i) => [key, i]));
  const obsoleteOrder = new Map([...catalog.obsolete.keys()].sort().map((key, i) => [key, i]));

  const translations = toSection(catalog.entries, true);
  translations[''] = { '': { msgid: '', msgstr: [''] }, ...(translations[''] || {}) };

  const table = {
    charset: 'utf-8',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      Language: catalog.language,
      'X-Generator': 'docs-content-cdn apispec/scripts/build.js',
    },
    translations,
    obsolete: toSection(catalog.obsolete, false),
  };

  return po
    .compile(table, {
      sort: (a, b) => {
        const ka = entryKey(a.msgctxt, a.msgid);
        const kb = entryKey(b.msgctxt, b.msgid);
        const orderMap = order.has(ka) ? order : obsoleteOrder;
        return orderMap.get(ka) - orderMap.get(kb);
      },
    })
    .toString('utf8')
    .concat('\n');
}

/** Replaces translated strings in `doc` (mutates it). Fuzzy and empty entries keep English. */
export function applyCatalog(doc, catalog) {
  forEachTranslatable(doc, ({ node, field, msgid, msgctxt }) => {
    const entry = catalog.entries.get(entryKey(msgctxt, msgid));
    if (!entry || !entry.msgstr || entry.fuzzy) return;

    if (msgctxt === TAG_CONTEXT) {
      node['x-displayName'] = entry.msgstr;
    } else {
      node[field] = entry.msgstr;
    }
  });
  return doc;
}

export function coverage(catalog) {
  let translated = 0;
  let fuzzy = 0;
  let untranslated = 0;
  let translatedChars = 0;
  let totalChars = 0;
  for (const entry of catalog.entries.values()) {
    totalChars += entry.msgid.length;
    if (!entry.msgstr) untranslated++;
    else if (entry.fuzzy) fuzzy++;
    else {
      translated++;
      translatedChars += entry.msgid.length;
    }
  }
  return { total: catalog.entries.size, translated, fuzzy, untranslated, translatedChars, totalChars };
}
