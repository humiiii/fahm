import type { ServerClientConfig } from '@quranjs/api';

export class QuranConfigurationError extends Error {}

export function readQuranConfig(env: Record<string, string | undefined>): ServerClientConfig {
  const environment = env.QF_ENV?.trim() || 'prelive';
  if (environment !== 'prelive' && environment !== 'production') {
    throw new QuranConfigurationError('QF_ENV must be prelive or production.');
  }
  const clientId = env.QF_CLIENT_ID?.trim();
  const clientSecret = env.QF_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) {
    throw new QuranConfigurationError('Set QF_CLIENT_ID and QF_CLIENT_SECRET in .env.local.');
  }
  const contentScopeMode = env.QF_CONTENT_SCOPE_MODE?.trim() || 'granular';
  if (contentScopeMode !== 'granular' && contentScopeMode !== 'legacy') {
    throw new QuranConfigurationError('QF_CONTENT_SCOPE_MODE must be granular or legacy.');
  }
  return {
    clientId,
    clientSecret,
    contentScopeMode,
    services: environment === 'prelive' ? {
      gatewayUrl: 'https://apis-prelive.quran.foundation',
      oauth2BaseUrl: 'https://prelive-oauth2.quran.foundation',
    } : {
      gatewayUrl: 'https://apis.quran.foundation',
      oauth2BaseUrl: 'https://oauth2.quran.foundation',
    },
  };
}
