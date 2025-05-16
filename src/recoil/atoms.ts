import { Music } from '@/type/interface';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'sessionStorage',
  storage: sessionStorage,
});

export const musicAtom = atom<Music | null>({
  key: 'musicAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
