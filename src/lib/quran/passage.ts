import sanitizeHtml from 'sanitize-html';
import { decodeHTML } from 'entities';
import type { Verse, TranslationResource, TafsirResource } from '@quranjs/api';

export const TRANSLATION_ID = 20;
export const TAFSIR_ID = 169;

export type PassageWord = {
  location: string;
  position: number;
  verseKey: string;
  arabic: string;
  meaning: string;
  transliteration: string;
};
export type PassageVerse = {
  key: string;
  number: number;
  arabic: string;
  words: PassageWord[];
  translationHtml: string;
  translationText: string;
};
export type LivePassage = {
  verses: PassageVerse[];
  translation: { id: number; name: string; author: string };
  commentary: { id: number; name: string; author: string; html: string };
};

export function safeContentHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'h2', 'h3', 'b', 'i', 'em', 'strong', 'br', 'sup', 'sub', 'ul', 'ol', 'li', 'blockquote'],
    allowedAttributes: {},
    nonTextTags: ['script', 'style', 'textarea', 'option', 'iframe'],
  });
}

export function contentText(html: string): string {
  return decodeHTML(safeContentHtml(html).replace(/<br\s*\/?\s*>|<\/p>/gi, '\n').replace(/<[^>]*>/g, '')).trim();
}

export function normalizeAshSharh(
  raw: Verse[], translation: TranslationResource | undefined, commentary: TafsirResource | undefined,
): LivePassage {
  if (translation?.id !== TRANSLATION_ID || !translation.name || !translation.authorName ||
      commentary?.id !== TAFSIR_ID || !commentary.name || !commentary.authorName || raw.length !== 8) {
    throw new Error('The required passage or credited resources are unavailable.');
  }
  const verses = raw.map((verse, index): PassageVerse => {
    const key = `94:${index + 1}`;
    const translated = verse.translations?.find((item) => item.resourceId === TRANSLATION_ID);
    if (verse.verseKey !== key || verse.verseNumber !== index + 1 || !verse.textUthmani?.trim() || !translated?.text?.trim()) {
      throw new Error('The provider returned an incomplete passage or translation.');
    }
    const words = verse.words?.filter((word) => word.charTypeName === 'word').map((word, wordIndex): PassageWord => {
      if (word.position !== wordIndex + 1 || word.location !== `${key}:${word.position}` ||
          !word.textUthmani?.trim() || !word.translation?.text?.trim() || !word.transliteration?.text?.trim()) {
        throw new Error('The provider returned incomplete word data.');
      }
      return {
        location: word.location, position: word.position, verseKey: key,
        arabic: word.textUthmani, meaning: word.translation.text,
        transliteration: word.transliteration.text,
      };
    });
    if (!words?.length) throw new Error('The word data is unavailable.');
    return {
      key, number: index + 1, arabic: verse.textUthmani, words,
      translationHtml: safeContentHtml(translated.text), translationText: contentText(translated.text),
    };
  });
  const tafsir = raw[4].tafsirs?.find((item) => item.resourceId === TAFSIR_ID);
  if (!tafsir?.text?.trim()) throw new Error('The published commentary is unavailable.');
  return {
    verses,
    translation: { id: translation.id, name: translation.name, author: translation.authorName },
    commentary: { id: commentary.id, name: commentary.name, author: commentary.authorName, html: safeContentHtml(tafsir.text) },
  };
}
