import React from 'react'

interface SectionProps {
  children: React.ReactNode
  alignItems?:
    | 'items-start'
    | 'items-end'
    | 'items-center'
    | 'items-baseline'
    | 'items-stretch'
}

const Section = ({ children, alignItems = 'items-center' }: SectionProps) => {
  return (
    <div
      className={`flex flex-col w-full max-w-3xl mx-auto gap-2 ${alignItems}`}
    >
      {children}
    </div>
  )
}

export default Section
