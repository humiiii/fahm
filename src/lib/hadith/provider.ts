import { editionFromDownload, normalizeHadith, type HadithResult } from './model';

function retryAt(response: Response): number | undefined {
  const value = response.headers.get('retry-after');
  if (!value) return undefined;
  const milliseconds = /^\d+$/.test(value) ? Date.now() + Number(value) * 1000 : Date.parse(value);
  return Number.isFinite(milliseconds) && milliseconds > Date.now() ? milliseconds : undefined;
}

// Public publisher endpoints only. No Quran Foundation credentials are passed here.
export async function requestHadith(fetcher: typeof fetch = fetch): Promise<HadithResult> {
  try {
    const options = { cache: 'no-store' as const, signal: AbortSignal.timeout(15_000) };
    const responses = await Promise.all([
      fetcher('https://hadeethenc.com/api/v1/hadeeths/one/?language=en&id=3298', options),
      fetcher('https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=3298', options),
      fetcher('https://hadeethenc.com/en/browse/download/en', { ...options, method: 'HEAD' }),
    ]);
    const delayed = responses.filter((response) => !response.ok).map(retryAt).filter((value): value is number => value !== undefined);
    if (responses.some((response) => !response.ok)) return { status: 'unavailable', ...(delayed.length ? { retryAt: Math.max(...delayed) } : {}) };
    const [english, arabic] = await Promise.all([responses[0].json(), responses[1].json()]);
    return { status: 'ready', reading: normalizeHadith(english, arabic, editionFromDownload(responses[2].url), new Date().toISOString()) };
  } catch {
    return { status: 'unavailable' };
  }
}
