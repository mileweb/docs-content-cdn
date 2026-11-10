# API spec

The CDN Pro API reference shown at `/{locale}/cdn/apidocs` is built from the OpenAPI 3.0
YAML in this folder. It was moved here from
[cdn360API-OAS](https://github.com/mileweb/cdn360API-OAS), whose history stays in that repo.

| Path | What it is | Edit it? |
|---|---|---|
| `reference/cdn/openapi.yaml` | The spec: paths, operations, examples | Yes, the English source |
| `reference/cdn/models/`, `reference/common/models/` | Schemas pulled in with `$ref` | Yes |
| `../zh/apispec/translations.po` | Chinese translations of the spec's text | Yes, `msgstr` lines only |
| `../en/apispec/openapi.json` | Generated English spec, read by docs-app and CDNPro-CLI | **No** |
| `../zh/apispec/openapi.json` | Generated Chinese spec | **No** |

## Making a change

```bash
cd apispec
npm ci            # once; Node version in .nvmrc
# edit reference/**
npm run build     # regenerates both openapi.json files and updates translations.po
```

Commit the YAML, both `openapi.json` files and `translations.po` together, and open the PR
against `dev` as usual. CI rebuilds everything and fails if a committed generated file
differs from the build, so never edit `openapi.json` by hand.

| Command | Does |
|---|---|
| `npm run build` | Dereferences the YAML into `en/apispec/openapi.json`, updates the catalogs, writes the translated specs |
| `npm run i18n:extract` | Only updates the catalogs |
| `npm run i18n:check` | Validates translations and prints coverage |
| `npm test` | Unit tests of the build scripts |
| `npm run lint` | Redocly lint of the YAML. The existing spec has known problems, so CI only reports it |

Placeholders like `{{siteDomain}}` and `{{title}}` stay in the spec. docs-app replaces them
with the brand's values when it renders the page.

## Translating

The Chinese spec is the English spec with every translated string replaced. Anything not
translated yet is shown in English, so the Chinese spec is always complete.

`translations.po` is a standard gettext catalog with one entry per unique English string:

```po
#. /paths/~1cdn~1properties~1{propertyID}~1versions~1{version}/get/description
msgid "Get the detailed configuration of a property version."
msgstr "获取属性版本的详细配置。"
```

- `msgid` is the English text. Don't edit it; change the YAML and rebuild instead.
- `msgstr` is the translation. Fill it in, run `npm run build`, commit.
- `#.` lines are JSON pointers to where the string appears in `en/apispec/openapi.json`.
- Entries with `msgctxt "tag"` are menu group names. Their translation becomes the tag's
  `x-displayName`. The tag name itself stays English, because Redoc builds `#tag/...`
  links from it.

Any text editor works. [Poedit](https://poedit.net/) and VS Code gettext extensions show
untranslated and fuzzy entries.

**When the English changes**, the build keeps the old translation as a suggestion and
marks the entry `#, fuzzy`, with the old English in a `#| msgid` line. Fuzzy translations
are not used: that string shows English until someone updates the `msgstr` and deletes the
`#, fuzzy` line. Translations of removed strings are kept at the end of the file as `#~`
entries and are reused if the text comes back.

**Rules for a translation** (`npm run i18n:check` fails the PR otherwise): keep every
`{{placeholder}}`, `{pathParameter}`, HTML tag, `href`, markdown link target, `<code>` span
and `` `code` `` span from the English. Their order may change. Only `description`,
`summary` and `title` texts and tag names are extracted. Example payloads, defaults, enums
and code samples are never translated.

**Adding a language**: add it to `TRANSLATED_LOCALES` in `scripts/lib/config.js`, create
`<locale>/apispec/`, run `npm run build`.

## Previewing in docs-app

docs-app reads content from clones in `DOCS_REPO_CACHE_DIR`, named
`mileweb__docs-content-cdn`. Preview a **copy** of your working tree there. Don't point the
cache at your working copy: docs-app's sync does `git reset --hard` on that folder.

```bash
# in docs-content-cdn, after npm run build
rsync -a --delete --exclude node_modules ./ /tmp/docs-preview/mileweb__docs-content-cdn/

# in docs-app
DOCS_REPO_CACHE_DIR=/tmp/docs-preview DOCS_REPO_DEV_SYNC=0 NEXT_PUBLIC_DOCS_PRODUCTS=cdn yarn dev
```

Open `http://localhost:3000/en/cdn/apidocs` and `http://localhost:3000/zh/cdn/apidocs`.
Re-run the `rsync` after each build; the page shows whatever files are in the copy, whichever
branch is checked out.

Known limits of the Chinese page (Redoc 2.0.0-rc.40): most of Redoc's own UI text
("Responses", "Request Body schema", ...) stays English, and its search box finds nothing for
Chinese queries because its index drops non-Latin characters. English queries still work.

## Editing with Stoplight Studio

The YAML was originally written with [Stoplight Studio](https://stoplight.io/studio). The
`reference/` layout and its relative `$ref`s are unchanged, so the desktop app should be able
to open this `apispec/` folder as a local project. This has **not been verified** yet: check
that the `$ref`s resolve and that saving a small edit doesn't reformat the whole file before
relying on it. Whatever the editor, run `npm run build` afterwards.
