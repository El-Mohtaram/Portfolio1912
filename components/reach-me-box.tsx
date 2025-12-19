"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { X, Linkedin, Instagram, Facebook, Youtube, Mail } from "lucide-react"
import { FaTiktok, FaBehance, FaXTwitter } from "react-icons/fa6"

export function ReachMeBox() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const pathname = usePathname()

  const hiddenPaths = ["/about", "/work-together"]
  const shouldHide = hiddenPaths.includes(pathname)

  useEffect(() => {
    if (shouldHide) return

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 7000)

    return () => clearTimeout(timer)
  }, [shouldHide])

  if (isDismissed || shouldHide) return null

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:hi@mohanud.com" },
  ]

  return (
    <div
      className={`
        fixed bottom-8 right-8 left-8 z-50 transition-all duration-700
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        md:right-8 md:left-auto
      `}
    >
      <div className="relative rounded-2xl border border-white/20 bg-black/40 p-6 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => setIsDismissed(true)}
          className="force-arrow absolute right-2 top-2 rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="mb-4 font-serif text-xl font-bold text-white">Reach me</h3>

        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="group relative rounded-full border border-white/20 bg-white/5 p-3 backdrop-blur-sm transition-all hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <Icon className="h-5 w-5 text-white" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
