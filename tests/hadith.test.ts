import assert from 'node:assert/strict';
import { test } from 'node:test';
import { editionFromDownload, normalizeHadith } from '../src/lib/hadith/model';
import { requestHadith } from '../src/lib/hadith/provider';

// Synthetic content only; publisher narration text is never bundled in tests.
const english = { id: '3298', hadeeth_ar: 'نص', hadeeth: 'Publisher translation.', explanation: 'Publisher explanation.', attribution: 'Narrated by Muslim', grade: 'Authentic', hints: ['Publisher note.'] };
const arabic = { id: '3298', hadeeth: 'نص', reference: 'صحيح مسلم (4/ 2295) (2999).\nOther source reference.' };
const editionUrl = 'https://hadeethenc.com/downloads/excel/HadeethEnc.com_en-v1.25.0.xlsx';
function publisherFetch(calls: { url: string; options?: RequestInit }[] = []): typeof fetch {
  return (async (input, options) => {
    const url = String(input); calls.push({ url, options });
    if (options?.method === 'HEAD') { const response = new Response(null); Object.defineProperty(response, 'url', { value: editionUrl }); return response; }
    return Response.json(url.includes('language=en') ? english : arabic);
  }) as typeof fetch;
}

test('the narration retains publisher text, bilingual identity, grading, bibliography, and actual edition', () => {
  const data = normalizeHadith(english, arabic, editionFromDownload(editionUrl), '2026-11-10T00:00:00Z');
  assert.equal(data.arabic, arabic.hadeeth);
  assert.equal(data.translation, english.hadeeth);
  assert.equal(data.explanation, english.explanation);
  assert.deepEqual(data.notes, english.hints);
  assert.equal(data.edition, 'v1.25.0');
  assert.equal(data.publisher, 'HadeethEnc.com');
  assert.equal(data.bibliography, arabic.reference);
});

test('wrong narrations, mismatched Arabic, missing text, and unsupported edition metadata are rejected', () => {
  for (const en of [{ ...english, id: '123' }, { ...english, hadeeth_ar: 'different text' }, { ...english, hadeeth: '' }, { ...english, grade: '' }, { ...english, hadeeth: '<script>invalid()</script>' }]) {
    assert.throws(() => normalizeHadith(en, arabic, 'v1.25.0', '2026-11-10T00:00:00Z'));
  }
  assert.throws(() => normalizeHadith(english, { ...arabic, reference: 'صحيح مسلم (123)' }, 'v1.25.0', '2026-11-10T00:00:00Z'));
  for (const url of ['https://other.example/downloads/excel/HadeethEnc.com_en-v1.25.0.xlsx', 'https://hadeethenc.com/file.xlsx', 'http://hadeethenc.com/downloads/excel/HadeethEnc.com_en-v1.25.0.xlsx']) assert.throws(() => editionFromDownload(url));
});

test('the provider uses only fixed public endpoints and a HEAD request for edition metadata', async () => {
  const calls: { url: string; options?: RequestInit }[] = [];
  assert.equal((await requestHadith(publisherFetch(calls))).status, 'ready');
  assert.equal(calls.length, 3);
  assert.ok(calls.every((call) => new URL(call.url).hostname === 'hadeethenc.com' && !call.options?.headers));
  assert.equal(calls[2].options?.method, 'HEAD');
  assert.ok(calls.every((call) => call.options?.cache === 'no-store' && call.options?.signal));
});

test('provider errors and rate limits produce an unavailable result without substituting text or leaking error details', async () => {
  const retryStart = Date.now() + 59_000;
  const limited = await requestHadith((async () => new Response(null, { status: 429, headers: { 'Retry-After': '60' } })) as typeof fetch);
  assert.equal(limited.status, 'unavailable');
  assert.ok(limited.status === 'unavailable' && limited.retryAt! >= retryStart);
  const failed = await requestHadith((async () => { throw new Error('private upstream details'); }) as typeof fetch);
  assert.deepEqual(failed, { status: 'unavailable' });
});
