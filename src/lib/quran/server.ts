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

export async function getAlFatihah() {
  const verses = await getQuranClient().content.v4.verses.byChapter('1', {
    fields: { textUthmani: true },
    words: false,
    perPage: 7,
    page: 1,
  });
  if (verses.length !== 7 || verses.some((verse, index) =>
    verse.verseKey !== `1:${index + 1}` || !verse.textUthmani?.trim(),
  )) {
    throw new Error('The provider did not return the complete Al-Fatihah passage.');
  }
  return verses.map((verse) => ({ key: verse.verseKey, arabic: verse.textUthmani! }));
}
