'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, BookOpen, Check, Copy, FileText, Languages, ScanText, X } from 'lucide-react';
import { sources } from '@/lib/content';
import type { LivePassage, PassageVerse, PassageWord } from '@/lib/quran/passage';
import { HadithDetail } from './hadith-detail';

type Detail = { kind: 'word'; location: string } | { kind: 'source'; id: string } | { kind: 'context'; verseKey?: string };
const DetailContext = createContext<{ open: (detail: Detail) => void; chapter?: LivePassage }>({ open: () => {} });

function TranslationNotes({ verse }: { verse: PassageVerse }) {
  if (!verse.footnotes.length) return null;
  return <details className="translation-notes" translate="no"><summary>Translation notes ({verse.footnotes.length})</summary><ol>{verse.footnotes.map((note) => <li key={note.id}><div dangerouslySetInnerHTML={{ __html: note.html }} /></li>)}</ol></details>;
}

export function DetailProvider({ children, chapter }: { children: ReactNode; chapter?: LivePassage }) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!detail) return;
    if (!dialog.current?.open) dialog.current?.showModal();
    else {
      dialog.current.scrollTop = 0;
      dialog.current.querySelector<HTMLButtonElement>('.detail-header button')?.focus();
    }
  }, [detail]);
  useEffect(() => {
    if (!detail) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, [detail]);

  function close() { dialog.current?.close(); setDetail(null); }
  const word = detail?.kind === 'word' ? chapter?.verses.flatMap((verse) => verse.words).find((item) => item.location === detail.location) : null;
  const source = detail?.kind === 'source' ? sources[detail.id] : null;
  const publishedCommentary = source?.id === 'ibn-kathir' ? chapter?.commentary : null;

  return <DetailContext.Provider value={{ open: setDetail, chapter }}>
    {children}
    <dialog ref={dialog} className="detail-dialog" aria-labelledby="detail-title" onClose={() => setDetail(null)} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      {detail && <motion.div className="detail-content" initial={reduced ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.18 }}>
        <div className="detail-header"><span className="eyebrow">{word ? 'A CLOSER LOOK' : source ? 'AT THE SOURCE' : 'THE SURROUNDING PASSAGE'}</span><button className="icon-button" onClick={close} aria-label="Close detail panel" autoFocus><X size={20} /></button></div>
        {word && <>
          <span className="detail-word arabic" lang="ar" dir="rtl" translate="no">{word.arabic}</span>
          <p className="detail-latin" translate="no">{word.transliteration}</p><h2 id="detail-title" translate="no">{word.meaning}</h2>
          <p className="detail-note">A contextual word meaning from Quran Foundation. Read it together with the full verse and its translation.</p>
          <dl className="detail-facts"><div><dt>In this passage</dt><dd>Ash-Sharh {word.verseKey}</dd></div><div><dt>Word position</dt><dd>{word.position} · {word.location}</dd></div></dl>
          <div className="detail-source"><span className="eyebrow">WORD DATA</span><h3>Quran Foundation</h3><p>The word translation and transliteration are separate from the complete verse translation. They are reading aids, rather than a full grammatical analysis.</p><a className="text-link" href={`https://quran.com/${word.verseKey.replace(':', '/')}`} target="_blank" rel="noreferrer">View this verse at the source<ArrowUpRight size={15} /></a></div>
          <button className="detail-switch text-link" onClick={() => setDetail({ kind: 'context', verseKey: word.verseKey })}>Read this word in context<ArrowRight size={15} /></button>
        </>}
        {source && <>
          <span className="detail-source-kind"><FileText size={15} />{source.kind}</span><h2 id="detail-title">{publishedCommentary?.name ?? source.title}</h2>
          <p className="source-credit">{publishedCommentary ? `${publishedCommentary.author} · Ash-Sharh 94:1–8 · Quran Foundation` : source.id === 'ash-sharh' && chapter ? `${chapter.translation.name} · Quran Foundation` : source.credit}</p>
          {source.id === 'muslim-2999' ? <HadithDetail /> : publishedCommentary ? <div className="publisher-content" translate="no" dangerouslySetInnerHTML={{ __html: publishedCommentary.html }} /> : <p className="detail-note">{source.description}</p>}
          {source.id === 'ash-sharh' && chapter && <button className="detail-switch text-link" onClick={() => setDetail({ kind: 'context' })}>Read the complete surah here<ArrowRight size={15} /></button>}
          {!publishedCommentary && <div className="detail-source"><span className="eyebrow">SOURCE AND CONTEXT</span><p>{source.kind === 'Hadith' ? 'The narration and explanation are provided by HadeethEnc.com. Its relationship to this topic is an editorial choice awaiting review. The collection reference below opens Sunnah.com, which uses its own translation.' : 'Topic selection and editorial introductions are awaiting review. Quran text, translations, and commentary are supplied by Quran Foundation.'}</p></div>}
          <a className="button-primary source-open" href={source.href} target="_blank" rel="noreferrer">{source.id === 'muslim-2999' ? 'Open collection reference' : 'Open original source'}<ArrowUpRight size={16} /></a><p className="detail-footnote">Opens in a new tab. Your place here is preserved.</p>
        </>}
        {detail.kind === 'context' && chapter && <>
          <span className="detail-source-kind"><BookOpen size={15} />Quran · Chapter 94</span><h2 id="detail-title">The whole surah, together.</h2>
          <p className="source-credit">Ash-Sharh · The Relief · 8 verses</p><p className="detail-note">The topic begins with verses 5–6. Here is the complete surrounding passage, with the same translation.</p>
          <div className="context-verses" translate="no">{chapter.verses.map((verse) => <div key={verse.key} data-current={verse.key === detail.verseKey || undefined}><span className="mono">{verse.key}{verse.key === detail.verseKey ? ' · YOUR WORD IS HERE' : ''}</span><p className="arabic" dir="rtl" lang="ar">{verse.arabic}</p><div className="context-translation" dangerouslySetInnerHTML={{ __html: verse.translationHtml }} /><TranslationNotes verse={verse} /></div>)}</div>
          <p className="source-credit">{chapter.translation.name} · Quran Foundation</p><Link className="text-link detail-switch" href="/quran/94">Open the full reader<ArrowRight size={15} /></Link><button className="detail-switch text-link" onClick={() => setDetail({ kind: 'source', id: 'ibn-kathir' })}>Read the published commentary<ArrowRight size={15} /></button>
        </>}
        <div className="detail-bottom">FAHM <span>/</span> CONTEXT STAYS CLOSE.</div>
      </motion.div>}
    </dialog>
  </DetailContext.Provider>;
}

