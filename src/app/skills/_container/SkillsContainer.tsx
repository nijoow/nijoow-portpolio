'use client'
import React, { useRef } from 'react'
import Skill, { SkillType } from './Skill'

interface SkillsContainerProps {
  skills: SkillType[]
}

const SkillsContainer = ({ skills }: SkillsContainerProps) => {
  const constraintsRef = useRef(null)

  return (
    <div
      ref={constraintsRef}
      className={
        'grid grid-cols-4 w-full mt-4 mb-8 gap-8 rounded-xl py-8 bg-purple-light/50 '
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
  )
}

export default SkillsContainer
