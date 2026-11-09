# Fahm Atlas — Project Brief

Updated: 9 November 2026  
Status: first local prototype implemented on 9 November 2026; validation and editorial review are in progress. See README.md for the actual implemented scope.  
Proposed working name: **Fahm Atlas**. Fahm (فهم) means understanding; Atlas suggests exploring connected topics and sources. The name remains provisional pending domain and trademark checks. The app project folder is `fahm`.

## 1. What we are building

A simple, beautiful, fast website for exploring Islamic topics, concepts, and everyday questions through clearly attributed sources.

People start with something they want to understand—hardship and ease, gratitude, forgiveness, patience, or tawakkul—and find relevant Quran passages, hadith, word explanations, and published scholarly explanations together.

The main experience is **Explore**. A Quran reader is included as a supporting section. Users can open a topic and understand the material immediately, without creating an account, saving verses, writing notes, or constructing their own collections.

The intended journey is:

**Find a topic → read a clear introduction → inspect the sources and context → explore a word or related topic.**

## 2. Decisions already made

| Area | Decision |
| --- | --- |
| Main product | Islamic topic and concept exploration |
| Supporting product | Quran reading, translation, tafsir, search, and audio |
| Understanding feature | Automatically assemble relevant, reviewed material for each topic or passage |
| User effort | No required saving, collection creation, account, or note taking |
| Visual direction | The approved editorial reader mockup: restrained typography, clear hierarchy, neutral surfaces, blue interactions |
| Framework | Next.js App Router with TypeScript |
| Styling | Tailwind CSS with custom design tokens |
| Motion | Motion for React, previously Framer Motion |
| Icons | Lucide React |
| Hosting | Vercel, subject to plan eligibility and usage limits |
| Initial content | MDX for editorial material and structured JSON for metadata and references |
| Initial topic search | Fuse.js over a small, controlled topic index |
| Scrolling | Native scrolling by default; Lenis remains optional |
| Personal storage | Browser storage initially; accounts and cross-device synchronization are later decisions |

The earlier user-created “Threads” feature has been dropped. Topic connections are supplied by the product. There is no requirement for the owner to teach classes or prepare lessons.

## 3. Who the first version serves

Working audience hypothesis: English-speaking Muslims who want a clear starting point for understanding a concept and checking the material behind an explanation.

Arabic remains available for Quran and hadith material. An Urdu interface and Urdu explanations are possible later, but a full multilingual launch has not been agreed.

This audience needs validation. Avoid designing simultaneously for scholars, children, teachers, memorization students, and every language community.

## 4. Main sections and navigation

Suggested primary navigation: **Explore · Quran · Search**. Optional saved items can be added without becoming a prerequisite for the experience.

| Route | Purpose |
| --- | --- |
| `/` | Explore homepage: search, topic categories, a small selection of topics, and a clear starting point |
| `/topics` | Complete topic directory with useful category filters |
| `/topics/[slug]` | Main topic experience, combining explanations and references |
| `/terms/[slug]` | Reusable explanations of important terms; optional for the first release |
| `/quran` | Surah and juz navigation, search, and continue reading |
| `/quran/[surah]` | Supporting Quran reader with direct verse links |
| `/search` | Search topics and terms initially; expand source search separately |
| `/sources` | Publishers, editions, translators, permissions, and attribution information |
| `/about` | Purpose, editorial approach, and corrections process |
| `/privacy` and `/terms` | Actual privacy practices and applicable application terms |

These are proposed route names, not an implemented route map.

## 5. The main feature: Explore

### Topic page contents

1. A precise title and a short, sourced introduction.
2. Relevant Quran passages with Arabic, a named translation, and references.
3. Access to the surrounding passage or complete surah.
4. Relevant hadith with collection, reference, translator where available, and attributed grading where supplied.
5. Plain-language definitions of important Arabic terms.
6. Published scholarly explanations with author and source links.
7. A small set of related topics, each with an explanation of the connection.
8. Visible source information, review date, and a way to report an error.

