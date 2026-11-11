import Fuse from 'fuse.js';
import { normalizedSearch, topics, type Topic } from './content';

const index = topics.map((topic) => ({
  ...topic,
  searchTitle: normalizedSearch(topic.title),
  searchAliases: topic.aliases.map(normalizedSearch),
  searchArabic: normalizedSearch(topic.arabic),
  searchLatin: normalizedSearch(topic.transliteration),
}));

const fuse = new Fuse(index, {
  keys: [{ name: 'searchTitle', weight: 3 }, { name: 'searchAliases', weight: 2 }, 'searchArabic', 'searchLatin', 'description'],
  threshold: 0.32,
  ignoreLocation: true,
});

// Questions still search the local topic index; ignore conversational filler
// and match the remaining concepts without broad description-only matches.
const questionWords = new Set('a an and are as at be can could do does for from how i in is it me my of on or should that the this to was we what when where which who why will with would you your'.split(' '));
const conceptFuse = new Fuse(index, {
  keys: ['searchTitle', 'searchAliases', 'searchArabic', 'searchLatin'],
  threshold: 0.25,
  ignoreLocation: true,
  includeScore: true,
});

export function searchTopics(query: string, category = 'All topics'): Topic[] {
  const q = normalizedSearch(query);
  let matches: Topic[] = q ? fuse.search(q).map((result) => result.item) : topics;
  if (q && !matches.length) {
    const terms = [...new Set(q.match(/[\p{L}\p{N}]+/gu) ?? [])]
      .filter((term) => term.length >= 3 && !questionWords.has(term));
    const concepts = new Map<string, { topic: Topic; hits: number; score: number }>();
    for (const term of terms) {
      for (const { item, score = 1 } of conceptFuse.search(term)) {
        const previous = concepts.get(item.id);
        concepts.set(item.id, { topic: item, hits: (previous?.hits ?? 0) + 1, score: Math.min(previous?.score ?? 1, score) });
      }
    }
    matches = [...concepts.values()].sort((a, b) => b.hits - a.hits || a.score - b.score).map(({ topic }) => topic);
  }
  return matches.filter((topic) => category === 'All topics' || topic.category === category);
}
