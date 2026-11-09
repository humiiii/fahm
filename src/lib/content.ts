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
    id: 'ash-sharh', kind: 'Quran', title: 'Ash-Sharh · Chapter 94',
    credit: 'Saheeh International · Quran Foundation',
    description: 'The topic begins with verses 5–6. The complete surah, Arabic word data, and English translation are supplied by Quran Foundation. Translation notes are available at the original source.',
    href: 'https://quran.com/94',
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
    description: 'Read the published explanation of Ash-Sharh 94:1–8, including the surrounding passage and the repetition in verses 5–6.',
    href: 'https://quran.com/ash-sharh/5/tafsirs/en-tafisr-ibn-kathir',
  },
  corpus: {
    id: 'corpus', kind: 'Linguistics', title: 'Quranic Arabic Corpus',
    credit: 'Kais Dukes · University of Leeds · Surah 94',
    description: 'An additional reference for grammatical analysis of Surah 94. In-app word meanings and transliterations come from Quran Foundation; a linguistic connection does not by itself establish a thematic connection.',
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

export function normalizedSearch(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').replace(/[ʿʾ‘’']/g, '').toLowerCase().trim();
}
