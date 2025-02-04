import { motion } from "framer-motion"

export function ResearchAndPublications() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Research and Publications
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-4 rounded-lg shadow-lg"
      >
        <h3 className="text-lg font-semibold text-purple-300">
          Draft: Enhancing Analogy-Based Software Effort Estimation with Firefly Algorithm Optimization
        </h3>
        <p className="text-sm text-purple-400">July 2024</p>
      </motion.div>
    </motion.div>
  )
}

