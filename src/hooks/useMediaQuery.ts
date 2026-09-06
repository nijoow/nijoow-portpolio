'use client';

import { useCallback, useSyncExternalStore } from 'react';

const getServerSnapshot = () => false;

export const FINE_POINTER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)';
export const REDUCED_MOTION_MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
