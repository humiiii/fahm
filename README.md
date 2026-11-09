# Fahm Atlas

A local Next.js prototype for exploring Islamic topics with source references and contextual word details.

## Run locally

Requires Node.js 22 LTS or a supported newer LTS release.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Next.js, `http://127.0.0.1:3087`.

The development script uses Webpack polling for reliable file watching in this local macOS environment. The production build uses the default Next.js bundler.

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

The root metadata deliberately marks the prototype `noindex`. Remove this only after content approval and public-launch preparation. No live API, full Quran reader, audio player, accounts, or analytics are included yet.

The agreed product scope, stack, API considerations, and roadmap are in [PROJECT_BRIEF.md](./PROJECT_BRIEF.md).

## Source structure

- `src/app`: App Router pages and styling.
- `src/components`: navigation, search, reading controls, and source/word dialogs.
- `src/content`: local topic metadata and editorial MDX.
- `src/lib`: source records, passage data, and topic-search implementation.
- `tests`: meaningful search and reference-integrity checks.

No GitHub repository or deployment has been created.
