"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import DNATransition from "./DNATransition"

interface FlessyTransitionProps {
  onComplete: () => void
}

const FlessyTransition: React.FC<FlessyTransitionProps> = ({ onComplete }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [transitionStage, setTransitionStage] = useState<"flessy" | "dna" | "complete">("flessy")

  useEffect(() => {
    const button = document.querySelector(".flessy-button")
    if (button) {
      const rect = button.getBoundingClientRect()
      setPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    }

    // Set a timer for the first stage
    const timer = setTimeout(() => {
      setTransitionStage("dna")
    }, 1500) // 3 seconds for the first stage

    return () => clearTimeout(timer)
  }, [])

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  }

  const handleFlessyAnimationComplete = () => {
    if (transitionStage === "flessy") {
      // This will be called after the 3-second timer
      // The state will already be 'dna' at this point
    }
  }

  const handleDNAAnimationComplete = () => {
    setTransitionStage("complete")
    onComplete()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {transitionStage === "flessy" && (
        <>
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d={`M ${(position.x / window.innerWidth) * 100} ${(position.y / window.innerHeight) * 100} 
                  Q 50 0, 80 50 
                  T 100 100`}
              stroke="#8B5CF6"
              strokeWidth="0.5"
              fill="none"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>
          <motion.div
            className="absolute"
            style={{ left: position.x - 40, top: position.y - 40 }}
            animate={[
              { x: 0, y: 0, transition: { duration: 0.5 } },
              {
                x: window.innerWidth * 0.8 - position.x,
                y: window.innerHeight * 0.5 - position.y,
                transition: {
                  duration: 1,
                  type: "spring",
                  stiffness: 50,
                  damping: 10,
                },
              },
              {
                x: window.innerWidth - position.x - 80,
                y: 20 - position.y,
                transition: {
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                },
              },
            ]}
            onAnimationComplete={handleFlessyAnimationComplete}
          >
            <motion.div
              className="w-20 h-20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                times: [0, 0.5, 1],
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="#8B5CF6" />
                <polygon points="30,30 20,10 40,20" fill="#8B5CF6" />
                <polygon points="70,30 80,10 60,20" fill="#8B5CF6" />
                <circle cx="35" cy="40" r="5" fill="white" />
                <circle cx="65" cy="40" r="5" fill="white" />
                <circle cx="35" cy="40" r="2" fill="black" />
                <circle cx="65" cy="40" r="2" fill="black" />
                <polygon points="50,50 45,55 55,55" fill="pink" />
                <motion.path
                  d="M 45 60 Q 50 65 55 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, yoyo: Number.POSITIVE_INFINITY }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </>
      )}
      {transitionStage === "dna" && <DNATransition onComplete={handleDNAAnimationComplete} />}
    </motion.div>
  )
}

export default FlessyTransition

