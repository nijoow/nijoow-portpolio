'use client';

import { StaticSignature } from '@/components/Immersive/StaticSignature';
import Section from '@/components/Section/Section';
import { getWork } from '@/features/works/data/worksData';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import WorksBreadCrumb from '../_container/WorksBreadCrumb';

export default function Template({ children }: { children: ReactNode }) {
  const pathName = usePathname();

  const slug = pathName.split('/works/')[1] ?? '';
  const work = getWork(slug);

  return (
    <div>
      <StaticSignature eyebrow="Project Detail" title="만든 것과 맡은 일" />
      <Section>
        <WorksBreadCrumb work={work} slug={slug} />
      </Section>
      <Section alignItems="items-start">{children}</Section>
    </div>
  );
}
