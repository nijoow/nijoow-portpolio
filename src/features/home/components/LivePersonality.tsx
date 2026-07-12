import SubTitle from '@/components/SubTitle/SubTitle';
import type { ReactNode } from 'react';

interface LivePersonalityProps {
  music: ReactNode;
  github: ReactNode;
}

export function LivePersonality({ music, github }: LivePersonalityProps) {
  return (
    <section className="w-full">
      <SubTitle eyebrow="Live Personality" title="요즘의 취향과 활동" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="px-1 text-xs font-bold tracking-wider text-white/40 uppercase">
            Recently Played
          </span>
          {music}
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <span className="px-1 text-xs font-bold tracking-wider text-white/40 uppercase">
            GitHub Activity
          </span>
          {github}
        </div>
      </div>
    </section>
  );
}
