import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function NotFound() {
  return <><Header /><main id="main" className="page-shell utility-page"><span className="eyebrow">404 / A DIFFERENT PATH</span><h1>This page isn’t in the index.</h1><p className="utility-lead">Return to Explore to find the topics available in this first build.</p><Link className="text-link" href="/"><ArrowLeft size={15} />Back to Explore</Link></main><Footer /></>;
}
