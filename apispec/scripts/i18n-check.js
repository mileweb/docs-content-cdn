/**
 * Validates the translation catalogs. Exits 1 if a translation used in the output drops or
 * adds a placeholder, path parameter, HTML tag, link or code span (see lib/validate.js).
 * Problems in fuzzy entries, which are not used in the output, are reported as warnings.
 * Coverage is reported but never fails the check.
 */
import path from 'path';

import { coverage, readCatalog } from './lib/catalog.js';
import { REPO_ROOT, TRANSLATED_LOCALES, catalogFile } from './lib/config.js';
import { validateTranslation } from './lib/validate.js';

let errors = 0;

for (const locale of TRANSLATED_LOCALES) {
  const file = catalogFile(locale);
  const catalog = readCatalog(file, locale);
  let warnings = 0;

  for (const entry of catalog.entries.values()) {
    if (!entry.msgstr) continue;
    const problems = validateTranslation(entry.msgid, entry.msgstr);
    if (!problems.length) continue;

    if (entry.fuzzy) warnings++;
    else errors++;
    const label = entry.fuzzy ? 'warning (fuzzy)' : 'error';
    const preview = entry.msgid.length > 100 ? `${entry.msgid.slice(0, 97)}...` : entry.msgid;
    console.log(`${path.relative(REPO_ROOT, file)}: ${label}: msgid ${JSON.stringify(preview)}`);
    problems.forEach((p) => console.log(`    ${p}`));
  }

  const c = coverage(catalog);
  const pct = c.totalChars ? ((100 * c.translatedChars) / c.totalChars).toFixed(1) : '0.0';
  console.log(
    `${locale}: ${c.translated}/${c.total} strings translated (${pct}% of text), ` +
      `${c.fuzzy} fuzzy, ${c.untranslated} untranslated, ${warnings} warning(s)`,
  );
}

if (errors) {
  console.log(`${errors} translation(s) failed validation.`);
  process.exit(1);
}
