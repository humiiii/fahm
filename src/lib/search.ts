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

export function searchTopics(query: string, category = 'All topics'): Topic[] {
  const q = normalizedSearch(query);
  const matches = q ? fuse.search(q).map((result) => result.item) : topics;
  return matches.filter((topic) => category === 'All topics' || topic.category === category);
}
