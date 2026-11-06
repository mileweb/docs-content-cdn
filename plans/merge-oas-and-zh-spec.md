# Plan: merge `cdn360API-OAS` into `docs-content-cdn`, and add a Chinese API spec

Status: Phases 0-7 done locally on branch `apispec-merge` (not pushed). The zh translation is a
machine draft awaiting human review. docs-app changes are uncommitted. Phase 8 (push, PR,
release, archive the OAS repo) and the Stoplight check have not been done.

## 1. Where we are today

**Two repos, a manual hand-off.**

- `mileweb/cdn360API-OAS` (844 commits) holds the hand-edited OpenAPI 3.0 YAML:
  `reference/cdn/openapi.yaml` (20,380 lines) plus 39 model files in `reference/cdn/models/`
  and `reference/common/models/`.
- `tools/openapi-export/export-openapi.js` flattens it into one JSON file by dereferencing
  every `$ref` with `@apidevtools/json-schema-ref-parser`.
- Someone runs it twice, once into `en/apispec/openapi.json` and once into
  `zh/apispec/openapi.json` of `docs-content-cdn`. The two paths are in
  `tools/openapi-export/README.md`. They commit and open a PR in a second repo.
- The `apispec/README.md` files in `docs-content-cdn` still describe the older
  `swagger-merger` method. That is stale.

**Facts I checked:**

- The export is reproducible. Running the OAS repo's current `master` through the
  tool gives a file **byte-identical** to `en/apispec/openapi.json` at `docs-content-cdn`
  `dev` HEAD (1,906,040 bytes), so the tool can move over unchanged.
- **`en` and `zh` spec files are byte-identical today.** The Chinese page in docs-app
  shows the English spec inside Chinese site chrome. The only CJK characters in either
  file are 8 characters of English-spec data.
- `docs-app` already loads `/${locale}/apispec/openapi.json`, so a translated `zh` file
  needs no data-path change.
- The spec has 3,580 `description`/`summary`/`title` strings, of which only **1,785 are
  unique** (about 250K characters). Translating by unique string halves the work.
- 1,469 strings contain HTML, 263 are in-page `href="#..."` links, 79 are `/docs/` links
  that docs-app already rewrites per locale, and `{{siteDomain}}` appears as a placeholder.
  Translation has to preserve all of that.
- **70 links use `#tag/<Tag-Name>/...`.** Redoc builds those anchors from the tag's `name`.
  Translating tag names would break all 70 links (see section 4).
- Cruft in the OAS repo: `redoc-static.html` (1.8 MB, stale), `cdn360doc.html`, and
  `tools/openapi-export/dist/openapi.json`, which is tracked despite the README saying it
  is git-ignored and is already out of date. The Stoplight section of its README is
  obsolete (the GitHub integration broke in 2019).
- Unmerged work in the OAS repo: `origin/neil-dev` is 3 commits ahead of `master`. The
  other branches are fully merged. I could not list open PRs because `gh` is not
  authenticated.
