'use client'

import { motion } from 'framer-motion'
import React from 'react'

const TransitionPageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

export default TransitionPageWrapper
