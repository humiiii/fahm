import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getAshSharhExperience } from '@/lib/quran/server';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Clock3, FileText } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContextButton, DetailProvider, ReferenceCard, RelatedTopicLink, VersePassage, WordButton } from '@/components/study-tools';
import { getTopic, topics } from '@/lib/content';
import HardshipIntro from '@/content/hardship-and-ease.mdx';
import PatienceIntro from '@/content/patience.mdx';
import GratitudeIntro from '@/content/gratitude.mdx';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  return { title: topic?.title ?? 'Topic not found', description: topic?.description };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const hardship = slug === 'hardship-and-ease';
  if (hardship) await connection();
  const chapter = hardship ? await getAshSharhExperience() : undefined;
  const Intro = hardship ? HardshipIntro : slug === 'patience' ? PatienceIntro : GratitudeIntro;
  const sectionLinks = hardship ? [['overview', 'Overview'], ['passage', 'In the Quran'], ['hadith', 'A related hadith'], ['context', 'A little context'], ['related', 'Keep exploring']] : [['overview', 'Overview'], ['passage', 'Begin with a source'], ['hadith', 'A related hadith'], ['related', 'Keep exploring']];

  return <><Header /><DetailProvider chapter={chapter}><main id="main" className="page-shell topic-page">
    <div className="breadcrumb"><Link href="/"><ArrowLeft size={14} />All topics</Link><span>/</span><span>{topic.category}</span></div>
    <header className="topic-hero"><div><span className="eyebrow">TOPIC {String(topics.indexOf(topic) + 1).padStart(2, '0')} <span className="eyebrow-slash">/</span> {topic.category.toUpperCase()}</span><h1>{topic.title}</h1><p>{topic.description}</p><a className="button-primary topic-passage-link" href="#passage">{hardship ? 'Read the passage' : 'View Quran reference'}<BookOpen size={16} /></a><div className="topic-meta"><span><Clock3 size={13} />{topic.readingMinutes} min exploration</span><span><FileText size={13} />{topic.referenceIds.length} references</span><span className="draft-label">Editorial draft</span></div></div><div className="topic-hero-arabic"><span className="arabic" lang="ar" dir="rtl">{topic.arabic}</span><small>{topic.transliteration}</small></div></header>
    <div className="topic-layout"><aside className="topic-outline"><span className="eyebrow">ON THIS PAGE</span><nav aria-label="On this page">{sectionLinks.map(([id, label], i) => <a key={id} href={`#${id}`}><span>0{i + 1}</span>{label}</a>)}</nav><Link className="text-link" href="/sources">About our sources<ArrowUpRight size={13} /></Link></aside>
      <div className="topic-body"><section id="overview" className="topic-overview"><div className="section-heading"><span className="eyebrow">01 / START HERE</span><h2>A starting point for understanding.</h2></div><div className="editorial-prose"><Intro /></div><p className="editorial-note"><span className="preview-dot" />Editorial introduction · Review pending</p></section>
      <section id="passage" className="topic-section" tabIndex={-1} aria-labelledby="passage-title"><div className="section-heading"><span className="eyebrow">02 / {hardship ? 'IN THE QURAN' : 'BEGIN WITH A SOURCE'}</span><h2 id="passage-title">{hardship ? 'With hardship comes ease.' : slug === 'patience' ? 'Patience and prayer.' : 'A passage on gratitude.'}</h2><p>{hardship ? 'Two verses, read together. Open a word or follow the passage back to its context.' : 'Open the reference for the complete Arabic, translation, and surrounding passage.'}</p></div>{hardship ? <VersePassage /> : <ReferenceCard id={slug === 'patience' ? 'al-baqarah' : 'ibrahim'} />}</section>
      <section id="hadith" className="topic-section"><div className="section-heading"><span className="eyebrow">03 / A RELATED HADITH</span><h2>Patience and gratitude, side by side.</h2><p>A thematic connection: this narration discusses both responses in the life of a believer.</p></div><ReferenceCard id="muslim-2999" /></section>
      {hardship && <section id="context" className="topic-section"><div className="section-heading"><span className="eyebrow">04 / A LITTLE CONTEXT</span><h2>There is more around the verse.</h2></div><p className="context-intro">Read the complete surah alongside published commentary. The reference below covers Ash-Sharh 94:1–8.</p><ReferenceCard id="ibn-kathir" /><div className="context-link"><ContextButton>See the passage</ContextButton><Link className="text-link" href="/quran/94">Read all 8 verses<ArrowRight size={14} /></Link></div></section>}
      <section id="related" className="topic-section related-section"><div className="section-heading"><span className="eyebrow">{hardship ? '05' : '04'} / KEEP EXPLORING</span><h2>Another way into the topic.</h2><p>Editorial connections, with the reason for each kept in view.</p></div>{topic.related.map((id) => <RelatedTopicLink key={id} id={id} reason={id === 'hardship-and-ease' ? 'Return to the passage in Ash-Sharh and its commentary.' : id === 'patience' ? 'Follow the patience reference in Sahih Muslim 2999.' : 'Follow the gratitude reference in the same narration.'} />)}</section>
      <div className="topic-end-note"><FileText size={16} /><p>Sources linked. Context kept close.<br /><span>Quran content is supplied by Quran Foundation. Editorial introductions and topic connections await review.</span></p></div></div>
      <aside className="topic-companion"><span className="eyebrow">LOOK A LITTLE CLOSER</span><h2>Small words.<br />More to understand.</h2><p>{hardship ? 'Explore the language of this passage.' : 'Follow a source to understand its terms in context.'}</p>{hardship ? <div className="word-list"><WordButton location="94:5:3" /><WordButton location="94:5:4" /></div> : <Link className="text-link" href="/topics/hardship-and-ease">Explore hardship & ease<ArrowRight size={14} /></Link>}<div className="companion-source"><BookOpen size={17} /><p>Understanding starts with<br />reading in context.</p></div></aside>
    </div>
  </main></DetailProvider><Footer /></>;
}