export function SourceButton({ id, children = 'Source' }: { id: string; children?: ReactNode }) {
  const { open } = useContext(DetailContext);
  return <button className="text-link source-button" onClick={() => open({ kind: 'source', id })}>{children}<ArrowUpRight size={13} /></button>;
}
export function ContextButton({ children = 'Read in context' }: { children?: ReactNode }) {
  const { open } = useContext(DetailContext);
  return <button className="text-link" onClick={() => open({ kind: 'context' })}>{children}<BookOpen size={14} /></button>;
}
export function WordButton({ location }: { location: string }) {
  const { open, chapter } = useContext(DetailContext);
  const word = chapter?.verses.flatMap((verse) => verse.words).find((item) => item.location === location);
  if (!word) return null;
  return <button className="word-entry" onClick={() => open({ kind: 'word', location })}><span className="arabic" dir="rtl" lang="ar" translate="no">{word.arabic}</span><span translate="no"><strong>{word.meaning}</strong><small>{word.transliteration}</small></span><ArrowUpRight size={15} /></button>;
}

export function VersePassage({ reader = false }: { reader?: boolean }) {
  const { open, chapter } = useContext(DetailContext);
  const [study, setStudy] = useState(false);
  const [size, setSize] = useState(40);
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState('');
  useEffect(() => {
    try { const stored = Number(localStorage.getItem('fahm-arabic-size')); if (stored >= 30 && stored <= 52) setSize(stored); } catch { /* Optional local preferences. */ }
  }, []);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 1800);
    return () => clearTimeout(timer);
  }, [copied]);
  if (!chapter) return null;
  const verses = reader ? chapter.verses : chapter.verses.filter((verse) => verse.number === 5 || verse.number === 6);
  function changeSize(delta: number) {
    const next = Math.min(52, Math.max(30, size + delta)); setSize(next);
    try { localStorage.setItem('fahm-arabic-size', String(next)); } catch { /* Optional local preferences. */ }
  }
  async function copy(key: string, arabic: string, text: string) {
    try {
      const notes = chapter!.verses.find((verse) => verse.key === key)!.footnotes.map((note, index) => `[${index + 1}] ${note.text}`).join('\n');
      await navigator.clipboard.writeText(`${key}\n${arabic}\n${text}${notes ? `\n${notes}` : ''}\nTranslation: ${chapter!.translation.name}\nQuran Foundation · https://quran.com/${key.replace(':', '/')}`);
      setCopied(key); setCopyError('');
    } catch { setCopyError('Copy is unavailable in this browser. You can select the text instead.'); }
  }
  function wordButton(word: PassageWord) {
    return <button className="verse-word" key={word.location} aria-label={`${word.transliteration}: ${word.meaning}. Open word detail.`} onClick={() => open({ kind: 'word', location: word.location })}><span>{word.arabic}</span>{study && <span className="word-gloss" lang="en" dir="ltr">{word.meaning}</span>}</button>;
  }
  return <div className={`passage ${reader ? 'reader-passage' : ''}`}>
    <div className="passage-toolbar"><div className="passage-modes"><button aria-pressed={!study} onClick={() => setStudy(false)}><BookOpen size={14} />Read</button><button aria-pressed={study} onClick={() => setStudy(true)}><ScanText size={14} />Word by word</button></div><div className="size-controls"><button onClick={() => changeSize(-2)} disabled={size <= 30} aria-label="Decrease Arabic text size">A−</button><button onClick={() => changeSize(2)} disabled={size >= 52} aria-label="Increase Arabic text size">A+</button></div></div>
    <p className="passage-provenance"><span className="blue-dot" />Quran Foundation <span>·</span> {chapter.translation.name}</p>
    {verses.map((verse) => <article key={verse.key} className="verse" id={`verse-${verse.key.replace(':', '-')}`}>
      <div className="verse-heading"><span className="mono">ASH-SHARH <span className="verse-ref">{verse.key}</span></span><div className="verse-actions"><button className="icon-button" onClick={() => copy(verse.key, verse.arabic, verse.translationText)} aria-label={`Copy verse ${verse.key} Arabic, translation, and reference`}>{copied === verse.key ? <Check size={15} /> : <Copy size={15} />}</button><SourceButton id="ash-sharh" /></div></div>
      <div className="verse-arabic arabic" dir="rtl" lang="ar" translate="no" style={{ fontSize: size }}>{verse.words.map(wordButton)}<span className="verse-number" aria-label={`Verse ${verse.number}`}>{String(verse.number).replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)])}</span></div>
      <div className="verse-translation" translate="no" dangerouslySetInnerHTML={{ __html: verse.translationHtml }} /><TranslationNotes verse={verse} /><p className="verse-credit">{chapter.translation.name} · <a href={`https://quran.com/${verse.key.replace(':', '/')}`} target="_blank" rel="noreferrer">Original verse and translation notes<ArrowUpRight size={11} /></a></p>
    </article>)}
    {copyError && <p className="copy-status" role="status">{copyError}</p>}<span className="sr-only" role="status">{copied ? `Copied ${copied}` : ''}</span>
    <div className="passage-end"><ContextButton /><span><Languages size={14} />Tap an Arabic word to look closer</span></div>
  </div>;
}

export function ReferenceCard({ id }: { id: string }) {
  const source = sources[id];
  const { open, chapter } = useContext(DetailContext);
  if (!source) return null;
  const commentary = id === 'ibn-kathir' ? chapter?.commentary : null;
  return <button className="reference-card" onClick={() => open({ kind: 'source', id })}><div className="reference-card-top"><span className="eyebrow">{source.kind}</span><ArrowUpRight size={18} /></div><h3>{commentary?.name ?? source.title}</h3><p>{source.description}</p><span className="reference-credit">{commentary ? `${commentary.author} · Quran Foundation` : source.credit}</span><span className="reference-action">{id === 'muslim-2999' ? 'Read the complete hadith' : commentary ? 'Read published commentary' : 'Inspect reference'}<ArrowRight size={14} /></span></button>;
}
export function RelatedTopicLink({ id, reason }: { id: string; reason: string }) {
  const label = id === 'patience' ? 'Patience' : id === 'gratitude' ? 'Gratitude' : 'Hardship & ease';
  return <Link className="related-topic" href={`/topics/${id}`}><div><h3>{label}</h3><p>{reason}</p></div><ArrowUpRight size={19} /></Link>;
}
