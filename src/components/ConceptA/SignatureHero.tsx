'use client';

import { Canvas } from '@react-three/fiber';
import { m, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { SignatureScene } from './SignatureScene';

export default function SignatureHero() {
  const { scrollYProgress } = useScroll();

  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const aboutOpacity = useTransform(
    scrollYProgress,
    [0.16, 0.26, 0.36, 0.44],
    [0, 1, 1, 0],
  );
  const worksOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.72, 0.8],
    [0, 1, 1, 0],
  );
  const contactOpacity = useTransform(
    scrollYProgress,
    [0.86, 0.94, 1],
    [0, 1, 1],
  );

  return (
    <>
      {/* 3D 무대 (고정, 콘텐츠 뒤) */}
      <div className="fixed inset-0 -z-10 bg-black">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
          <SignatureScene scroll={scrollYProgress} />
        </Canvas>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
      </div>

      {/* 스크롤에 반응하는 오버레이 비트 */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <m.div
          style={{ opacity: heroOpacity }}
          className="px-6 text-center text-white"
        >
          <p className="text-purple-light mb-3 text-sm tracking-[0.3em] uppercase">
            creative frontend developer
          </p>
          <h1 className="text-6xl font-bold tracking-tight sm:text-8xl">
            nijoow
          </h1>
          <p className="mt-6 text-sm text-white/50">scroll ↓</p>
        </m.div>

        <m.div
          style={{ opacity: aboutOpacity }}
          className="absolute max-w-xl px-6 text-center text-white"
        >
          <p className="text-2xl leading-relaxed font-medium break-keep sm:text-3xl">
            서비스 초기 세팅부터 배포·운영까지,
            <br />
            <span className="text-purple-light">몰입감 있는 UX</span>를 만드는
            프론트엔드 개발자입니다.
          </p>
        </m.div>

        <m.div
          style={{ opacity: worksOpacity }}
          className="absolute px-6 text-center text-white"
        >
          <p className="text-purple-light mb-2 text-sm tracking-[0.3em] uppercase">
            selected work
          </p>
          <h2 className="mb-8 text-4xl font-bold sm:text-6xl">작업물</h2>
          <Link
            href="/works"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-medium backdrop-blur-md transition-colors hover:bg-white/20"
          >
            전체 작업 보기 →
          </Link>
        </m.div>

        <m.div
          style={{ opacity: contactOpacity }}
          className="absolute px-6 text-center text-white"
        >
          <h2 className="mb-8 text-4xl font-bold sm:text-6xl">함께 만들어요</h2>
          <Link
            href="/contact"
            className="bg-purple-medium hover:bg-purple-dark pointer-events-auto inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors"
          >
            연락하기 →
          </Link>
        </m.div>
      </div>

      {/* 스크롤 길이 확보 */}
      <div aria-hidden style={{ height: '340vh' }} />
    </>
  );
}
