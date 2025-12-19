"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { Linkedin, Instagram, Facebook, Youtube, Mail } from "lucide-react"
import { FaTiktok, FaBehance, FaXTwitter } from "react-icons/fa6"
import { SiAdobeaftereffects, SiAdobephotoshop, SiAdobeillustrator, SiFigma, SiReact } from "react-icons/si"
import { TiltCard } from "@/components/ui/tilt-card"

export default function AboutPage() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [scrollY, setScrollY] = useState(0)
  const [timelineProgress, setTimelineProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight))
        setTimelineProgress(progress)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const socialPlatforms = [
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "TikTok", href: "#", icon: FaTiktok },
    { name: "X", href: "#", icon: FaXTwitter },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "Behance", href: "#", icon: FaBehance },
    { name: "Email", href: "mailto:hi@mohanud.com", icon: Mail },
  ]

  const timeline = [
    {
      year: "2023 - Present",
      title: "Senior Multimedia Designer",
      company: "Creative Studio",
      description: "Leading design projects and creative direction for major brands",
    },
    {
      year: "2021 - 2023",
      title: "Art Director",
      company: "Tech Innovations Inc",
      description: "Managed design team and developed brand identities",
    },
    {
      year: "2019 - 2021",
      title: "Motion Graphics Designer",
      company: "Digital Agency",
      description: "Created engaging motion graphics and animations",
    },
    {
      year: "2017 - 2019",
      title: "Graphic Designer",
      company: "Startup Ventures",
      description: "Designed marketing materials and brand assets",
    },
  ]

  const tools = [
    { name: "After Effects", icon: SiAdobeaftereffects, color: "#9999FF" },
    { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
    { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
  ]

  const brands = [
    { name: "Company 1", logoSrc: "/tech-company-logo.jpg" },
    { name: "Company 2", logoSrc: "/abstract-startup-logo.png" },
    { name: "Company 3", logoSrc: "/design-agency-logo.png" },
    { name: "Company 4", logoSrc: "/abstract-enterprise-logo.png" },
  ]

  return (
    <div className="min-h-screen bg-gradient-radial">
      {/* Film Grain */}
      <div className="film-grain" />

      <NavigationBar />

      <main className="mx-auto max-w-7xl px-6 pt-32">
        <div className="mb-8 text-center" style={{ animation: "fadeInUp 800ms ease-out" }}>
          <h1 className="mb-4 font-serif text-5xl font-bold text-white md:text-7xl">About Me</h1>
          <p className="font-sans text-xl text-white/60">Designer • Motion Graphics • Creator</p>
        </div>

        <div className="mb-16 grid grid-cols-12 gap-6">
          <div
            className="col-span-12 lg:col-span-4 lg:row-span-2"
            style={{
              animation: "fadeInUp 800ms ease-out 400ms backwards",
              transform: `translateY(${scrollY * 0.03}px)`,
            }}
          >
            <div className="relative h-[400px] lg:h-full lg:min-h-[600px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              {/* Inner glow overlay */}
              <div className="absolute inset-0 z-10 rounded-3xl shadow-[inset_0_0_60px_rgba(255,255,255,0.05)]" />
              {!loadedImages.has(1) && <div className="absolute inset-0 animate-pulse bg-slate-800" />}
              <Image
                src="/professional-portrait.png"
                alt="Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                onLoad={() => setLoadedImages((prev) => new Set(prev).add(1))}
              />
              {/* Bottom fade into Obsidian background */}
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030305] to-transparent z-20" />
            </div>
          </div>

          <div
            className="col-span-12 lg:col-span-8"
            style={{
              animation: "fadeInUp 800ms ease-out 600ms backwards",
              transform: `translateY(${scrollY * 0.01}px)`,
            }}
          >
            <div className="h-full rounded-3xl border border-white/20 bg-white/5 p-8 lg:p-12 backdrop-blur-xl">
              <h2 className="mb-6 font-serif text-3xl font-bold text-white">My Story</h2>
              <div className="space-y-4 font-sans text-base lg:text-lg leading-relaxed text-white/80">
                <p>
                  I'm Mohanud Hassan, a multimedia designer passionate about creating visual experiences that inspire
                  and engage. With years of experience in design, motion graphics, and creative direction, I bring ideas
                  to life through thoughtful design and attention to detail.
                </p>
                <p>
                  My philosophy is simple: think less, create more. I believe in the power of simplicity and the impact
                  of well-crafted design. Every project is an opportunity to push boundaries and explore new creative
                  possibilities.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-6 lg:col-span-4" style={{ animation: "fadeInUp 800ms ease-out 800ms backwards" }}>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              {!loadedImages.has(2) && <div className="absolute inset-0 animate-pulse bg-slate-800" />}
              <Image
                src="/creative-workspace.png"
                alt="Workspace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                onLoad={() => setLoadedImages((prev) => new Set(prev).add(2))}
              />
            </div>
          </div>

          <div className="col-span-6 lg:col-span-4" style={{ animation: "fadeInUp 800ms ease-out 1000ms backwards" }}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              {!loadedImages.has(3) && <div className="absolute inset-0 animate-pulse bg-slate-800" />}
              <Image
                src="/design-tools.jpg"
                alt="Design tools"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                onLoad={() => setLoadedImages((prev) => new Set(prev).add(3))}
              />
            </div>
          </div>
        </div>

        <div
          className="mb-16 mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/5 p-12 backdrop-blur-xl"
          style={{ animation: "fadeInUp 800ms ease-out 1050ms backwards" }}
        >
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-white">Brands I've Worked With</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {brands.map((brand, index) => (
              <TiltCard key={brand.name}>
                <div
                  className="group relative h-24 w-24 overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/20 md:h-28 md:w-28"
                  style={{ animation: `scaleIn 600ms ease-out ${1050 + index * 100}ms backwards` }}
                >
                  <Image
                    src={brand.logoSrc || "/placeholder.svg?height=112&width=112"}
                    alt={brand.name}
                    fill
                    className="object-contain p-4 transition-all duration-500"
                    sizes="112px"
                  />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        <div
          className="mb-16 mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/5 p-12 backdrop-blur-xl"
          style={{ animation: "fadeInUp 800ms ease-out 1100ms backwards" }}
        >
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-white">My Arsenal</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.name}
                  className="group relative"
                  style={{
                    animation: `scaleIn 600ms ease-out ${1100 + index * 100}ms backwards`,
                    perspective: "500px",
                  }}
                >
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:shadow-2xl group-hover:-translate-y-2"
                    style={{
                      boxShadow: `0 10px 30px ${tool.color}20`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Icon
                      className="h-12 w-12 transition-all duration-500 group-hover:scale-110"
                      style={{ color: tool.color }}
                    />
                  </div>
                  <div className="mt-2 text-center font-sans text-xs text-white/60">{tool.name}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          ref={timelineRef}
          className="mb-16 mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/5 p-12 backdrop-blur-xl"
          style={{ animation: "fadeInUp 800ms ease-out 1200ms backwards" }}
        >
          <h2 className="mb-8 font-serif text-3xl font-bold text-white">Timeline</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => {
              const isGlowing = timelineProgress > index / timeline.length
              return (
                <div
                  key={index}
                  className="relative pl-8"
                  style={{
                    animation: `fadeInLeft 600ms ease-out ${1200 + index * 150}ms backwards`,
                    borderLeft: `2px solid ${isGlowing ? "rgba(6, 182, 212, 0.8)" : "rgba(6, 182, 212, 0.3)"}`,
                    transition: "border-color 0.5s ease",
                  }}
                >
                  <div
                    className="absolute -left-2 top-0 h-4 w-4 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: isGlowing ? "#06b6d4" : "rgba(6, 182, 212, 0.5)",
                      boxShadow: isGlowing ? "0 0 20px rgba(6, 182, 212, 0.8)" : "none",
                    }}
                  />
                  <div className="mb-1 font-sans text-sm font-medium text-cyan-400">{item.year}</div>
                  <h3 className="mb-1 font-serif text-xl font-bold text-white">{item.title}</h3>
                  <div className="mb-2 font-sans text-sm text-white/60">{item.company}</div>
                  <p className="font-sans text-base text-white/80">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className="mb-16 mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/5 p-12 backdrop-blur-xl"
          style={{ animation: "fadeInUp 800ms ease-out 1400ms backwards" }}
        >
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-white">Let's Connect</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon
              return (
                <a
                  key={platform.name}
                  href={platform.href}
                  aria-label={platform.name}
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Icon className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                </a>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
      {/* ReachMeBox is automatically hidden on /about */}
    </div>
  )
}
