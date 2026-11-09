# Fahm

A local Next.js prototype for exploring Islamic topics with source references and contextual word details.

## Run locally

Requires Node.js 22 LTS or a supported newer LTS release.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Next.js, `http://127.0.0.1:3087`.

The development script uses Webpack polling for reliable file watching in this local macOS environment. The production build defaults to Turbopack. If this macOS environment blocks its local worker port, run `npm run build -- --webpack`; this build path is verified.

## Quran Foundation credentials

Use the ignored root-level `.env.local` file for your credentials. If it does not exist, copy `.env.example` to `.env.local`, then fill in `QF_CLIENT_ID` and `QF_CLIENT_SECRET` locally. Never paste secrets into chat or commit this file, and never prefix these names with `NEXT_PUBLIC_`. Escape any literal dollar sign in a value as `\$`, because Next.js expands environment variables.

Leave `QF_ENV=prelive` for a new app. Switch to `production` only after approval and with matching production credentials. New Backend/server apps need the Client Credentials grant and approved Content read scopes. The integration defaults to granular scopes; set `QF_CONTENT_SCOPE_MODE=legacy` only if the Console lists the older umbrella `content` scope. See the [official quickstart](https://api-docs.quran.foundation/docs/quickstart/).

Run the read-only connection check after saving your credentials:

```sh
npm run quran:check
```

It authenticates server-side, fetches Al-Fatihah's seven Arabic verses, validates their order and text, and prints a success summary without credentials or tokens. In production, it also verifies all eight verses of Ash-Sharh, their translations, 27 words, translator notes, and published commentary. It uses the same server-only data module as the topic and reader pages. The official SDK caches OAuth tokens in memory; requests have a 15-second timeout. Validated passage data is cached in server memory for one hour, with concurrent loads shared. Expired data is not used as a fallback. No offline database or build-time content bundle is created. Configuration errors fail before any request. Restart the development server after changing credentials.

Both pre-live and production connections were verified on 9 November 2026. Production successfully returned Al-Fatihah (1:1–1:7) and Ash-Sharh (94:1–94:8). The Hardship & ease topic, context panel, and complete Ash-Sharh reader now display live provider data with attribution and translation protection. Pre-live contains only surahs 1 and 2; use the approved production credentials for Ash-Sharh.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

## Included

- Explore homepage with typo-tolerant topic search and category filters.
- Hardship & ease topic with live 94:5–6 Arabic, Saheeh International translation, contextual word meanings, exact word locations, source panels, and published Ibn Kathir commentary.
- Short Patience and Gratitude reference pages.
- Complete eight-verse Ash-Sharh reader, full-surah context panel, expandable translator notes, and credited Arabic/translation copying.
- Loading and retry screens, with an original-source link when the provider is unavailable.
- Source directory, about page, and not-found page.
- Native accessible dialogs, keyboard navigation, responsive layout, reduced-motion support, and light/dark themes.
- Theme and Arabic font-size preferences stored only in the current browser.
- Locally bundled DM Sans and Amiri Quran fonts; no external font request is needed.

## Content status

This is a local prototype, not a published scholarly resource. Reference links were checked on 9 November 2026. Editorial wording and connections await review. Production Content API access is connected. Public release still needs editorial review, privacy/terms preparation, and a final content-use review. No publisher affiliation is implied.

The live translation is Saheeh International (resource 20). Published commentary is Ibn Kathir (Abridged), by Hafiz Ibn Kathir (resource 169). Their names are checked against the provider resource catalogs. The Clear Quran resource used by the mockup was unavailable in the verified production catalog and is not substituted silently. Word meanings and transliterations come from Quran Foundation, with each occurrence identified by its location. Roots and grammar from the old sample have been removed. The hadith card remains an explicitly labelled editorial summary linking to Sahih Muslim 2999 on Sunnah.com; it is not a live hadith-text integration.

The root metadata deliberately marks the prototype `noindex`. Remove this only after content approval and public-launch preparation. The first topic and its complete-surah reader use live content. Patience and Gratitude remain short reference-led drafts. Navigation across all 114 chapters, audio, accounts, and analytics are not included yet.

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

## Verified first experience

Explore → Hardship & ease → word detail → full-surah context → published commentary → complete reader → back to the topic. No account or saving step is required.

Verified at 1280px and 390px, including light/dark themes, native dialog focus restoration, translation notes, credited copying, and production failure/retry recovery. See [outputs/BUILD_REPORT.md](./outputs/BUILD_REPORT.md) for details and current screenshots.
