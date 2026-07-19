import type { ReactNode } from 'react';

interface SubTitleProps {
  title: string;
  eyebrow?: string;
  trailing?: ReactNode;
}

function SubTitle({ title, eyebrow, trailing }: SubTitleProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-1.5">
      {eyebrow && (
        <span className="text-brand-lavender/70 text-xs font-bold tracking-widest uppercase">
          {eyebrow}
        </span>
      )}
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
        {trailing ? <div className="ml-auto shrink-0">{trailing}</div> : null}
      </div>
      <div className="from-brand-muted/45 mt-2 h-px w-full bg-linear-to-r to-transparent" />
    </div>
  );
}

export default SubTitle;
