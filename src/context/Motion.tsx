'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import React from 'react'

type Props = {
  children: React.ReactNode
}

const Motion = ({ children }: Props) => {
  const pathname = usePathname()

  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4 }}
        key={pathname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default Motion
