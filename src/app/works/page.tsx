import React from 'react'
import Section from '@/components/Section/Section'
import Link from 'next/link'
import WorksList from './_container/WorksList'
import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper'

const WorksPage = () => {
  return (
    <TransitionPageWrapper>
      <Section>
        <div className="w-full flex flex-col gap-0.5 mb-4">
          <Link href="/works" className="text-2xl font-bold">
            Works
          </Link>
          <div className="w-full h-[2px] bg-gray-dark dark:bg-white rounded-full" />
        </div>
        <WorksList />
      </Section>
    </TransitionPageWrapper>
  )
}

export default WorksPage
