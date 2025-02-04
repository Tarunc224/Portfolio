import { motion } from "framer-motion"
import { Award, BookOpen, Briefcase, GraduationCap } from "lucide-react"

export function Accomplishments() {
  const sections = [
    {
      title: "Positions of Responsibility",
      icon: <Briefcase className="w-6 h-6 text-purple-400" />,
      items: [
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
      ],
    },
    {
      title: "Research and Publications",
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      items: [
        {
          title: "Draft: Enhancing Analogy-Based Software Effort Estimation with Firefly Algorithm Optimization",
          date: "July 2024",
        },
      ],
    },
    {
      title: "Achievements",
      icon: <Award className="w-6 h-6 text-purple-400" />,
      items: [
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
      ],
    },
    {
      title: "Certifications",
      icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
      items: [
        { name: "MITx Certified HST.953x: Collaborative Data Science for Healthcare", date: "Sep 2024" },
        { name: "Harvard Online Certified Tiny Machine Learning (TinyML) Professional", date: "Sep 2024" },
        { name: "Oracle Certified Artificial Intelligence with Machine Learning in Java", date: "May 2024" },
        { name: "Stanford Certificate for Algorithms: Design and Analysis", date: "May 2024" },
        { name: "Tsinghua University Certified Conversational English Skills", date: "Apr 2024" },
        { name: "Google Certified AI for Anyone", date: "Mar 2024" },
        { name: "Kaggle Certified Python Course", date: "Jul 2023" },
        { name: "Google Certified Fundamental Digital Marketing", date: "May 2023" },
        { name: "Tata Consultancy Services Certified Virtual Experience Program", date: "Apr 2023" },
      ],
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Accomplishments
      </h2>
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            {section.icon}
            <h3 className="text-xl md:text-2xl font-semibold text-purple-300">{section.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300"
              >
                {"title" in item ? (
                  <>
                    <h4 className="text-sm font-semibold text-purple-300">{item.title}</h4>
                    {"organization" in item && <p className="text-xs text-purple-200">{item.organization}</p>}
                    {"period" in item && <p className="text-xs text-purple-400">{item.period}</p>}
                    {"description" in item && <p className="text-xs text-purple-200 mt-1">{item.description}</p>}
                    {"year" in item && <p className="text-xs text-purple-400 mt-1">{item.year}</p>}
                  </>
                ) : (
                  <>
                    <h4 className="text-sm font-semibold text-purple-300">{item.name}</h4>
                    <p className="text-xs text-purple-400">{item.date}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

