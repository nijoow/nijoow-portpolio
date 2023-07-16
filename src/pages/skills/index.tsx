import Head from 'next/head'
import Section from '@/components/_common/section/section'
import SubTitle from '@/components/_common/SubTitle'
import SkillGrid from '@/components/skills/SkillGrid'
import { skillsEtc, skillsFront } from '@/data/skills'

const SkillsPage = () => {
  return (
    <>
      <Head>
        <title>Skill</title>
      </Head>
      <Section>
        <SubTitle title="Front-End Skills" />
        <SkillGrid skills={skillsFront} />
      </Section>
      <Section>
        <SubTitle title="Etc Skills" />
        <SkillGrid skills={skillsEtc} />
      </Section>
    </>
  )
}
export default SkillsPage
