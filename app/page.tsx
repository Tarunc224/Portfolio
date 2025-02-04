"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import ChatBot from "@/components/ChatBot"
import CustomCursor from "@/components/CustomCursor"
import { Education } from "@/components/resume/Education"
import { Experience } from "@/components/resume/Experience"
import { Projects } from "@/components/resume/Projects"
import { Skills } from "@/components/resume/Skills"
import { Accomplishments } from "@/components/resume/Accomplishments"
import { FlessyButton } from "@/components/FlessyButton"
import FlessyTransition from "@/components/FlessyTransition"
import { Linkedin } from "lucide-react"
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton"
import { CreativeName } from "@/components/CreativeName"
import { EnhancedBackground } from "@/components/EnhancedBackground"
import { ParallaxSection } from "@/components/ParallaxSection"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { EmailButton } from "@/components/EmailButton"
import Image from "next/image"
import { Footer } from "@/components/Footer"

type Section = "about" | "education" | "experience" | "projects" | "skills" | "accomplishments" | "chat"

export default function Page() {
  const [activeSection, setActiveSection] = useState<Section>("about")
  const [showFlessyTransition, setShowFlessyTransition] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  const sectionRefs = useRef<{ [key in Section]: HTMLDivElement | null }>({
    about: null,
    education: null,
    experience: null,
    projects: null,
    skills: null,
    accomplishments: null,
    chat: null,
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = containerRef.current?.scrollTop ?? 0 + window.innerHeight / 2

      Object.entries(sectionRefs.current).forEach(([key, ref]) => {
        if (ref && scrollPosition >= ref.offsetTop && scrollPosition < ref.offsetTop + ref.offsetHeight) {
          setActiveSection(key as Section)
        }
      })
    }

    containerRef.current?.addEventListener("scroll", handleScroll)
    return () => containerRef.current?.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSectionChange = (section: Section) => {
    if (section === "chat") {
      setShowFlessyTransition(true)
    } else {
      setActiveSection(section)
      sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleFlessyTransitionComplete = () => {
    setShowFlessyTransition(false)
    setActiveSection("chat")
  }

  const renderSection = (section: Section) => {
    switch (section) {
      case "about":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-8"
          >
            <div className="flex-shrink-0">
              <Image
                src="/tarun-profile.jpg"
                alt="."
                width={150}
                height={150}
                className="rounded-full border-4 border-purple-500"
              />
            </div>
            <div className="space-y-6 text-center">
              <h1 className="text-4xl font-bold text-purple-300">Tarun Chintada</h1>
              <p className="text-xl md:text-2xl text-purple-300">ML Research Intern</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <EmailButton />
                <WhatsAppButton />
              </div>
              <motion.a
                href="https://www.linkedin.com/in/tarun224/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
                Connect on LinkedIn
              </motion.a>
              <div className="mt-6">
                <ResumeDownloadButton />
              </div>
            </div>
          </motion.div>
        )
      case "education":
        return <Education />
      case "experience":
        return <Experience />
      case "projects":
        return <Projects />
      case "skills":
        return <Skills />
      case "accomplishments":
        return <Accomplishments />
      case "chat":
        return <ChatBot />
    }
  }

  return (
    <div className="relative min-h-screen bg-[#111827] text-white overflow-hidden">
      <CustomCursor isChatActive={activeSection === "chat"} />
      <motion.div>
        <EnhancedBackground />
      </motion.div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-30 flex w-full flex-wrap items-center justify-center gap-2 bg-black/50 p-4 backdrop-blur-sm"
      >
        {["about", "education", "experience", "projects", "skills", "accomplishments"].map((section) => (
          <Button
            key={section}
            variant={activeSection === section ? "default" : "ghost"}
            onClick={() => handleSectionChange(section as Section)}
            className={`transition-all duration-300 hover:scale-110 text-sm sm:text-base ${
              activeSection === section ? "bg-purple-600 text-white" : ""
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Button>
        ))}
      </motion.nav>

      <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory relative">
        {["about", "education", "experience", "projects", "skills", "accomplishments"].map((section) => (
          <section
            key={section}
            ref={(el) => (sectionRefs.current[section as Section] = el)}
            className={`min-h-screen flex items-center justify-center p-4 snap-start ${
              section === "about" ? "pt-0 z-10" : ""
            }`}
          >
            <ParallaxSection>
              <div className="w-full max-w-4xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full rounded-lg bg-black/30 p-8 backdrop-blur-sm transition-all duration-300 ease-in-out"
                  >
                    {renderSection(section as Section)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </ParallaxSection>
          </section>
        ))}
        {activeSection !== "chat" && <Footer />}
      </div>

      {activeSection !== "chat" && (
        <FlessyButton onClick={() => handleSectionChange("chat")} className="flessy-button animate-bounce" />
      )}

      <AnimatePresence>
        {showFlessyTransition && <FlessyTransition onComplete={handleFlessyTransitionComplete} />}
      </AnimatePresence>

      {activeSection === "chat" && (
        <div className="fixed inset-0 z-50 bg-[#111827] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              onClick={() => setActiveSection("about")}
              className="absolute top-4 left-4 z-50 bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Back to Portfolio
            </Button>
            <ChatBot />
          </motion.div>
        </div>
      )}
    </div>
  )
}

