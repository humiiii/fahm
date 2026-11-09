import Link from 'next/link';
import { Compass } from 'lucide-react';

export function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <span className="footer-brand"><Compass size={16} />Fahm <span className="footer-dot">/</span> A place for understanding.</span>
    <div className="footer-links"><span className="preview-dot" />Local preview · Editorial review pending<Link href="/about">About this project</Link></div>
  </div></footer>;
}
