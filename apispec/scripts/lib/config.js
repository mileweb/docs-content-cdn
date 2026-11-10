import path from 'path';
import { fileURLToPath } from 'url';

export const APISPEC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const REPO_ROOT = path.resolve(APISPEC_DIR, '..');

export const SOURCE = path.join(APISPEC_DIR, 'reference', 'cdn', 'openapi.yaml');
export const SOURCE_LOCALE = 'en';

/** Locales built from SOURCE_LOCALE plus a catalog. Add a locale here and run `npm run build`. */
export const TRANSLATED_LOCALES = ['zh'];

export const specFile = (locale) => path.join(REPO_ROOT, locale, 'apispec', 'openapi.json');
export const catalogFile = (locale) => path.join(REPO_ROOT, locale, 'apispec', 'translations.po');
