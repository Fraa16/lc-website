import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import { cx } from '../../lib/cx';

interface SectionHeadProps {
  eyebrow: string;
  /** The headline. Passed as a node so callers can split it over two lines. */
  title: ReactNode;
  /** Sits top-right on wide screens, under the headline on narrow ones. */
  aside?: ReactNode;
  tone?: 'dark' | 'light';
  size?: 'lg' | 'xl';
  className?: string;
}

/**
 * Eyebrow + oversized headline on the left, supporting copy top-right.
 * The reference opens almost every section this way, and it gives long
 * German headlines the width they need instead of a narrow column.
 */
export default function SectionHead({
  eyebrow,
  title,
  aside,
  tone = 'dark',
  size = 'lg',
  className,
}: SectionHeadProps) {
  return (
    <div
      className={cx(
        'grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-16',
        className
      )}
    >
      <div>
        <Reveal>
          <Eyebrow tone={tone === 'dark' ? 'dark' : 'light'}>{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal
          delay={80}
          as="h2"
          className={cx(
            'mt-6',
            size === 'xl' ? 'text-display-xl' : 'text-display-lg',
            tone === 'dark' ? 'text-sheet-1' : 'text-ink-1'
          )}
        >
          {title}
        </Reveal>
      </div>

      {aside && (
        <Reveal
          delay={150}
          className={cx(
            'max-w-measure text-body-lg lg:pt-3',
            tone === 'dark' ? 'text-sheet-2' : 'text-ink-2'
          )}
        >
          {aside}
        </Reveal>
      )}
    </div>
  );
}
