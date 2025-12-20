import { IntegratedHeroGrid } from "@/components/integrated-hero-grid"
import { NavigationBar } from "@/components/navigation-bar"
import { RatingSection } from "@/components/rating-section"
import { ReachMeBox } from "@/components/reach-me-box"
import { Footer } from "@/components/footer"
import { HomeCta } from "@/components/home-cta"
import { projects } from "@/lib/home-projects"
import { brands } from "@/lib/brands-data"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      <NavigationBar />

      <main className="relative z-0">
        <IntegratedHeroGrid
          projects={projects}
          name="Mohanud Hassan"
          title="Multimedia Designer"
          photoSrc="/professional-portrait.png"
          brandLogos={brands}
          columnCount={4}
        />

        <div className="mx-auto max-w-[95%] px-4 md:px-6 2xl:max-w-[1800px]">
          <RatingSection />
        </div>
        <HomeCta />
      </main>

      <Footer />
      <ReachMeBox />
    </div>
  )
}
