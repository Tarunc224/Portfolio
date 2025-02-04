"use client"

import { MessageCircle } from "lucide-react"

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/918688447873?text=let's connect"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
    >
      <MessageCircle size={20} />
      <span>Chat on WhatsApp</span>
    </a>
  )
}

