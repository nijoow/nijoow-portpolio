'use client';

import Section from '@/components/Section/Section';
import { usePathname } from 'next/navigation';
import React from 'react';
import WorksBreadCrumb from '../_container/WorksBreadCrumb';
import { getWork } from '@/features/works/data/worksData';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const slug = pathName.split('/works/')[1] ?? '';
  const work = getWork(slug);

  return (
    <div>
      <Section>
        <WorksBreadCrumb work={work} slug={slug} />
      </Section>
      <Section alignItems="items-start">{children}</Section>
    </div>
  );
}
