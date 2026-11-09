'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, BookOpen, Check, Copy, FileText, Languages, ScanText, X } from 'lucide-react';
import { sources, verseWords, words, type WordId } from '@/lib/content';

type Detail = { kind: 'word'; id: WordId } | { kind: 'source'; id: string } | { kind: 'context' };
const DetailContext = createContext<(detail: Detail) => void>(() => {});

export function DetailProvider({ children }: { children: ReactNode }) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!detail) return;
    if (!dialog.current?.open) dialog.current?.showModal();
    else dialog.current.querySelector<HTMLButtonElement>('.detail-header button')?.focus();
  }, [detail]);
  useEffect(() => {
    if (!detail) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, [detail]);

  function close() { dialog.current?.close(); setDetail(null); }
  const word = detail?.kind === 'word' ? words[detail.id] : null;
  const source = detail?.kind === 'source' ? sources[detail.id] : null;

  return <DetailContext.Provider value={setDetail}>
    {children}
    <dialog ref={dialog} className="detail-dialog" aria-labelledby="detail-title" onClose={() => setDetail(null)} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      {detail && <motion.div className="detail-content" initial={reduced ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.18 }}>
        <div className="detail-header"><span className="eyebrow">{word ? 'A CLOSER LOOK' : source ? 'AT THE SOURCE' : 'THE SURROUNDING PASSAGE'}</span><button className="icon-button" onClick={close} aria-label="Close detail panel" autoFocus><X size={20} /></button></div>
        {word && <><span className="detail-word arabic" lang="ar" dir="rtl">{word.arabic}</span><p className="detail-latin">{word.latin}</p><h2 id="detail-title">{word.meaning}</h2><p className="detail-note">{word.note}</p><dl className="detail-facts"><div><dt>In this passage</dt><dd>Ash-Sharh {word.verse}</dd></div><div><dt>Root</dt><dd lang={word.root === '—' ? undefined : 'ar'} className={word.root === '—' ? '' : 'root-arabic'}>{word.root === '—' ? 'Not applicable' : word.root}</dd></div><div><dt>Grammar</dt><dd>{word.grammar}</dd></div></dl><div className="detail-source"><span className="eyebrow">LINGUISTIC REFERENCE</span><h3>Quranic Arabic Corpus</h3><p>Word-by-word analysis of Surah 94. Meanings are contextual; roots alone do not establish a thematic connection.</p><a className="text-link" href={sources.corpus.href} target="_blank" rel="noreferrer">View the original analysis<ArrowUpRight size={15} /></a></div><button className="detail-switch text-link" onClick={() => setDetail({ kind: 'context' })}>Read this word in context<ArrowRight size={15} /></button></>}
        {source && <><span className="detail-source-kind"><FileText size={15} />{source.kind}</span><h2 id="detail-title">{source.title}</h2><p className="source-credit">{source.credit}</p><p className="detail-note">{source.description}</p><div className="detail-source"><span className="eyebrow">REFERENCE CHECK</span><p>Reference link checked on 9 November 2026. Topic selection and editorial wording are still awaiting review.</p></div><a className="button-primary source-open" href={source.href} target="_blank" rel="noreferrer">Open original source<ArrowUpRight size={16} /></a><p className="detail-footnote">Opens in a new tab. Your place here is preserved.</p></>}
        {detail.kind === 'context' && <><span className="detail-source-kind"><BookOpen size={15} />Quran · Chapter 94</span><h2 id="detail-title">Read the whole passage.</h2><p className="source-credit">Ash-Sharh · The Relief · 8 verses</p><p className="detail-note">The two verses in this topic are part of a complete surah. Open the surrounding text before drawing a conclusion from an individual line.</p><div className="context-verses">{verseWords.map((verse) => <div key={verse.key}><span className="mono">{verse.key}</span><p className="arabic" dir="rtl" lang="ar">{verse.ids.map((id) => words[id].arabic).join(' ')}</p><p>{verse.translation}</p></div>)}</div><p className="source-credit">Dr. Mustafa Khattab · The Clear Quran</p><a className="button-primary source-open" href="https://quran.com/94" target="_blank" rel="noreferrer">Read all 8 verses on Quran.com<ArrowUpRight size={16} /></a><button className="detail-switch text-link" onClick={() => setDetail({ kind: 'source', id: 'ibn-kathir' })}>Open the commentary reference<ArrowRight size={15} /></button></>}
        <div className="detail-bottom">FAHM <span>/</span> CONTEXT STAYS CLOSE.</div>
      </motion.div>}
    </dialog>
  </DetailContext.Provider>;
}

export function SourceButton({ id, children = 'Source' }: { id: string; children?: ReactNode }) {
  const open = useContext(DetailContext);
  return <button className="text-link source-button" onClick={() => open({ kind: 'source', id })}>{children}<ArrowUpRight size={13} /></button>;
}

