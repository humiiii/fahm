import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ExploreIndex } from '@/components/explore-index';

export const metadata: Metadata = { title: 'Search topics' };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <><Header /><main id="main" className="page-shell"><ExploreIndex initialQuery={q ?? ''} searchPage /></main><Footer /></>;
}
