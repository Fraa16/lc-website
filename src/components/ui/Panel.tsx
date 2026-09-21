import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

interface PanelProps {
  children: ReactNode;
  /** Optional top bar: label on the left, meta on the right, hairline under. */
  label?: string;
  meta?: string;
  /** Shows a small dot before the meta text, as a status marker. */
  metaDot?: boolean;
  tone?: 'raised' | 'gold' | 'paper';
  className?: string;
  bodyClassName?: string;
}

const tones = {
  raised: 'bg-navy-2 ring-1 ring-inset ring-white/8',
  gold: 'bg-gold-gradient',
  paper: 'bg-cream ring-1 ring-inset ring-navy/10',
} as const;

const labelTone = {
  raised: 'text-gold-light',
  gold: 'text-navy/70',
  paper: 'text-gold-deep',
} as const;

const metaTone = {
  raised: 'text-sheet-3',
  gold: 'text-navy/60',
  paper: 'text-ink-3',
} as const;

const ruleTone = {
  raised: 'bg-white/10',
  gold: 'bg-navy/15',
  paper: 'bg-navy/10',
} as const;

/**
 * The large rounded block the reference builds most of its page from.
 * Three tones let a dark page still have three levels of surface:
 * raised (default), gold (the one loud accent) and paper (the bright
 * moment reserved for the form).
 */
export default function Panel({
  children,
  label,
  meta,
  metaDot = false,
  tone = 'raised',
  className,
  bodyClassName,
}: PanelProps) {
  const hasBar = Boolean(label || meta);

  return (
    <div className={cx('relative overflow-hidden rounded-3xl', tones[tone], className)}>
      {hasBar && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-9">
            {label && (
              <span className={cx('text-meta uppercase', labelTone[tone])}>{label}</span>
            )}
            {meta && (
              <span className={cx('inline-flex items-center gap-2 text-meta uppercase', metaTone[tone])}>
                {metaDot && (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                )}
                {meta}
              </span>
            )}
          </div>
          <div aria-hidden="true" className={cx('h-px w-full', ruleTone[tone])} />
        </>
      )}

      <div className={cx('px-6 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-14', bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
