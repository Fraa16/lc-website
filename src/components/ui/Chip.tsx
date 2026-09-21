import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

interface ChipProps {
  children: ReactNode;
  /** Small leading dot, used as a status marker in the reference. */
  dot?: boolean;
  tone?: 'dark' | 'light' | 'gold';
  className?: string;
}

const tones = {
  dark: 'border-white/15 text-sheet-2',
  light: 'border-navy/15 text-ink-2',
  gold: 'border-gold/40 bg-gold/10 text-gold-light',
} as const;

/** Bordered pill carrying a short uppercase label. */
export default function Chip({ children, dot = false, tone = 'dark', className }: ChipProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-meta uppercase',
        tones[tone],
        className
      )}
    >
      {dot && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />}
      {children}
    </span>
  );
}
