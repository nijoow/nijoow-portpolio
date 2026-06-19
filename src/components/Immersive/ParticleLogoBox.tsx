'use client';

import { OrbitControls, Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { ParticleLogo } from './ParticleLogo';

// 클래식 홈 상단 — 얇은 필기체 로고를 작은 파티클로 살린 "빛나는 서명".
export default function ParticleLogoBox() {
  return (
    <div className="relative mb-8 h-[200px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black sm:h-[320px]">
      <Canvas camera={{ position: [0, 0, 2.8], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <OrbitControls enablePan={false} minDistance={2} maxDistance={7} />
        <Suspense fallback={null}>
          {/* 아주 작은 포인트로 얇은 획 유지, 노멀 블렌딩으로 손글씨가 또렷 */}
          <ParticleLogo
            interactive={false}
            additive={false}
            count={28000}
            sizeScale={0.13}
            jitter={0.004}
          />
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
      <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_10px_40px_rgba(0,0,0,0.55)]" />
    </div>
  );
}