A topic does not need every kind of material. Show a small relevant selection rather than filling every section with loosely connected quotations.

### Example: Hardship & ease

The first topic should demonstrate:

- Ash-Sharh 94:5–6, with a route to the whole surah.
- Word exploration for the Arabic words associated with hardship and ease.
- An attributed tafsir or published explanation that preserves the passage’s context.
- A small number of additional references, selected and reviewed for relevance.
- A link to a related topic such as patience, with the relationship explained.

The reference selection and explanatory wording still need content review. The mockup is an interface example, not an approved scholarly treatment of the topic.

### What “automatic” means

The software retrieves and arranges content using topic IDs, verse references, term IDs, and reviewed relationships. It does not require users to save anything first.

At launch, topic relationships should be curated and reviewed. We can render these automatically without generating religious explanations on demand.

Distinguish these relationships explicitly:

| Relationship | Meaning |
| --- | --- |
| Same word | The relevant word occurs in another passage |
| Same root | Words share an Arabic root; this alone does not establish identical meaning |
| Same passage | Material is part of the surrounding textual context |
| Related theme | A reviewed thematic connection, supported by a named source or editorial rationale |

The reader may offer “Explore this passage” when a reviewed topic connection exists. Do not pretend that every verse already has an explanation or topic mapping.

## 6. Supporting Quran reader

### First reader milestone

- Open a chapter and navigate its verses.
- Display accurate Arabic and one named translation.
- Play a supported recitation with clear loading and error states.
- Offer play once, repeat the selected verse, and continue playback.
- Open available word meanings, sources, and tafsir.
- Remember reading position and display preferences locally.
- Work comfortably on mobile and with a keyboard.

The first connected build can use Al-Fatihah. The first Explore demonstration also needs Ash-Sharh; Quran Foundation’s pre-live access alone does not provide that surah, so use approved production access or a separately permitted source.

### Initial public-release target

- All 114 surahs, with usable surah/juz navigation.
- Translation and sourced tafsir where the selected provider supplies them.
- Reliable verse playback and consistent repeat controls.
- Search with tested Arabic spelling normalization and a clear distinction between exact and flexible matching where supported.
- Optional bookmarks, resume reading, typography controls, and dark mode.

Verify word-level timing availability for each reciter before offering synchronized word highlighting. Verse-level playback and highlighting are an acceptable first implementation.

### Later improvements

Offline downloads, more reciters and languages, independent auto-scroll, alternating Arabic/translation audio, and richer listening sessions are possible enhancements. They should follow a successful topic experience and a reliable basic reader.

## 7. UI and UX specification

### Approved visual foundation

The approved reader reference is:

[Editorial reader mockup](/Users/umaidrather/.codex/visualizations/2026/11/08/01a1ba1a-d266-7cb0-94aa-2f169b98fe97/quran-editorial-reader.html)

The older hardship/ease concept is preserved here for understanding the topic interaction, rather than as the visual specification:

[Earlier exploration mockup](/Users/umaidrather/.codex/visualizations/2026/11/08/01a1ba1a-d266-7cb0-94aa-2f169b98fe97/quran-threads-preview.html)

The reader’s visual direction is approved. The Explore homepage and expanded topic page still need to be designed using that foundation. The mockup contains sample content and local interactions; it is not a production application or a live API integration.

### Visual principles

- Neutral light and dark surfaces, charcoal text, and restrained blue accents.
- Clear typographic hierarchy, fine separators, and purposeful whitespace.
- DM Sans for interface text and Amiri Quran for Arabic as the current mockup baseline; verify font licensing, glyph coverage, and rendering before shipping.
- Comfortable text columns; Arabic and translation have independently adjustable sizes.
- Minimal decorative cards, restrained corner rounding, and recognizable controls.
- Sources stay close to the content they support.
- Motion explains a panel opening or a state change; reading content remains stable.
- Avoid oversized marketing slogans, decorative gradients, excessive glass effects, and animation on every scroll.

