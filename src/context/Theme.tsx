'use client'
import { ThemeProvider } from 'next-themes'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Theme = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      {children}
    </ThemeProvider>
  )
}

export default Theme
