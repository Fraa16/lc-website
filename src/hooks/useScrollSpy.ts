import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently under the header.
 *
 * The original used one IntersectionObserver per section and set the active id
 * on any intersection, so with two sections in view at once the winner was
 * whichever fired last — the highlight regularly jumped to the wrong item.
 * Reading positions directly makes the result deterministic.
 */
export function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.scrollY + offset;
      let current: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= line) {
          current = id;
        }
      }

      // Clear the highlight once the last section has scrolled past, so the
      // footer does not leave a stale item lit.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 80;
      setActiveId(atBottom ? ids[ids.length - 1] ?? null : current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return activeId;
}
