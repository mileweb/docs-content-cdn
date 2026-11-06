/**
 * Checks that a translation keeps everything in the English text that is not prose:
 * placeholders the site substitutes, path parameters, HTML tags, link targets and code.
 * Returns a list of problems (empty if the translation is fine).
 */

const RULES = [
  { name: 'placeholder', pattern: /\{\{\s*[\w.]+\s*\}\}/g },
  { name: 'path parameter', pattern: /(?<!\{)\{[A-Za-z_][\w.-]*\}(?!\})/g },
  { name: 'HTML tag', pattern: /<\/?[a-zA-Z][\w-]*/g, normalize: (m) => m.toLowerCase() },
  { name: 'href', pattern: /href\s*=\s*("[^"]*"|'[^']*')/g },
  { name: 'markdown link target', pattern: /\]\((<[^>]*>|[^)\s]*)/g },
  { name: '<code> content', pattern: /<code>[\s\S]*?<\/code>/gi },
  { name: 'backtick code', pattern: /`[^`\n]+`/g },
];

function multiset(text, { pattern, normalize = (m) => m }) {
  const counts = new Map();
  for (const match of text.matchAll(pattern)) {
    const value = normalize(match[0]);
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return counts;
}

function difference(a, b) {
  const out = [];
  for (const [value, count] of a) {
    const missing = count - (b.get(value) || 0);
    if (missing > 0) out.push(missing > 1 ? `${value} (x${missing})` : value);
  }
  return out;
}

const shorten = (s) => (s.length > 80 ? `${s.slice(0, 77)}...` : s);

export function validateTranslation(msgid, msgstr) {
  const problems = [];
  for (const rule of RULES) {
    const source = multiset(msgid, rule);
    const target = multiset(msgstr, rule);
    const missing = difference(source, target);
    const extra = difference(target, source);
    if (missing.length) problems.push(`missing ${rule.name}: ${missing.map(shorten).join(', ')}`);
    if (extra.length) problems.push(`unexpected ${rule.name}: ${extra.map(shorten).join(', ')}`);
  }
  return problems;
}