### Homepage

Lead with search and a small number of understandable topics. Use a useful topic directory rather than an endless personalized feed. Give the Quran section a clear navigation entry without making the homepage a surah index.

### Topic page

On desktop, use a main reading column with a secondary panel for definitions and source detail. On mobile, use a single reading column and an accessible expandable panel or sheet. Preserve the reader’s position when opening and closing details.

Expose the introduction and the strongest references immediately. Expand longer commentary on demand. Show the source type—Quran, hadith, translation, or commentary—so readers can distinguish primary text from explanation.

### Reader

Retain Read and Study views from the approved mockup. Tapping a word opens its meaning; grammar and root details are secondary. Keep playback controls visible and consistent between modes.

### Accessibility and states

- Semantic headings, keyboard access, visible focus, labelled icon buttons, and usable touch targets.
- Correct Arabic language and direction attributes; test mixed Arabic/English references.
- Respect reduced motion and support comfortable contrast and text resizing.
- Provide understandable loading, empty-search, missing-audio, and failed-request states.
- Optional features never block reading or exploring.
- Native scrolling is the baseline. Trial Lenis only where it measurably helps; test anchors, nested panels, mobile, and reduced-motion behaviour.

### References studied

- [GradientDeck: MUBI Notebook](https://ui.gradientdeck.com/styles/mubi-notebook): editorial hierarchy and restrained controls.
- [GradientDeck: Making Software](https://ui.gradientdeck.com/styles/making-software): technical book layout, small labels, and fine rules.
- [Awwwards typography](https://www.awwwards.com/websites/typography/): typography-led composition.
- [21st.dev](https://21st.dev/): interaction and component references.
- [Land-book](https://land-book.com/): editorial layout references.
- Pinterest was only partially inspectable because of its login overlay; it was not comprehensively reviewed.

Use these as references, with original implementation and an identity suited to the product.

## 8. Technical stack and architecture

| Layer | Choice | Implementation guidance |
| --- | --- | --- |
| Application | Next.js App Router + TypeScript | Render public topic content on the server or ahead of requests so it is available without waiting for client JavaScript |
| Styling | Tailwind CSS + custom CSS variables | Centralize colours, spacing, typography, widths, and light/dark themes |
| Animation | Motion, imported from `motion/react` | Small client components for transitions and interactive panels |
| Icons | `lucide-react` | Import individual icons and provide accessible labels |
| Scroll | Native; Lenis optional | Reading should work well before custom smoothing is introduced |
| Editorial content | MDX | Own or appropriately licensed editorial material, with review metadata |
| Structured content | JSON + TypeScript types | Topics, aliases, relationships, and source references; add validation as the schema settles |
| Topic search | Fuse.js | Titles, descriptions, tags, aliases, and term names; not a substitute for semantic search or a complete Quran search engine |
| API/backend | Next.js server code and Route Handlers | Keep credentials server-side; normalize responses and handle timeouts and quotas |
| Hosting | Vercel | GitHub deployments, preview URLs, production environment settings |
| Local preferences | Browser storage | Reading position, theme, sizes, and optional bookmarks; no cross-device sync initially |
| Database/auth | Deferred | Select when saved accounts or editorial collaboration require them; Supabase/Postgres remains an option, not a commitment |

Basic flow:

```text
Topic content + reviewed relationships
                  |
                  v
         Next.js public pages
                  |
       +----------+-----------+
       |                      |
Topic search index     Server-side content adapters
                              |
                  Approved Quran/hadith providers
```

Store stable references to provider content rather than assuming API responses can be kept permanently in MDX, JSON, build bundles, or a database. Provider-specific retention rules apply to server caches, static generation, search indexes, and offline copies too.

Use Node.js LTS, Git, and one package manager consistently. Pin tested dependency versions and commit the lockfile when implementation begins.

Official technical references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [MDX](https://nextjs.org/docs/app/guides/mdx), [Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route), [Motion](https://motion.dev/docs/react), [Lucide](https://lucide.dev/guide/react), [Fuse.js](https://www.fusejs.io/), and [Lenis](https://github.com/darkroomengineering/lenis).

## 9. Minimum content model

| Record | Essential information |
| --- | --- |
| Topic | ID, slug, title, description, category, aliases, language, introduction, references, related topic IDs, review status/date |
| Source | ID, publisher, author, edition/translator, canonical URL, attribution, permitted uses, retention rules, rights-check date |
| Reference | Source ID, record ID or verse/hadith locator, passage range, relation type, relevance rationale |
| Term | Arabic text, transliteration, contextual meaning, linguistic source, optional root/grammar, related references |
| Hadith reference | Collection, book/reference identifiers, numbering scheme, translation source, grading and grader where supplied |
| Review | Reviewer identity or role, review scope, date, status, corrections |

Content publication should distinguish draft, reviewed, and published states. Do not put unresolved sample material into public pages as though it had been approved.

## 10. APIs, content access, and usage terms

Access and rights are separate decisions. Free access does not establish permission for every translation, recording, redistribution, or permanent offline copy.

| Source | Potential use | Current implementation decision |
| --- | --- | --- |
| [Quran Foundation](https://api-docs.quran.foundation/) | Quran, translations, tafsir, audio, word data | Preferred integration; register a developer app and request production permissions |
| [QuranEnc](https://quranenc.com/en/home/api/) | Published translations | Alternative to evaluate; preserve publisher attribution, versioning, and applicable terms |
| [Tanzil](https://tanzil.net/docs/Text_License) | Arabic text download | Alternative with its own text licence; preserve text and notices; this does not license unrelated translations |
| [Quranic Arabic Corpus](https://corpus.quran.com/download/) | Roots and morphology | Evaluate its supplied licence and conditions before integrating or redistributing data |
| [Sunnah.com](https://sunnah.com/developers) | Hadith references and available API records | API key required; documentation says the API exposes a portion of its data. Confirm permission and coverage before committing |
| [HadeethEnc](https://hadeethenc.com/en/home) | Translated hadith and explanations | Candidate with a developer API; confirm current reuse, translation, and commercial terms |
| Scholarly publishers | Introductions and explanations | Link to originals or use material with established permission; public availability alone is insufficient |

### Quran Foundation constraints to implement

- Keep credentials on the server; protect Quran text and preserve context and attribution.
- Ordinary API content caching is limited to one week. Supported offline resources must use Content Sync and synchronize at least every seven days when connectivity permits; resume promptly after an outage.
- Sync permission does not itself authorize distributing a prepackaged content database. Recording rights require separate consideration.
- Paid end-user applications are allowed subject to the terms; raw-content redistribution requires separate written permission.
- Publish the required privacy policy and application terms.

Read the [developer terms](https://api-docs.quran.foundation/legal/developer-terms/) before implementing storage or distribution. [The FAQ](https://api-docs.quran.foundation/docs/tutorials/faq/) states that pre-live content is limited to surahs 1 and 2; obtain production access for the full Quran.

Provider selection and hadith/commentary permissions remain open work. No API approvals or publisher permissions have been obtained during this conversation.

## 11. Evidence from Quran.com’s GitHub

These findings concern its public frontend repository. They are useful inputs for the supporting reader; they do not establish an unmet market for the broader Islamic explorer. Issues are user reports and requests, not independently reproduced live-site failures.

| Evidence | Product implication |
| --- | --- |
| [#3262: simpler verse repeat](https://github.com/quran/quran.com-frontend-next/issues/3262) | Make repeat available beside the selected verse |
| [#3349: Study Mode repeat controls](https://github.com/quran/quran.com-frontend-next/issues/3349) | Keep controls consistent across reading contexts |
| [#3342: Arabic search normalization](https://github.com/quran/quran.com-frontend-next/issues/3342) | Test normal keyboard spellings, Uthmani forms, and preview/result consistency |
| [#3322: reading accessibility](https://github.com/quran/quran.com-frontend-next/issues/3322) | Offer optional font, spacing, width, and contrast preferences |
| [#3297: auto-scroll without audio](https://github.com/quran/quran.com-frontend-next/issues/3297) | Consider independent auto-scroll later |
| [Production cache configuration](https://github.com/quran/quran.com-frontend-next/blob/production/pwa-runtime-config.js) | Its MP3 cache rule is commented out after playback errors; test offline audio deliberately |

Do not count every open issue as an unfixed problem. The pause-label issue has an [open proposed fix](https://github.com/quran/quran.com-frontend-next/pull/3352); [#3347](https://github.com/quran/quran.com-frontend-next/issues/3347) has a comment reporting the contrast issue appears fixed. [#3317](https://github.com/quran/quran.com-frontend-next/issues/3317) originally reported 26 missing clips, but later comments reported 19 repaired and seven remaining at that check.

Source-code visibility does not establish permission to copy the project. Build the original interface and check any reused code’s actual licence.

## 12. Is this a good idea?

**Assessment: a worthwhile, focused prototype; an unvalidated business opportunity.**

The concept has a clear use: helping someone move from a question or concept to understandable material and inspectable sources. The design can support that with low friction, and a useful first version is technically achievable without expensive AI infrastructure.

The broad category already exists. [Yaqeen’s topic-based reading library](https://yaqeen-web.yaqeen.io/read) and [HadeethEnc’s categorized hadith material](https://hadeethenc.com/en/home) demonstrate overlap. Quran.com also provides extensive study tools. Topic browsing, Quran access, and attractive design alone do not establish uniqueness.

The advantage to test is the combination of:

1. Finding a relevant topic quickly.
2. Understanding a concise introduction without losing access to detail.
3. Inspecting the exact sources and surrounding context.
4. Opening word explanations and related topics without losing one’s place.

The hardest ongoing work will be source selection, permissions, and careful editorial review. An API can deliver records; it does not automatically establish which records belong together or how to explain them responsibly.

The owner can focus on software rather than teaching. Content review still needs an appropriate contributor or collaborator. A smaller reviewed library is a better first milestone than a large automatically assembled library whose connections have not been checked.

Validate both usability and repeat usefulness. People saying a page looks attractive is insufficient evidence that they will return or replace part of their current workflow. Monetization and demand have not yet been established.

## 13. Build order and acceptance criteria

### Phase 0 — Foundations

- [ ] Keep the name provisional and create the GitHub repository and Vercel project.
- [ ] Apply for Quran Foundation access; evaluate hadith and commentary sources.
- [ ] Identify the first audience and initial interface language.
- [ ] Establish content fields, source requirements, and the review workflow.
- [ ] Adapt the approved visual system into a homepage and topic-page design.

Done when the first topic has a concrete layout and an attainable source plan.

### Phase 1 — One complete experience

- [ ] Scaffold Next.js, TypeScript, Tailwind, Motion, and Lucide.
- [ ] Build the Explore homepage and Hardship & ease topic page.
- [ ] Implement source details, word explanations, passage context, and related-topic navigation.
- [ ] Connect the relevant Quran passage using an approved source.
- [ ] Make the flow work on mobile and with a keyboard.

Done when a visitor can move from the homepage to a topic, inspect a source, open context, and return without an account or a saving step.

### Phase 2 — Test with people

- [ ] Ask five intended users to explore the same topic using this prototype and their current preferred sources.
- [ ] Observe whether they can find the topic and identify a source without guidance.
- [ ] Ask what is clearer, what is missing, and what they would return for.
- [ ] Ask which source or workflow they would still use alongside the product.
- [ ] Revise the flow using observed difficulties.

Suggested decision rule, not a validated market benchmark: continue expanding when most participants complete the core flow independently and can name a concrete reason to use it again. Otherwise improve the experience before increasing scope.

### Phase 3 — Small public release

- [ ] Publish roughly five reviewed topics, with quantity adjusted to available review capacity.
- [ ] Add topic search and a usable topic directory.
- [ ] Complete the supporting Quran reader with essential controls.
- [ ] Add source credits, corrections, privacy, terms, metadata, and sitemap.
- [ ] Verify API failure handling, quotas, content refresh, and credential protection.
- [ ] Deploy a public version on an eligible hosting plan.

Done when published content is reviewed, all exposed features work, and users can reliably understand and inspect the material.

### Phase 4 — Expand based on evidence

Potential additions: Urdu, offline reading/audio, broader topic coverage, better search, more reciters, optional accounts, and cross-device preferences. Prioritize requests from actual use rather than adding all of these automatically.

## 14. Quality and performance requirements

- Public topic titles, explanations, and source links are indexable and readable without waiting for interactive widgets.
- Use meaningful page titles, descriptions, canonical URLs, sitemap, and only appropriate structured data.
- Load interactive panels and search code when needed; avoid making the whole site a client-rendered application.
- Fetch source material with explicit refresh and error handling; apply provider rules to every cache layer.
- Test Arabic characters, diacritics, verse references, translation attribution, and mixed-direction layout.
- Test search using actual topic queries and alternate spellings, rather than only exact title matches.
- Test audio repeat, verse changes, interruption, resume, unavailable files, and supported mobile playback behaviour.
- Test keyboard focus and screen-reader names when opening and closing panels.
- Measure performance on a representative mobile device and slower connection before setting stronger speed claims.
- Use focused automated checks for source references, content schema, search, and important playback/state behaviour as those features are implemented.

## 15. Cost and accounts

Required accounts: GitHub, Vercel, and approved content-provider accounts where applicable. Local development needs Node.js LTS, Git, a package manager, and an editor.

Open-source development tools can support a prototype with no additional software subscription. Hosting, content permission, reviewer time, and domain costs are separate decisions.

[Vercel Hobby](https://vercel.com/docs/plans/hobby) is for personal, non-commercial use and has usage limits. Use an eligible plan for the prototype; assess Pro or alternative hosting before a commercial launch. Do not assume a commercial product can remain on Hobby because its initial traffic is small.

A custom domain is optional initially. Paid AI services, managed search, a database, and authentication are not needed for the first topic prototype. Budget for content review if it cannot be contributed.

## 16. Immediate next steps

1. **Set up accounts and access:** GitHub, Vercel, Quran Foundation, and the chosen hadith-source application process.
2. **Prepare one topic:** Hardship & ease, with a small set of references, source permissions, and a reviewer.
3. **Design the missing pages:** Explore homepage and topic detail, using the approved reader’s visual language.
4. **Implement one complete flow:** discovery → explanation → source → context → related topic.
5. **Test with five people:** improve the flow before building a large library or advanced reader features.

Keep the working name provisional. The next important result is a usable, sourced topic experience.

## 17. Open decisions

- Final brand and domain.
- Exact initial audience and language coverage.
- Which hadith and commentary sources have suitable access and reuse terms.
- Who reviews introductions, term explanations, and thematic relationships.
- Whether any publisher requires permission for excerpts or summaries.
- Commercial intent and the appropriate hosting plan.
- Which features users actually value enough to return for.

This brief is the implementation starting point. It records the current direction and distinguishes agreed choices, proposed details, and unresolved dependencies.


## Implementation update — 9 November 2026

The first local build now includes the Explore homepage, fuzzy topic search and filters, a developed Hardship & ease page, shorter Patience and Gratitude pages, source and contextual-word panels, a two-verse Quran reader preview, Sources and About pages, light/dark themes, and responsive layouts. Editorial content remains a draft. Full Quran navigation, audio, live API integrations, provider approvals, and public deployment are not included in this milestone.
