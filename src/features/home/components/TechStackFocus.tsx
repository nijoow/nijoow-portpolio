'use client';

import Eyebrow from '@/components/ui/Eyebrow';
import GlassCard from '@/components/Motion/GlassCard';
import SubTitle from '@/components/SubTitle/SubTitle';
import { GlassPopover } from '@/components/ui/GlassPopover';
import { cn } from '@/lib/utils';
import { Braces, Compass } from 'lucide-react';

interface StackItem {
  label: string;
  detail: string;
  contexts: readonly string[];
}

const coreStack = [
  {
    label: 'Next.js',
    detail: 'App Router를 중심으로 페이지 구조와 데이터 흐름을 설계합니다.',
    contexts: ['App Router', 'RSC', 'Route Handler'],
  },
  {
    label: 'React',
    detail: '컴포넌트 구성과 상태 흐름을 설계하고 인터랙티브 UI를 구현합니다.',
    contexts: ['Composition', 'Hooks', 'Client UI'],
  },
  {
    label: 'TypeScript',
    detail: '화면과 데이터 사이의 계약을 타입으로 명확하게 관리합니다.',
    contexts: ['Schema', 'API', 'UI State'],
  },
  {
    label: 'Tailwind CSS',
    detail: '디자인 토큰과 반응형 규칙을 빠르게 화면에 옮깁니다.',
    contexts: ['Design Token', 'Responsive', 'Motion'],
  },
  {
    label: 'TanStack Query',
    detail: '서버 상태의 로딩과 오류, 갱신 흐름을 일관되게 다룹니다.',
    contexts: ['Cache', 'Loading · Error', 'Revalidation'],
  },
  {
    label: 'Zustand',
    detail: '가벼운 전역 상태와 UI 상태를 작은 스토어로 나눠 관리합니다.',
    contexts: ['Store', 'Selector', 'Persist'],
  },
  {
    label: 'React Hook Form',
    detail: '입력 상태와 검증 흐름을 효율적으로 구성해 폼을 관리합니다.',
    contexts: ['Form State', 'Validation', 'Performance'],
  },
  {
    label: 'Zod',
    detail:
      '외부 데이터와 폼 입력의 경계를 스키마로 검증하고 타입과 연결합니다.',
    contexts: ['Schema', 'Parsing', 'Type Inference'],
  },
  {
    label: 'Framer Motion',
    detail:
      '레이아웃 전환과 제스처, 마이크로 인터랙션을 자연스럽게 구현합니다.',
    contexts: ['Layout', 'Gesture', 'Motion'],
  },
] as const satisfies readonly StackItem[];

const currentFocus = [
  {
    label: 'Web 3D / Three.js',
    detail:
      '웹 콘텐츠 안에 자연스럽게 녹아드는 3D 경험과 성능 최적화를 함께 살펴보고 있습니다.',
    contexts: ['R3F', 'Shader', 'WebGL'],
  },
  {
    label: 'AI 협업',
    detail:
      'AI Agent를 탐색·구현·검증 흐름에 연결해 더 나은 협업 방식을 실험하고 있습니다.',
    contexts: ['Agent', 'Automation', 'Review'],
  },
  {
    label: 'UI/UX',
    detail:
      '정보 구조와 시각적 완성도가 실제 사용 흐름에서 어떻게 만나는지 계속 고민합니다.',
    contexts: ['Flow', 'A11y', 'Visual'],
  },
  {
    label: '인터랙션',
    detail:
      '모션과 입력 피드백이 화면의 인상을 넘어 사용성을 높이도록 다듬습니다.',
    contexts: ['Motion', 'Feedback', 'Micro UX'],
  },
  {
    label: '웹 성능',
    detail:
      '3D와 풍부한 UI를 유지하면서도 첫 진입과 조작이 가볍게 느껴지는 방법을 살펴봅니다.',
    contexts: ['LCP', 'INP', 'Bundle'],
  },
] as const satisfies readonly StackItem[];

interface StackGroupProps {
  title: string;
  description: string;
  items: readonly StackItem[];
  type: 'stack' | 'focus';
}

function StackDetails({
  item,
  type,
}: {
  item: StackItem;
  type: StackGroupProps['type'];
}) {
  return (
    <div className="relative">
      <Eyebrow tone={type === 'stack' ? 'brand' : 'accent'}>
        {type === 'stack' ? 'Main Toolkit' : 'Current Focus'}
      </Eyebrow>
      <h4 className="mt-1 text-base font-bold text-white">{item.label}</h4>
      <p className="text-ink-muted mt-2 text-xs leading-relaxed break-keep">
        {item.detail}
      </p>
      <ul
        className="mt-3 flex flex-wrap gap-1.5"
        aria-label={`${item.label} 관련 키워드`}
      >
        {item.contexts.map((context) => (
          <li
            key={context}
            className="text-ink-muted rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold"
          >
            {context}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StackGroup({ title, description, items, type }: StackGroupProps) {
  const Icon = type === 'stack' ? Braces : Compass;

  return (
    <div className="flex h-full flex-col gap-5 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5',
            type === 'stack' ? 'text-brand-violet' : 'text-accent-light',
          )}
        >
          <Icon size={19} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">{title}</h3>
          <p className="text-ink-muted text-sm leading-relaxed break-keep">
            {description}
          </p>
        </div>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label={title}>
        {items.map((item) => (
          <li key={item.label}>
            <GlassPopover
              ariaLabel={`${item.label} 자세히 보기`}
              content={<StackDetails item={item} type={type} />}
              className={cn(
                'focus-visible:ring-brand-lavender text-ink-muted min-h-11 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-bold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none',
                type === 'stack'
                  ? 'hover:border-brand-lavender/35 hover:bg-brand-deep/35 hover:text-brand-lavender'
                  : 'hover:border-accent/35 hover:bg-accent-deep/30 hover:text-accent-light',
              )}
            >
              {item.label}
            </GlassPopover>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechStackFocus() {
  return (
    <section className="w-full">
      <SubTitle
        eyebrow="Toolkit"
        title="기술 스택과 관심 분야"
        trailing={
          <span className="text-accent-light/65 text-[10px] font-bold tracking-wide">
            <span className="hidden sm:inline">
              칩에 마우스를 올려 자세히 보기
            </span>
            <span className="sm:hidden">칩을 눌러 자세히 보기</span>
          </span>
        }
      />
      <GlassCard lift={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <StackGroup
            title="주로 쓰는 기술"
            description="프로젝트에서 꾸준히 사용해 온 기술입니다."
            items={coreStack}
            type="stack"
          />
          <div className="border-t border-white/10 sm:border-t-0 sm:border-l">
            <StackGroup
              title="요즘 관심 있는 것"
              description="최근 더 깊게 살펴보고 있는 주제입니다."
              items={currentFocus}
              type="focus"
            />
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
