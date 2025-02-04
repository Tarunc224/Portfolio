"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CustomCursorProps {
  isChatActive?: boolean
}

export default function CustomCursor({ isChatActive = false }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      setIsPointer(window.getComputedStyle(target).cursor === "pointer")

      setTrail((prevTrail) => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY }]
        if (newTrail.length > 5) {
          newTrail.shift()
        }
        return newTrail
      })
    }

    window.addEventListener("mousemove", updateCursor)
    return () => window.removeEventListener("mousemove", updateCursor)
  }, [])

  if (isChatActive) {
    return null
  }

  return (
    <>
      <style jsx global>{`
        body * {
          cursor: none !important;
        }
      `}</style>
      {trail.map((point, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
          animate={{
            x: point.x,
            y: point.y,
            scale: 1 - index * 0.2,
            opacity: 1 - index * 0.2,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <div className="relative -left-1/2 -top-1/2 h-2 w-2 rounded-full bg-white" />
        </motion.div>
      ))}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="relative -left-1/2 -top-1/2 h-4 w-4 rounded-full bg-white" />
      </motion.div>
    </>
  )
}

