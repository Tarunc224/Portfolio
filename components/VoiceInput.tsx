"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Mic, MicOff } from "lucide-react"
import { motion } from "framer-motion"

interface VoiceInputProps {
  onResult: (result: string) => void
  isListening: boolean
  setIsListening: (isListening: boolean) => void
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onResult, isListening, setIsListening }) => {
  const [error, setError] = useState<string | null>(null)

  const startListening = useCallback(() => {
    setError(null)
    setIsListening(true)
  }, [setIsListening])

  const stopListening = useCallback(() => {
    setIsListening(false)
  }, [setIsListening])

  useEffect(() => {
    let recognition: SpeechRecognition | null = null

    const initializeSpeechRecognition = () => {
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          onResult(transcript)
          stopListening()
        }

        recognition.onerror = (event) => {
          console.error("Speech recognition error", event.error)
          setError(`Speech recognition error: ${event.error}`)
          stopListening()
        }

        recognition.onend = () => {
          stopListening()
        }
      } else {
        setError("Speech recognition is not supported in this browser.")
      }
    }

    initializeSpeechRecognition()

    return () => {
      if (recognition) {
        recognition.abort()
      }
    }
  }, [onResult, stopListening])

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach((track) => track.stop())
      } catch (err) {
        console.error("Error accessing microphone:", err)
        setError("Microphone access denied. Please allow microphone access and try again.")
      }
    }

    checkMicrophonePermission()
  }, [])

  useEffect(() => {
    if (isListening) {
      const recognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (recognition) {
        const recognitionInstance = new recognition()
        recognitionInstance.start()
      }
    }
  }, [isListening])

  return (
    <div className="relative">
      <motion.button
        onClick={isListening ? stopListening : startListening}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isListening ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isListening ? Number.POSITIVE_INFINITY : 0 }}
      >
        <div className={`p-2 rounded-full ${isListening ? "bg-red-600" : "bg-purple-600"}`}>
          {isListening ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
        </div>
        {isListening && (
          <motion.div
            className="absolute -inset-1 bg-red-500 rounded-full z-[-1] opacity-25"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </motion.button>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded whitespace-nowrap"
        >
          {error}
        </motion.div>
      )}
    </div>
  )
}

export default VoiceInput

