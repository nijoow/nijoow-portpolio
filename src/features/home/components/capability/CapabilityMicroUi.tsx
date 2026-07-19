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
        'bg-surface-panel/45 relative h-30 w-full overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300',
        isActive &&
          'bg-surface-panel/70 border-brand-lavender/25 shadow-lg shadow-black/20',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'capability-preview-glow pointer-events-none absolute inset-0 opacity-45 transition-opacity duration-500',
          isActive && 'opacity-100',
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
