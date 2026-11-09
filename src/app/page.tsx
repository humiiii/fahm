import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ExploreIndex } from '@/components/explore-index';

export default function Home() {
  return <><Header /><main id="main" className="page-shell"><ExploreIndex /></main><Footer /></>;
}