- `docs-content-cdn` flow today: feature branch, then `dev`, then a `dev` to `master`
  release PR (e.g. #895). CDNPro-CLI fetches `master`. The checked-out local `master`
  here is stale (July 2024), so always use `origin/master`.

## 2. Target layout

```
docs-content-cdn/
├── apispec/                           NEW: source + tooling (language-neutral)
│   ├── reference/cdn/openapi.yaml     moved as-is from OAS, so no $ref edits
│   ├── reference/cdn/models/*         moved as-is
│   ├── reference/common/models/*      moved as-is
│   ├── scripts/                       build / i18n extract / i18n check
│   ├── package.json, package-lock.json, .nvmrc
│   └── README.md                      the workflow in section 3
├── en/apispec/openapi.json            GENERATED (do not hand-edit)
├── zh/apispec/openapi.json            GENERATED (do not hand-edit)
├── zh/apispec/translations.po         NEW: the Chinese catalog (human/AI maintained)
└── .github/workflows/apispec.yml      NEW: CI check
```

Why:

- The `{locale}/apispec/openapi.json` paths do not change, so docs-app and CDNPro-CLI
  keep working untouched.
- The generated JSON stays committed because both consumers read it from GitHub.
- The Chinese catalog sits next to the other `zh/` content.
- Keeping `reference/...` intact means no `$ref` rewrites.

Dropped on import: `redoc-static.html`, `cdn360doc.html`, `tools/openapi-export/dist/`,
the web-based Stoplight instructions and the "Known issues" section of the old README
(that GitHub integration broke in 2019), and `images/cdn6.jpg` (nothing references it).

Editors: the YAML can be edited in any editor. Stoplight Studio (desktop) should still work
on a local clone, by opening the `apispec/` folder, because the `reference/` layout and the
relative `$ref`s are unchanged. This is **unverified**: Studio is not installed on the
machine where this plan was written, and I have not checked whether the desktop app is
still maintained. Phase 2 includes a check, and the README only claims support after it
passes.

## 3. New workflow

```
 edit YAML (English)         npm run build              commit together             CI
 apispec/reference/**  --->  en JSON  regenerated  --->  YAML + en JSON +   --->  rebuild, fail if
                             zh JSON  regenerated        zh JSON + .po           anything differs
                             .po      updated                                    + i18n checks
                                                              |
                                      PR to dev  ----->  dev -> master release PR (as today)
```

Day to day:

1. Branch from `dev` (`ngdoc-NNN`).
2. Edit only `apispec/reference/**` (English is the source of truth).
3. `cd apispec && npm run build`. It does four things:
   1. dereferences the YAML (same as today),
   2. writes `en/apispec/openapi.json`,
   3. updates `zh/apispec/translations.po`. New or changed English strings are added with
      an empty translation, and removed ones are marked obsolete,
   4. writes `zh/apispec/openapi.json` by applying the catalog. Any string with no
      translation falls back to English.
4. Optionally translate the new strings in `translations.po`. This can be done in the
   same PR or a follow-up. Untranslated strings never block a PR, they just show English.
5. Preview in docs-app (section 6).
6. Commit the YAML, both JSON files and the `.po` together, then open a PR to `dev`.
   One PR now replaces the old two-repo hand-off.
7. Release as before: `dev` to `master`.

Rules for contributors: never edit the generated JSON files, and never edit the English
text in the `.po` (change the YAML instead).

CI (`apispec.yml`, runs on PRs touching `apispec/**`, `en/apispec/**`, `zh/apispec/**`):

- `npm ci && npm run build`, then `git diff --exit-code`. It fails if the committed JSON or
  `.po` is out of date. This is the guard against hand-edits and forgotten rebuilds.
- `npm run i18n:check`. It **fails** on broken translations (section 4, rule 3) and
  **reports** coverage (translated / fuzzy / untranslated) without failing.
- A non-blocking OpenAPI lint step (Redocly CLI or Spectral). The old Stoplight linting is
  gone, and a 20K-line spec will have existing warnings, so start informational.

## 4. Chinese spec design

### Approach: a gettext catalog keyed on the English string

| Option | Verdict |
|---|---|
| Copy the YAML per language | Rejected. 20K lines and 39 models duplicated, and drift is certain with about 100 English edits a year. |
| Inline `x-i18n` blocks in the YAML | Rejected. Clutters the source and causes merge conflicts. |
| OpenAPI Overlay (JSONPath-keyed) | Rejected. Paths shift when the spec is refactored, and shared strings must be translated once per occurrence (3,580 vs 1,785). |
| **`.po` catalog keyed on the English text** | **Chosen.** Translate once per unique string. Standard format with editor support (Poedit, VS Code, Weblate/Crowdin if ever wanted). Each entry carries `#:` JSON-pointer comments as translator context. |

### Rules the build must enforce

1. **Only translate prose fields.** Translate `description`, `summary` and `title` where
   they sit on an OpenAPI object (info, operations, parameters, schemas, responses,
   tags). **Skip** everything under `example`, `examples`, `default`, `enum` and
   `x-codeSamples`. Example payloads contain a *data field* called `description`, for
   example `"description": "validPropertyVersionAllFields_PropertySteps"`. Matching by key
   name alone would translate sample data.
2. **Tag names stay English.** Redoc derives `#tag/<name>/...` anchors from `name`, and
   70 links in the spec depend on that. For `zh`, the build adds `x-displayName`
   (Redoc supports it on tags) from the catalog, so the menu shows Chinese and anchors
   are unchanged. `operationId`, `$ref` names and `x-codeSamples` are never touched.
3. **Translations must preserve structure.** `i18n:check` fails if source and translation
   differ in any of: `{{placeholders}}`, `{pathParams}`, the HTML tag sequence, markdown
   link targets, `href`s, or the contents of `<code>` spans.
4. **Fallback to English** for missing entries, so `zh` is always complete and valid.
5. **Changed English text.** The old translation is kept as a *fuzzy* suggestion when the
   text is at least 80% similar (translator sees the old msgid, as `msgmerge` does).
   Recommendation: fuzzy entries are **not** used in the output (English is shown until
   reviewed). In an API reference a stale translation, such as a wrong default, is worse
   than English. See open question 2.
6. **Server URL and brand.** `{{siteDomain}}` and `{{title}}` stay as placeholders. docs-app
   substitutes them as it does now.

### Tooling

- `npm run build`: both locales, as described above. With an empty catalog, the `zh`
  output must equal the `en` output (this is the Phase 3 acceptance test).
- `npm run i18n:extract`: just the catalog update.
- `npm run i18n:check`: validation (rule 3) + coverage report.
- Libraries: `gettext-parser` for `.po` I/O. The build keeps `json-schema-ref-parser`
  and `js-yaml` from the current tool.

### Not covered by the catalog (docs-app side)

- **Redoc's own UI text** ("Request samples", "Responses", "Request Body schema",
  "Authorizations", "Expand all", ...) is hard-coded English in `2.0.0-rc.40`. The
  `labels` option only covers 10 keys (`enum`, `default`, `example`, `deprecated`, ...).
  Plan: set those via `labels` for `zh`, translate the strings in our own
  `components/redoc/request-samples.js`, and **accept the rest as a known gap** for now.
  Closing the gap would mean more patch-package patches (brittle) or a Redoc upgrade. We
  decided to stay on rc.40, and I have not checked whether newer Redoc offers full i18n.
