import { motion } from "framer-motion"

export function Achievements() {
  const achievements = [
    {
      title: "Attracted 3000+ University Tech Fest",
      description:
        "Led promotional efforts for a tech fest that attracted 3000+ attendees from different states across India.",
      year: "2024",
    },
    {
      title: "Winner Web Designing Competition (ITYUKTA'22)",
      description: "Organized by Jawaharlal Nehru Technological University Gurajada",
      year: "2022",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Achievements
      </h2>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold text-purple-300">{achievement.title}</h3>
            <p className="text-sm text-purple-200">{achievement.description}</p>
            <p className="text-xs text-purple-400">{achievement.year}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

