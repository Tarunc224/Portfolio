import { motion } from "framer-motion"

export function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Experience
      </h2>
      <div className="space-y-4">
        {[
          {
            title: "ML Research Intern",
            company: "National Institute of Technology, Warangal",
            date: "May 2024 - June 2024",
            details: [
              "Improved software effort estimation using advanced ML models",
              "Worked with Dr. Manjubala Bisi and implemented various models",
              "Applied feature selection using Pearson correlation",
            ],
          },
          {
            title: "Front End Developer Intern",
            company: "IBM SkillsBuild - Edunet",
            date: "Jul 2023 - Aug 2023",
            details: [
              "Designed and implemented a fully functional e-book store",
              "Gained comprehensive knowledge of modern front-end technologies",
            ],
          },
        ].map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg bg-gray-900 p-4 md:p-6 text-center shadow-lg"
          >
            <h3 className="text-lg md:text-xl font-bold text-purple-300">{exp.title}</h3>
            <p className="text-base md:text-lg text-purple-200">{exp.company}</p>
            <p className="text-sm md:text-base text-purple-400">{exp.date}</p>
            <ul className="mt-2 list-none space-y-2">
              {exp.details.map((detail, i) => (
                <li key={i} className="text-sm md:text-base text-purple-100">
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

