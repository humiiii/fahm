'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';
import { searchTopics } from '@/lib/search';

const categories = ['All topics', 'Inner life', 'Character'];

export function ExploreIndex({ initialQuery = '', searchPage = false }: { initialQuery?: string; searchPage?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('All topics');
  const visible = searchTopics(query, category);

  return <>
    <section className="explore-heading" aria-labelledby="explore-title">
      <div><div className="eyebrow"><span className="blue-dot" />{searchPage ? 'FIND YOUR STARTING POINT' : 'AN INDEX FOR THE CURIOUS'}</div>
        <h1 id="explore-title">What would you like<br />to understand?</h1>
        <p className="hero-description">Explore Islamic ideas, with the words,<br className="desktop-break" /> the context, and the sources together.</p>
      </div>
      <div className="hero-annotation" aria-hidden="true"><span className="hero-arabic arabic" lang="ar" dir="rtl">فَهْم</span><span className="annotation-rule" /><span>fahm <span className="annotation-slash">/</span> understanding</span><span className="annotation-small">A word. A beginning.</span></div>
    </section>
    <div className="explore-grid">
      <aside className="explore-sidebar"><div className="index-kicker">THE INDEX <span>01—03</span></div><h2>Follow a question.<br />Find some clarity.</h2><p>Start wherever you are.<br />Every topic leads back<br />to its sources.</p><a className="text-link sidebar-begin" href="#topic-list">Browse topics<ArrowDown size={14} /></a>
        <div className="sidebar-note"><span className="tiny-rule" /><span>No account needed.<br />Just a little curiosity.</span></div>
      </aside>
      <section className="index-main" aria-label="Explore topics">
        <div className="topic-search"><Search size={21} strokeWidth={1.5} /><label className="sr-only" htmlFor="topic-search">Search topics, concepts, or words</label><input id="topic-search" type="search" placeholder="A topic, a question, a word…" value={query} onChange={(event) => setQuery(event.target.value)} autoFocus={searchPage} autoComplete="off" />{query && <button className="icon-button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}<span className="search-hint">EXPLORE</span></div>
        <div className="search-suggestions"><span>Try</span>{['hardship', 'sabr', 'gratitude'].map((term) => <button key={term} onClick={() => { setQuery(term); setCategory('All topics'); }}>{term}<ArrowUpRight size={11} /></button>)}</div>
        <div className="topic-filters" aria-label="Filter topics">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}{item === 'All topics' && <span>03</span>}</button>)}</div>
        <div id="topic-list" className="topic-list"><p className="sr-only" aria-live="polite">{visible.length} {visible.length === 1 ? 'topic' : 'topics'} found</p>
          {visible.map((topic) => <Link href={`/topics/${topic.id}`} key={topic.id} className={`topic-row ${topic.featured ? 'featured-topic' : ''}`}>
            <span className="topic-number">0{['hardship-and-ease', 'patience', 'gratitude'].indexOf(topic.id) + 1}</span>
            <div className="topic-row-body"><div className="topic-row-meta"><span>{topic.category}</span>{topic.featured && <span className="start-label">A GOOD PLACE TO BEGIN</span>}</div><h2>{topic.title}<ArrowUpRight size={24} strokeWidth={1.25} /></h2><p>{topic.description}</p><span className="topic-row-bottom">{topic.referenceIds.length} sources<span>·</span>{topic.readingMinutes} min exploration</span></div>
            <span className="topic-row-arabic arabic" lang="ar" dir="rtl">{topic.arabic}</span>
          </Link>)}
          {!visible.length && <div className="search-empty"><Search size={25} /><h2>No topic found yet.</h2><p>This first index has three topics. Try “hardship”, “sabr”, or “gratitude”.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All topics'); }}>Show all topics<ArrowRight size={15} /></button></div>}
        </div>
        <div className="index-end"><span>A small index, thoughtfully connected.</span><Link href="/about">How we choose our sources<ArrowUpRight size={13} /></Link></div>
      </section>
    </div>
  </>;
}
