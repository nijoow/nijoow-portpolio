import Section from '@/components/Section/Section';
import SubTitle from '@/components/SubTitle/SubTitle';
import SkillsContainer from './_container/SkillsContainer';
import React from 'react';
import { skillsEtc, skillsFront } from './_container/skillsData';
import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';

const SkillsPage = () => {
  return (
    <TransitionPageWrapper>
      <Section>
        <SubTitle title="Front-End Skills" />
        <SkillsContainer skills={skillsFront} />
      </Section>
      <Section>
        <SubTitle title="Etc Skills" />
        <SkillsContainer skills={skillsEtc} />
      </Section>
    </TransitionPageWrapper>
  );
};

export default SkillsPage;
