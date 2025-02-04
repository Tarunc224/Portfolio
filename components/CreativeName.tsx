"use client"

import { motion } from "framer-motion"

export const CreativeName: React.FC = () => {
  return (
    <motion.h1
      className="text-4xl font-bold mb-4 text-purple-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Tarun Chintada
    </motion.h1>
  )
}

