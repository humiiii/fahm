import 'server-only';
import { requestHadith } from './provider';
import type { HadithResult } from './model';

let cached: { result: HadithResult; expiresAt: number } | undefined;
let pending: Promise<HadithResult> | undefined;

export async function getHadith(): Promise<HadithResult> {
  if (cached && cached.expiresAt > Date.now()) return cached.result;
  cached = undefined;
  if (pending) return pending;
  const request = requestHadith();
  pending = request;
  try {
    const result = await request;
    if (result.status === 'ready' || result.retryAt) {
      const entry = { result, expiresAt: result.status === 'ready' ? Date.now() + 3_600_000 : result.retryAt! };
      cached = entry;
      if (result.status === 'ready') {
        const retention = setTimeout(() => { if (cached === entry) cached = undefined; }, 3_600_000);
        retention.unref();
      }
    }
    return result;
  } finally {
    if (pending === request) pending = undefined;
  }
}
