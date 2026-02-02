import { Music } from '@/type/interface';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage<Music | null>(() =>
  typeof window !== 'undefined' ? window.sessionStorage : ({} as Storage),
);

export const musicAtom = atomWithStorage<Music | null>(
  'musicAtom',
  null,
  storage,
);
