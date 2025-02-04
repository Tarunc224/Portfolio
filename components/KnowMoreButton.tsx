'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import DNATransition from './DNATransition'

interface KnowMoreButtonProps {
  onClick: () => void
}

export const KnowMoreButton: React.FC<KnowMoreButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [showDNA, setShowDNA] = useState(false)

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 15) % 360)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const handleClick = () => {
    setShowDNA(true)
  }

  const handleTransitionComplete = () => {
    setShowDNA(false)
    onClick()
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 overflow-hidden"
        whileHover={{ scale: 1.1, boxShadow: '0px 0px 8px rgb(139, 92, 246)' }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <MessageCircle size={24} />
        </motion.div>
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Know More About Me
        </motion.span>
        <motion.div
          className="absolute inset-0 bg-purple-400"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1.5 : 0, opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ borderRadius: '100%' }}
        />
      </motion.button>
      <AnimatePresence>
        {showDNA && <DNATransition onComplete={handleTransitionComplete} />}
      </AnimatePresence>
    </>
  )
}

