import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';
import { Header } from './header';
import { Footer } from './footer';

export function ReadingLoading() {
  return <><Header /><main id="main" className="page-shell reading-state" aria-busy="true"><span className="eyebrow">KEEPING THE SOURCE CLOSE</span><h1>Opening the passage.</h1><p role="status">Loading the text, translation, and surrounding context.</p><div className="reading-skeleton" aria-hidden="true"><span /><span /><span /></div><Link className="text-link" href="/"><ArrowLeft size={14} />Return to Explore</Link></main><Footer /></>;
}

export function ReadingFailure({ retry }: { retry: () => void }) {
  return <><Header /><main id="main" className="page-shell reading-state"><span className="eyebrow">THE SOURCE IS TEMPORARILY UNAVAILABLE</span><h1>A pause in the reading.</h1><p role="alert">We couldn’t load the complete passage. Try again, or continue reading at the original source.</p><div className="reading-state-actions"><button className="button-primary" onClick={retry}>Try again<BookOpen size={15} /></button><a className="text-link" href="https://quran.com/94" target="_blank" rel="noreferrer">Read Ash-Sharh on Quran.com<ArrowUpRight size={14} /></a></div><Link className="text-link" href="/"><ArrowLeft size={14} />Return to Explore</Link></main><Footer /></>;
}
