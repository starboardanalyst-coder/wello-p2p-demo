import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wello — P2P Lending, Powered by AI",
  description: "智能匹配，全球流动性，非洲市场机遇。AI驱动的P2P借贷平台。",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
