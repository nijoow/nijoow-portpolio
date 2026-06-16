'use client';

import { works } from '@/app/works/_container/worksData';
import { cn } from '@/lib/utils';
import { Canvas } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { Suspense, useMemo, useState } from 'react';
import { WorksWallScene } from './WorksWallScene';

const TAGS = [
  'Web',
  'Design',
  'Frontend',
  'Interactive',
  '3D',
  'Backend',
  'Business Project',
  'Side Project',
];
const COLS = 3;

export default function WorksWall() {
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const [tag, setTag] = useQueryState('tag', { history: 'replace' });
  const [hovered, setHovered] = useState<string | null>(null);

  const items = useMemo(
    () =>
      works
        .filter((w) => w.imgSrc && (tag === null || w.tags.includes(tag)))
        .map((w) => ({ page: w.pageName, name: w.name, imgSrc: w.imgSrc })),
    [tag],
  );

  const rows = Math.max(1, Math.ceil(items.length / COLS));
  const spacerVh = Math.max(140, rows * 46);

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1 text-xs font-medium transition-colors',
        active
          ? 'bg-purple-medium text-white'
          : 'bg-white/10 text-white/60 hover:text-white',
      )}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="fixed inset-0 z-0 bg-black">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 2]}
          style={{ touchAction: 'pan-y' }}
        >
          <Suspense fallback={null}>
            <WorksWallScene
              items={items}
              scroll={scrollYProgress}
              onSelect={(page) => router.push(`/works/${page}`)}
              onHover={setHovered}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="pointer-events-none fixed inset-0 z-10 text-white">
        <div className="absolute inset-x-0 top-16 px-6 sm:top-20 sm:px-10">
          <p className="text-purple-light text-sm tracking-[0.3em] uppercase">
            selected work
          </p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">작업물 갤러리</h1>
          <div className="pointer-events-auto mt-3 flex flex-wrap gap-1.5">
            {chip('All', tag === null, () => setTag(null))}
            {TAGS.map((t) => chip(t, tag === t, () => setTag(t)))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 flex justify-center px-6">
          <p
            className="text-xl font-bold transition-opacity duration-200 sm:text-2xl"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            {hovered ?? ''}
          </p>
        </div>
      </div>

      <div aria-hidden style={{ height: `${spacerVh}vh` }} />
    </>
  );
}
