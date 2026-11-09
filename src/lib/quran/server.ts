import 'server-only';
import { createServerClient, type ServerClient } from '@quranjs/api/server';
import { readQuranConfig } from './config';
import { footnoteIds, normalizeAshSharh, TRANSLATION_ID, TAFSIR_ID, type LivePassage } from './passage';

let client: ServerClient | undefined;

// Reusing the SDK client preserves its in-memory OAuth token cache.
function getQuranClient() {
  client ??= createServerClient({
    ...readQuranConfig(process.env),
    fetch: (input, init) => fetch(input, {
      ...init,
      cache: 'no-store',
      signal: AbortSignal.any([
        ...(init?.signal ? [init.signal] : []),
        AbortSignal.timeout(15_000),
      ]),
    }),
  });
  return client;
}

async function getChapterPassage(chapter: '1' | '94', verseCount: number) {
  const verses = await getQuranClient().content.v4.verses.byChapter(chapter, {
    fields: { textUthmani: true },
    words: false,
    perPage: verseCount,
    page: 1,
  });
  if (verses.length !== verseCount || verses.some((verse, index) =>
    verse.verseKey !== `${chapter}:${index + 1}` || !verse.textUthmani?.trim(),
  )) {
    throw new Error('The provider did not return the complete requested chapter.');
  }
  return verses.map((verse) => ({ key: verse.verseKey, arabic: verse.textUthmani! }));
}

export const getAlFatihah = () => getChapterPassage('1', 7);
export const getAshSharh = () => getChapterPassage('94', 8);

let passageCache: { value: LivePassage; expiresAt: number } | undefined;
let pendingPassage: Promise<LivePassage> | undefined;

export async function getAshSharhExperience(): Promise<LivePassage> {
  if (passageCache && passageCache.expiresAt > Date.now()) return passageCache.value;
  if (pendingPassage) return pendingPassage;
  const request = (async () => {
    try {
      const api = getQuranClient().content.v4;
      const [verses, translations, tafsirs] = await Promise.all([
        api.verses.byChapter('94', {
          language: 'en', words: true, wordFields: { textUthmani: true, location: true },
          fields: { textUthmani: true }, translations: [TRANSLATION_ID], tafsirs: [TAFSIR_ID],
          translationFields: { resourceName: true }, perPage: 8, page: 1,
        }),
        api.resources.translations.list({ language: 'en' }),
        api.resources.tafsirs.list({ language: 'en' }),
      ]);
      const noteIds = [...new Set(verses.flatMap((verse) => footnoteIds(verse.translations?.find((item) => item.resourceId === TRANSLATION_ID)?.text ?? '')))];
      const notes = await Promise.all(noteIds.map(async (id) => {
        const response = await api.raw.getFootNote({ path: { id } }) as { footNote?: { text?: string } };
        if (!response.footNote?.text) throw new Error('A translator footnote is unavailable.');
        return [id, response.footNote.text] as const;
      }));
      const value = normalizeAshSharh(verses, translations.find((item) => item.id === TRANSLATION_ID), tafsirs.find((item) => item.id === TAFSIR_ID), Object.fromEntries(notes));
      // Strict one-hour in-memory lifetime. Expired content is never served on failure.
      passageCache = { value, expiresAt: Date.now() + 60 * 60 * 1000 };
      return value;
    } catch {
      // Do not forward upstream SDK errors, which can include provider response bodies.
      throw new Error('The live passage is temporarily unavailable. Please try again.');
    }
  })();
  pendingPassage = request;
  try {
    return await request;
  } finally {
    if (pendingPassage === request) pendingPassage = undefined;
  }
}
