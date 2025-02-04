import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "./globals.css"
import ErrorBoundary from "@/components/ErrorBoundary"
import Script from "next/script"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "ML Portfolio - Tarun Chintada",
  description: "A creative and interactive portfolio showcasing machine learning projects with an engaging chatbot",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black text-white`}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}

