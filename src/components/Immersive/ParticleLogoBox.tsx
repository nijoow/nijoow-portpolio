'use client';

import { OrbitControls, Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useReducedMotion } from 'framer-motion';
import { MouseRight, Move3d } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { ParticleLogo } from './ParticleLogo';

// 클래식 홈 상단 — 얇은 필기체 로고를 작은 파티클로 살린 "빛나는 서명".
// 레이아웃에 상주하므로, 화면 밖이면 렌더 루프를 멈춰 상시 RAF 낭비를 막는다.
export default function ParticleLogoBox() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? true),
      { rootMargin: '120px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mb-10 h-[240px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black sm:h-[400px]"
    >
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 42 }}
        dpr={[1, 2]}
        frameloop={inView ? 'always' : 'never'}
      >
        <ambientLight intensity={0.8} />
        <OrbitControls enablePan={false} minDistance={1.8} maxDistance={3} />
        <Suspense fallback={null}>
          {/* 우클릭/주기적으로 흩어졌다 모임. reduced-motion이면 정적 유지. */}
          <ParticleLogo
            interactive={false}
            rotate={!reduced}
            clickBurst={!reduced}
          />
        </Suspense>
        <Sparkles
          count={30}
          scale={[9, 4.5, 4]}
          size={1.4}
          speed={reduced ? 0 : 0.3}
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

      {/* 하단 스크림 + 브랜딩 오버레이 — 캔버스 인터랙션을 막지 않도록 pointer-events-none */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-3xl bg-linear-to-t from-black/70 to-transparent" />
      <div className="pointer-events-none absolute right-5 bottom-4 left-5 flex items-end justify-between gap-4 sm:right-7 sm:bottom-6 sm:left-7">
        <div className="flex flex-col gap-0.5">
          <span className="text-purple-light/80 text-[10px] font-bold tracking-widest uppercase sm:text-xs">
            Frontend Developer
          </span>
          <span className="text-lg font-black text-white sm:text-2xl">
            이우진 <span className="text-white/40">·</span>{' '}
            <span className="from-purple-light to-purple-regular bg-linear-to-r bg-clip-text text-transparent">
              nijoow
            </span>
          </span>
        </div>
        <div className="pointer-events-auto hidden items-center gap-1.5 sm:flex">
          {[
            { icon: <Move3d size={15} />, tip: '드래그해서 회전' },
            { icon: <MouseRight size={15} />, tip: '우클릭으로 파티클 흩기' },
          ].map(({ icon, tip }) => (
            <span
              key={tip}
              tabIndex={0}
              aria-label={tip}
              className="group/tip hover:border-purple-light/40 hover:text-purple-light relative flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/45 backdrop-blur-sm transition-colors"
            >
              {icon}
              <span
                role="tooltip"
                className="pointer-events-none absolute right-0 bottom-full mb-2 rounded-lg border border-white/10 bg-black/85 px-2.5 py-1 text-xs whitespace-nowrap text-white/80 opacity-0 backdrop-blur-md transition-opacity group-hover/tip:opacity-100 group-focus-visible/tip:opacity-100"
              >
                {tip}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
