import type { ElementType, ReactNode } from 'react';
import { cx } from '../../lib/cx';

interface ContainerProps {
  children: ReactNode;
  /** `wide` for image-led sections, `prose` for forms and long-form copy. */
  size?: 'default' | 'wide' | 'prose';
  className?: string;
  as?: ElementType;
}

/**
 * One measure for the whole site. The original had five competing widths
 * (max-w-6xl, max-w-7xl, max-w-[1280px], max-w-[1400px], max-w-[650px]) with
 * three different gutter scales, so no two sections lined up vertically.
 */
export default function Container({
  children,
  size = 'default',
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={cx(
        'lc-container',
        size === 'wide' && 'lc-container-wide',
        size === 'prose' && 'lc-container-prose',
        className
      )}
    >
      {children}
    </Tag>
  );
}
