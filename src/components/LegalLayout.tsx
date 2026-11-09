import { useEffect, type ReactNode } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import { Eyebrow, containerClass, h2Default, leadClass } from './ui/SectionHeader';
import { cx } from '../lib/cx';

/** Shell for the legal pages: site nav and footer around a narrow text column. */
export default function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Leibinn Consulting`;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, follow';
    document.head.appendChild(robots);
    return () => {
      document.title = previousTitle;
      robots.remove();
    };
  }, [title]);

  return (
    <div className="min-h-screen overflow-x-clip bg-cream text-navy">
      <NavBar />
      <main
        id="inhalt"
        className={cx(
          containerClass,
          'pb-[88px] pt-11 lg:pb-[clamp(96px,10vw,144px)] lg:pt-[clamp(56px,7vw,96px)]'
        )}
      >
        <div className="max-w-[820px]">
          <Eyebrow>Rechtliches</Eyebrow>
          <h1 className={cx(h2Default, 'mt-5 lg:mt-[26px]')}>{title}</h1>
          {intro && <p className={cx(leadClass, 'mt-5 text-navy/68 lg:mt-6')}>{intro}</p>}
          <div className="mt-10 divide-y divide-navy/12 border-t border-navy/12 lg:mt-14">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="py-7 lg:py-8">
      <h2 className="text-[22px] font-medium leading-[1.2] tracking-[-0.025em] lg:text-[24px]">{heading}</h2>
      <div className="mt-4 space-y-3 text-[16px] leading-[1.65] text-navy/68 [&_a:hover]:text-gold-dark [&_a]:text-navy [&_a]:underline [&_a]:decoration-gold [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
