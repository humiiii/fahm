import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = { title: 'Read with context' };
export default function QuranPage() {
  return <><Header active="Quran" /><main id="main" className="page-shell utility-page"><span className="eyebrow">READ WITH CONTEXT</span><h1>A passage to begin with.</h1><p className="utility-lead">The Quran supports every exploration. Read all of Ash-Sharh alongside its translation, word meanings, and published commentary.</p><Link href="/quran/94" className="reader-entry"><span className="reader-entry-number">094</span><div><span className="eyebrow">READ THE COMPLETE SURAH</span><h2>Ash-Sharh</h2><p>The Relief · 8 verses</p></div><span className="arabic" lang="ar" dir="rtl">الشرح</span><ArrowRight size={22} /></Link><div className="utility-note"><BookOpen size={19} /><div><h2>Begin with the topic. Stay for the context.</h2><p>This first experience connects Hardship & ease to Ash-Sharh. More chapters and audio will follow.</p><a className="text-link" href="https://quran.com" target="_blank" rel="noreferrer">Read the complete Quran on Quran.com<ArrowUpRight size={15} /></a></div></div><Link className="text-link" href="/">Return to Explore<ArrowRight size={15} /></Link></main><Footer /></>;
}
