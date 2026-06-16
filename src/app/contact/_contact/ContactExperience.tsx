'use client';

import { useExperienceMode } from '@/context/ExperienceMode';
import type { ReactNode } from 'react';

interface ContactExperienceProps {
  immersive: ReactNode;
  classic: ReactNode;
}

export default function ContactExperience({
  immersive,
  classic,
}: ContactExperienceProps) {
  const mode = useExperienceMode();
  return <>{mode === 'classic' ? classic : immersive}</>;
}
