import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getAshSharhExperience } from '@/lib/quran/server';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DetailProvider, ReferenceCard, VersePassage } from '@/components/study-tools';

export const metadata: Metadata = { title: 'Ash-Sharh · Complete surah' };

export default async function ReaderPage({ params }: { params: Promise<{ surah: string }> }) {
  const { surah } = await params;
  if (surah !== '94') notFound();
  await connection();
  const chapter = await getAshSharhExperience();
  return <><Header active="Quran" /><DetailProvider chapter={chapter}><main id="main" className="page-shell reader-page"><div className="breadcrumb"><Link href="/topics/hardship-and-ease"><ArrowLeft size={14} />Back to Hardship & ease</Link></div><div className="reader-heading"><div><span className="eyebrow">CHAPTER 094 <span className="eyebrow-slash">/</span> COMPLETE SURAH</span><h1>Ash-Sharh</h1><p>The Relief · All 8 verses</p></div><span className="arabic" dir="rtl" lang="ar">الشرح</span></div><VersePassage reader /><div className="reader-context-source"><ReferenceCard id="ibn-kathir" /></div><div className="reader-bottom"><p>Arabic text, word meanings, and commentary · Quran Foundation.</p><a className="text-link" href="https://quran.com/94" target="_blank" rel="noreferrer">Continue on Quran.com<ArrowUpRight size={15} /></a></div></main></DetailProvider><Footer /></>;
}
