# Fahm — First local build

Date: 9 November 2026

## Implemented

- Next.js App Router, TypeScript, Tailwind, Motion, Lucide, MDX, and Fuse.js.
- Explore homepage with topic search, suggestions, category filters, and honest empty results.
- Developed Hardship & ease topic; shorter Patience and Gratitude reference pages.
- Word meanings, Arabic roots, grammatical labels, source inspection, and contextual reading in native dialogs.
- Supporting Ash-Sharh 94:5–6 reader with Read/Word by word modes, text resizing, and a translation/reference copy control.
- Sources directory, About page, search page, Quran preview entry, and not-found handling.
- Responsive light/dark design, keyboard focus management, reduced-motion support, and local preferences.
- Fonts bundled locally with their licences in `public/licenses/`.

## Validation

- `npm run typecheck`: passed.
- `npm test`: five tests passed, covering common concept aliases, typo tolerance, Arabic diacritic normalization, category filtering, missing results, reference integrity, and the passage word sequence.
- `npm run build`: passed, including static topic generation and TypeScript validation.
- HTTP checks: all implemented page routes returned 200; an unknown route returned 404.
- Browser checks in the Codex in-app browser: topic search, no-results recovery, category filtering, homepage-to-topic navigation, source inspection, word-to-context navigation, reader navigation, and Word by word mode.
- Inspected 1280px and 390px layouts. The tested mobile topic and reader layouts had a 390px document width with no horizontal overflow.
- Verified that Escape closes the detail dialog and returns focus to its trigger. Switching from a word to its context moves focus to the panel’s close control.

This is not an exhaustive cross-browser audit. Full keyboard/screen-reader testing on multiple platforms, live API failures, and audio playback remain future work.

## Screenshots

- [Explore homepage](./explore-preview.png)
- [Mobile word-detail sheet](./word-detail-preview.png)

## Run locally

From `/Users/umaidrather/Desktop/fahm`:

```sh
npm run dev
```

Open `http://127.0.0.1:3087`. Dependencies are already installed. The development command uses Webpack polling to avoid a native file-watcher failure observed in this macOS environment. Port 3087 avoids interfering with another project on port 3000.

The temporary QA server is stopped after verification. Start it with the command above when reviewing the app.

## Deliberately unfinished

- Editorial and scholarly review of introductions, definitions, and thematic connections.
- Provider access and appropriate reuse permissions before public release.
- Live APIs, the full Quran reader, audio, offline downloads, accounts, and cross-device synchronization.
- Final name/domain clearance and public hosting.

The prototype stays local and carries `noindex` metadata. No GitHub repository or public deployment was created.

## Recommended next milestone

Review the homepage and first topic interaction with the owner, then refine the design and complete one reviewed topic with approved content sources. Integrate live providers after access and terms are settled.
