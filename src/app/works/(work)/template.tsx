'use client'

import Section from '@/components/Section/Section'
import { usePathname } from 'next/navigation'
import React from 'react'
import WorksBreadCrumb from '../_container/WorksBreadCrumb'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()

  const workName = pathName.split('/works/')[1]

  return (
    <>
      <Section>
        <WorksBreadCrumb subTitle={workName} />
      </Section>
      <Section alignItems="items-start">{children}</Section>
    </>
  )
}
