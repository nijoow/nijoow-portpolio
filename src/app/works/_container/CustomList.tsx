import GlassCard from '@/components/Motion/GlassCard';
import type { ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

function CustomList({ children }: ChildrenProps) {
  return (
    <GlassCard lift={false} className="w-full">
      <ul className="flex w-full flex-col gap-1.5 p-4 sm:p-5">{children}</ul>
    </GlassCard>
  );
}

function MainListItem({ children }: ChildrenProps) {
  return (
    <li className="mt-3 flex gap-2.5 text-[15px] break-keep first:mt-0">
      <span className="bg-brand-lavender/80 mt-2 size-1.5 shrink-0 rounded-full" />
      <div className="min-w-0">{children}</div>
    </li>
  );
}

function SubListItem({
  children,
  showBullet = true,
}: ChildrenProps & {
  showBullet?: boolean;
}) {
  return (
    <li className="text-ink-muted flex gap-2.5 pl-4 text-sm leading-relaxed break-keep">
      {showBullet ? (
        <span className="mt-2 size-1 shrink-0 rounded-full bg-white/40" />
      ) : null}
      <div className="min-w-0">{children}</div>
    </li>
  );
}

const CompoundCustomList = Object.assign(CustomList, {
  MainListItem,
  SubListItem,
});

export default CompoundCustomList;
