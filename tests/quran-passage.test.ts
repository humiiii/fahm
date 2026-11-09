import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { Verse } from '@quranjs/api';
import { contentText, normalizeAshSharh, safeContentHtml } from '../src/lib/quran/passage';

// Synthetic provider-shaped data: no Quran text or publisher response is bundled.
const translation = { id: 20, name: 'Translation credit', authorName: 'Translator' };
const commentary = { id: 169, name: 'Commentary credit', authorName: 'Author' };
function fixture(): Verse[] {
  return Array.from({ length: 8 }, (_, index) => ({
    verseKey: `94:${index + 1}`, verseNumber: index + 1, textUthmani: 'نَصّ',
    translations: [{ resourceId: 20, text: 'Translation &amp; context.' }],
    tafsirs: [{ resourceId: 169, text: '<h2>Published heading</h2><p>Published explanation.</p>' }],
    words: [
      { position: 1, location: `94:${index + 1}:1`, charTypeName: 'word', textUthmani: 'نَصّ', translation: { text: 'text' }, transliteration: { text: 'naṣṣ' } },
      { position: 2, charTypeName: 'end', textUthmani: '١' },
    ],
  })) as Verse[];
}

test('live passage preserves Arabic and distinct word locations, excludes end markers, and credits actual resources', () => {
  const passage = normalizeAshSharh(fixture(), translation, commentary);
  assert.equal(passage.verses.length, 8);
  assert.equal(passage.verses[4].arabic, 'نَصّ');
  assert.equal(passage.verses[4].words.length, 1);
  assert.equal(passage.verses[4].words[0].location, '94:5:1');
  assert.equal(passage.verses[5].words[0].location, '94:6:1');
  assert.equal(passage.verses[4].translationText, 'Translation & context.');
  assert.equal(passage.translation.author, 'Translator');
  assert.equal(passage.commentary.author, 'Author');
});

test('missing translation, incomplete verses, incorrect word locations, and missing commentary fail instead of showing sample content', () => {
  for (const corrupt of [
    (data: Verse[]) => data.pop(),
    (data: Verse[]) => { data[4].translations = []; },
    (data: Verse[]) => { data[4].words![0].location = '94:6:1'; },
    (data: Verse[]) => { data[4].tafsirs = []; },
    (data: Verse[]) => { data[4].textUthmani = ''; },
  ]) {
    const data = fixture(); corrupt(data);
    assert.throws(() => normalizeAshSharh(data, translation, commentary));
  }
  assert.throws(() => normalizeAshSharh(fixture(), undefined, commentary));
});

test('publisher markup retains readable content while removing scripts, external embeds, links, and event handlers', () => {
  const result = safeContentHtml('<h2 onclick="bad()">Context</h2><script>bad()</script><iframe>bad()</iframe><p>Read <em>carefully</em> &amp; fully.<img src=x onerror="bad()"><a href="javascript:bad()">Source</a></p>');
  assert.equal(result, '<h2>Context</h2><p>Read <em>carefully</em> &amp; fully.Source</p>');
  assert.equal(contentText('<p>One &lt; two.</p><p>Next &#8212; line.</p>'), 'One < two.\nNext — line.');
});
