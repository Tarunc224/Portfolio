"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-black/50 backdrop-blur-sm border-t border-purple-500/20 py-6 text-center z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-purple-300">
            <span>© {new Date().getFullYear()} Tarun Chintada. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <motion.div className="flex items-center gap-2">
              <span>Developed and hosted with</span>
              <motion.a
                href="https://v0.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors font-semibold group"
                whileHover={{ y: -2 }}
              >
                v0.dev
                <motion.span
                  className="block h-0.5 bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

