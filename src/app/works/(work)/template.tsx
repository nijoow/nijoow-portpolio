'use client';

import Section from '@/components/Section/Section';
import { cn } from '@/lib/utils';
import { sendGAEvent } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import WorksBreadCrumb from '../_container/WorksBreadCrumb';
import { works } from '../_container/worksData';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const workName = pathName.split('/works/')[1];

  const tags = works.find((work) => work.pageName === workName)?.tags;

  useEffect(() => {
    if (workName) {
      sendGAEvent({
        event: 'view_item',
        value: workName,
      });
    }
  }, [workName]);

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        if (link && link.href) {
          sendGAEvent({
            event: 'click',
            eventCategory: 'work_link',
            linkUrl: link.href,
            workName: workName,
          });
        }
      }}
    >
      <Section>
        <WorksBreadCrumb subTitle={workName} />
      </Section>
      <div className="mb-2.5 flex flex-wrap items-center gap-1">
        {tags?.map((tag) => (
          <div
            key={tag}
            className={cn(
              'rounded-md bg-purple-regular px-2 py-1 text-xs text-white',
            )}
          >
            {tag}
          </div>
        ))}
      </div>
      <Section alignItems="items-start">{children}</Section>
    </div>
  );
}
