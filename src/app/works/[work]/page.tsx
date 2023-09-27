import Section from '@/components/Section/Section'
import WorksBreadCrumb from '@/app/works/_container/WorksBreadCrumb'
import React from 'react'
import { workContent } from './_container/worksConents'

const WorkPage = ({ params }: { params: { work: string } }) => {
  const work = params.work

  return (
    <>
      <Section>
        <WorksBreadCrumb subTitle={work} />
      </Section>
      <Section alignItems="items-start">{workContent[work]}</Section>
    </>
  )
}

export default WorkPage
