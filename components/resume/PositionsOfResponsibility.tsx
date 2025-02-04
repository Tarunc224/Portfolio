import { motion } from "framer-motion"

export function PositionsOfResponsibility() {
  const positions = [
    {
      title: "Training and Placement Coordinator",
      organization: "JNTU-GV",
      period: "Mar 2024 - Present",
    },
    {
      title: "Chief Marketing Officer, National Level Tech Fest, ITYUKTA 2K24",
      organization: "JNTU-GV",
      period: "Feb 2024 - Mar 2024",
    },
    {
      title: "Head Coordinator, CodeWars Coding Contest Season, ITYUKTA 2K24",
      organization: "JNTU-GV Vizianagaram",
      period: "Mar 2024",
    },
    {
      title: "Community Service(Tutor), Technology Teacher",
      organization: "MPPS Pinnitepate, Srikakulam",
      period: "Apr 2023 - Jun 2023",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Positions of Responsibility
      </h2>
      <div className="space-y-4">
        {positions.map((position, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold text-purple-300">{position.title}</h3>
            <p className="text-sm text-purple-200">{position.organization}</p>
            <p className="text-xs text-purple-400">{position.period}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

