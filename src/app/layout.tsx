import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wello — P2P Lending, Powered by AI",
  description: "AI-powered matching, global liquidity, African market opportunities. The next-generation P2P lending platform.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
