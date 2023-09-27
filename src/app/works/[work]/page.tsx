import Section from '@/components/Section/Section'
import WorksBreadCrumb from '@/app/works/_container/WorksBreadCrumb'
import React from 'react'
import { workContent } from './_container/worksConents'
import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper'

export function generateStaticParams() {
  return [
    { work: 'catch-the-candy' },
    { work: 'nijoow-vintage' },
    { work: 'nijoow-launchpad' },
    { work: 'treenow' },
    { work: 'memory' },
    { work: 'portfolio' },
    { work: 'prfl-link' },
    { work: 'ai-love-predictor' },
    { work: 'nijoow-cocktail' },
    { work: 'nijoow-drawing' },
  ]
}

const WorkPage = ({ params }: { params: { work: string } }) => {
  const work = params.work

  return (
    <TransitionPageWrapper>
      <Section>
        <WorksBreadCrumb subTitle={work} />
      </Section>
      <Section alignItems="items-start">{workContent[work]}</Section>
    </TransitionPageWrapper>
  )
}

export default WorkPage
