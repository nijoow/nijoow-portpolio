import Section from '@/components/_common/section/section'
import { GetStaticProps } from 'next'
import React from 'react'
import WorksBreadCrumb from '@/components/works/WorksBreadCrumb'
import { WorkContent } from '@/data/works/worksConents'
import { worksPaths } from '@/data/works/worksPath'

export const getStaticPaths = async () => {
  return {
    paths: worksPaths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: { slug: context.params?.slug },
  }
}

const WorksDetailPage = ({ slug }: any) => {
  return (
    <>
      <Section>
        <WorksBreadCrumb subTitle={slug} />
      </Section>
      <Section alignItems="items-start">{WorkContent[slug]}</Section>
    </>
  )
}

export default WorksDetailPage
