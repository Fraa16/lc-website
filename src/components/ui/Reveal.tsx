import type { HTMLAttributes } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { useReveal } from '../../hooks/useReveal';

/** A div that fades up into place when scrolled into view. */
export function Reveal(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} {...props} />;
}

/**
 * Animated figure. Screen readers get the final value only;
 * the counting text is hidden from assistive tech.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const { ref, text } = useCountUp<HTMLSpanElement>(value);
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
