import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  alignItems?:
    | 'items-start'
    | 'items-end'
    | 'items-center'
    | 'items-baseline'
    | 'items-stretch';
}

function Section({ children, alignItems = 'items-center' }: SectionProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-4xl flex-col gap-2 ${alignItems}`}
    >
      {children}
    </div>
  );
}

export default Section;
