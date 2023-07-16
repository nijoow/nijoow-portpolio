import { IPartTitle } from '@/type/interface'
import React from 'react'

const PartTitle = ({ title }: IPartTitle) => {
  return (
    <div className={'ml-1 mt-1.5 mb-0.5 text-base font-semibold'}>
      [{title}]
    </div>
  )
}

export default PartTitle
