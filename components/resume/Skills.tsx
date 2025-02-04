import { motion } from "framer-motion"

export function Skills() {
  const skillCategories = [
    { title: "Programming", skills: "C, Java, Python, JavaScript, SQL" },
    { title: "Tools & OS", skills: "Git, Jupyter Notebook, Google Colab, Linux, macOS, Windows" },
    { title: "Libraries/Frameworks", skills: "Pandas, Numpy, scikit-learn, PyTorch, TensorFlow" },
    {
      title: "Technologies/Web Skills",
      skills: " Machine Learning, Deep Learning, Large Language Models, HTML/CSS, JS",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Technical Skills
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg bg-gray-900 p-4 md:p-6 text-center shadow-lg"
          >
            <h3 className="text-lg md:text-xl font-bold text-purple-300">{category.title}</h3>
            <p className="text-sm md:text-base text-purple-100">{category.skills}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

