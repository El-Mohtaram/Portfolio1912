"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { ReachMeBox } from "@/components/reach-me-box"
import { MapPin } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"

interface BrandProject {
  id: string
  companyName: string
  location: string
  role: string
  description: string
  logoSrc: string
}

export default function BrandsPage() {
  const [loadedLogos, setLoadedLogos] = useState<Set<string>>(new Set())

  // TO ADD NEW BRANDS: Simply add a new object to this array
  const brands: BrandProject[] = [
    {
      id: "1",
      companyName: "Tech Innovations Inc",
      location: "San Francisco, CA",
      role: "Lead Designer",
      description: "Complete brand identity redesign and digital presence transformation",
      logoSrc: "/tech-company-logo.jpg",
    },
    {
      id: "2",
      companyName: "Creative Studio",
      location: "New York, NY",
      role: "Art Director",
      description: "Motion graphics and visual storytelling campaign for product launch",
      logoSrc: "/design-agency-logo.png",
    },
    {
      id: "3",
      companyName: "Global Enterprises",
      location: "London, UK",
      role: "Brand Consultant",
      description: "Strategic brand positioning and comprehensive visual guidelines",
      logoSrc: "/abstract-enterprise-logo.png",
    },
    {
      id: "4",
      companyName: "Startup Ventures",
      location: "Austin, TX",
      role: "Creative Director",
      description: "End-to-end brand creation and multi-channel launch campaign",
      logoSrc: "/abstract-startup-logo.png",
    },
  ]

  const handleLogoLoad = useCallback((id: string) => {
    setLoadedLogos((prev) => new Set(prev).add(id))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-radial">
      <NavigationBar />

      <main className="mx-auto max-w-7xl px-6 pt-32">
        <div className="mb-16 text-center">
          <h1
            className="mb-4 font-serif text-6xl font-bold text-white"
            style={{ animation: "fadeInUp 800ms ease-out" }}
          >
            Trusted by brands — here&apos;s what I&apos;ve done
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, index) => {
            const isLoaded = loadedLogos.has(brand.id)

            return (
              <TiltCard 
                key={brand.id}
                className="h-full rounded-3xl"
              >
                <div
                  className="group relative flex h-full flex-col items-center justify-between overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/40 hover:bg-white/10 hover:shadow-2xl"
                  style={{
                    animation: `fadeUp 600ms ease-out ${index * 150}ms backwards`,
                    minHeight: "360px",
                  }}
                >
                  {/* Content Wrapper to center logo vertically */}
                  <div className="flex flex-1 flex-col items-center justify-center w-full">
                    {/* Logo container */}
                    <div className="relative mb-6 h-24 w-24 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-4">
                      {!isLoaded && <div className="absolute inset-0 animate-pulse rounded-lg bg-slate-800" />}
                      <Image
                        src={brand.logoSrc || "/placeholder.svg?height=96&width=96"}
                        alt={brand.companyName}
                        fill
                        className="object-contain"
                        sizes="96px"
                        onLoad={() => handleLogoLoad(brand.id)}
                      />
                    </div>

                    {/* Company name */}
                    <h3 className="mb-2 text-center font-serif text-2xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-2">
                      {brand.companyName}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center justify-center gap-2 text-white/60 transition-transform duration-500 group-hover:-translate-y-2">
                      <MapPin className="h-4 w-4" />
                      <p className="font-sans text-sm">{brand.location}</p>
                    </div>
                  </div>

                  {/* Details with Ghost Reveal (Hidden only on XL screens) */}
                  <div
                    className="flex w-full flex-col items-center transition-all duration-500 
                    translate-y-0 opacity-100 
                    xl:translate-y-4 xl:opacity-0 xl:group-hover:translate-y-0 xl:group-hover:opacity-100"
                  >
                    <div className="mb-3">
                      <span className="inline-block rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1 font-sans text-sm font-medium text-blue-400">
                        {brand.role}
                      </span>
                    </div>
                    <p className="text-center font-sans text-sm leading-relaxed text-white/80">
                      {brand.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </main>

      <Footer />
      <ReachMeBox />
    </div>
  )
}
