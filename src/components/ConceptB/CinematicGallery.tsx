'use client';

import { Canvas } from '@react-three/fiber';
import { m, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { CinematicScene } from './CinematicScene';

export default function CinematicGallery() {
  const { scrollYProgress } = useScroll();

  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const midOpacity = useTransform(
    scrollYProgress,
    [0.34, 0.46, 0.58, 0.68],
    [0, 1, 1, 0],
  );
  const endOpacity = useTransform(scrollYProgress, [0.82, 0.92, 1], [0, 1, 1]);

  return (
    <>
      {/* 3D 무대 (고정, 콘텐츠 뒤) */}
      <div className="fixed inset-0 -z-10 bg-black">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
          <CinematicScene scroll={scrollYProgress} />
        </Canvas>
      </div>

      {/* 스크롤 비트 오버레이 */}
      <div className="pointer-events-none fixed inset-0">
        <m.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-x-0 bottom-20 px-8 text-white sm:bottom-28"
        >
          <p className="text-purple-light mb-2 text-sm tracking-[0.3em] uppercase">
            nijoow — portfolio
          </p>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            selected work,
            <br />
            in space
          </h1>
          <p className="mt-6 text-sm text-white/50">scroll to travel ↓</p>
        </m.div>

        <m.div
          style={{ opacity: midOpacity }}
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
        >
          <p className="max-w-xl text-2xl leading-relaxed font-medium break-keep text-white sm:text-3xl">
            디자이너의 의도를 깊이 이해하고
            <br />
            <span className="text-purple-light">디테일까지 완성</span>하는
            프론트엔드 개발자.
          </p>
        </m.div>

        <m.div
          style={{ opacity: endOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center text-white"
        >
          <h2 className="text-4xl font-bold sm:text-6xl">함께 만들어요</h2>
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-medium backdrop-blur-md transition-colors hover:bg-white/20"
            >
              전체 작업 보기 →
            </Link>
            <Link
              href="/contact"
              className="bg-purple-medium hover:bg-purple-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors"
            >
              연락하기 →
            </Link>
          </div>
        </m.div>
      </div>

      {/* 스크롤 길이 확보 */}
      <div aria-hidden style={{ height: '360vh' }} />
    </>
  );
}
