"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Star, ShoppingBag, Mail, Send, ChevronLeft, ChevronRight, Linkedin, Instagram, Facebook, Youtube } from "lucide-react"
import { useOrientation } from "@/hooks/use-orientation"
import { MagneticButton } from "./ui/magnetic-button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "./ui/drawer"

// Navigation items with icons
// Star = professional brand icon, Send = paper plane for contact page (distinct from Mail envelope)
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Brands", href: "/brands", icon: Star },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Contact", href: "/work-together", icon: Send },
]

// ═══════════════════════════════════════════════════════════════════════════
// DESKTOP NAV — Top Fixed (Unchanged from original)
// ═══════════════════════════════════════════════════════════════════════════
function DesktopNav({ isScrolled }: { isScrolled: boolean }) {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/5 py-3 shadow-lg shadow-cyan-500/10 backdrop-blur-2xl"
        : "bg-white/8 py-5 backdrop-blur-xl"
        }`}
      style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="mx-auto flex max-w-full items-center justify-center gap-8 px-6 lg:gap-12">
        {navItems.map((link, index) => {
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
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            </MagneticButton>
          )
        })}

        <MagneticButton strength={0.25}>
          <a
            href="mailto:hi@mohanud.com"
            className="group flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 font-sans text-sm font-medium text-white backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-2xl hover:shadow-cyan-500/30 cursor-pointer"
            style={{
              animation: "fadeInUp 800ms ease-out 500ms backwards",
            }}
          >
            <span>hi@mohanud.com</span>
          </a>
        </MagneticButton>
      </div>
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PORTRAIT NAV — Bottom Floating Pill + Contact Drawer
// ═══════════════════════════════════════════════════════════════════════════
function PortraitNav({ isMobile, isHidden }: { isMobile: boolean; isHidden: boolean }) {
  const pathname = usePathname()

  // Filter items: hide Brands on mobile
  const visibleItems = isMobile
    ? navItems.filter((item) => item.name !== "Brands")
    : navItems

  // Social links for the contact drawer
  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/mohanud" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/mohanud" },
    { icon: Facebook, label: "Facebook", href: "https://facebook.com/mohanud" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@mohanud" },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: 50, x: "-50%" }}
      animate={{ opacity: isHidden ? 0 : 1, y: isHidden ? 100 : 0, x: "-50%" }}
      exit={{ opacity: 0, y: 50, x: "-50%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-1 rounded-full border border-white/10 bg-[#030305]/80 px-3 py-2 backdrop-blur-xl sm:gap-2 sm:px-4"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        pointerEvents: isHidden ? "none" : "auto",
      }}
    >
      {visibleItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        // Skip Contact here - it's handled separately with drawer
        if (item.name === "Contact") return null

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all duration-300 sm:gap-2 sm:px-4 sm:text-sm ${isActive
              ? "bg-white/15 text-white"
              : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="hidden xs:inline sm:inline">{item.name}</span>
          </Link>
        )
      })}

      {/* Contact Drawer for Portrait Mode */}
      <Drawer>
        <DrawerTrigger asChild>
          <button
            className={`flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:border-pink-400/50 hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/20 ${isMobile ? "h-10 w-10" : "gap-2 px-4 py-2"
              }`}
          >
            <Mail className="h-4 w-4" />
            {!isMobile && <span className="text-sm font-medium">Let&apos;s Work</span>}
          </button>
        </DrawerTrigger>

        <DrawerContent className="border-white/20 bg-[#030305]/95 backdrop-blur-xl">
          <DrawerHeader className="text-center">
            <DrawerTitle className="font-serif text-2xl font-bold text-white">
              Let&apos;s Connect
            </DrawerTitle>
          </DrawerHeader>

          <div className="px-6 pb-8">
            {/* Social Links Grid */}
            <div className="mb-6 flex flex-wrap justify-center gap-4">
              {socialLinks.map(({ icon: SocialIcon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <SocialIcon className="h-6 w-6 text-white transition-colors group-hover:text-cyan-400" />
                </a>
              ))}
            </div>

            {/* Email CTA */}
            <a
              href="mailto:hi@mohanud.com"
              className="mx-auto flex w-full max-w-xs items-center justify-center gap-3 rounded-full border border-pink-500/30 bg-pink-500/20 px-6 py-4 font-sans text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:border-pink-400/50 hover:bg-pink-500/30 hover:shadow-lg hover:shadow-pink-500/30"
            >
              <Mail className="h-5 w-5" />
              <span>hi@mohanud.com</span>
            </a>

            {/* Close Button */}
            <DrawerClose asChild>
              <button className="mt-6 flex w-full items-center justify-center py-2 text-sm text-white/50 transition-colors hover:text-white">
                Close
              </button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// LANDSCAPE NAV — Right Vertical Bar (Collapsed by default)
// ═══════════════════════════════════════════════════════════════════════════
function LandscapeNav({ isMobile, isHidden }: { isMobile: boolean; isHidden: boolean }) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)

  // Filter items: hide Brands on mobile landscape
  const visibleItems = isMobile
    ? navItems.filter((item) => item.name !== "Brands")
    : navItems

  return (
    <motion.nav
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isHidden ? 0 : 1, x: isHidden ? 100 : 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed right-3 top-1/2 z-50 -translate-y-1/2"
      style={{ pointerEvents: isHidden ? "none" : "auto" }}
    >
      <div
        className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-[#030305]/80 p-2 backdrop-blur-xl"
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Expand/Collapse Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all duration-300 hover:bg-white/10 hover:text-white"
          aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
        >
          {isExpanded ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        <div className="h-px w-6 bg-white/10" />

        {/* Nav Items */}
        {visibleItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-2 rounded-xl px-2 py-2 transition-all duration-300 ${isActive
                ? "bg-white/15 text-white"
                : "text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              title={item.name}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap text-sm font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}

        <div className="h-px w-6 bg-white/10" />

        {/* Email Button */}
        <a
          href="mailto:hi@mohanud.com"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:border-pink-400/50 hover:bg-pink-500/20 hover:shadow-lg hover:shadow-pink-500/20"
          title="Email me"
        >
          <Mail className="h-4 w-4" />
        </a>
      </div>
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT — Layout Switcher (Touch-Aware)
// ═══════════════════════════════════════════════════════════════════════════
export function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const { isDesktop, isPortrait, isLandscape, isMobile, isTablet } = useOrientation()

  // Scroll detection for desktop nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Footer visibility detection - hide navbar when footer is visible on touch devices
  useEffect(() => {
    // Only apply hiding logic for non-desktop (touch) devices
    if (isDesktop) {
      setIsHidden(false)
      return
    }

    const footer = document.getElementById("site-footer")
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide navbar when footer is 20% visible
        setIsHidden(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [isDesktop])

  // Layout priority:
  // 1. isMobile → Mobile Portrait/Landscape layouts
  // 2. isTablet → Tablet Portrait/Landscape layouts (even iPad Pro 12.9")
  // 3. isDesktop → Desktop top bar (ONLY mouse/trackpad users)

  return (
    <AnimatePresence mode="wait">
      {/* Desktop: Only for mouse/trackpad users on large screens */}
      {isDesktop && <DesktopNav key="desktop" isScrolled={isScrolled} />}

      {/* Mobile: Small screens - use isMobile flag for stricter sizing */}
      {isMobile && isPortrait && <PortraitNav key="portrait-mobile" isMobile={true} isHidden={isHidden} />}
      {isMobile && isLandscape && <LandscapeNav key="landscape-mobile" isMobile={true} isHidden={isHidden} />}

      {/* Tablet: Touch devices with larger screens (iPad, Android tablets, iPad Pro) */}
      {isTablet && isPortrait && <PortraitNav key="portrait-tablet" isMobile={false} isHidden={isHidden} />}
      {isTablet && isLandscape && <LandscapeNav key="landscape-tablet" isMobile={false} isHidden={isHidden} />}
    </AnimatePresence>
  )
}
