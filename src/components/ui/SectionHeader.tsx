import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Reveal } from './Reveal';

export function Eyebrow({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'flex items-center gap-3 text-[12px] font-semibold uppercase leading-none tracking-[0.08em] lg:gap-[14px] lg:text-[13px]',
        dark ? 'text-gold-light' : 'text-gold-dark',
        className
      )}
    >
      <span aria-hidden="true" className="h-[1.5px] w-7 flex-none bg-gold lg:w-9" />
      {children}
    </div>
  );
}

/** Standard H2: 36px on mobile, clamp(40px, 4.4vw, 64px) on desktop. */
export const h2Default =
  'm-0 text-balance text-[36px] font-medium leading-[1.02] tracking-[-0.045em] lg:text-[clamp(40px,4.4vw,64px)] lg:leading-none';

/** Large H2 (System, Ablauf): clamp(44px, 5vw, 76px) on desktop. */
export const h2Large =
  'm-0 font-medium leading-[0.98] tracking-[-0.05em] lg:text-[clamp(44px,5vw,76px)]';

/** Lead paragraph next to section headings. */
export const leadClass =
  'm-0 text-pretty text-[17px] leading-[1.55] lg:text-[19px]';

/** Gold-dark uppercase kicker under a lead paragraph. */
export const kickerClass =
  'text-[12px] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-gold-dark';

/**
 * Two-column section header (desktop: eyebrow + H2 left, lead right;
 * mobile: stacked with 20px gaps).
 */
export function SectionHeader({
  eyebrow,
  title,
  titleId,
  titleClassName = h2Default,
  children,
  align = 'end',
  dark = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  titleId?: string;
  titleClassName?: string;
  children?: ReactNode;
  align?: 'start' | 'end';
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cx(
        'flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-[clamp(40px,6vw,120px)]',
        align === 'end' ? 'lg:items-end' : 'lg:items-start',
        className
      )}
    >
      <div className="flex flex-col gap-5 lg:gap-[26px]">
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 id={titleId} className={titleClassName}>
          {title}
        </h2>
      </div>
      {children}
    </Reveal>
  );
}

/** Max-width content container with the design's side gutters. */
export const containerClass =
  'mx-auto w-full max-w-[1280px] px-5 sm:px-[clamp(24px,4vw,56px)]';

/** Top padding between stacked sections. */
export const sectionSpacing = 'pt-[88px] lg:pt-[clamp(96px,10vw,144px)]';

/** Shared props for sections reachable from the nav. */
export const anchorClass = 'scroll-mt-[84px] outline-none lg:scroll-mt-[100px]';
