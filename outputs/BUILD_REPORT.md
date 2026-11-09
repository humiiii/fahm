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
- Displaying live provider data in the interface, the full Quran reader, audio, offline downloads, accounts, and cross-device synchronization.
- Final name/domain clearance and public hosting.

The prototype stays local and carries `noindex` metadata. No GitHub repository or public deployment was created.

## Recommended next milestone

Review the homepage and first topic interaction with the owner, then refine the design and complete one reviewed topic with approved content sources. Integrate live providers after access and terms are settled.

## Quran Foundation connection — 9 November 2026

- Installed the official `@quranjs/api` SDK (3.17.2) and added a server-only Al-Fatihah fetcher. Credentials are loaded privately from the ignored `.env.local` file; the module validates the environment and scope mode before making a request.
- `npm run quran:check`: authenticated successfully against pre-live and fetched all seven Arabic verses, ordered 1:1 through 1:7. No secrets, tokens, or fetched content were persisted by the check.
- `npm run typecheck`: passed. `npm test`: all eight tests passed, including provider host pairing, explicit legacy scope configuration, and invalid configuration rejection.
- `npm run build -- --webpack`: passed. The default Turbopack build hit a local worker port-permission error, including on an escalated retry; the build script remains unchanged.
- The interface still uses the original local sample content. Live reader rendering, translations, and production approval are separate next steps. Pre-live cannot supply the Ash-Sharh topic excerpt.

## Production access verification — 9 November 2026

- The owner configured production credentials locally after the Console showed the required Content permissions as granted.
- `npm run quran:check` succeeded against production: seven Arabic verses for Al-Fatihah (1:1–1:7) and eight for Ash-Sharh (94:1–94:8). Both responses were checked for complete verse counts, order, and nonempty Arabic text.
- Extended the reusable server module and connection check to verify Ash-Sharh when production is selected. Pre-live checks continue to request only Al-Fatihah.
- `npm run typecheck` and all eight existing tests passed. No UI changes were made; the interface still displays its local preview content.
- Credentials remain in the ignored `.env.local`; no secrets, tokens, or API response content were added to Git.
