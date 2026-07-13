import GlassCard from '@/components/Motion/GlassCard';
import SubTitle from '@/components/SubTitle/SubTitle';
import { Braces, Compass } from 'lucide-react';

const coreStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'TanStack Query',
];

const currentFocus = [
  'Web 3D / Three.js',
  'AI 활용 개발',
  'UI/UX',
  '인터랙션',
  '성능 최적화',
];

interface StackGroupProps {
  title: string;
  description: string;
  items: string[];
  type: 'stack' | 'focus';
}

function StackGroup({ title, description, items, type }: StackGroupProps) {
  const Icon = type === 'stack' ? Braces : Compass;

  return (
    <div className="flex h-full flex-col gap-5 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="text-purple-light flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon size={19} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-extrabold">{title}</h2>
          <p className="text-sm leading-relaxed break-keep text-white/50">
            {description}
          </p>
        </div>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label={title}>
        {items.map((item) => (
          <li
            key={item}
            className="hover:border-purple-light/30 hover:text-purple-light rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-semibold text-white/60 transition-colors"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechStackFocus() {
  return (
    <section className="w-full">
      <SubTitle eyebrow="Toolkit & Focus" title="기술 스택과 관심 분야" />
      <GlassCard lift={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <StackGroup
            title="주요 기술"
            description="실제 프로젝트의 구현과 운영에 사용하는 기술입니다."
            items={coreStack}
            type="stack"
          />
          <div className="border-t border-white/10 sm:border-t-0 sm:border-l">
            <StackGroup
              title="현재 관심 분야"
              description="더 좋은 사용감과 개발 방식을 위해 계속 탐구하고 있습니다."
              items={currentFocus}
              type="focus"
            />
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
