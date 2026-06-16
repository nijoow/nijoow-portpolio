'use client';

import { useExperienceMode } from '@/context/ExperienceMode';
import type { ReactNode } from 'react';

interface WorksExperienceProps {
  immersive: ReactNode;
  classic: ReactNode;
}

// 모드에 따라 3D 갤러리(immersive) 또는 기존 그리드(classic)를 렌더한다.
export default function WorksExperience({
  immersive,
  classic,
}: WorksExperienceProps) {
  const mode = useExperienceMode();
  return <>{mode === 'classic' ? classic : immersive}</>;
}
