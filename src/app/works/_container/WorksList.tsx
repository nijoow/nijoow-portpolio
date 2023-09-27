'use client'

import React from 'react'
import { prefix } from '@/config/config'
import { works } from './worksData'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const WorksList = () => {
  const worksList = [...works].reverse()

  return (
    <div className={'w-full grid grid-cols-2 gap-3'}>
      {worksList.map((work) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`col-span-2 sm:col-span-1 w-full relative pb-[56.25%] h-0 group overflow-hidden rounded-lg shadow-md `}
          key={work.id}
        >
          {work.imgSrc === '' ? (
            <div>이미지가 없습니다</div>
          ) : (
            <Image
              src={`${prefix}/images/works/${work.imgSrc}`}
              fill
              alt={work.name}
            />
          )}
          <Link
            href={`/works/${work.pageName}`}
            className={`absolute inset-0 w-full h-full bg-black/70 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-all duration-300`}
          >
            <span className="text-lg text-white">{work.name} &gt;</span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default WorksList
