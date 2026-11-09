import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { sources } from '@/lib/content';

export const metadata: Metadata = { title: 'Sources & editorial approach' };

export default function SourcesPage() {
  return <><Header active="Sources" /><main id="main" className="page-shell utility-page sources-page"><span className="eyebrow">FOLLOW THE REFERENCE</span><h1>Sources stay in view.</h1><p className="utility-lead">A topic is a starting point. The original text, its author, and its context should always be within reach.</p><div className="source-directory">{Object.values(sources).map((source) => <a key={source.id} className="source-directory-row" href={source.href} target="_blank" rel="noreferrer"><span className="eyebrow">{source.kind}</span><div><h2>{source.title}</h2><p>{source.credit}</p></div><ArrowUpRight size={19} /></a>)}</div><div className="editorial-prose source-method"><h2>About this first build</h2><p>Reference links and the sample reading excerpt were checked against the linked sources on 9 November 2026. Editorial introductions, word descriptions, and topic connections are drafts awaiting review.</p><p>The Quran excerpt is translated by Dr. Mustafa Khattab, The Clear Quran. Hadith descriptions are editorial summaries with links to complete narrations. They are not presented as verbatim hadith translations.</p><p>Provider access, reuse permissions, scholarly review, and the complete Quran integration must be settled before a public release. No publisher affiliation or approval is implied.</p><h2>Content and privacy</h2><p>This local prototype has no user accounts, analytics, or backend data collection. It stores a theme preference and Arabic text size in this browser. External source websites have their own privacy practices.</p></div></main><Footer /></>;
}
