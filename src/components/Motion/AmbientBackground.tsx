'use client';

import { useMounted } from '@/hooks/useMounted';
import { m, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DustParticle {
  id: number;
  left: string;
  top: string;
  opacity: number;
  scale: number;
  duration: number;
  delay: number;
}

// 무작위 입자 데이터는 모듈 로드 시 1회만 생성한다 (렌더 중 Math.random 호출 방지 + 하이드레이션 안정).
const DUST_PARTICLES: DustParticle[] = [...Array(25)].map((_, i) => ({
  id: i,
  left: Math.random() * 100 + '%',
  top: Math.random() * 100 + '%',
  opacity: Math.random() * 0.4 + 0.1,
  scale: Math.random() * 0.6 + 0.4,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 5,
}));

/**
 * AmbientBackground 컴포넌트
 * 화면 전역의 여백 공간에 은은한 오로라(Aurora) 효과와 부유하는 먼지(Dust) 입자를 배치합니다.
 * 마우스 움직임에 반응하는 패럴랙스 효과와 스크롤에 따른 위치 변화를 포함합니다.
 */
export const AmbientBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isMounted = useMounted();
  const { scrollYProgress } = useScroll();

  // 스크롤에 따른 레이어별 이동 (Parallax)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 50,
        y: (e.clientY / window.innerHeight - 0.5) * 50,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-white select-none dark:bg-black">
      {/* Aurora Blobs - SSR 시에도 레이아웃 유지를 위해 고정 위치 지정 */}
      <m.div
        style={{ y: y1, x: mousePos.x * -0.6 }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.75, 0.95, 0.75],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[5%] -left-[5%] h-[450px] w-[450px] rounded-full bg-purple-400/25 blur-[130px] dark:bg-purple-700/15"
      />
      <m.div
        style={{ y: y2, x: mousePos.x * 0.4 }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[30%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-400/25 blur-[120px] dark:bg-blue-700/15"
      />
      <m.div
        style={{ y: y3, x: mousePos.x * -0.3 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.88, 0.7],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[65%] left-[10%] h-[550px] w-[550px] rounded-full bg-indigo-400/25 blur-[110px] dark:bg-indigo-700/15"
      />

      {/* Floating Glass Dust - 마운트 완료 후 입자 렌더링 */}
      {isMounted &&
        DUST_PARTICLES.map((particle) => (
          <m.div
            key={particle.id}
            initial={{
              left: particle.left,
              top: particle.top,
              opacity: 0,
              scale: particle.scale,
            }}
            animate={{
              y: ['-20px', '20px', '-20px'],
              x: ['-20px', '20px', '-20px'],
              opacity: [
                particle.opacity * 0.7,
                particle.opacity,
                particle.opacity * 0.7,
              ],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
            className="bg-purple-darker dark:bg-purple-light absolute h-1.5 w-1.5 rounded-full blur-xs"
          />
        ))}

      {/* 히어로 영역과의 조화를 위한 하단 페이드 */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-neutral-50 to-transparent dark:from-black" />
    </div>
  );
};
