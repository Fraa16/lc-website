import { useLayoutEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

const EASE = 'cubic-bezier(.2,.7,.2,1)';

/**
 * Reveal-on-scroll: elements that start below the fold fade up into place
 * once 10% of them is visible (8% on mobile). Observes once.
 * Elements already in view on load, and users with reduced motion, see no animation.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const mobile = window.innerWidth < 640;
    const duration = mobile ? '.7s' : '.8s';

    // Apply the hidden state first and force a reflow, so it becomes the transition's
    // starting point instead of animating from visible to hidden.
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = `translateY(${mobile ? 20 : 24}px)`;
    void el.offsetHeight;
    el.style.transition = `opacity ${duration} ${EASE}, transform ${duration} ${EASE}`;

    let cleanupTimer = 0;
    const reset = () => {
      el.style.opacity = '';
      el.style.transform = '';
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        reset();
        // Hand transitions back to the element's own classes (e.g. hover backgrounds).
        cleanupTimer = window.setTimeout(() => {
          el.style.transition = '';
        }, 900);
      },
      { threshold: mobile ? 0.08 : 0.1 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(cleanupTimer);
      reset();
      el.style.transition = '';
    };
  }, []);

  return ref;
}
