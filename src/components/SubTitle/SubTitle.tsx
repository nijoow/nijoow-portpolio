import Eyebrow from '@/components/ui/Eyebrow';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export type SectionTone = 'primary' | 'standard' | 'quiet';

const TITLE_CLASS: Record<SectionTone, string> = {
  primary: 'text-3xl font-bold sm:text-4xl',
  standard: 'text-2xl font-bold sm:text-3xl',
  quiet: 'text-lg font-bold sm:text-xl',
};

const WRAPPER_CLASS: Record<SectionTone, string> = {
  primary: 'mb-7',
  standard: 'mb-6',
  quiet: 'mb-4',
};

interface SubTitleProps {
  title: string;
  eyebrow?: string;
  trailing?: ReactNode;
  tone?: SectionTone;
}

function SubTitle({
  title,
  eyebrow,
  trailing,
  tone = 'standard',
}: SubTitleProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-1.5',
        WRAPPER_CLASS[tone],
        tone === 'quiet' && 'gap-1',
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <h2 className={TITLE_CLASS[tone]}>{title}</h2>
        {trailing ? <div className="ml-auto shrink-0">{trailing}</div> : null}
      </div>
      {tone === 'quiet' ? null : (
        <div
          className={cn(
            'mt-2 h-px w-full bg-linear-to-r to-transparent',
            tone === 'primary'
              ? 'from-brand-lavender/50'
              : 'from-brand-muted/45',
          )}
        />
      )}
    </div>
  );
}

export default SubTitle;
