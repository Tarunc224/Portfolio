"use client"

import { Mail } from "lucide-react"

export const EmailButton: React.FC = () => {
  return (
    <a
      href="mailto:tarunchintada2004@gmail.com"
      className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
    >
      <Mail size={20} />
      <span>Email Me</span>
    </a>
  )
}

