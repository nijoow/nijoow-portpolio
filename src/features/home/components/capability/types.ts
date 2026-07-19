export type CapabilityMicroUiType =
  | 'collaboration'
  | 'frontend'
  | 'interaction'
  | 'ai';

export type CapabilityIconType = 'design' | 'code' | 'interaction' | 'ai';

export interface CapabilityConfig {
  title: string;
  description: string;
  icon: CapabilityIconType;
  preview: CapabilityMicroUiType;
}

export interface CapabilityPreviewProps {
  isActive: boolean;
  isInView: boolean;
  shouldReduceMotion: boolean;
}
