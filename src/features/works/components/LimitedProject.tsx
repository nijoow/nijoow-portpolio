import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';

export function ProjectDisclosureChip() {
  return (
    <span className="text-ink-secondary inline-flex rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-bold tracking-wide whitespace-nowrap backdrop-blur-sm">
      보안상 화면 비공개
    </span>
  );
}

export function LimitedProjectCover({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'from-atmosphere-violet/75 via-surface-panel to-atmosphere-navy/70 relative overflow-hidden bg-linear-to-br',
        className,
      )}
    >
      <div className="cosmic-stars absolute inset-0 opacity-80" />
      <div className="cosmic-grid absolute inset-0 opacity-35" />
      <div className="cosmic-orbit-map absolute inset-[-20%] rotate-[-12deg] opacity-80" />
      <div className="bg-brand-violet/25 absolute top-[12%] left-[18%] size-36 rounded-full blur-3xl sm:size-52" />
      <div className="bg-accent/15 absolute right-[14%] bottom-[8%] size-32 rounded-full blur-3xl sm:size-48" />
      <div className="relative h-full min-h-36" />
    </div>
  );
}

export function LimitedProjectNotice() {
  return (
    <aside className="frosted-glass-subtle text-ink-muted flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-relaxed break-keep sm:px-5">
      <ShieldCheck
        aria-hidden="true"
        className="text-brand-lavender mt-0.5 shrink-0"
        size={18}
      />
      <p>
        보안상 실제 서비스 화면과 내부 구현 자료는 공개하지 않습니다. 공개
        가능한 범위에서 담당 역할과 일반화한 문제 해결 경험만 소개합니다.
      </p>
    </aside>
  );
}
