# tabany · AI Discovery Copilot

A Next.js app for running AI-discovery interviews and turning them into ranked AI
opportunities. The Anthropic API key lives **on the server**, so once deployed,
anyone who opens the link can generate analyses without entering a key.

## What's inside
- **Interview** — an editable, all-optional questionnaire plus an open-notes box.
- **Generate** — sends the answers to Claude (server-side) and returns ranked AI
  opportunities with impact, complexity and time-saved.
- **Log** — every analysis is saved (in the browser) so you build a picture across departments.
- **Questions** — edit / add / remove the questions; changes persist.
- **Settings** — export/import a backup of your data.

## 1. Requirements
- Node.js 18.17+ (Node 20 LTS recommended)

## 2. Run it locally
```bash
npm install
cp .env.example .env.local      # then edit .env.local and paste your key
npm run dev
```
Open http://localhost:3000

Get an API key at https://console.anthropic.com and put it in `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

## 3. Production build
```bash
npm run build
npm run start
```

## 4. Deploy (so others can use it with no setup)

### Vercel (easiest)
1. Push this folder to a GitHub repo (or use the Vercel CLI).
2. Import the repo at https://vercel.com/new.
3. In **Project Settings → Environment Variables**, add
   `ANTHROPIC_API_KEY` with your key.
4. Deploy. Share the URL — visitors can generate without a key.

### Any Node host (Render, Railway, a VM, etc.)
- Set the `ANTHROPIC_API_KEY` environment variable.
- Run `npm install && npm run build && npm run start`.

## Notes
- **Where data is stored:** interviews, custom questions and the in-progress
  draft are saved in the visitor's browser (localStorage). It is per-browser /
  per-device, not a shared database. Use **Settings → Export backup** to move data
  between devices. For a shared team database, swap localStorage for a real DB
  (e.g. Postgres) — the analysis route is already server-side, so that's where you'd add it.
- **Model:** defaults to `claude-sonnet-4-6`. Override with the `ANTHROPIC_MODEL`
  env var if you want a different one.
- **Cost:** each analysis is a single Claude call (pay-as-you-go on your Anthropic account).

## Project structure
```
app/
  api/analyze/route.js   server route — calls Anthropic, holds the key
  globals.css            styles
  layout.jsx             root layout
  page.jsx               the whole app (client component)
.env.example             copy to .env.local
```
