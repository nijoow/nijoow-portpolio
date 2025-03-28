'use client'

import { prefix } from '@/config/config'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { works } from './worksData'

const WorksList = () => {
  const searchParams = useSearchParams()

  const selectedTags = searchParams.getAll('tags')

  const worksList = [...works]
    .reverse()
    .filter(
      (work) =>
        selectedTags.length === 0 ||
        selectedTags.some((tag) => work.tags.includes(tag)),
    )

  return (
    <div className={'w-full grid grid-cols-2 gap-3'}>
      {worksList.map((work) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`col-span-2 sm:col-span-1 w-full h-auto relative aspect-video group overflow-hidden rounded-lg shadow-md bg-white/80`}
          key={work.name}
        >
          {work.imgSrc === '' ? (
            <div>이미지가 없습니다</div>
          ) : (
            <>
              <Image
                src={`${prefix}/images/works/${work.imgSrc}`}
                quality={10}
                alt="backdrop"
                fill
                objectFit="cover"
                className="blur-md"
              />
              <Image
                src={`${prefix}/images/works/${work.imgSrc}`}
                fill
                alt={work.name}
                objectFit="contain"
              />
            </>
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
