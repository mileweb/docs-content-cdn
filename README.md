# Documentation Content

```
.
├── apispec/                # Source of the API spec (OpenAPI YAML) and its build, see apispec/README.md
├── en/, zh/                # One folder per language
│   ├── apispec/
│   │   ├── openapi.json    # Generated from apispec/ by `npm run build`. Do not edit
│   │   └── translations.po # (zh only) Translations of the API spec's text
│   └── docs/               # Markdown based documentation
│       └── manifest.json   # Metadata for routing mapping
└── README.md               # This document
```

## How to add new documents?

1. Create a file inside `/docs/` directory
2. Add metadata to `/docs/manifest.json`

## How to change the API spec?

Edit the YAML under `apispec/reference/` and run `npm run build` in `apispec/`. See
[apispec/README.md](apispec/README.md).
