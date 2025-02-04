"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface DNATransitionProps {
  onComplete: () => void
}

const DNATransition: React.FC<DNATransitionProps> = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
      onComplete()
    }, 2000) // Adjust this value to control how long the animation plays

    return () => clearTimeout(timer)
  }, [onComplete])

  const dnaStrand = Array.from({ length: 20 }, (_, i) => i)

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-64 h-64">
        {dnaStrand.map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: `${index % 2 === 0 ? 25 : 75}%`,
              top: `${(index / dnaStrand.length) * 100}%`,
            }}
            initial={{ scale: 0, backgroundColor: "#8B5CF6" }}
            animate={{
              scale: [0, 1, 0],
              backgroundColor: ["#8B5CF6", "#EC4899", "#8B5CF6"],
              left: `${index % 2 === 0 ? 75 : 25}%`,
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.1,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default DNATransition

