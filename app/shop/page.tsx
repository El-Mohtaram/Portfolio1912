"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { ReachMeBox } from "@/components/reach-me-box"
import { Lock, ShoppingCart, Star } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"

type Category = "templates" | "fonts" | "presets"

interface ShopItem {
  id: string
  title: string
  category: Category
  price: number
  rating: number
  image: string
  description: string
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all")

  const shopItems: ShopItem[] = [
    {
      id: "1",
      title: "Cinematic LUT Pack",
      category: "presets",
      price: 29,
      rating: 4.9,
      image: "/cinematic-color-grading.png",
      description: "Professional color grading presets for cinematic looks",
    },
    {
      id: "2",
      title: "Agency Portfolio Template",
      category: "templates",
      price: 49,
      rating: 4.8,
      image: "/modern-portfolio-website.png",
      description: "Complete agency website template with animations",
    },
    {
      id: "3",
      title: "Modern Sans Collection",
      category: "fonts",
      price: 39,
      rating: 4.7,
      image: "/typography-font-showcase.jpg",
      description: "5 premium modern sans-serif fonts for your projects",
    },
  ]

  const categories = [
    { id: "all" as const, name: "All" },
    { id: "templates" as const, name: "Templates" },
    { id: "fonts" as const, name: "Fonts" },
    { id: "presets" as const, name: "Presets" },
  ]

  const filteredItems =
    selectedCategory === "all" ? shopItems : shopItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-radial">
      <NavigationBar />

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="mb-16 text-center">
          <h1
            className="mb-4 font-serif text-6xl font-bold text-white"
            style={{ animation: "fadeInUp 800ms ease-out" }}
          >
            Digital Assets
          </h1>
          <p
            className="font-sans text-xl text-blue-300"
            style={{ animation: "fadeInUp 800ms ease-out 200ms backwards" }}
          >
            Premium templates, fonts, and presets for creators
          </p>
        </div>

        <div
          className="mb-12 flex flex-wrap justify-center gap-4"
          style={{ animation: "fadeInUp 800ms ease-out 400ms backwards" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`force-arrow rounded-full border px-8 py-3 font-sans text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "border-white/50 bg-white/20 text-white shadow-lg shadow-blue-500/20"
                  : "border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10 hover:text-white"
              } backdrop-blur-xl`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <Link key={item.id} href={`/shop/${item.id}`} className="block">
                <TiltCard>
                  <div
                    className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-white/40 hover:bg-white/10 hover:shadow-2xl"
                    style={{ animation: `fadeUp 600ms ease-out ${index * 150}ms backwards` }}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <div className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-white/10 px-3 py-1 font-sans text-xs font-medium text-white/70">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-sans text-sm text-white/80">{item.rating}</span>
                        </div>
                      </div>

                      <h3 className="mb-2 font-serif text-xl font-bold text-white">{item.title}</h3>
                      <p className="mb-4 font-sans text-sm text-white/70">{item.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="font-serif text-2xl font-bold text-white">${item.price}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault() // Prevent Link navigation when clicking Add to Cart
                            // Add to cart logic here
                          }}
                          className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 font-sans text-sm font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-lg"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6 h-32 w-32">
              <div className="absolute inset-0 rounded-3xl border-2 border-white/20 bg-white/5 backdrop-blur-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="h-16 w-16 text-white/40" />
              </div>
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
            </div>
            <h3 className="mb-2 font-serif text-2xl font-bold text-white">Coming Soon</h3>
            <p className="font-sans text-white/60">New items will be available in this category soon</p>
          </div>
        )}
      </main>

      <Footer />
      <ReachMeBox />
    </div>
  )
}
