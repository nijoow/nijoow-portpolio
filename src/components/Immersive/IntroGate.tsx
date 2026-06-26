'use client';

import { RotateCcw } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import CinematicIntro from './CinematicIntroDynamic';

const SEEN_KEY = 'nijoow-intro-seen';

// 인트로 노출 여부를 컴포넌트 외부 스토어로 관리한다.
// useState+useEffect 패턴(effect 내 setState)을 피해 하이드레이션 안정 + 린트 규칙 준수.
let introActive = false;
let initialized = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function ensureInit() {
  if (initialized) return;
  initialized = true;
  const seen = window.localStorage.getItem(SEEN_KEY) === '1';
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  // 첫 방문 + 모션 허용 사용자에게만 자동 재생.
  introActive = !seen && !reduceMotion;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  ensureInit();
  return introActive;
}

function getServerSnapshot() {
  return false;
}

/** 어디서든 인트로를 다시 재생한다(첫 방문 여부와 무관). */
export function replayIntro() {
  introActive = true;
  emit();
}

function finishIntro() {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SEEN_KEY, '1');
  }
  introActive = false;
  emit();
}

function useIntroActive() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * 첫 방문에만 3D 시네마틱 인트로를 자동 재생하고, 끝나면 children(Classic 홈)을 드러낸다.
 * - 노출 정책: localStorage 'nijoow-intro-seen' 플래그로 첫 방문만 자동 재생.
 * - prefers-reduced-motion 사용자는 자동 재생을 건너뛴다(리플레이 버튼으로 명시적 재생은 허용).
 * - 우하단 리플레이 버튼 또는 replayIntro()로 다시 볼 수 있다.
 */
export default function IntroGate({ children }: { children: React.ReactNode }) {
  const active = useIntroActive();

  return (
    <>
      {children}

      {active ? (
        <CinematicIntro onFinish={finishIntro} />
      ) : (
        <button
          type="button"
          onClick={replayIntro}
          aria-label="인트로 다시 보기"
          title="인트로 다시 보기"
          className="group fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 shadow-lg backdrop-blur-md transition-colors hover:bg-black/60 hover:text-white"
        >
          <RotateCcw
            size={18}
            className="transition-transform duration-500 group-hover:-rotate-180"
          />
        </button>
      )}
    </>
  );
}
