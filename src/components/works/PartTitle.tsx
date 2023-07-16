import { IPartTitle } from '@/type/interface'
import React from 'react'

const PartTitle = ({ title }: IPartTitle) => {
  return (
    <div
      className={
        'text-lg font-semibold text-purple-medium dark:text-purple-regular'
      }
    >
      [{title}]
    </div>
  )
}

export default PartTitle