- **Search.** Redoc's built-in search is lunr-based and tokenizes on whitespace, so
  Chinese sentences are unlikely to be searchable word by word. I have *not* verified
  this in the browser, so it is a Phase 7 test item. Fix options if it is poor: accept,
  or patch the indexer.

## 5. Phases

Each phase ends in a reviewable PR or a verifiable check.

**Phase 0: decisions and freeze.**
- Answer the open questions in section 7.
- Land or close `origin/neil-dev` (3 unmerged commits) in the OAS repo, and list open PRs.
- Announce a short freeze on the OAS repo.
- Deal with the uncommitted change currently in `docs-content-cdn` (141 code samples
  changed to `lang: bash` / `label: CDNProSDK-bash`). It was made on the generated JSON
  and will be redone at the YAML level in Phase 3, then the JSON edit is discarded.

**Phase 1: import the files, without history** (`docs-content-cdn`, branch from `dev`).
- Decision: copy files only. The 844-commit history stays in the OAS repo, which is
  archived (not deleted) in Phase 8, so `git blame` on the old spec remains available there.
- Copy `reference/` into `apispec/reference/`, plus `export-openapi.js`, `package.json` and
  `package-lock.json` from `tools/openapi-export/` (the build script is ported in Phase 2).
  Take them from the OAS `master` commit hash that is recorded in the PR description and
  commit message, so the origin of the import is traceable.
- Acceptance: `diff -r` of the imported `reference/` against OAS `master` is empty.

**Phase 2: build tooling** (no behavior change).
- Port `export-openapi.js` to `apispec/scripts/build.js`. It writes `en/` and `zh/`.
- Pin Node via `.nvmrc`. Keep `package-lock.json`. Take the pending dependabot bumps
  (`js-yaml` 5.5.0, `undici` 6.29.1) only if the output stays byte-identical.
- Acceptance: `npm run build` leaves `en/apispec/openapi.json` byte-identical to HEAD
  (already proven possible), and `zh` is identical to `en`.
- Replace the stale `apispec/README.md` files with the workflow from section 3.
- **Stoplight Studio check** (someone with Studio installed): open `apispec/` as a local
  project. Confirm that all `$ref`s resolve, that the spec renders, and that a trivial edit
  saved from Studio gives a small `git diff` (not a whole-file reformat). If it works, add
  an "Editing" note to the README: any editor works, Studio is fine on a local clone, and
  always run `npm run build` afterwards. If it reformats the file or fails, say so in the
  README and recommend VS Code with an OpenAPI extension instead.

