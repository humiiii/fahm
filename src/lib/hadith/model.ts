export const HADITH_RECORD_ID = '3298';
export const HADITH_SOURCE_URL = 'https://hadeethenc.com/en/browse/hadith/3298';
export const HADITH_REFERENCE_URL = 'https://sunnah.com/muslim:2999';

export type HadithReading = {
  id: string;
  reference: string;
  arabic: string;
  translation: string;
  explanation: string;
  notes: string[];
  grade: string;
  attribution: string;
  bibliography: string;
  publisher: string;
  sourceUrl: string;
  referenceUrl: string;
  edition: string;
  retrievedAt: string;
};
export type HadithResult = { status: 'ready'; reading: HadithReading } | { status: 'unavailable'; retryAt?: number };

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid publisher record.');
  return value as Record<string, unknown>;
}
function requiredText(value: unknown): string {
  if (typeof value !== 'string' || !value.trim() || /<\/?[a-z][^>]*>/i.test(value)) throw new Error('Incomplete publisher text.');
  return value;
}

export function editionFromDownload(url: string): string {
  const parsed = new URL(url);
  const version = parsed.pathname.match(/^\/downloads\/excel\/HadeethEnc\.com_en-v(\d+\.\d+\.\d+)\.xlsx$/)?.[1];
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'hadeethenc.com' || !version) throw new Error('Publisher edition is unavailable.');
  return `v${version}`;
}

export function normalizeHadith(english: unknown, arabic: unknown, edition: string, retrievedAt: string): HadithReading {
  const en = record(english), ar = record(arabic);
  if (String(en.id) !== HADITH_RECORD_ID || String(ar.id) !== HADITH_RECORD_ID || !/^v\d+\.\d+\.\d+$/.test(edition)) {
    throw new Error('The narration or publisher edition does not match.');
  }
  const bibliography = requiredText(ar.reference);
  if (!/صحيح مسلم[^\n]*\(\s*2999\s*\)/.test(bibliography) || !/Muslim/i.test(requiredText(en.attribution))) {
    throw new Error('The publisher reference does not match Sahih Muslim 2999.');
  }
  const original = requiredText(ar.hadeeth);
  if (requiredText(en.hadeeth_ar) !== original) throw new Error('Arabic and English records do not match.');
  if (!Array.isArray(en.hints) || en.hints.some((item) => typeof item !== 'string')) throw new Error('The publisher notes are incomplete.');
  return {
    id: HADITH_RECORD_ID, reference: 'Sahih Muslim 2999', arabic: original,
    translation: requiredText(en.hadeeth), explanation: requiredText(en.explanation),
    notes: en.hints.map(requiredText), grade: requiredText(en.grade), attribution: requiredText(en.attribution),
    bibliography, publisher: 'HadeethEnc.com', sourceUrl: HADITH_SOURCE_URL,
    referenceUrl: HADITH_REFERENCE_URL, edition, retrievedAt,
  };
}
