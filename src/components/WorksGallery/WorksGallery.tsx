'use client';

import { Canvas } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { PANEL_COUNT, WorksGalleryScene } from './WorksGalleryScene';

export default function WorksGallery() {
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {/* 3D 갤러리 무대 (고정) */}
      <div className="fixed inset-0 -z-10 bg-black">
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <WorksGalleryScene
              scroll={scrollYProgress}
              onSelect={(page) => router.push(`/works/${page}`)}
              onHover={setHovered}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 오버레이 */}
      <div className="pointer-events-none fixed inset-0 text-white">
        <div className="absolute top-20 left-0 w-full px-6 sm:top-24 sm:px-10">
          <p className="text-purple-light text-sm tracking-[0.3em] uppercase">
            nijoow — works
          </p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            작업물 갤러리
          </h1>
          <p className="mt-2 text-sm text-white/50">
            스크롤로 둘러보고, 작업을 클릭해 들어가세요
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-16 flex justify-center px-6">
          <p
            className="text-2xl font-bold transition-opacity duration-200 sm:text-3xl"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            {hovered ?? ''}
          </p>
        </div>

        <p className="absolute inset-x-0 bottom-6 text-center text-sm text-white/40">
          scroll ↓
        </p>
      </div>

      {/* 스크롤 길이 (작업물 수에 비례) */}
      <div
        aria-hidden
        style={{ height: `${Math.max(400, PANEL_COUNT * 34)}vh` }}
      />
    </>
  );
}
