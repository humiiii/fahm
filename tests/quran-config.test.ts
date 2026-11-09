import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readQuranConfig } from '../src/lib/quran/config';

const credentials = { QF_CLIENT_ID: 'test-id', QF_CLIENT_SECRET: 'test-secret' };

test('new credentials default to granular scopes and matching pre-live hosts', () => {
  const config = readQuranConfig(credentials);
  assert.equal(config.contentScopeMode, 'granular');
  assert.deepEqual(config.services, {
    gatewayUrl: 'https://apis-prelive.quran.foundation',
    oauth2BaseUrl: 'https://prelive-oauth2.quran.foundation',
  });
});

test('production switches both hosts together and legacy scopes require an explicit setting', () => {
  const config = readQuranConfig({ ...credentials, QF_ENV: 'production', QF_CONTENT_SCOPE_MODE: 'legacy' });
  assert.equal(config.contentScopeMode, 'legacy');
  assert.deepEqual(config.services, {
    gatewayUrl: 'https://apis.quran.foundation',
    oauth2BaseUrl: 'https://oauth2.quran.foundation',
  });
});

test('invalid environments, scope modes, or missing credentials fail without exposing their values', () => {
  for (const env of [
    { ...credentials, QF_ENV: 'untrusted-host' },
    { ...credentials, QF_CONTENT_SCOPE_MODE: 'unapproved-scope' },
    { ...credentials, QF_CLIENT_SECRET: '   ' },
    { ...credentials, QF_CLIENT_ID: undefined },
  ]) {
    assert.throws(() => readQuranConfig(env), (error: Error) => {
      assert.ok(!error.message.includes(credentials.QF_CLIENT_SECRET));
      assert.ok(!error.message.includes(credentials.QF_CLIENT_ID));
      return true;
    });
  }
});
