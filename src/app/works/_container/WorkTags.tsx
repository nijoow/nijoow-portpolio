'use client'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import React from 'react'

const workFilterData = [
  'Web',
  'Design',
  'Frontend',
  'Interactive',
  '3D',
  'Backend',
]

const WorkTags = () => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const selectedTags = searchParams.getAll('tags')

  return (
    <div className="w-full flex gap-1 flex-wrap mb-2">
      {workFilterData.map((data) => (
        <button
          key={data}
          className={cn('text-xs px-2 py-1 rounded-md ', {
            'bg-purple-regular text-white': selectedTags.includes(data),
            'bg-gray-300 text-gray-500': !selectedTags.includes(data),
          })}
          onClick={() => {
            const newTags = selectedTags.includes(data)
              ? selectedTags.filter((tag) => tag !== data)
              : [...selectedTags, data]
            const newParams = new URLSearchParams(
              newTags.map((tag) => ['tags', tag]),
            )

            router.replace(`${pathName}?${newParams.toString()}`)
          }}
        >
          {data}
        </button>
      ))}
    </div>
  )
}

export default WorkTags
