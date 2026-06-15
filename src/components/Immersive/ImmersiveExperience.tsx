'use client';

import { ContactForm } from '@/app/contact/_container/ContactForm';
import { Canvas } from '@react-three/fiber';
import { m, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { ImmersiveScene, PANEL_COUNT } from './ImmersiveScene';

export default function ImmersiveExperience() {
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [contactActive, setContactActive] = useState(false);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.09], [1, 0]);
  const worksOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.16, 0.78, 0.84],
    [0, 1, 1, 0],
  );
  const contactOpacity = useTransform(
    scrollYProgress,
    [0.84, 0.92, 1],
    [0, 1, 1],
  );

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setContactActive(v > 0.84);
  });

  return (
    <>
      {/* 3D 무대 — 콘텐츠 위(pointer-events 활성)로 올려 레이캐스트가 동작하게 함 */}
      <div className="fixed inset-0 z-0 bg-black">
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 55 }}
          dpr={[1, 2]}
          style={{ touchAction: 'pan-y' }}
        >
          <Suspense fallback={null}>
            <ImmersiveScene
              scroll={scrollYProgress}
              onSelect={(page) => router.push(`/works/${page}`)}
              onHover={setHovered}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 오버레이 — 캔버스 위지만 클릭은 통과(인터랙티브 영역만 auto) */}
      <div className="pointer-events-none fixed inset-0 z-10 text-white">
        {/* Hero */}
        <m.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-x-0 bottom-24 px-8 sm:bottom-32 sm:px-12"
        >
          <p className="text-purple-light mb-3 text-sm tracking-[0.3em] uppercase">
            creative frontend developer
          </p>
          <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">
            nijoow
          </h1>
          <p className="mt-6 text-sm text-white/50">scroll ↓</p>
        </m.div>

        {/* Works 라벨 + 호버 작업명 */}
        <m.div
          style={{ opacity: worksOpacity }}
          className="absolute inset-x-0 top-10 px-8 sm:px-12"
        >
          <p className="text-purple-light text-sm tracking-[0.3em] uppercase">
            selected work
          </p>
          <p className="mt-1 text-sm text-white/50">작업을 클릭해 들어가세요</p>
        </m.div>
        <m.div
          style={{ opacity: worksOpacity }}
          className="absolute inset-x-0 bottom-16 flex justify-center px-6"
        >
          <p
            className="text-2xl font-bold transition-opacity duration-200 sm:text-3xl"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            {hovered ?? ''}
          </p>
        </m.div>

        {/* Contact */}
        <m.div
          style={{ opacity: contactOpacity }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div
            className={`w-full max-w-lg rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl ${
              contactActive ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <h2 className="text-2xl font-bold text-white">함께 만들어요</h2>
            <p className="mt-1 mb-2 text-sm text-white/50">
              프로젝트 문의를 남겨주세요.
            </p>
            <ContactForm />
          </div>
        </m.div>
      </div>

      {/* 스크롤 길이 (히어로 + 작업물 + 컨택트) */}
      <div
        aria-hidden
        style={{ height: `${Math.max(500, PANEL_COUNT * 40)}vh` }}
      />
    </>
  );
}
