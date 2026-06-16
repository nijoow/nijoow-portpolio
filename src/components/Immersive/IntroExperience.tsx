'use client';

import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Link from 'next/link';
import { Suspense } from 'react';
import { ParticleLogo } from './ParticleLogo';

export default function IntroExperience() {
  return (
    <>
      {/* 시그니처 오브제 무대 */}
      <div className="fixed inset-0 z-0 bg-black">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.8} />
          <Suspense fallback={null}>
            <ParticleLogo />
          </Suspense>
          <EffectComposer>
            <Bloom
              intensity={1.1}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.4}
              mipmapBlur
              radius={0.7}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 인트로 카피 + 진입 CTA */}
      <div className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-end px-6 pb-24 text-center text-white sm:pb-28">
        <p className="text-purple-light mb-3 text-sm tracking-[0.3em] uppercase">
          creative frontend developer
        </p>
        <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">
          nijoow
        </h1>
        <p className="mt-4 max-w-md text-sm break-keep text-white/50">
          몰입감 있는 UX와 인터랙션을 만드는 프론트엔드 개발자입니다.
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/works"
            className="bg-purple-medium hover:bg-purple-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors"
          >
            작품 보러가기 →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-base font-medium backdrop-blur-md transition-colors hover:bg-white/10"
          >
            연락하기
          </Link>
        </div>
      </div>
    </>
  );
}
