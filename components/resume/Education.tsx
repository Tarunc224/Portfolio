import { motion } from "framer-motion"

export function Education() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Education
      </h2>
      <div className="space-y-4">
        {[
          {
            title: "B.Tech. (IT)",
            school: "Jawaharlal Nehru Technological University - Gurajada, Vizianagaram",
            grade: "CGPA: 7.91/10 (2021-2025)",
          },
          {
            title: "B.Tech Minor. (Mech)",
            school: "Jawaharlal Nehru Technological University - Gurajada, Vizianagaram",
            grade: "CGPA: 8/10 (2022-2025)",
          },
        ].map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg bg-gray-900 p-4 md:p-6 text-center shadow-lg"
          >
            <h3 className="text-lg md:text-xl font-bold text-purple-300">{edu.title}</h3>
            <p className="text-base md:text-lg text-purple-200">{edu.school}</p>
            <p className="text-sm md:text-base text-purple-400">{edu.grade}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

