'use client';

import React, { useRef } from 'react';
import Skill, { SkillType } from './Skill';

interface SkillsContainerProps {
  skills: SkillType[];
}

const SkillsContainer = ({ skills }: SkillsContainerProps) => {
  const constraintsRef = useRef(null);

  return (
    <div
      ref={constraintsRef}
      className={
        'mb-8 mt-4 grid w-full grid-cols-4 gap-8 rounded-xl bg-purple-light/50 py-8'
      }
    >
      {skills.map((skill) => (
        <Skill
          key={skill.name}
          name={skill.name}
          fileName={skill.fileName}
          constraintsRef={constraintsRef}
        />
      ))}
    </div>
  );
};

export default SkillsContainer;
