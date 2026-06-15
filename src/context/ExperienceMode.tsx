'use client';

import { useSyncExternalStore } from 'react';

export type ExperienceMode = 'immersive' | 'classic';

const KEY = 'nijoow-experience-mode';
const EVENT = 'nijoow-experience-mode-change';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(EVENT, callback);
  };
}

function getSnapshot(): ExperienceMode {
  return window.localStorage.getItem(KEY) === 'classic'
    ? 'classic'
    : 'immersive';
}

function getServerSnapshot(): ExperienceMode {
  return 'immersive';
}

/** 현재 경험 모드(immersive=새 3D / classic=기존 페이지)를 구독한다. */
export function useExperienceMode(): ExperienceMode {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** 경험 모드를 변경하고 같은 탭에도 알린다. */
export function setExperienceMode(mode: ExperienceMode) {
  window.localStorage.setItem(KEY, mode);
  window.dispatchEvent(new Event(EVENT));
}
