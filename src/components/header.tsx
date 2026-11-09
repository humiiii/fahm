import Link from 'next/link';
import { ArrowUpRight, Compass, Search } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Header({ active = 'Explore' }: { active?: string }) {
  return <header className="site-header">
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="header-inner">
      <Link href="/" className="brand" aria-label="Fahm home"><Compass size={25} strokeWidth={1.5} /><span>Fahm<span className="brand-period">.</span></span></Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/" aria-current={active === 'Explore' ? 'page' : undefined}>Explore</Link>
        <Link href="/quran" aria-current={active === 'Quran' ? 'page' : undefined}>Quran</Link>
        <Link href="/sources" aria-current={active === 'Sources' ? 'page' : undefined}>Sources<ArrowUpRight size={12} /></Link>
      </nav>
      <div className="header-actions"><Link className="icon-button" href="/search" aria-label="Search topics"><Search size={18} /></Link><span className="header-divider" /><ThemeToggle /></div>
    </div>
  </header>;
}
