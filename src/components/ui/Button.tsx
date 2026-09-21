import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { scrollToId } from '../../lib/motion';

type Variant = 'primary' | 'outlineLight' | 'outlineDark';
type Size = 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Renders an anchor and smooth-scrolls to this section id. */
  toId?: string;
  type?: 'button' | 'submit';
  className?: string;
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold ' +
  'whitespace-nowrap transition-[transform,box-shadow,background-position,border-color,background-color] ' +
  'duration-300 ease-brand active:translate-y-0 ' +
  'disabled:pointer-events-none disabled:opacity-55';

const variants: Record<Variant, string> = {
  /* Navy on gold is 11.9:1. The original used white on the same gradient in
     two sections, which lands at 1.7:1 against the light end of the ramp. */
  primary:
    'bg-gold-gradient bg-[length:200%_100%] bg-left text-navy ' +
    'shadow-[0_2px_10px_rgb(182_143_64_/_0.28)] ' +
    'hover:bg-right hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgb(182_143_64_/_0.38)]',

  outlineLight:
    'border border-white/25 text-sheet-1 hover:border-gold-light hover:bg-white/[0.06] ' +
    'hover:-translate-y-0.5',

  outlineDark:
    'border border-navy/25 text-ink-1 hover:border-navy hover:bg-navy hover:text-cream ' +
    'hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-body-sm',
  lg: 'px-7 py-4 text-body-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'lg',
  toId,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const classes = cx(base, variants[variant], sizes[size], className);

  if (toId) {
    return (
      <a
        href={`#${toId}`}
        className={classes}
        onClick={(e) => {
          e.preventDefault();
          scrollToId(toId);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
