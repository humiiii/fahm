'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { HADITH_REFERENCE_URL, type HadithReading, type HadithResult } from '@/lib/hadith/model';

type State = { status: 'loading' } | { status: 'ready'; reading: HadithReading } | { status: 'unavailable'; retryAt?: number };

export function HadithDetail() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });
    fetch('/api/hadith/muslim-2999', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const result = await response.json() as HadithResult;
        if (controller.signal.aborted) return;
        if (response.ok && result.status === 'ready' && result.reading?.id === '3298') setState(result);
        else setState({ status: 'unavailable', ...(result.status === 'unavailable' ? { retryAt: result.retryAt } : {}) });
      })
      .catch(() => { if (!controller.signal.aborted) setState({ status: 'unavailable' }); });
    return () => controller.abort();
  }, [attempt]);
  const retryAt = state.status === 'unavailable' ? state.retryAt : undefined;
  useEffect(() => {
    if (!retryAt) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [retryAt]);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  if (state.status === 'loading') return <div className="hadith-state" role="status"><span className="blue-dot" /><p>Opening the complete narration and its source details.</p></div>;
  if (state.status === 'unavailable') {
    const remaining = Math.max(0, Math.ceil(((state.retryAt ?? 0) - now) / 1000));
    return <div className="hadith-state hadith-unavailable"><p role="alert">The hadith source is temporarily unavailable. You can try again or read it at the source.</p><button className="button-primary" disabled={remaining > 0} onClick={() => setAttempt((value) => value + 1)}>{remaining > 0 ? `Try again in ${remaining}s` : 'Try again'}</button><a className="text-link" href={HADITH_REFERENCE_URL} target="_blank" rel="noreferrer">Read Sahih Muslim 2999<ArrowUpRight size={14} /></a></div>;
  }
  const { reading } = state;
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${reading.reference}\n${reading.arabic}\n\n${reading.translation}\n\n${reading.attribution}\nGrade: ${reading.grade} (${reading.publisher})\nTranslation: ${reading.publisher}, English edition ${reading.edition}\n${reading.sourceUrl}\nCollection reference: ${reading.referenceUrl}`);
      setCopied(true); setCopyError('');
    } catch { setCopyError('Copy is unavailable in this browser. You can select the text instead.'); }
  }
  return <section className="hadith-reading" aria-label="Complete hadith">
    <div className="hadith-toolbar"><span className="hadith-grade">{reading.grade}<span> · {reading.publisher}</span></span><button className="text-link" onClick={copy} aria-label="Copy complete hadith with source credits">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy narration'}</button></div>
    <div className="hadith-arabic arabic" lang="ar" dir="rtl" translate="no">{reading.arabic}</div>
    <div className="hadith-translation" translate="no"><span className="eyebrow">ENGLISH TRANSLATION</span><p>{reading.translation}</p></div>
    <p className="source-credit">{reading.attribution} · Translation by {reading.publisher}</p>
    <details className="hadith-explanation"><summary>Read the publisher’s explanation</summary><div translate="no"><p>{reading.explanation}</p>{reading.notes.length > 0 && <><h3>Publisher’s notes</h3><ul>{reading.notes.map((note, index) => <li key={index}>{note}</li>)}</ul></>}</div></details>
    <div className="hadith-provenance"><span className="eyebrow">PUBLISHER AND EDITION</span><p>{reading.publisher} · English edition {reading.edition}</p><p>Live narration and translation. Edition details are checked against the publisher’s current English release.</p><a className="text-link" href={reading.sourceUrl} target="_blank" rel="noreferrer">Read the publisher’s source<ArrowUpRight size={14} /></a><details><summary>Bibliographic references</summary><p lang="ar" dir="rtl" translate="no">{reading.bibliography}</p></details></div>
    {copyError && <p className="copy-status" role="status">{copyError}</p>}<span className="sr-only" role="status">{copied ? 'Hadith copied with source credits' : ''}</span>
  </section>;
}
