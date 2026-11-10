import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = { title: 'About the project' };
export default function AboutPage() {
  return <><Header /><main id="main" className="page-shell utility-page about-page"><span className="eyebrow">A PLACE FOR UNDERSTANDING</span><h1>Begin with curiosity.<br />Stay close to the source.</h1><div className="editorial-prose"><p>Fahm is a work in progress: a quieter way to explore Islamic ideas, bringing passages, definitions, and published explanations into one reading experience.</p><p>Topics are the starting point. You can follow references, look closer at a word, and open the surrounding passage without collecting or organizing anything first.</p><h2>A small first step</h2><p>This local prototype includes one developed topic, Hardship & ease, and two short reference-led explorations: Patience and Gratitude. The first experience uses live Quran text, Saheeh International translation, word meanings, and published Ibn Kathir commentary from Quran Foundation, with all eight verses of Ash-Sharh available in the reader. A related hadith opens its complete Arabic, English translation, grading, and published explanation from HadeethEnc.com. More chapters and audio are still to come.</p><h2>How connections are chosen</h2><p>Each topic uses an explicit list of references and related topics. Connections are labelled as editorial and need review before public release. The prototype does not generate answers or make religious rulings.</p></div><div className="about-actions"><Link className="button-primary" href="/topics/hardship-and-ease">Explore the first topic<ArrowRight size={16} /></Link><Link className="text-link" href="/sources">Read about the sources<ArrowRight size={15} /></Link></div></main><Footer /></>;
}
