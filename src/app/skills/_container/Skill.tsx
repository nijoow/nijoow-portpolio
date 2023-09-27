'use client'

import { prefix } from '@/config/config'
import { motion, useAnimationControls } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'

export interface SkillType {
  fileName: string
  name: string
}

interface SkillProps extends SkillType {
  constraintsRef: React.MutableRefObject<null>
}

const Skill = ({ fileName, name, constraintsRef }: SkillProps) => {
  const controls = useAnimationControls()

  useEffect(() => {
    window.addEventListener('resize', resetMotionDiv)
    return () => window.removeEventListener('resize', resetMotionDiv)
  }, [])

  const resetMotionDiv = () => {
    controls.set({ x: 0, y: 0 })
  }

  return (
    <motion.div
      animate={controls}
      drag
      dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
      dragConstraints={constraintsRef}
      dragSnapToOrigin
      whileHover={{ scale: 1.2 }}
      className="flex flex-col items-center col-span-2 gap-2 cursor-pointer sm:col-span-1"
    >
      <div
        className={`transition-all duration-300 rounded-lg overflow-hidden w-16 h-16 relative ${
          name === 'NEXT JS' ? 'dark:bg-purple-50 bg-transparent p-2' : ''
        }`}
      >
        <Image
          src={`${prefix}/images/skills/${fileName}`}
          alt={fileName}
          fill
          className={`pointer-events-none ${name === 'NEXT JS' ? 'p-1' : ''}`}
        />
      </div>
      <span className={'font-semibold'}>{name}</span>
    </motion.div>
  )
}
export default Skill
