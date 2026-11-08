export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Mirrors the Tailwind `lg` screen: below this width the mobile design applies. */
export const DESKTOP_QUERY = '(min-width: 900px)';

export const isDesktopViewport = () =>
  typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches;
