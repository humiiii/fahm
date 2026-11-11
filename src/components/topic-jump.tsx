'use client';

import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export function TopicJump({ links }: { links: { id: string; label: string }[] }) {
  const menu = useRef<HTMLDetailsElement>(null);

  return <details className="topic-jump" ref={menu} onKeyDown={(event) => {
    if (event.key === 'Escape' && menu.current?.open) {
      menu.current.open = false;
      menu.current.querySelector('summary')?.focus();
    }
  }}>
    <summary>Jump to section<ChevronDown size={17} /></summary>
    <nav aria-label="Jump to topic section">{links.map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => {
      if (menu.current) menu.current.open = false;
      document.getElementById(id)?.focus({ preventScroll: true });
    }}>{label}</a>)}</nav>
  </details>;
}
