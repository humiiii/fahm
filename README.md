# Fahm

A local Next.js prototype for exploring Islamic topics with source references and contextual word details.

## Run locally

Requires Node.js 22 LTS or a supported newer LTS release.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Next.js, `http://127.0.0.1:3087`.

The development script uses Webpack polling for reliable file watching in this local macOS environment. The production build uses the default Next.js bundler.

## Quran Foundation credentials

Use the ignored root-level `.env.local` file for your credentials. If it does not exist, copy `.env.example` to `.env.local`, then fill in `QF_CLIENT_ID` and `QF_CLIENT_SECRET` locally. Never paste secrets into chat or commit this file, and never prefix these names with `NEXT_PUBLIC_`. Escape any literal dollar sign in a value as `\$`, because Next.js expands environment variables.

Leave `QF_ENV=prelive` for a new app. Switch to `production` only after approval and with matching production credentials. New Backend/server apps need the Client Credentials grant and approved Content read scopes. The integration defaults to granular scopes; set `QF_CONTENT_SCOPE_MODE=legacy` only if the Console lists the older umbrella `content` scope. See the [official quickstart](https://api-docs.quran.foundation/docs/quickstart/).

Run the read-only connection check after saving your credentials:

```sh
npm run quran:check
```

It authenticates server-side, fetches Al-Fatihah's seven Arabic verses, validates their order and text, and prints a success summary without credentials or tokens. In production, it also verifies all eight verses of Ash-Sharh. It uses the same server-only data module available to future Server Components. The official SDK caches OAuth tokens in memory; requests have a 15-second timeout and fetched content is not persisted. Configuration errors fail before any request. Restart the development server after changing credentials.

Both pre-live and production connections were verified on 9 November 2026. Production successfully returned Al-Fatihah (1:1–1:7) and Ash-Sharh (94:1–94:8). Reader pages still show the local preview; the next step is displaying live content there with provider attribution and translation protection. Pre-live contains only surahs 1 and 2; use the approved production credentials for Ash-Sharh.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

## Included

- Explore homepage with typo-tolerant topic search and category filters.
- Hardship & ease topic with the 94:5–6 reading excerpt, contextual word definitions, source panel, hadith and tafsir references.
- Short Patience and Gratitude reference pages.
- Supporting two-verse reader preview, source directory, about page, and not-found page.
- Native accessible dialogs, keyboard navigation, responsive layout, reduced-motion support, and light/dark themes.
- Theme and Arabic font-size preferences stored only in the current browser.
- Locally bundled DM Sans and Amiri Quran fonts; no external font request is needed.

## Content status

This is a local prototype, not a published scholarly resource. Reference links were checked on 9 November 2026. Editorial wording and connections await review. Provider access and content-use permissions must be established before public release. No publisher affiliation is implied.

The two sample translations are credited to Dr. Mustafa Khattab, The Clear Quran. Hadith and tafsir are linked with short editorial descriptions; full third-party text is not bundled. Word details reference the Quranic Arabic Corpus. See the in-app Sources page for links.

The root metadata deliberately marks the prototype `noindex`. Remove this only after content approval and public-launch preparation. Server-side Quran Foundation access is connected, while the interface still uses local sample content. No full Quran reader, audio player, accounts, or analytics are included yet.

The agreed product scope, stack, API considerations, and roadmap are in [PROJECT_BRIEF.md](./PROJECT_BRIEF.md).

## Source structure

- `src/app`: App Router pages and styling.
- `src/components`: navigation, search, reading controls, and source/word dialogs.
- `src/content`: local topic metadata and editorial MDX.
- `src/lib`: source records, passage data, and topic-search implementation.
- `src/lib/quran`: validated provider configuration and server-only Al-Fatihah and Ash-Sharh fetchers.
- `scripts/check-quran.ts`: private-credential-safe live connection check.
- `tests`: meaningful search and reference-integrity checks.

No GitHub repository or deployment has been created.
