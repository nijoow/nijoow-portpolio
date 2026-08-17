import SubTitle from '@/components/SubTitle/SubTitle';
import { CapabilityCard } from '@/features/home/components/capability/CapabilityCard';
import type { CapabilityConfig } from '@/features/home/components/capability/types';

const capabilities = [
  {
    title: 'UX/UI 이해',
    description:
      '디자인 전공 경험을 바탕으로 기획자·디자이너와 소통하며 함께 고민하고, 의도와 흐름에 맞는 사용자 경험을 구현합니다.',
    icon: 'design',
    preview: 'collaboration',
  },
  {
    title: '프론트엔드 개발',
    description:
      'Next.js와 TypeScript를 중심으로 개발 세팅부터 빌드·배포까지 전반적으로 안정성 있는 서비스를 구현합니다.',
    icon: 'code',
    preview: 'frontend',
  },
  {
    title: '인터랙션과 디테일',
    description:
      '레이아웃 간격과 모션의 디테일을 다듬고, 3D나 인터랙티브 요소를 활용해 시선을 사로잡는 감각적이고 개성 있는 화면을 만드는 것을 즐깁니다.',
    icon: 'interaction',
    preview: 'interaction',
  },
  {
    title: 'AI 페어 프로그래밍',
    description:
      'AI Agent를 워크플로우에 통합해 지식을 탐색·검증하고, 구현과 검토 과정에 활용합니다.',
    icon: 'ai',
    preview: 'ai',
  },
] as const satisfies readonly CapabilityConfig[];

export function CapabilityGrid() {
  return (
    <section className="w-full">
      <SubTitle eyebrow="How I Work" title="핵심 가치" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {capabilities.map((capability) => (
          <CapabilityCard key={capability.title} {...capability} />
        ))}
      </div>
    </section>
  );
}
