import { cx } from '../../lib/cx';

interface EyebrowProps {
  children: string;
  /** Ground the label sits on — decides the ink colour. */
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * Section kicker.
 *
 * On light grounds the label is navy ink with a gold rule rather than
 * gold-gradient text: #B68F40 on #F4F3EE is 2.7:1 and #DCC383 is 1.55:1, so
 * the original micro-caps failed WCAG AA by a wide margin. Carrying the gold
 * in a graphic element keeps the brand read and clears the bar.
 */
export default function Eyebrow({ children, tone = 'dark', className }: EyebrowProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-3 text-eyebrow uppercase',
        tone === 'dark' ? 'text-gold-light' : 'text-ink-2',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          'h-px w-7 flex-shrink-0 rounded-full',
          tone === 'dark' ? 'bg-gold-light/70' : 'bg-gold-gradient'
        )}
      />
      {children}
    </span>
  );
}
