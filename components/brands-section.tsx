"use client"

import { useState } from "react"
import Image from "next/image"

interface Brand {
  name: string
  logoSrc: string
  description: string
}

interface BrandsSectionProps {
  brands: Brand[]
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2
        className="mb-16 text-center font-sans text-3xl font-bold text-white"
        style={{
          animation: "fadeUp 800ms ease-out",
        }}
      >
        Trusted by leading brands — and what I did for them
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
        {brands.map((brand, index) => (
          <div
            key={brand.name}
            onMouseEnter={() => setHoveredBrand(brand.name)}
            onMouseLeave={() => setHoveredBrand(null)}
            className="group relative"
            style={{
              animation: `fadeUp 600ms ease-out ${index * 100}ms backwards`,
            }}
          >
            <div className="flex h-32 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/10 hover:shadow-lg">
              <div className="relative h-16 w-full opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0">
                <Image
                  src={brand.logoSrc || "/placeholder.svg?height=64&width=200"}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="200px"
                />
              </div>
            </div>

            {hoveredBrand === brand.name && (
              <div
                className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-xl border border-white/20 bg-black/90 p-4 shadow-xl backdrop-blur-xl"
                style={{
                  animation: "fadeIn 200ms ease-out",
                }}
              >
                <p className="font-sans text-sm text-white/90">{brand.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
