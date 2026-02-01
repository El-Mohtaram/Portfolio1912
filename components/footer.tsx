"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Linkedin, Instagram, Facebook, Youtube, Mail } from "lucide-react"
import { FaTiktok, FaBehance, FaXTwitter } from "react-icons/fa6"
import Image from "next/image"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: FaTiktok, href: "#", label: "TikTok", isReactIcon: true },
    { icon: FaXTwitter, href: "#", label: "X", isReactIcon: true },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: FaBehance, href: "#", label: "Behance", isReactIcon: true },
    { icon: Mail, href: "mailto:hi@mohanud.com", label: "Email" },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Brands", href: "/brands" },
    { name: "Work Together", href: "/work-together" },
  ]

  return (
    <footer
      id="site-footer"
      ref={footerRef}
      className={`relative z-10 mt-32 border-t border-white/10 bg-gradient-to-b from-transparent to-black/40 py-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left: Circular text animation */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="relative h-32 w-32">
              <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 100 100">
                <defs>
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                </defs>
                <text className="fill-white/60 font-sans text-[10px] font-medium tracking-wider">
                  <textPath href="#circlePath" startOffset="0%">
                    Think Less ✦ Create More ✦ Think Less ✦ Create More ✦
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

            {/* Center: Logo/Initials with Levitation Effect */}
            <div className="flex flex-col items-center justify-center">
                <Link
                    href="/"
                    // 1. ضفنا flex flex-col items-center عشان يسنتر اللي جواه بالظبط
                    // 2. ده كمان بيخلي الـ hover effects تشتغل لأن العنصر بقى Block-level
                    className="flex flex-col items-center justify-center mb-6 text-center transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:drop-shadow-[0_10px_20px_rgba(0,255,255,0.25)]"
                >
                    <div className="relative mb-2 h-12 w-24 md:h-16 md:w-32">
                        <Image
                            src="/MHLogofooter.svg"
                            alt="MH Logo"
                            fill
                            className="object-contain object-center"
                        />
                    </div>
                    <p className="mt-2 font-sans text-sm text-white/60">Multimedia Designer</p>
                </Link>
            </div>

          {/* Right: Quick Links */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex flex-col items-center md:items-end">
              <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white/80">
                Quick Links
              </h4>
              <div className="flex flex-col items-center gap-2 md:items-end">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-sans text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-sans text-sm text-white/60">© 2025 Mohanud Hassan | Built with passion</p>

          {/* Social icons */}
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, label, isReactIcon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="group relative rounded-full border border-white/20 bg-white/5 p-2 backdrop-blur-sm transition-all hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                {isReactIcon ? (
                  <Icon className="h-4 w-4 text-white/60 transition-colors group-hover:text-white" />
                ) : (
                  <Icon className="h-4 w-4 text-white/60 transition-colors group-hover:text-white" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
