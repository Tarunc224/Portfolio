import { motion } from "framer-motion"

export function Certifications() {
  const certifications = [
    { name: "MITx Certified HST.953x: Collaborative Data Science for Healthcare", date: "Sep 2024" },
    { name: "Harvard Online Certified Tiny Machine Learning (TinyML) Professional", date: "Sep 2024" },
    { name: "Oracle Certified Artificial Intelligence with Machine Learning in Java", date: "May 2024" },
    { name: "Stanford Certificate for Algorithms: Design and Analysis", date: "May 2024" },
    { name: "Tsinghua University Certified Conversational English Skills", date: "Apr 2024" },
    { name: "Google Certified AI for Anyone", date: "Mar 2024" },
    { name: "Kaggle Certified Python Course", date: "Jul 2023" },
    { name: "Google Certified Fundamental Digital Marketing", date: "May 2023" },
    { name: "Tata Consultancy Services Certified Virtual Experience Program", date: "Apr 2023" },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-sm font-semibold text-purple-300">{cert.name}</h3>
            <p className="text-xs text-purple-400">{cert.date}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

