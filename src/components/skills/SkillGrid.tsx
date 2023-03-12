import { ISkillGrid } from '@type/interface';
import React from 'react';
import Skill from '@components/skills/Skill';

const SkillGrid = ({ skills }: ISkillGrid) => {
  return (
    <div className={'grid grid-cols-12 w-full mt-4 mb-8 gap-8 rounded-xl py-8 bg-purple-light/50'}>
      {skills.map((skill) => {
        return <Skill key={skill.name} name={skill.name} fileName={skill.fileName} />;
      })}
    </div>
  );
};

export default SkillGrid;
