import type { CSSProperties } from 'react';

/**
 * 이 값 하나만 바꾸면 보조색의 기본·밝은색·어두운색이 함께 갱신됩니다.
 * 주의: 반드시 6자리 hex(#rrggbb)여야 합니다 — mixHexColors/withAlpha가 이 형식을 전제합니다.
 */
const SECONDARY_COLOR = '#A8B3C4';

function mixHexColors(base: string, target: string, targetWeight: number) {
  const parseChannel = (color: string, offset: number) =>
    Number.parseInt(color.slice(offset, offset + 2), 16);
  const mixChannel = (baseChannel: number, targetChannel: number) =>
    Math.round(baseChannel + (targetChannel - baseChannel) * targetWeight)
      .toString(16)
      .padStart(2, '0');

  return `#${[1, 3, 5]
    .map((offset) =>
      mixChannel(parseChannel(base, offset), parseChannel(target, offset)),
    )
    .join('')}`;
}

/**
 * 런타임 Canvas와 CSS가 함께 사용하는 색상 팔레트의 단일 소스입니다.
 * 컴포넌트에서는 원시 색상 대신 globals.css에 매핑된 의미 기반 토큰을 사용합니다.
 */
export const COLOR_TOKENS = {
  brand: {
    lavender: '#ded2f7',
    violet: '#9d86cc',
    muted: '#786d98',
    deep: '#45365f',
    cool: '#9baee0',
  },
  accent: {
    base: SECONDARY_COLOR,
    light: mixHexColors(SECONDARY_COLOR, '#ffffff', 0.35),
    deep: mixHexColors(SECONDARY_COLOR, '#000000', 0.5),
  },
  surface: {
    ink: '#06060c',
    panel: '#0f0e16',
    elevated: '#191721',
  },
  atmosphere: {
    navy: '#11182a',
    violet: '#1e1834',
  },
  status: {
    success: '#69c69a',
    warning: '#ddb66d',
    danger: '#df7b7b',
  },
} as const;

type PaletteVariable = `--palette-${string}`;

const paletteVariables = {
  '--palette-brand-lavender': COLOR_TOKENS.brand.lavender,
  '--palette-brand-violet': COLOR_TOKENS.brand.violet,
  '--palette-brand-muted': COLOR_TOKENS.brand.muted,
  '--palette-brand-deep': COLOR_TOKENS.brand.deep,
  '--palette-brand-cool': COLOR_TOKENS.brand.cool,
  '--palette-accent': COLOR_TOKENS.accent.base,
  '--palette-accent-light': COLOR_TOKENS.accent.light,
  '--palette-accent-deep': COLOR_TOKENS.accent.deep,
  '--palette-surface-ink': COLOR_TOKENS.surface.ink,
  '--palette-surface-panel': COLOR_TOKENS.surface.panel,
  '--palette-surface-elevated': COLOR_TOKENS.surface.elevated,
  '--palette-atmosphere-navy': COLOR_TOKENS.atmosphere.navy,
  '--palette-atmosphere-violet': COLOR_TOKENS.atmosphere.violet,
  '--palette-status-success': COLOR_TOKENS.status.success,
  '--palette-status-warning': COLOR_TOKENS.status.warning,
  '--palette-status-danger': COLOR_TOKENS.status.danger,
} satisfies Record<PaletteVariable, string>;

// React CSSProperties가 커스텀 프로퍼티를 모델링하지 않아 검증된 객체를 경계에서 변환한다.
export const PALETTE_CSS_VARIABLES = paletteVariables as CSSProperties;

/** Framer Motion·Canvas처럼 CSS 알파 유틸리티를 쓸 수 없는 경계에서 사용합니다. */
export function withAlpha(hexColor: string, alpha: number): string {
  const value = Number.parseInt(hexColor.slice(1), 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  const safeAlpha = Math.min(1, Math.max(0, alpha));

  return `rgba(${red}, ${green}, ${blue}, ${safeAlpha})`;
}