export function ContextButton({ children = 'Read in context' }: { children?: ReactNode }) {
  const open = useContext(DetailContext);
  return <button className="text-link" onClick={() => open({ kind: 'context' })}>{children}<BookOpen size={14} /></button>;
}

export function WordButton({ id }: { id: WordId }) {
  const open = useContext(DetailContext);
  const word = words[id];
  return <button className="word-entry" onClick={() => open({ kind: 'word', id })}><span className="arabic" dir="rtl" lang="ar">{word.arabic}</span><span><strong>{word.meaning}</strong><small>{word.latin}</small></span><ArrowUpRight size={15} /></button>;
}

export function VersePassage({ reader = false }: { reader?: boolean }) {
  const open = useContext(DetailContext);
  const [study, setStudy] = useState(false);
  const [size, setSize] = useState(40);
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState('');
  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem('fahm-arabic-size'));
      if (stored >= 30 && stored <= 52) setSize(stored);
    } catch { /* Optional local preferences. */ }
  }, []);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  function changeSize(delta: number) {
    const next = Math.min(52, Math.max(30, size + delta));
    setSize(next);
    try { localStorage.setItem('fahm-arabic-size', String(next)); } catch { /* Optional local preferences. */ }
  }
  async function copy(key: string, text: string) {
    try { await navigator.clipboard.writeText(`${key}\n${text}\nTranslation: Dr. Mustafa Khattab, The Clear Quran\nhttps://quran.com/${key.replace(':', '/')}`); setCopied(key); setCopyError(''); }
    catch { setCopyError('Copy is unavailable in this browser. You can select the text instead.'); }
  }

  return <div className={`passage ${reader ? 'reader-passage' : ''}`}>
    <div className="passage-toolbar"><div className="passage-modes"><button aria-pressed={!study} onClick={() => setStudy(false)}><BookOpen size={14} />Read</button><button aria-pressed={study} onClick={() => setStudy(true)}><ScanText size={14} />Word by word</button></div><div className="size-controls"><button onClick={() => changeSize(-2)} disabled={size <= 30} aria-label="Decrease Arabic text size">A−</button><button onClick={() => changeSize(2)} disabled={size >= 52} aria-label="Increase Arabic text size">A+</button></div></div>
    {verseWords.map((verse) => <article key={verse.key} className="verse" id={`verse-${verse.key.replace(':', '-')}`}><div className="verse-heading"><span className="mono">ASH-SHARH <span className="verse-ref">{verse.key}</span></span><div className="verse-actions"><button className="icon-button" onClick={() => copy(verse.key, verse.translation)} aria-label={`Copy verse ${verse.key} translation and reference`}>{copied === verse.key ? <Check size={15} /> : <Copy size={15} />}</button><SourceButton id="ash-sharh" /></div></div><div className="verse-arabic arabic" dir="rtl" lang="ar" style={{ fontSize: size }}>{verse.ids.map((id) => <button className="verse-word" key={id} aria-label={`${words[id].latin}: ${words[id].meaning}. Open word detail.`} onClick={() => open({ kind: 'word', id })}><span>{words[id].arabic}</span>{study && <span className="word-gloss" lang="en" dir="ltr">{words[id].meaning}</span>}</button>)}<span className="verse-number" aria-label={`Verse ${verse.key.split(':')[1]}`}>{verse.key.endsWith('5') ? '٥' : '٦'}</span></div><p className="verse-translation">{verse.translation}</p><p className="verse-credit">Dr. Mustafa Khattab · The Clear Quran</p></article>)}
    {copyError && <p className="copy-status" role="status">{copyError}</p>}<span className="sr-only" role="status">{copied ? `Copied ${copied}` : ''}</span>
    <div className="passage-end"><ContextButton /><span><Languages size={14} />Tap an Arabic word to look closer</span></div>
  </div>;
}

export function ReferenceCard({ id }: { id: string }) {
  const source = sources[id];
  const open = useContext(DetailContext);
  if (!source) return null;
  return <button className="reference-card" onClick={() => open({ kind: 'source', id })}><div className="reference-card-top"><span className="eyebrow">{source.kind}</span><ArrowUpRight size={18} /></div><h3>{source.title}</h3><p>{source.description}</p><span className="reference-credit">{source.credit}</span><span className="reference-action">Inspect reference<ArrowRight size={14} /></span></button>;
}

export function RelatedTopicLink({ id, reason }: { id: string; reason: string }) {
  const label = id === 'patience' ? 'Patience' : id === 'gratitude' ? 'Gratitude' : 'Hardship & ease';
  return <Link className="related-topic" href={`/topics/${id}`}><div><h3>{label}</h3><p>{reason}</p></div><ArrowUpRight size={19} /></Link>;
}
