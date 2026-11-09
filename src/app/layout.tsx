import type { Metadata } from 'next';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/amiri-quran/400.css';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Fahm Atlas — A place for understanding', template: '%s · Fahm Atlas' },
  description: 'Explore Islamic topics with Quran passages, hadith references, word meanings, and the context around them.',
  robots: { index: false, follow: false },
};

const themeScript = `(function(){try{var t=localStorage.getItem('fahm-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>;
}
