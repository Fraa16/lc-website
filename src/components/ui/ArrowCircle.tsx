import { ArrowRight } from 'lucide-react';
import { cx } from '../../lib/cx';

interface ArrowCircleProps {
  tone?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md';
  className?: string;
}

const tones = {
  dark: 'border-white/20 text-gold-light group-hover:border-gold group-hover:bg-gold group-hover:text-navy',
  light: 'border-navy/20 text-navy group-hover:border-navy group-hover:bg-navy group-hover:text-cream',
  gold: 'border-transparent bg-gold text-navy group-hover:bg-gold-light',
} as const;

/**
 * Decorative circular arrow that reacts to its parent's `group` hover.
 * Not focusable — the whole row or card is the control.
 */
export default function ArrowCircle({ tone = 'dark', size = 'md', className }: ArrowCircleProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'inline-flex flex-shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ease-brand group-hover:rotate-[-45deg]',
        size === 'sm' ? 'h-9 w-9' : 'h-11 w-11',
        tones[tone],
        className
      )}
    >
      <ArrowRight className={size === 'sm' ? 'h-4 w-4' : 'h-[1.1rem] w-[1.1rem]'} strokeWidth={1.75} />
    </span>
  );
}
