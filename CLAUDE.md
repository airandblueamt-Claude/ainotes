# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

Standard Next.js 14 App Router project. All app code lives under `app/`:

```
app/
  layout.jsx     # root layout — <html>/<body>, exports metadata + viewport, imports ./globals.css
  page.jsx       # the entire app — the default-exported App() component ("use client")
  globals.css    # global stylesheet — :root design tokens and every class rule
next.config.mjs  # empty config stub
package.json     # tabany-discovery-copilot, Next 14 scripts
```

> History note: an earlier upload had all files committed under wrong names with mismatched
> contents (e.g. the App component was in `globals.css`, the stylesheet in `layout.jsx`, the
> real `package.json` in `package-lock.json`, the lockfile in `README.md`). This has been
> unscrambled into the structure above and verified to build. If you `git log` older commits,
> expect that scramble there.

## What this app is

`tabany Discovery Notes` — a fully **client-side, single-component** Next.js 14 / React 18
app for AMT-style discovery interviews. A consultant runs through a configurable
questionnaire about a team's manual/repetitive work, saves each interview, and reviews
saved records. The product metadata brands it "AI Discovery Copilot — turn discovery
interviews into ranked AI opportunities," but **the current source contains no AI/analysis
code** — only capture, save, edit, and export/import. The CSS retains styles for an
analysis/opportunities/loading UI (`.opp`, `.gauge`, `.scan`) that the component no longer
renders; an API route (`route.js`) that likely powered generation was deleted (see git log).
There are no servers, accounts, or API keys — everything persists in `localStorage`.

## Commands

```bash
npm install
npm run dev      # next dev — local development
npm run build    # next build
npm run start    # next start — serve production build
npm run lint     # next lint
```

There is no test setup. `next@14.2.5` is flagged with a security advisory in the lockfile;
consider upgrading if asked to harden the project.

## Architecture (the `App` component in `app/page.jsx`)

Everything lives in one default-exported `App()` function driven by `useState`/`useEffect`.

- **Views** — one component, four views switched by `view` state via `go(v)`:
  `interview` (fill questionnaire), `record` (read a saved interview), `log` (grid of saved
  interviews), `questions` (live editor for the questionnaire itself).
- **Questionnaire config (`cfg`)** — seeded from the `DEFAULTS` array (sections → questions,
  each `{id, label, hint, type: text|textarea, ph, wide}`). Fully user-editable in the
  `questions` view; all questions are optional.
- **Persistence** — three `localStorage` keys, written via debounced/effect-driven autosave:
  - `tabany:cfg` — the questionnaire configuration
  - `tabany:recs` — saved interview records
  - `tabany:draft` — in-progress answers/notes (so a reload doesn't lose work)
  A `hydrated` flag gates writes so the initial load doesn't clobber stored data.
- **Data model** — a saved record is `{ id, createdAt, updatedAt?, sections: [{title, items: [{id,label,value}]}], notes }`. `buildSections()` converts the flat `answers` map into this shape, keeping only answered questions.
- **Record helpers** — `deptOf`/`teamOf`/`itemCount`/`findItem` derive display values from a
  record; `recToMd()` serializes a record to Markdown for clipboard copy.
- **Backup** — Settings modal does JSON export/import of `{config, records}`
  (`exportData`/`importData`), the only way to move data between browsers/devices.

When editing the component, the matching CSS class names live in `app/globals.css`.
Keep class names in sync across the two files.
