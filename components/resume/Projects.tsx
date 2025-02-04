import { motion } from "framer-motion"
import { Github } from "lucide-react"

export function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Projects
      </h2>
      <div className="space-y-4">
        {[
          {
            title: "Enhancing Software Effort Estimation",
            date: "May 2024 - June 2024",
            details: [
              "Developed ensemble methods for software effort estimation",
              "Used Python, Scikit-Learn, Altair AI studio",
              "Implemented various ML models and feature selection",
            ],
            github: "https://github.com/Tarunc224/nhancing_Software_Effort_Estimation_Accuracy",
          },
          {
            title: "Order Management System",
            date: "Apr 2024",
            details: [
              "Built with Java Servlets, JSP, PostgreSQL",
              "Implemented CRUD operations and user authentication",
            ],
            github: "https://github.com/Tarunc224/Java-Web-Development",
          },
        ].map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg bg-gray-900 p-4 md:p-6 text-center shadow-lg relative"
          >
            <h3 className="text-lg md:text-xl font-bold text-purple-300">{project.title}</h3>
            <p className="text-sm md:text-base text-purple-400">{project.date}</p>
            <ul className="mt-2 list-none space-y-2">
              {project.details.map((detail, i) => (
                <li key={i} className="text-sm md:text-base text-purple-100">
                  {detail}
                </li>
              ))}
            </ul>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 right-2 text-purple-400 hover:text-purple-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} className="md:w-6 md:h-6" />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

