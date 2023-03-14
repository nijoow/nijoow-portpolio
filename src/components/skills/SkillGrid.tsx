import { ISkillGrid } from '@type/interface';
import React, { useRef } from 'react';
import Skill from '@components/skills/Skill';

const SkillGrid = ({ skills }: ISkillGrid) => {
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef} className={'grid grid-cols-4 w-full mt-4 mb-8 gap-8 rounded-xl py-8 bg-purple-light/50 overflow-hidden'}>
      {skills.map((skill) => (
        <Skill key={skill.name} name={skill.name} fileName={skill.fileName} constraintsRef={constraintsRef} />
      ))}
    </div>
  );
};

export default SkillGrid;
