'use client';

import { OrbitControls, Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { ParticleLogo } from './ParticleLogo';

// 클래식 홈 상단의 반짝이는 파티클 로고 — 원래처럼 글자가 또렷, 회전 + OrbitControls.
export default function ParticleLogoBox() {
  return (
    <div className="relative mb-8 h-[200px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black sm:h-[320px]">
      <Canvas camera={{ position: [0, 0, 3.6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <OrbitControls enablePan={false} minDistance={2.4} maxDistance={6} />
        <Suspense fallback={null}>
          <group scale={1.5}>
            {/* 밀도↑ + 포인트 크기↓ 로 글자 가독성 확보, 마우스 리펄전 없음 */}
            <ParticleLogo interactive={false} count={18000} sizeScale={0.7} />
          </group>
        </Suspense>
        <Sparkles
          count={36}
          scale={[9, 4.5, 4]}
          size={1.6}
          speed={0.3}
          color="#c0a8eb"
          opacity={0.45}
        />
        <EffectComposer>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.4}
            mipmapBlur
            radius={0.6}
          />
        </EffectComposer>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_10px_40px_rgba(0,0,0,0.55)]" />
    </div>
  );
}
