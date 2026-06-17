'use client';

import { Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { ParticleLogo } from './ParticleLogo';

// 클래식 홈 상단의 반짝이는 파티클 로고(마우스 인터랙션 없음).
export default function ParticleLogoBox() {
  return (
    <div className="relative mb-8 h-[200px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black sm:h-[280px]">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <ParticleLogo interactive={false} />
        </Suspense>
        <Sparkles
          count={40}
          scale={[11, 5, 4]}
          size={2}
          speed={0.3}
          color="#c0a8eb"
          opacity={0.5}
        />
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.4}
            mipmapBlur
            radius={0.7}
          />
        </EffectComposer>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_10px_40px_rgba(0,0,0,0.55)]" />
    </div>
  );
}
