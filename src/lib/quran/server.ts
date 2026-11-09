import 'server-only';
import { createServerClient, type ServerClient } from '@quranjs/api/server';
import { readQuranConfig } from './config';

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
