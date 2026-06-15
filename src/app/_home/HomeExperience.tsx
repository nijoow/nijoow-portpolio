'use client';

import { useExperienceMode } from '@/context/ExperienceMode';
import type { ReactNode } from 'react';

interface HomeExperienceProps {
  immersive: ReactNode;
  classic: ReactNode;
}

// 모드에 따라 새 3D 히어로(immersive) 또는 기존 홈(classic)을 렌더한다.
export default function HomeExperience({
  immersive,
  classic,
}: HomeExperienceProps) {
  const mode = useExperienceMode();
  return <>{mode === 'classic' ? classic : immersive}</>;
}
