import SubTitle from '@/components/SubTitle/SubTitle';
import { PersonalInterests } from '@/features/home/components/PersonalInterests';
import type { ReactNode } from 'react';

interface LivePersonalityProps {
  music: ReactNode;
  github: ReactNode;
}

export function LivePersonality({ music, github }: LivePersonalityProps) {
  return (
    <section className="w-full">
      <SubTitle eyebrow="Now" title="요즘의 기록" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="px-1 text-xs font-bold tracking-wider text-white/55 uppercase">
            최근 들은 음악
          </span>
          {music}
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <span className="px-1 text-xs font-bold tracking-wider text-white/55 uppercase">
            최근 작업
          </span>
          {github}
        </div>
      </div>
      <PersonalInterests />
    </section>
  );
}
