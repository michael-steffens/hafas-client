# Migrating to TypeScript

This document outlines the plan for converting hafas-client from JavaScript to TypeScript.

## 1. Dependency Assessment

### Core addition

| Package | Purpose |
|---------|---------|
| `typescript` (dev) | Compiler |

### `@types` packages needed

| Package | For |
|---------|-----|
| `@types/lodash` | `lodash` (v4 doesn't ship types for per-function imports) |

### Manual `.d.ts` declarations required (no types available)

| Package | Signature |
|---------|-----------|
| `create-hash` | `export default (algo: string) => { update(data: string\|Buffer, enc?: string): this; digest(enc?: string): string \| Buffer }` |
| `google-polyline` | `export function encode(coords: [number, number][]): string; export function decode(str: string): [number, number][]` |
| `gps-distance` | `export default (lat1: number, lon1: number, lat2: number, lon2: number) => number` |
| `slugg` | `export default (str: string) => string` |
| `@derhuerst/br2nl` | `export default (str: string) => string` |
| `@derhuerst/round-robin-scheduler` | `export default () => { schedule(fn: () => void): () => void }` |

### Dependencies already self-typed

`luxon`, `qs`, `content-type`, `https-proxy-agent`, `p-retry`, `p-throttle`, `object-scan`, `cross-fetch` — no action needed.

### Test dependencies

`tap` v19 ships its own types. `validate-fptf`, `is-coordinates`, `is-roughly-equal` will need inline `// @ts-nocheck` in test files or manual declarations.

## 2. Configuration Requirements

### `tsconfig.json`

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": ".",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": false
  },
  "include": [
    "index.ts", "throttle.ts", "retry.ts",
    "lib/**/*.ts", "parse/**/*.ts", "format/**/*.ts",
    "p/**/*.ts"
  ],
  "exclude": ["node_modules", "test", "tools", "docs", "dist"]
}
```

### `package.json` changes

- `"main"` → `"dist/index.js"` (or keep dual JS/TS with `allowJs`)
- Add `"types": "dist/index.d.ts"`
- Add scripts: `"build": "tsc"`, `"typecheck": "tsc --noEmit"`
- Update `"files"` to include `dist/`

### `eslint.config.js` changes

- Replace `@stylistic/eslint-plugin` with `@stylistic/eslint-plugin-ts` (or keep alongside for `.js` files during incremental migration)
- Add `typescript-eslint` parser and plugin
- Add `**/*.ts` to file patterns

## 3. Structural Changes

### File inventory

| Category | Files | Notes |
|----------|-------|-------|
| `lib/` | 8 | Core utilities |
| `parse/` | 24 | Response parsers |
| `format/` | 22 | Request formatters |
| `p/` profiles | 156 | 42 base + 42 index + 42 example + 26 products + misc |
| Root-level | 4 | `index.js`, `throttle.js`, `retry.js`, `eslint.config.js` |
| **Source total (excl test/tools)** | **215** | |
| `test/` | 113 | Test files |

### File extensions

All 215 source `.js` files → `.ts`. Two approaches:

| Approach | Files renamed | Risk |
|----------|--------------|------|
| **Incremental** | Subset at a time, `allowJs: true` | Low — validate per batch |
| **Full conversion** | All 215 at once | Higher — but project is clean ESM |

### Directory structure (compiled output)

```
hafas-client/
├── index.ts, throttle.ts, retry.ts
├── lib/*.ts
├── parse/*.ts
├── format/*.ts
├── p/**/*.ts
├── test/          (may stay .js with @ts-nocheck, or convert separately)
├── dist/          (compiled output)
│   ├── index.js, index.d.ts
│   └── ...
└── tsconfig.json
```

### Module resolution

Project already uses ESM with explicit `.js` extensions in imports. After migration, all import paths change from `.js` → `.ts`. With `moduleResolution: "bundler"`, TypeScript resolves `.ts` imports correctly.

### `p/` profiles (156 files)

These follow a uniform pattern (`base.js` exports default profile object, `index.js` re-exports as `{profile}`, `example.js` is demo code). They can be batch-converted with find/replace of extension plus adding interface conformance.

## 4. Type Definition Strategy

### Phase 1 — Core domain types (`types/`)

```
types/
├── location.ts    — Location, Station, Stop, Address, POI, Coordinates
├── line.ts        — Line, Operator, Product
├── journey.ts     — Journey, JourneyLeg, Alternative
├── stopover.ts    — Stopover
├── departure.ts   — Departure, Arrival
├── trip.ts        — Trip, Movement
├── remark.ts      — Remark, Hint, Warning
├── profile.ts     — Profile, RequestCtx, ParseCtx, FormatCtx, CommonData
└── hafas.ts       — Raw HAFAS response shapes (partial, heavily indexed)
```

### Phase 2 — Profile interface

The `Profile` object (50+ properties, many optional hook functions) needs a carefully designed interface:

```typescript
interface ProfileHooks<T> {
  parseLocation?: (ctx: ParseCtx, raw: unknown) => T;
  parseJourney?: (ctx: ParseCtx, raw: unknown) => T;
  // ... 30+ hooks
}

