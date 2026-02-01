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

// إعدادات البيانات الوصفية (Metadata Configuration)
const siteConfig = {
    title: "Mohanud Hassan - Multimedia Designer",
    description: "Portfolio showcasing design, motion graphics, and creative work.",
    url: "https://mohanud.com",
    ogImage: "/professional-portrait.png", // الصورة الافتراضية لكل الموقع
}

export const metadata: Metadata = {
    // 1. تحديد الدومين الأساسي عشان الصور تظهر صح
    metadataBase: new URL(siteConfig.url),

    title: {
        default: siteConfig.title,
        template: "%s | Mohanud Hassan", // هيخلي الصفحات الفرعية تظهر: Project Name | Mohanud Hassan
    },
    description: siteConfig.description,
    icons: {
        icon: [
            { url: '/icon-static.svg' },
        ],

    },
    // 2. إعدادات فيسبوك وواتساب (Open Graph)
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: "Mohanud Hassan Portfolio",
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: "Mohanud Hassan",
            },
        ],
    },

    // 3. إعدادات تويتر (Twitter Cards)
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
    },

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