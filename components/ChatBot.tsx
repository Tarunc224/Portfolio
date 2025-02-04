"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import VoiceInput from "./VoiceInput"
import { EnhancedBackground } from "./EnhancedBackground"
import CustomCursor from "./CustomCursor"

export default function ChatBot() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string; id: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTtsEnabled, setIsTtsEnabled] = useState(true)
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, messagesEndRef]) // Added messagesEndRef to dependencies

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    await sendMessage(input)
  }

  const sendMessage = async (message: string) => {
    setIsLoading(true)
    const userMessage = { role: "user" as const, content: message, id: Date.now().toString() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error(`Oops! Looks like today's energy bar just hit 0%. Time to recharge! 🔋💤

But don’t worry—I’ll be back tomorrow, sharper than a freshly compiled code! 😆🚀 status: ${response.status}`)
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      const botMessage = { role: "bot" as const, content: data.response, id: Date.now().toString() }
      setMessages((prev) => [...prev, botMessage])
      if (isTtsEnabled) {
        speakText(data.response, botMessage.id)
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `Sorry, I encountered an error: ${error.message}`, id: Date.now().toString() },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const speakText = (text: string, id: string) => {
    if ("speechSynthesis" in window && isTtsEnabled) {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        setCurrentSpeakingId(null)
        if (id === currentSpeakingId) {
          return
        }
      }

      const utterance = new SpeechSynthesisUtterance(text)
      const voices = window.speechSynthesis.getVoices()
      const femaleVoice = voices.find((voice) => voice.name.includes("female") || voice.name.includes("woman"))

      if (femaleVoice) {
        utterance.voice = femaleVoice
      }

      utterance.pitch = 1.1
      utterance.rate = 0.9

      utterance.onstart = () => {
        setIsSpeaking(true)
        setCurrentSpeakingId(id)
      }
      utterance.onend = () => {
        setIsSpeaking(false)
        setCurrentSpeakingId(null)
      }
      utterance.onerror = () => {
        setIsSpeaking(false)
        setCurrentSpeakingId(null)
      }
      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleSpeech = (text: string, id: string) => {
    if (isSpeaking && id === currentSpeakingId) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setCurrentSpeakingId(null)
    } else {
      speakText(text, id)
    }
  }

  const handleVoiceInput = (result: string) => {
    setInput(result)
    sendMessage(result)
  }

  return (
    <div className="relative min-h-screen bg-[#111827] text-white overflow-hidden">
      <CustomCursor />
      <EnhancedBackground />
      <div className="flex flex-col items-center justify-center min-h-screen w-full relative px-4 z-10">
        <div className="w-full max-w-4xl">
          {/* Profile Section */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
              <Image
                src="/1714996974705.jpeg"
                alt="."
                fill
                className="rounded-full object-cover border-4 border-purple-500 shadow-lg"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-purple-400"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
              Dive into Flessy's Digital Mind
            </h2>
            <p className="text-xl md:text-2xl text-purple-300 animate-bounce">Tarun's AI Assistant</p>
          </motion.div>

          {/* Chat Messages */}
          <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      relative max-w-sm p-4 md:p-5 rounded-2xl
                      ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-purple-800"
                          : index === messages.length - 1 && msg.role === "bot"
                            ? "bg-gradient-to-r from-gray-800 to-gray-900"
                            : "bg-gray-700"
                      }
                    `}
                  >
                    {msg.role === "bot" && (
                      <motion.div
                        className="absolute -left-3 -top-3"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Bot className="w-6 h-6 text-purple-400" />
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`text-lg md:text-xl text-white ${
                        index === messages.length - 1 && msg.role === "bot" ? "whitespace-pre-wrap" : ""
                      }`}
                    >
                      {msg.content}
                    </motion.div>
                    {/* Sound button for bot messages */}
                    {msg.role === "bot" && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSpeech(msg.content, msg.id)}
                        className="absolute bottom-2 right-2 p-2 bg-purple-500 rounded-full opacity-50 hover:opacity-100 transition-opacity"
                      >
                        {isSpeaking && currentSpeakingId === msg.id ? (
                          <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative w-full max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Unlock Tarun's secrets...  What do you want to know?"
                className="w-full px-6 py-4 md:py-5 bg-gray-900/50 backdrop-blur-sm rounded-full border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 pr-24 md:pr-28 text-lg md:text-xl"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <VoiceInput onResult={handleVoiceInput} isListening={isListening} setIsListening={setIsListening} />
                <button type="submit" disabled={isLoading}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 bg-purple-600 rounded-full"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <Send className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                </button>
              </div>
            </div>
          </motion.form>
        </div>
        {isSpeaking && isTtsEnabled && (
          <motion.div
            className="fixed bottom-4 left-4 bg-purple-600 text-white px-4 py-2 md:px-5 md:py-3 rounded-full text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Flessy is speaking...
          </motion.div>
        )}
      </div>
    </div>
  )
}

