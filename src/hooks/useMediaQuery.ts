import { useCallback, useSyncExternalStore } from 'react';
import { DESKTOP_QUERY } from '../lib/motion';

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** True from 900px up – the breakpoint where the desktop design takes over. */
export const useIsDesktop = () => useMediaQuery(DESKTOP_QUERY);
