"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

interface FlessyButtonProps {
  onClick: () => void
  className?: string
}

export const FlessyButton: React.FC<FlessyButtonProps> = ({ onClick, className }) => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const textControls = useAnimation()

  useEffect(() => {
    if (isHovered) {
      controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
      })
      textControls.start({
        y: [0, -5, 0],
        transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
      })
    } else {
      controls.stop()
      textControls.stop()
      controls.start({ scale: 1, rotate: 0 })
      textControls.start({ y: 0 })
    }
  }, [isHovered, controls, textControls])

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full flex items-center space-x-3 overflow-hidden shadow-lg ${className}`}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.5)" }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div animate={controls} className="relative w-12 h-12">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Kitten body */}
          <circle cx="50" cy="50" r="40" fill="#8B5CF6" />
          {/* Ears */}
          <motion.polygon
            points="30,30 20,10 40,20"
            fill="#8B5CF6"
            animate={isHovered ? { points: "30,25 20,5 40,15" } : {}}
          />
          <motion.polygon
            points="70,30 80,10 60,20"
            fill="#8B5CF6"
            animate={isHovered ? { points: "70,25 80,5 60,15" } : {}}
          />
          {/* Eyes */}
          <motion.circle cx="35" cy="40" r="5" fill="white" animate={isHovered ? { cy: 38 } : {}} />
          <motion.circle cx="65" cy="40" r="5" fill="white" animate={isHovered ? { cy: 38 } : {}} />
          {/* Pupils */}
          <motion.circle cx="35" cy="40" r="2" fill="black" animate={isHovered ? { cy: 38, cx: 36 } : {}} />
          <motion.circle cx="65" cy="40" r="2" fill="black" animate={isHovered ? { cy: 38, cx: 66 } : {}} />
          {/* Nose */}
          <polygon points="50,50 45,55 55,55" fill="pink" />
          {/* Mouth */}
          <motion.path
            d="M 45 60 Q 50 65 55 60"
            fill="none"
            stroke="white"
            strokeWidth="2"
            animate={isHovered ? { d: "M 45 60 Q 50 70 55 60" } : {}}
          />
          {/* Whiskers */}
          <motion.g
            stroke="white"
            strokeWidth="1"
            animate={isHovered ? { rotate: 5 } : {}}
            style={{ transformOrigin: "center" }}
          >
            <line x1="30" y1="55" x2="10" y2="50" />
            <line x1="30" y1="58" x2="10" y2="58" />
            <line x1="70" y1="55" x2="90" y2="50" />
            <line x1="70" y1="58" x2="90" y2="58" />
          </motion.g>
        </svg>
      </motion.div>
      <motion.span className="font-semibold text-lg" animate={textControls}>
        Chat with Flessy!
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0"
        animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