**Phase 3: re-apply the code-sample label change at the source.**
- Script the YAML edit (add `lang: bash`, `label: CDNProSDK-bash`) with a text
  transform so formatting and comments survive.
- Acceptance: regenerated JSON is identical to the current uncommitted JSON, so we know
  nothing was lost. Then drop the hand edit of the JSON.
- Fix the spec intro link to the renamed repo (`mileweb/CDNProCLI`, now the SDK) in the
  same PR if you want.

**Phase 4: i18n tooling.**
- Build `i18n:extract`, the translation pass in `build`, and `i18n:check`. Include unit
  tests for rule 1 (data `description` fields untouched), rule 2 (tag anchors unchanged)
  and rule 3 (placeholder/HTML validation).
- Commit an initial `translations.po` with all 1,785 entries and empty translations.
- Acceptance: zh equals en, and the tests pass.

**Phase 5: CI and docs.**
- Add `.github/workflows/apispec.yml` and the README workflow text. Update
  `docs-content-cdn/README.md`.

**Phase 6: translate** (can overlap Phase 7, and does not block the cutover).
- Build a glossary (property, hostname, deployment, edge, origin...) from the existing
  `zh/docs` so API wording matches the rest of the Chinese docs. Check whether the
  git-ignored `translation-notes/` folder already has one.
- First pass by machine in batches, in the order users see: `info` and tags, then
  operation summaries and descriptions (menu order), then parameter and schema
  descriptions. Human review follows, with rule 3 failures fixed first.
- One PR per batch. Coverage is reported but only enforced for release if you decide so
  (open question 4).

**Phase 7: docs-app.**
- `pages/[product]/apidocs.js`: pass Redoc `labels` per locale.
- Translate strings in `components/redoc/request-samples.js`.
- Visual check of `/zh/cdn/apidocs`: menu, anchors (`#tag/...` and `#operation/...`
  links still work), long Chinese text in the right-hand panels, search with Chinese
  keywords, and the `{{siteDomain}}` substitution.
- Local preview: docs-app reads local clones under `DOCS_REPO_CACHE_DIR`, named
  `mileweb__docs-content-cdn`. Pointing that at your working copy with
  `DOCS_REPO_DEV_SYNC=0` should show uncommitted changes. I will verify it here before
  documenting it, because the sync logic does a fetch and reset.

**Phase 8: cutover.**
- Merge to `dev`, then check the dev site in both locales. Release `dev` to `master`
  (CDNPro-CLI picks it up from `master`).
- Archive `cdn360API-OAS`. Replace its README with a pointer to
  `docs-content-cdn/apispec`. The CLI README (`CDNPro-CLI`) already points at
  `docs-content-cdn`, so it needs no change.
- Confirm the archived repo still has the full history and a link to the merge PR.

## 6. Risks

| Risk | Mitigation |
|---|---|
| Someone edits the generated JSON by hand | CI rebuilds and fails on any diff. README warns. |
| A bad translation breaks HTML or a placeholder | `i18n:check` fails the PR. |
| Stale zh text after an English edit | Changed strings become fuzzy and fall back to English, never silently stale. |
| Merge-time conflicts in the 1.9 MB JSON files | Only generated output conflicts. Rebuild after merging. Do not hand-resolve. |
| Chinese search does not work in Redoc | Test in Phase 7. Accept or patch later. |
| Repo growth (2 x 1.9 MB per spec change) | Compresses well in git. Same cost as today's `en`/`zh` pair. |
| `dev`/`master` drift during the migration | Do Phase 1 and Phase 8 within one release cycle. |

## 7. Open questions (recommended answers in bold)

Decided:

1. History: **copy files only**, history stays in the archived OAS repo.
2. Fuzzy translations: **fall back to English until reviewed.**
3. First Chinese pass: **machine draft in batches, then human review**, using the existing
   `zh/docs` as the glossary source.

Still open (defaults shown):

4. Should zh coverage gate a release? **No for now. Report only, revisit once coverage
   is above about 90%.**
5. Should the Chinese spec ever differ in content from English (for example showing
   ICP/Beian fields only in `zh`)? **Not now.** The design allows a later per-locale
   include/exclude marker if needed.
6. Does the CLI need localized output? **No. It reads `en` only.**
