'use client';

import { Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { AnimatePresence, m } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { ParticleLogo } from './ParticleLogo';

// 사용자가 가만히 있어도 일정 시간 후 자동으로 홈으로 진입한다.
const AUTO_ADVANCE_MS = 5000;

interface CinematicIntroProps {
  /** 페이드 아웃이 끝난 뒤 호출 — 게이트가 인트로를 언마운트하고 '봤음'을 기록한다. */
  onFinish: () => void;
}

// 첫 방문(또는 리플레이) 시 재생되는 시그니처 인트로.
// Classic 홈 상단과 동일한 파티클 로고(정지·비인터랙티브)가 응집된 뒤 홈으로 페이드.
export default function CinematicIntro({ onFinish }: CinematicIntroProps) {
  const [leaving, setLeaving] = useState(false);

  const finish = () => setLeaving(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLeaving(true), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!leaving && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-100 bg-black"
        >
          {/* Classic 홈(ParticleLogoBox)과 동일한 로고 구성 — 마우스 산란·회전 없음 */}
          <Canvas camera={{ position: [0, 0, 2.8], fov: 42 }} dpr={[1, 2]}>
            <ambientLight intensity={0.8} />
            <Suspense fallback={null}>
              <ParticleLogo interactive={false} rotate={false} />
            </Suspense>
            <Sparkles
              count={30}
              scale={[9, 4.5, 4]}
              size={1.4}
              speed={0.3}
              color="#c0a8eb"
              opacity={0.4}
            />
            <EffectComposer>
              <Bloom
                intensity={0.35}
                luminanceThreshold={0.4}
                luminanceSmoothing={0.3}
                mipmapBlur
                radius={0.5}
              />
            </EffectComposer>
          </Canvas>

          {/* 건너뛰기 */}
          <button
            type="button"
            onClick={finish}
            className="absolute top-5 right-5 z-10 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
          >
            건너뛰기
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
