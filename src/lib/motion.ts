/**
 * Shared motion helpers.
 *
 * A single IntersectionObserver serves every reveal on the page. The previous
 * implementation constructed one observer per section (11 in total) plus the
 * nav's scroll-spy set; this keeps it to two.
 */

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type RevealCallback = () => void;

let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, RevealCallback>();

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = callbacks.get(entry.target);
          if (cb) cb();
          // Reveals run once; releasing the target keeps the observer small.
          callbacks.delete(entry.target);
          observer?.unobserve(entry.target);
        }
      },
      {
        // Fire slightly before the element is fully in view so the motion
        // resolves as it settles rather than after it has already arrived.
        threshold: 0.08,
        rootMargin: '0px 0px -6% 0px',
      }
    );
  }

  return observer;
}

export function observeReveal(el: Element, onReveal: RevealCallback): () => void {
  const obs = getObserver();

  // No observer support, or the visitor asked for reduced motion: show the
  // content immediately rather than leaving it at opacity 0 forever.
  if (!obs || prefersReducedMotion()) {
    onReveal();
    return () => {};
  }

  callbacks.set(el, onReveal);
  obs.observe(el);

  return () => {
    callbacks.delete(el);
    obs.unobserve(el);
  };
}

/** Smooth-scrolls to an element id, respecting the reduced-motion setting. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });

  // scrollIntoView does not move focus, so keyboard users would otherwise
  // carry on tabbing from the link they just activated.
  const previousTabIndex = el.getAttribute('tabindex');
  if (previousTabIndex === null) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  if (previousTabIndex === null) {
    el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
  }
}
