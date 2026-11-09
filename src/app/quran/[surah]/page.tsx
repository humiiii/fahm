import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DetailProvider, VersePassage } from '@/components/study-tools';

export const metadata: Metadata = { title: 'Ash-Sharh · 94:5–6' };

export default async function ReaderPage({ params }: { params: Promise<{ surah: string }> }) {
  const { surah } = await params;
  if (surah !== '94') notFound();
  return <><Header active="Quran" /><DetailProvider><main id="main" className="page-shell reader-page"><div className="breadcrumb"><Link href="/topics/hardship-and-ease"><ArrowLeft size={14} />Back to Hardship & ease</Link></div><div className="reader-heading"><div><span className="eyebrow">CHAPTER 094 <span className="eyebrow-slash">/</span> PASSAGE PREVIEW</span><h1>Ash-Sharh</h1><p>The Relief · Reading verses 5–6 of 8</p></div><span className="arabic" dir="rtl" lang="ar">الشرح</span></div><VersePassage reader /><div className="reader-bottom"><p>The complete chapter and audio are available at the original source.</p><a className="text-link" href="https://quran.com/94" target="_blank" rel="noreferrer">Continue on Quran.com<ArrowUpRight size={15} /></a></div></main></DetailProvider><Footer /></>;
}
