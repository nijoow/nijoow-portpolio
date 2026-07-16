import { cn } from '@/lib/utils';
import type { ComponentType } from 'react';
import { AiPreview } from './previews/AiPreview';
import { CollaborationPreview } from './previews/CollaborationPreview';
import { FrontendPreview } from './previews/FrontendPreview';
import { InteractionPreview } from './previews/InteractionPreview';
import type { CapabilityMicroUiType, CapabilityPreviewProps } from './types';

const PREVIEW_COMPONENTS = {
  collaboration: CollaborationPreview,
  frontend: FrontendPreview,
  interaction: InteractionPreview,
  ai: AiPreview,
} satisfies Record<
  CapabilityMicroUiType,
  ComponentType<CapabilityPreviewProps>
>;

const RESTART_ON_ACTIVATION = new Set<CapabilityMicroUiType>([
  'frontend',
  'ai',
]);

interface CapabilityMicroUiProps extends CapabilityPreviewProps {
  type: CapabilityMicroUiType;
}

export function CapabilityMicroUi({
  type,
  isActive,
  isInView,
  shouldReduceMotion,
}: CapabilityMicroUiProps) {
  const Preview = PREVIEW_COMPONENTS[type];
  const stateKey = isActive ? 'active' : 'idle';
  const previewKey = RESTART_ON_ACTIVATION.has(type)
    ? `${type}-${stateKey}`
    : type;

  return (
    <div
      className={cn(
        'relative h-30 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950/40 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300',
        isActive &&
          'border-purple-500/30 bg-zinc-950/60 shadow-lg shadow-purple-500/5',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_15%,rgba(168,85,247,0.08),transparent_40%)] transition-opacity duration-500',
          isActive &&
            'bg-[radial-gradient(circle_at_72%_15%,rgba(168,85,247,0.18),transparent_45%)]',
        )}
      />
      <div className="micro-scene-grid" aria-hidden="true" />
      <div className="relative z-10 h-full w-full" aria-hidden="true">
        <Preview
          key={previewKey}
          isActive={isActive}
          isInView={isInView}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
    </div>
  );
}
