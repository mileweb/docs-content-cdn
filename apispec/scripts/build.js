/**
 * Builds the published API specs from the YAML in reference/:
 *   en/apispec/openapi.json      the dereferenced English spec
 *   <locale>/apispec/translations.po   updated with the current English strings
 *   <locale>/apispec/openapi.json      the English spec with the catalog's translations applied
 *
 *   node scripts/build.js                 everything
 *   node scripts/build.js --catalog-only  only update the catalogs
 */
import fs from 'fs';
import path from 'path';

import { bundleSpec } from './lib/bundle.js';
import { applyCatalog, coverage, readCatalog, serializeCatalog, updateCatalog } from './lib/catalog.js';
import { REPO_ROOT, SOURCE, SOURCE_LOCALE, TRANSLATED_LOCALES, catalogFile, specFile } from './lib/config.js';

const catalogOnly = process.argv.includes('--catalog-only');
const rel = (file) => path.relative(REPO_ROOT, file);

function writeIfChanged(file, content) {
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (old === content) return false;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  return true;
}

function report(file, changed) {
  console.log(`${changed ? 'Updated  ' : 'Unchanged'} ${rel(file)}`);
}

async function main() {
  console.log(`Reading   ${rel(SOURCE)}`);
  const json = await bundleSpec(SOURCE);
  const sourceDoc = JSON.parse(json);
  console.log(`          OpenAPI ${sourceDoc.openapi}, ${Object.keys(sourceDoc.paths).length} paths`);

  if (!catalogOnly) {
    const file = specFile(SOURCE_LOCALE);
    report(file, writeIfChanged(file, json));
  }

  for (const locale of TRANSLATED_LOCALES) {
    const poFile = catalogFile(locale);
    const catalog = updateCatalog(readCatalog(poFile, locale), sourceDoc);
    report(poFile, writeIfChanged(poFile, serializeCatalog(catalog)));

    if (!catalogOnly) {
      const file = specFile(locale);
      const translated = applyCatalog(JSON.parse(json), catalog);
      report(file, writeIfChanged(file, `${JSON.stringify(translated, null, 2)}\n`));
    }

    const c = coverage(catalog);
    const pct = c.totalChars ? ((100 * c.translatedChars) / c.totalChars).toFixed(1) : '0.0';
    console.log(
      `          ${locale}: ${c.translated}/${c.total} strings translated (${pct}% of text), ` +
        `${c.fuzzy} fuzzy, ${c.untranslated} untranslated`,
    );
  }
}

main().catch((err) => {
  console.error(`Build failed: ${err.message}`);
  process.exit(1);
});
