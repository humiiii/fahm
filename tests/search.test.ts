import assert from 'node:assert/strict';
import { test } from 'node:test';
import { searchTopics } from '../src/lib/search';
import { sources, topics } from '../src/lib/content';

test('search finds a concept by its common transliteration or misspelling', () => {
  assert.equal(searchTopics('sabr')[0]?.id, 'patience');
  assert.equal(searchTopics('hardshp')[0]?.id, 'hardship-and-ease');
  assert.equal(searchTopics('shukar')[0]?.id, 'gratitude');
});

test('Arabic search tolerates missing diacritics', () => {
  assert.equal(searchTopics('الصبر')[0]?.id, 'patience');
  assert.equal(searchTopics('الشكر')[0]?.id, 'gratitude');
});

test('category filters compose with a query and empty results are honest', () => {
  assert.equal(searchTopics('hardship', 'Character').length, 0);
  assert.equal(searchTopics('unfindable-topic-xyz').length, 0);
  assert.deepEqual(searchTopics('', 'Character').map((topic) => topic.id), ['patience', 'gratitude']);
});

test('every topic reference and relationship resolves to real local content', () => {
  const ids = new Set(topics.map((topic) => topic.id));
  assert.equal(ids.size, topics.length);
  for (const topic of topics) {
    for (const id of topic.referenceIds) {
      assert.ok(sources[id], `${topic.id}: missing source ${id}`);
      assert.ok(new URL(sources[id].href).protocol === 'https:');
    }
    for (const id of topic.related) assert.ok(ids.has(id), `Missing related topic ${id}`);
  }
});
