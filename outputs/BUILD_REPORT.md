# Fahm — First local build

Date: 9 November 2026

The sections below retain the initial prototype record. The latest milestone is **Full hadith and workflow** at the end of this report. Earlier status statements are retained as historical records.

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

## One complete live experience — 9 November 2026

The current flow is Explore → Hardship & ease → word detail → complete-surah context → published commentary → full reader → back to the topic. No account, saving, or collection step is required.

### Live content and behavior

- Production Quran Foundation data replaces the bundled sample Arabic, translations, and word definitions. Topic verses are 94:5–6; the context panel and reader include all eight verses of Ash-Sharh.
- Saheeh International (resource 20) is credited from the live resource catalog. The Clear Quran resource used in the mockup was not present in the verified catalog. The app does not label the new translation as the old one.
- Each of the 27 words has its own verse/position location, supplied Arabic text, contextual translation, and transliteration. The sample root and grammar descriptions were removed rather than presented as API data.
- Ibn Kathir (Abridged), by Hafiz Ibn Kathir (resource 169), opens in the source panel with the published explanation. Publisher HTML is sanitized on the server; Quran and publisher-content containers disable browser translation.
- Two translator notes are fetched from the Footnote API and available beside their translations. Copying includes Arabic, the translation, any notes, the translator credit, and the original verse URL.
- Validated content is shared across concurrent requests and cached only in server memory for one hour. Requests time out after 15 seconds. Failures show a retry action and a Quran.com link; samples are not served as a fallback.
- Topic routes render at request time. The earlier static-params setup caused a production-only rendering failure and was removed before verification.

### Verification

- `npm run quran:check`: passed against production with 8 translations, 27 words, and published commentary; footnote association is validated during loading.
- `npm run typecheck`: passed. All 11 current tests passed, including missing-data rejection, source association, unsafe HTML removal, and translator-note preservation.
- `npm run build -- --webpack`: passed. The default build command is unchanged; Webpack remains the verified option for this local environment.
- Browser-tested Explore-to-topic navigation, both occurrences of ease, word-by-word mode, resizing, full-surah context, commentary, reader navigation, translator-note expansion, and copying with correct credits and notes.
- Native Escape closes the panel and restores focus to the triggering word. Opening another detail focuses the close control.
- Checked 1280px and 390px widths with no horizontal overflow. The mobile sheet fits 390px; light and dark themes were inspected.
- Tested the production build on an isolated local server using dummy credentials: it showed the safe failure screen. After restoring the normal configuration, clicking **Try again** recovered to the live topic without reloading the browser. A separate check verified recovery from missing configuration and shared concurrent loads.

Current screenshots: [desktop topic](./live-topic-desktop.png), [mobile reader](./live-reader-mobile.png), [mobile word panel](./live-word-mobile.png).

### Remaining limits

The hadith card is an attributed editorial summary with an original-source link. Patience and Gratitude are short reference-led drafts. Editorial introductions and thematic relationships await qualified review. Full-Quran navigation, audio, offline support, public privacy/terms pages, and deployment are outside this milestone. No GitHub remote or public deployment was created.


## Full hadith and workflow - 10 November 2026

### Completed

- The Muslim 2999 source panel now opens the full Arabic narration, English translation, publisher grade, explanation, four notes, and Arabic bibliography. HadeethEnc.com record 3298 is the live source; Sunnah.com remains a separate collection cross-reference.
- Both language records must identify the same narration and match Arabic text. The Arabic bibliography must reference Muslim 2999. Missing content, mismatched records, unsupported markup, or missing edition metadata produce an unavailable result rather than substitute text.
- The panel fetches independently when opened. Quran reading is not delayed by a hadith-source failure. It includes loading, manual retry, provider cooldown, and an external-source alternative.
- Publisher edition and source credits accompany the reading and copied narration. Current English edition v1.25.0 was verified through the publisher's release redirect. The API does not expose a per-record revision; the UI labels this as an English edition.
- Added the source to the directory, updated source/privacy explanations, and prepared `docs/HARDSHIP_REVIEW.md` with explicit pending review and five-person study tasks.
- Created and visually checked `output/pdf/Fahm-workflow.pdf`, a one-page graph of discovery, both reading paths, source inspection, return navigation, related topics, and failure recovery. Regenerate with `scripts/create-workflow.py` using Python with ReportLab.

### Verification

- All 15 automated tests passed. New checks cover publisher-text preservation, bilingual identity, collection reference, edition validation, fixed credential-free endpoints, HEAD-only edition metadata, upstream failures, and Retry-After.
- `npm run hadith:check` passed against the live publisher. Metadata only was printed; no publisher text was persisted by the check.
- `npm run typecheck`, `git diff --check`, and `npm run build -- --webpack` passed.
- A separate production preview returned 200 for the hadith endpoint, Hardship & ease, the complete reader, Sources, and About. The hadith endpoint returned `Cache-Control: no-store`, record 3298, current publisher edition, and four notes.
- Browser verified the built topic's complete narration, word-to-context path, published commentary, and all-eight-verse reader. The reader's return link remained available.
- Desktop 1280px and mobile 390px inspected; mobile document and dialog width both 390px with no horizontal overflow. Light and dark themes were inspected. Publisher explanation and bibliography expand correctly.
- Copied text was read back and checked for the grade, publisher, edition, publisher URL, and separate collection URL. Escape closes the panel and returns focus to the triggering card.
- Hadith transport failures and cooldowns were unit-tested; the new hadith-specific unavailable panel was not forced through a browser outage simulation. Quran production failure/retry was tested in the prior milestone. This is not an exhaustive cross-browser or assistive-technology audit.

Screenshots: [desktop hadith panel](./hadith-desktop.png), [mobile hadith panel](./hadith-mobile.png).

### Remaining human work

Qualified editorial review and the five-person usability study have not happened. The interface still labels editorial introductions and thematic links as drafts. Patience and Gratitude remain short reference-led pages. Audio, all-chapter navigation, public launch preparation, and deployment remain future work. No GitHub remote or public deployment was created. The user's existing development server is preserved; the temporary production QA server is stopped after verification.
