import Section from '@/components/Section/Section'
import SubTitle from '@/components/SubTitle/SubTitle'
import SkillsContainer from './_container/SkillsContainer'
import React from 'react'
import { skillsEtc, skillsFront } from './_container/skillsData'

const SkillsPage = () => {
  return (
    <>
      <Section>
        <SubTitle title="Front-End Skills" />
        <SkillsContainer skills={skillsFront} />
      </Section>
      <Section>
        <SubTitle title="Etc Skills" />
        <SkillsContainer skills={skillsEtc} />
      </Section>
    </>
  )
}

export default SkillsPage
