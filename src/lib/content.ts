import topicData from '../content/topics.json';

export type Topic = (typeof topicData)[number];
export const topics: Topic[] = topicData;
export const getTopic = (id: string) => topics.find((topic) => topic.id === id);

export type Source = {
  id: string;
  kind: 'Quran' | 'Hadith' | 'Commentary' | 'Linguistics';
  title: string;
  credit: string;
  description: string;
  href: string;
};

export const sources: Record<string, Source> = {
  'ash-sharh': {
    id: 'ash-sharh', kind: 'Quran', title: 'Ash-Sharh · 94:5–6',
    credit: 'Dr. Mustafa Khattab · The Clear Quran',
    description: 'A two-verse reading excerpt. Open the original for the surrounding passage, translation notes, and complete surah.',
    href: 'https://quran.com/en/ash-sharh/5-6',
  },
  'muslim-2999': {
    id: 'muslim-2999', kind: 'Hadith', title: 'Sahih Muslim · 2999',
    credit: 'Narrated by Suhaib · Book 55, Hadith 82 · Sunnah.com',
    description: 'This narration discusses gratitude in favourable circumstances and patience in difficulty. The description here is an editorial summary, not a translation of the hadith. Read the complete text at its source.',
    href: 'https://sunnah.com/muslim:2999',
  },
  'ibn-kathir': {
    id: 'ibn-kathir', kind: 'Commentary', title: 'Ibn Kathir (Abridged)',
    credit: 'Tafsir of Ash-Sharh · 94:1–8 · Quran.com',
    description: 'The commentary discusses the reassurance in verses 5–6 and its repetition within the complete surah. Open the published commentary for the full explanation.',
    href: 'https://quran.com/ash-sharh/5/tafsirs/en-tafisr-ibn-kathir',
  },
  corpus: {
    id: 'corpus', kind: 'Linguistics', title: 'Quranic Arabic Corpus',
    credit: 'Kais Dukes · University of Leeds · Surah 94',
    description: 'Word meanings and grammatical labels in this preview are referenced to the Corpus. A root connection is a linguistic relationship and does not by itself establish a thematic connection.',
    href: 'https://corpus.quran.com/wordbyword.jsp?chapter=94&verse=5',
  },
  'al-baqarah': {
    id: 'al-baqarah', kind: 'Quran', title: 'Al-Baqarah · 2:153',
    credit: 'Quran.com · Read the passage and its tafsir',
    description: 'A reference concerning patience and prayer. The complete Arabic, translation, and commentary are available at the source.',
    href: 'https://quran.com/2/153',
  },
  ibrahim: {
    id: 'ibrahim', kind: 'Quran', title: 'Ibrahim · 14:7',
    credit: 'Quran.com · Read the surrounding passage',
    description: 'A reference concerning gratitude. Read it within the surrounding address in Surah Ibrahim, with its complete translation and commentary.',
    href: 'https://quran.com/14/7',
  },
};

export const words = {
  'fa-inna': { arabic: 'فَإِنَّ', latin: 'fa-inna', meaning: 'So indeed', root: '—', grammar: 'Conjunction + accusative particle', note: 'The prefixed fa is followed by the particle inna.', verse: '94:5' },
  inna: { arabic: 'إِنَّ', latin: 'inna', meaning: 'Indeed', root: '—', grammar: 'Accusative particle', note: 'A particle used here for emphasis.', verse: '94:6' },
  with: { arabic: 'مَعَ', latin: 'maʿa', meaning: 'with', root: '—', grammar: 'Preposition', note: 'The word is shown with its contextual meaning in this passage.', verse: '94:5–6' },
  hardship: { arabic: 'ٱلۡعُسۡرِ', latin: 'al-ʿusri', meaning: 'the hardship', root: 'ع س ر', grammar: 'Noun · masculine · genitive', note: 'The definite noun occurs in both verses. The full commentary is available in the Context section.', verse: '94:5–6' },
  ease: { arabic: 'يُسۡرًا', latin: 'yusran', meaning: 'ease', root: 'ي س ر', grammar: 'Noun · masculine · indefinite · accusative', note: 'An indefinite noun in this passage. Read the word together with the complete verse.', verse: '94:5–6' },
} as const;

export type WordId = keyof typeof words;
export const verseWords: { key: string; ids: WordId[]; translation: string }[] = [
  { key: '94:5', ids: ['fa-inna', 'with', 'hardship', 'ease'], translation: 'So, surely with hardship comes ease.' },
  { key: '94:6', ids: ['inna', 'with', 'hardship', 'ease'], translation: 'Surely with ˹that˺ hardship comes ˹more˺ ease.' },
];

export function normalizedSearch(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').replace(/[ʿʾ‘’']/g, '').toLowerCase().trim();
}
