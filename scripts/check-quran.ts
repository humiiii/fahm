import { loadEnvConfig } from '@next/env';
import { QuranHttpError } from '@quranjs/api/server';
import { QuranConfigurationError } from '../src/lib/quran/config';
import { getAlFatihah } from '../src/lib/quran/server';

loadEnvConfig(process.cwd());

async function main() {
  const verses = await getAlFatihah();
  console.log('Quran Foundation connection verified.');
  console.log(`Al-Fatihah: ${verses.length} Arabic verses fetched (${verses[0].key}–${verses.at(-1)!.key}).`);
  console.log('No credentials, access tokens, or provider content were written to disk.');
}

main().catch((error: unknown) => {
  // SDK errors can carry upstream response bodies. Never dump an error object.
  if (error instanceof QuranConfigurationError) console.error(error.message);
  else if (error instanceof QuranHttpError) {
    console.error(`Quran Foundation rejected the request (HTTP ${error.status}). Check matching credentials, environment, and approved Content scopes.`);
  } else {
    console.error('Quran Foundation check failed. Check network access, credentials, Content scope mode, and the provider response format. No secrets were logged.');
  }
  process.exitCode = 1;
});
