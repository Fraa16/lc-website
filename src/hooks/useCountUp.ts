import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

const NUMBER_PATTERN = /^(\D*?)(\d+(?:,\d+)?)(.*)$/;
const DURATION = 1500;

/**
 * Counts the number inside `value` up from 0 once the element is 50% visible.
 * Keeps prefix/suffix ("Mrd. €", "Tage") and the German decimal comma ("19,5").
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(value: string) {
  const ref = useRef<T>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
    const el = ref.current;
    const match = value.match(NUMBER_PATTERN);
    if (!el || !match || !('IntersectionObserver' in window) || prefersReducedMotion()) return;

    const [, prefix, number, suffix] = match;
    const decimals = (number.split(',')[1] ?? '').length;
    const target = parseFloat(number.replace(',', '.'));
    let frame = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const k = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - k, 3);
          setText(
            k < 1
              ? prefix +
                  (target * eased).toLocaleString('de-DE', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                  }) +
                  suffix
              : value
          );
          if (k < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return { ref, text };
}
