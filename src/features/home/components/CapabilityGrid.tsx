import GlassCard from '@/components/Motion/GlassCard';
import SubTitle from '@/components/SubTitle/SubTitle';
import {
  Blocks,
  Bot,
  Code2,
  PanelsTopLeft,
  type LucideIcon,
} from 'lucide-react';

interface Capability {
  title: string;
  description: string;
  Icon: LucideIcon;
  preview: 'structure' | 'code' | 'interaction' | 'ai';
}

const capabilities: Capability[] = [
  {
    title: 'UX/UI 이해',
    description:
      '디자인 전공 경험을 바탕으로 화면의 목적과 정보 구조를 이해합니다.',
    Icon: PanelsTopLeft,
    preview: 'structure',
  },
  {
    title: '프론트엔드 구현',
    description:
      'Next.js와 TypeScript를 중심으로 초기 세팅부터 배포·운영까지 경험했습니다.',
    Icon: Code2,
    preview: 'code',
  },
  {
    title: '인터랙션과 디테일',
    description:
      '웹 인터랙션과 3D를 활용해 화면의 사용감과 디테일을 다듬습니다.',
    Icon: Blocks,
    preview: 'interaction',
  },
  {
    title: 'AI 활용',
    description:
      'AI Agent를 활용한 탐색·구현·검증 흐름에 익숙하며, 결과를 직접 확인하고 다듬습니다.',
    Icon: Bot,
    preview: 'ai',
  },
];

function CapabilityPreview({ type }: { type: Capability['preview'] }) {
  if (type === 'structure') {
    return (
      <div className="grid h-24 grid-cols-3 gap-2 rounded-xl border border-white/10 bg-black/20 p-3">
        <div className="rounded-lg bg-white/5" />
        <div className="border-purple-light/25 rounded-lg border bg-white/5" />
        <div className="rounded-lg bg-white/5" />
        <div className="from-purple-medium/30 to-purple-light/30 col-span-3 h-2 self-center rounded-full bg-linear-to-r" />
      </div>
    );
  }

  if (type === 'code') {
    return (
      <div className="flex h-24 flex-col justify-center gap-2 rounded-xl border border-white/10 bg-black/30 p-4">
        <span className="bg-purple-light/50 h-1.5 w-2/3 rounded-full" />
        <span className="ml-3 h-1.5 w-4/5 rounded-full bg-white/15" />
        <span className="ml-3 h-1.5 w-1/2 rounded-full bg-white/10" />
        <span className="bg-purple-medium/40 h-1.5 w-3/5 rounded-full" />
      </div>
    );
  }

  if (type === 'interaction') {
    return (
      <div className="flex h-24 flex-col justify-center gap-5 rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between">
          <span className="bg-purple-medium/35 border-purple-light/20 rounded-full border px-4 py-1 text-[10px] text-white/70">
            Button
          </span>
          <span className="relative h-5 w-9 rounded-full border border-white/15 bg-white/5">
            <span className="bg-purple-light absolute top-1/2 right-0.5 size-4 -translate-y-1/2 rounded-full" />
          </span>
        </div>
        <div className="bg-purple-medium/25 relative h-1 rounded-full">
          <span className="bg-purple-light absolute top-1/2 left-2/3 size-3 -translate-y-1/2 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-24 flex-col justify-center gap-2 rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center gap-2 text-[10px] text-white/40">
        <span className="bg-purple-light size-1.5 rounded-full" />
        AGENT WORKFLOW
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
        <span className="text-purple-light text-xs">›</span>
        <span className="h-1.5 flex-1 rounded-full bg-white/15" />
        <span className="bg-purple-medium/50 h-1.5 w-10 rounded-full" />
      </div>
      <div className="flex gap-1.5">
        <span className="bg-purple-medium/20 h-1.5 w-1/3 rounded-full" />
        <span className="h-1.5 w-1/4 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export function CapabilityGrid() {
  return (
    <section className="w-full">
      <SubTitle eyebrow="Design × Development" title="핵심 가치" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {capabilities.map(({ title, description, Icon, preview }) => (
          <GlassCard key={title} className="h-full">
            <div className="flex h-full flex-col gap-4 p-5">
              <div className="text-purple-light flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Icon size={19} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="font-extrabold">{title}</h2>
                <p className="text-sm leading-relaxed break-keep text-white/55">
                  {description}
                </p>
              </div>
              <div className="mt-auto pt-2">
                <CapabilityPreview type={preview} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
