/**
 * Thin line icons taken 1:1 from the design handoff.
 * All strokes use currentColor, so colour them with text-* classes.
 */
import type { SVGProps } from 'react';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'viewBox'> & { size?: number };

const base = (size: number, viewBox: string, props: Omit<IconProps, 'size'>) => ({
  width: size,
  height: size,
  viewBox,
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
});

/* ---------- Arrows & controls ---------- */

export const ArrowUpRight = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, '0 0 14 14', p)} strokeWidth={1.6}>
    <path d="M4 10L10 4M5 4h5v5" />
  </svg>
);

/** 16-unit arrow used inside small outline buttons. */
export const ArrowRightSmall = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, '0 0 16 16', p)} strokeWidth={1.6}>
    <path d="M2 8h12M9 3l5 5-5 5" />
  </svg>
);

export const ArrowRight = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, '0 0 20 20', p)} strokeWidth={1.6}>
    <path d="M3 10h14M12 5l5 5-5 5" />
  </svg>
);

export const ArrowLeft = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, '0 0 20 20', p)} strokeWidth={1.6}>
    <path d="M17 10H3M8 5l-5 5 5 5" />
  </svg>
);

export const Check = ({ size = 14, strokeWidth = 1.8, ...p }: IconProps) => (
  <svg {...base(size, '0 0 14 14', p)} strokeWidth={strokeWidth}>
    <path d="M3 7.5l2.5 2.5L11 4.5" />
  </svg>
);

export const CrossSmall = ({ size = 12, ...p }: IconProps) => (
  <svg {...base(size, '0 0 12 12', p)} strokeWidth={1.5}>
    <path d="M3 3l6 6M9 3l-6 6" />
  </svg>
);

export const Close = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size, '0 0 14 14', p)} strokeWidth={1.6}>
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
);

export const Menu = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, '0 0 18 18', p)} strokeWidth={1.6}>
    <path d="M3 6h12M3 12h12" />
  </svg>
);

/* ---------- Trust items (16) ---------- */

export const Shield = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, '0 0 16 16', p)} strokeWidth={1.4}>
    <path d="M8 1.5l5 2v4c0 3-2.1 5.6-5 6.5-2.9-.9-5-3.5-5-6.5v-4z" />
  </svg>
);

export const User = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, '0 0 16 16', p)} strokeWidth={1.4}>
    <circle cx="8" cy="5.5" r="2.8" />
    <path d="M2.5 14c.8-2.8 3-4.2 5.5-4.2s4.7 1.4 5.5 4.2" />
  </svg>
);

export const Zap = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, '0 0 16 16', p)} strokeWidth={1.4}>
    <path d="M9 1.5L3.5 9H8l-1 5.5L12.5 7H8z" />
  </svg>
);

export const Percent = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size, '0 0 16 16', p)} strokeWidth={1.4}>
    <path d="M3.5 12.5l9-9" />
    <circle cx="4.5" cy="4.5" r="2" />
    <circle cx="11.5" cy="11.5" r="2" />
  </svg>
);

/* ---------- Hero stat badges (20) ---------- */

export const TrendUp = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, '0 0 20 20', p)} strokeWidth={1.6}>
    <path d="M3 15l4.5-4.5 3 3L17 7M12.5 7H17v4.5" />
  </svg>
);

export const Card = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, '0 0 20 20', p)} strokeWidth={1.6}>
    <rect x="3" y="5" width="14" height="10" rx="2" />
    <path d="M3 9h14" />
  </svg>
);

/* ---------- Problem fields (26) ---------- */

export const Layers = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size, '0 0 26 26', p)} strokeWidth={1.4}>
    <path d="M13 3l10 5-10 5L3 8z M3 13l10 5 10-5 M3 18l10 5 10-5" />
  </svg>
);

export const FileText = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size, '0 0 26 26', p)} strokeWidth={1.4}>
    <path d="M7 3h9l5 5v15H7z M16 3v5h5 M10 13h8 M10 17h8" />
  </svg>
);

export const Users = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size, '0 0 26 26', p)} strokeWidth={1.4}>
    <circle cx="10" cy="9" r="4" />
    <path d="M3 21c1-3.6 3.8-5.5 7-5.5s6 1.9 7 5.5 M17 5.5a3.5 3.5 0 010 7 M19 15.8c2 .7 3.4 2.4 4 5.2" />
  </svg>
);

export const EyeOff = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size, '0 0 26 26', p)} strokeWidth={1.4}>
    <path d="M3 13s3.6-6.5 10-6.5S23 13 23 13s-3.6 6.5-10 6.5S3 13 3 13z" />
    <circle cx="13" cy="13" r="3" />
    <path d="M4 22L22 4" />
  </svg>
);

export const PercentLarge = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size, '0 0 26 26', p)} strokeWidth={1.4}>
    <path d="M6 20L20 6" />
    <circle cx="7.5" cy="7.5" r="3" />
    <circle cx="18.5" cy="18.5" r="3" />
  </svg>
);