type Profile = BaseProfile & Partial<ProfileHooks<unknown>>;
```

### Phase 3 — HAFAS raw types

The raw API response is the hardest to type. Use a **progressively typed** approach:

- Top-level shape: `{ jnyL?: unknown[]; outConL?: unknown[]; locL?: unknown[]; common?: unknown; planrtTS?: string }`
- Parser functions accept `unknown`, assert/cast internally
- Over time, refine specific parser input shapes as patterns are understood

### Handling existing JS during incremental migration

- `allowJs: true` in tsconfig
- `checkJs: false` initially (type-check only `.ts` files)
- Gradually enable `checkJs: true` per file using `/// <reference types="..." />`

## 5. Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| **HAFAS raw response typing** | HIGH | Deeply nested, index-cross-referenced JSON. Use `unknown` at parser boundaries, narrow inside each parser function |
| **Profile system duck typing** | HIGH | 43 profiles extend `defaultProfile` with selective overrides. Define `Profile` interface with all 50+ optional properties; use `satisfies` operator for profile definitions |
| **Dynamic bracket property access** | MEDIUM | `d.stbStop[prefix + 'TimeS']` in `arrival-or-departure.js`. Use type assertions or indexed access types with a union of known keys |
| **`object-scan` mutation in `common.js`** | MEDIUM | In-place mutation of parsed objects. Type the mutation targets explicitly; consider refactoring to immutable pattern |
| **`Object.assign` profile merging** | MEDIUM | 39 occurrences. Works fine in TS but requires `Profile` interface to be properly designed with all optional fields |
| **`Object.defineProperty` usage** | LOW | Used for non-enumerable `profile` property and `canceled` alias. Use `declare` or type assertion |
| **Runtime `typeof` guards** | LOW | 22 occurrences. Replace with TS discriminated unions where possible, keep guards for runtime validation |
| **Test suite compatibility** | LOW | `tap` v19 supports TS via `@tapjs/typescript`, but it's explicitly disabled in config. Either enable it or keep tests as `.js` |
| **`lodash` per-function imports** | LOW | `import isObj from 'lodash/isObject.js'` — `@types/lodash` covers this, but verify ESM path resolution works |
| **Published package size** | LOW | Dual JS+TS dist doubles size. Decide: ship TS-only (breaking), ship compiled JS with `.d.ts`, or use `tsup` for bundling |

## 6. Recommended Migration Order

1. Add `tsconfig.json`, TypeScript dev dependency, manual `.d.ts` for untyped packages
2. Define core types (`types/*.ts`) — domain interfaces first
3. Convert `lib/` (8 files) — core utilities, smallest surface area
4. Convert `parse/` (24 files) and `format/` (22 files) — parsers/formatters have clear input/output contracts
5. Convert root-level (`index.ts`, `throttle.ts`, `retry.ts`) — entry points
6. Batch-convert `p/` profiles (156 files) — uniform pattern, mechanical conversion
7. Optionally convert `test/` — or keep as `.js` with `@ts-nocheck`
8. Enable `strict` mode, fix remaining type errors
9. Update `package.json` exports, publish strategy

## 7. Why This Is Feasible

The codebase is well-positioned for TypeScript migration:

- **Pure ESM** — no CommonJS interop needed (`"type": "module"` already set)
- **No dynamic code** — no `require()`, `eval()`, or `new Function()` anywhere
- **Consistent export patterns** — named exports dominate; profiles follow a uniform template
- **Modern JavaScript** — optional chaining, nullish coalescing, and async/await already used throughout
- **Clear module boundaries** — `lib/`, `parse/`, `format/`, and `p/` are well-separated concerns
