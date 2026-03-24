'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Lights from './Lights';
import Nijoow from './Nijoow';

const Three = () => {
  return (
    <div className="relative mb-12 h-[200px] w-full overflow-hidden rounded-3xl sm:h-[320px]">
      {/* 딥한 안쪽 공간을 표현하는 배경 */}
      <div className="pointer-events-none absolute inset-0 bg-black/5 dark:bg-black/40" />
      
      {/* 3D 캔버스 (z-0) */}
      <Canvas camera={{ position: [0, 0, 1], fov: 70 }} className="relative z-0">
        <OrbitControls maxDistance={2} minDistance={0.9} />
        <Lights />
        <Suspense fallback={null}>
          <Nijoow />
        </Suspense>
      </Canvas>

      {/* 역입체감(Inset)을 주는 오버레이 섀도우 (z-10, 캔버스 위로 그림자를 드리움) */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl border border-black/10 shadow-[inset_0_10px_40px_rgba(0,0,0,0.15),inset_0_-2px_4px_rgba(255,255,255,0.5)] dark:border-black/50 dark:shadow-[inset_0_10px_40px_rgba(0,0,0,0.8),inset_0_-2px_4px_rgba(255,255,255,0.05)]" />
    </div>
  );
};

export default Three;
