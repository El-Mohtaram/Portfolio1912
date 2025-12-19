import Image from "next/image"
import Link from "next/link"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { ReachMeBox } from "@/components/reach-me-box"
import { ShoppingCart, Star, ArrowLeft } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"

const shopItems = [
  {
    id: "1",
    title: "Cinematic LUT Pack",
    category: "presets",
    price: 29,
    rating: 4.9,
    image: "/cinematic-color-grading.png",
    description: "Professional color grading presets for cinematic looks",
    fullDescription:
      "Transform your footage with our premium cinematic LUT pack. Includes 25+ carefully crafted color grades perfect for films, music videos, and commercials. Compatible with all major editing software.",
  },
  {
    id: "2",
    title: "Agency Portfolio Template",
    category: "templates",
    price: 49,
    rating: 4.8,
    image: "/modern-portfolio-website.png",
    description: "Complete agency website template with animations",
    fullDescription:
      "A stunning agency portfolio template built with Next.js and Tailwind CSS. Features smooth animations, responsive design, and easy customization. Perfect for creative agencies and freelancers.",
  },
  {
    id: "3",
    title: "Modern Sans Collection",
    category: "fonts",
    price: 39,
    rating: 4.7,
    image: "/typography-font-showcase.jpg",
    description: "5 premium modern sans-serif fonts for your projects",
    fullDescription:
      "A collection of 5 premium modern sans-serif fonts designed for contemporary branding and web design. Includes regular, medium, bold, and italic weights for each font.",
  },
]

export default async function ShopItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = shopItems.find((i) => i.id === id)

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-radial flex items-center justify-center">
        <p className="text-white">Product not found</p>
      </div>
    )
  }

  const relatedItems = shopItems.filter((i) => i.id !== id).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-radial">
      <NavigationBar />

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 font-sans text-sm text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Hero Image */}
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl"
            style={{ animation: "fadeInUp 800ms ease-out" }}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Product Info */}
          <div
            className="flex flex-col justify-center gap-6"
            style={{ animation: "fadeInUp 800ms ease-out 200ms backwards" }}
          >
            <span className="w-fit rounded-full bg-white/10 px-4 py-1 font-sans text-sm text-white/70">
              {item.category}
            </span>

            <h1 className="font-serif text-4xl font-bold text-white lg:text-5xl">{item.title}</h1>

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-sans text-lg text-white/80">{item.rating}</span>
            </div>

            <p className="font-sans text-lg leading-relaxed text-white/80">{item.fullDescription}</p>

            <div className="flex items-center gap-6">
              <span className="font-serif text-4xl font-bold text-white">${item.price}</span>
              <button className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-sans text-base font-medium text-white backdrop-blur-xl transition-all hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-2xl hover:shadow-blue-500/30">
                <ShoppingCart className="h-5 w-5" />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2
            className="mb-8 font-serif text-3xl font-bold text-white"
            style={{ animation: "fadeInUp 800ms ease-out 400ms backwards" }}
          >
            You May Also Like
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {relatedItems.map((relatedItem, index) => (
              <TiltCard key={relatedItem.id}>
                <Link
                  href={`/shop/${relatedItem.id}`}
                  className="group block overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-white/40 hover:bg-white/10"
                  style={{ animation: `fadeUp 600ms ease-out ${600 + index * 150}ms backwards` }}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={relatedItem.image || "/placeholder.svg"}
                      alt={relatedItem.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-bold text-white">{relatedItem.title}</h3>
                    <p className="mt-1 font-sans text-xl font-bold text-white/80">${relatedItem.price}</p>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <ReachMeBox />
    </div>
  )
}
