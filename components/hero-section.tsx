"use client"

import Image from "next/image"

interface HeroSectionProps {
  name: string
  bio: string
  photoSrc: string
  companies: { name: string; logoSrc: string }[]
}

export function HeroSection({ name, bio, photoSrc, companies }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
          {/* Photo */}
          <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/10">
            <Image
              src={photoSrc || "/placeholder.svg?height=256&width=256"}
              alt={name}
              fill
              className="object-cover"
              sizes="256px"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-serif text-balance text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              {name}
            </h1>
            <p className="mt-6 font-sans text-pretty text-lg leading-relaxed text-white/80 md:text-xl">{bio}</p>

            {/* Company logos */}
            {companies.length > 0 && (
              <div className="mt-12">
                <p className="mb-6 font-sans text-sm font-medium uppercase tracking-wider text-white/60">Worked with</p>
                <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
                  {companies.map((company, index) => (
                    <div
                      key={index}
                      className="relative h-12 w-24 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                    >
                      <Image
                        src={company.logoSrc || "/placeholder.svg?height=48&width=96"}
                        alt={company.name}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
