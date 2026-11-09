import { isDesktopViewport, prefersReducedMotion } from './motion';

export type SectionId =
  | 'top'
  | 'herausforderung'
  | 'vergleich'
  | 'system'
  | 'rechner'
  | 'ablauf'
  | 'ueber'
  | 'stimmen'
  | 'faq'
  | 'termin';

/**
 * Smooth-scrolls to a section, leaving room for the floating nav
 * (100px offset on desktop, 84px on mobile), then moves keyboard focus there.
 */
export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) {
    // Not on the landing page (e.g. /impressum): go there and land on the section.
    window.location.assign(id === 'top' ? '/' : `/#${id}`);
    return;
  }

  const offset = isDesktopViewport() ? 100 : 84;
  const top = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

  if (el.hasAttribute('tabindex')) {
    el.focus({ preventScroll: true });
  }
}
