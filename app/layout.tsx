import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { MouseSpotlight } from "@/components/mouse-spotlight"
import { TouchFlow } from "@/components/touch-flow"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"
import { CustomContextMenu } from "@/components/custom-context-menu"
import { BackgroundOrbits } from "@/components/background-orbits"
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Mohanud Hassan - Multimedia Designer",
  description: "Portfolio showcasing design, motion graphics, and creative work",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#030305" }}>
    <head>
        <link rel="preload" href="/cursor-loop.webm" as="video" type="video/webm" />
        <link rel="preload" href="/cursor-hand.webm" as="video" type="video/webm" />
        {/*<link rel="preload" href="/cursor-select.webm" as="video" type="video/webm" />*/}
    </head>
      <body
        className={`font-sans ${poppins.variable} ${playfair.variable} antialiased`}
        style={{ backgroundColor: "#030305" }}
      >
        <BackgroundOrbits />
        <MouseSpotlight />
        <TouchFlow />
        <CustomCursor />
        <CustomContextMenu />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
