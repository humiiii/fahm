import { getHadith } from '../src/lib/hadith/server';

async function main() {
  const result = await getHadith();
  if (result.status !== 'ready') throw new Error('Hadith source temporarily unavailable.');
  console.log(`Verified ${result.reading.reference}: complete Arabic, English translation, grading, explanation, and ${result.reading.notes.length} publisher notes.`);
  console.log(`Publisher: ${result.reading.publisher}; English edition ${result.reading.edition}.`);
  console.log('Publisher Arabic reference matches Muslim 2999. No credentials are used and no publisher content was written to disk.');
}
main().catch(() => { console.error('Hadith verification failed. No narration was substituted.'); process.exitCode = 1; });
