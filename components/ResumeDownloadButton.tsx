"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

export const ResumeDownloadButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href="/TarunChintada_Resume.pdf"
      download="TarunChintada_Resume.pdf"
      className="relative inline-block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: isHovered ? 1 : 0.5, scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="relative z-10 px-6 py-3 rounded-lg bg-gray-900 text-white flex items-center space-x-2 overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: isHovered ? -4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Download size={20} />
        <span className="font-semibold">Download Resume</span>
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.a>
  )
}

