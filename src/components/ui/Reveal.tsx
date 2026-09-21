import { createElement, type ElementType, type ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { cx } from '../../lib/cx';

interface RevealProps {
  /** Optional so Reveal can also animate in bare rules and dividers. */
  children?: ReactNode;
  /** Stagger offset in ms. Capped low — the old code ran up to 1000ms + 120ms
   *  per item, so the last trust card appeared ~2.4s after it scrolled in. */
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
}

export default function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
  id,
}: RevealProps) {
  const { ref, isIn } = useReveal<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      id,
      className: cx('lc-reveal', isIn && 'is-in', className),
      style: { '--reveal-delay': `${delay}ms` } as React.CSSProperties,
    },
    children
  );
}
