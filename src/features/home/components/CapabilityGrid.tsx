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
      'Next.js와 TypeScript를 중심으로 화면과 데이터 흐름을 구현하고, 개발 환경부터 빌드·배포까지 필요한 작업을 함께 다룹니다.',
    icon: 'code',
    preview: 'frontend',
  },
  {
    title: '인터랙션과 디테일',
    description:
      '레이아웃과 모션의 디테일을 다듬고, 3D와 인터랙티브 요소로 서비스의 성격을 드러내는 화면을 만드는 것을 좋아합니다.',
    icon: 'interaction',
    preview: 'interaction',
  },
  {
    title: 'AI 페어 프로그래밍',
    description:
      'AI Agent를 반복적인 탐색·구현·검토에 활용하고 결과를 직접 검증합니다.',
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
