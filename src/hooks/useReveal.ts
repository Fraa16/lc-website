import { useEffect, useRef, useState } from 'react';
import { observeReveal } from '../lib/motion';

/**
 * Reveals an element the first time it scrolls into view.
 *
 * Replaces the IntersectionObserver block that was copy-pasted into all
 * eleven section components — including its stale-ref cleanup bug, where the
 * effect's teardown read `sectionRef.current` after it had already changed.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeReveal(el, () => setIsIn(true));
  }, []);

  return { ref, isIn };
}
