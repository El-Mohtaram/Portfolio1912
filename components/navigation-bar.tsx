"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MagneticButton } from "./ui/magnetic-button"

export function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Brands", href: "/brands" },
    { name: "Shop", href: "/shop" },
    { name: isMobile ? "Work" : "Contact", href: "/work-together" },
  ]

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/5 py-3 shadow-lg shadow-blue-500/10 backdrop-blur-2xl"
          : "bg-white/8 py-5 backdrop-blur-xl"
      }`}
      style={{
        animation: "slideDown 800ms ease-out",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="mx-auto flex max-w-full items-center justify-center gap-8 px-6 lg:gap-12">
        {links.map((link, index) => {
          const isActive = pathname === link.href
          return (
            <MagneticButton key={link.name} strength={0.3}>
              <Link
                href={link.href}
                className="group relative font-sans text-sm font-medium text-white/70 transition-all duration-300 hover:text-white"
                style={{
                  animation: `fadeInUp 800ms ease-out ${index * 100}ms backwards`,
                }}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </MagneticButton>
          )
        })}

        <MagneticButton strength={0.25}>
          <a
            href="mailto:hi@mohanud.com"
            className="group flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 font-sans text-sm font-medium text-white backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer"
            style={{
              animation: "fadeInUp 800ms ease-out 500ms backwards",
            }}
          >
            <span>hi@mohanud.com</span>
          </a>
        </MagneticButton>
      </div>
    </nav>
  )
}
