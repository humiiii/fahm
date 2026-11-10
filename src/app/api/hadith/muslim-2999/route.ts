import { getHadith } from '@/lib/hadith/server';

export async function GET() {
  const result = await getHadith();
  return Response.json(result, {
    status: result.status === 'ready' ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store',
      ...(result.status === 'unavailable' && result.retryAt ? { 'Retry-After': String(Math.ceil((result.retryAt - Date.now()) / 1000)) } : {}),
    },
  });
}
