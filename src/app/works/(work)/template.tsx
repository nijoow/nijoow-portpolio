'use client'

import Section from '@/components/Section/Section'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'
import WorksBreadCrumb from '../_container/WorksBreadCrumb'
import { works } from '../_container/worksData'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  const workName = pathName.split('/works/')[1]

  const tags = works.find((work) => work.pageName === workName)?.tags

  return (
    <>
      <Section>
        <WorksBreadCrumb subTitle={workName} />
      </Section>
      <div className="flex gap-1 mb-2.5 items-center  flex-wrap">
        {tags?.map((tag) => (
          <div
            key={tag}
            className={cn(
              'text-xs px-2 py-1 rounded-md bg-purple-regular text-white',
            )}
          >
            {tag}
          </div>
        ))}
      </div>
      <Section alignItems="items-start">{children}</Section>
    </>
  )
}
