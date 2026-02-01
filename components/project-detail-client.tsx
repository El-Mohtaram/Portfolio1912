"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { ReachMeBox } from "@/components/reach-me-box"
import { TiltCard } from "@/components/ui/tilt-card"

// تعريف الأنواع اللي الصفحة محتاجاها
interface ProjectData {
    id: string
    slug: string
    title: string
    category: string
    year: string
    role: string
    tools: string[]
    description: string
    challenge: string
    solution: string
    images: string[]
    websiteUrl: string
}

interface ClientProps {
    project: ProjectData
    relatedProjects: ProjectData[]
}

export function ProjectDetailClient({ project, relatedProjects }: ClientProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [slideDirection, setSlideDirection] = useState<1 | -1>(1)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    const handlePrevImage = useCallback(() => {
        setSlideDirection(-1)
        setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
    }, [project.images.length])

    const handleNextImage = useCallback(() => {
        setSlideDirection(1)
        setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
    }, [project.images.length])

    useEffect(() => {
        setIsTouchDevice(typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0))
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handlePrevImage()
            } else if (e.key === "ArrowRight") {
                handleNextImage()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handlePrevImage, handleNextImage])

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    }

    return (
        <div className="min-h-screen bg-[#030305]">
            <NavigationBar />

            <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
                <Link
                    href="/"
                    className="group mb-8 inline-flex items-center gap-2 font-sans text-sm text-white/60 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Projects
                </Link>

                <div className="mb-12 grid gap-12 md:grid-cols-2">
                    <div>
                        <h1 className="mb-4 font-serif text-5xl font-bold text-white">{project.title}</h1>
                        <p className="mb-6 font-sans text-xl text-white/60">{project.category}</p>
                        <p className="mb-8 font-sans text-lg leading-relaxed text-white/80">{project.description}</p>

                        <div className="space-y-4 rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
                            <div>
                                <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-white/60">Year</h3>
                                <p className="font-sans text-white">{project.year}</p>
                            </div>
                            <div>
                                <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-white/60">Role</h3>
                                <p className="font-sans text-white">{project.role}</p>
                            </div>
                            <div>
                                <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-white/60">Tools</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tools.map((tool) => (
                                        <span
                                            key={tool}
                                            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-sans text-sm text-white"
                                        >
                      {tool}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <a
                            href={project.websiteUrl}
                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-sans text-sm font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/40 hover:bg-white/10"
                        >
                            Visit Website
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="relative h-[600px] overflow-hidden rounded-3xl border border-white/20 bg-white/5">
                        <AnimatePresence mode="wait" custom={slideDirection}>
                            <motion.div
                                key={currentImageIndex}
                                custom={slideDirection}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute inset-0"
                                drag={isTouchDevice && project.images.length > 1 ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.15}
                                onDragEnd={(e, { offset }) => {
                                    if (offset.x > 50) {
                                        handlePrevImage()
                                    } else if (offset.x < -50) {
                                        handleNextImage()
                                    }
                                }}
                            >
                                <Image
                                    src={project.images[currentImageIndex] || "/placeholder.svg"}
                                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {project.images.length > 1 && (
                            <>
                                {!isTouchDevice && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </>
                                )}

                                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                                    {project.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setSlideDirection(idx > currentImageIndex ? 1 : -1)
                                                setCurrentImageIndex(idx)
                                            }}
                                            className={`h-2 w-2 rounded-full transition-all ${
                                                idx === currentImageIndex ? "bg-white scale-125" : "bg-white/40"
                                            }`}
                                        />
                                    ))}
                                </div>

                                {isTouchDevice && (
                                    <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-white/50 font-sans">
                                        Swipe for more
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="mb-12 grid gap-8 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
                        <h2 className="mb-4 font-serif text-2xl font-bold text-white">The Challenge</h2>
                        <p className="font-sans text-white/80">{project.challenge}</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
                        <h2 className="mb-4 font-serif text-2xl font-bold text-white">The Solution</h2>
                        <p className="font-sans text-white/80">{project.solution}</p>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="mb-8 font-serif text-3xl font-bold text-white">Project Gallery</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {project.images.slice(1).map((image, index) => (
                            <div key={index} className="relative h-[400px] overflow-hidden rounded-2xl border border-white/10">
                                <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`${project.title} ${index + 2}`}
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="mb-8 font-serif text-3xl font-bold text-white">You May Also Like</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {relatedProjects.map((relatedProject, index) => (
                            <TiltCard key={relatedProject.id}>
                                <Link
                                    href={`/projects/${relatedProject.slug}`}
                                    className="group block overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10"
                                    style={{ animation: `fadeUp 600ms ease-out ${index * 150}ms backwards` }}
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={relatedProject.images[0] || "/placeholder.svg"}
                                            alt={relatedProject.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="mb-2 font-serif text-xl font-bold text-white transition-colors group-hover:text-white/80">
                                            {relatedProject.title}
                                        </h3>
                                        <p className="font-sans text-sm text-white/60">{relatedProject.category}</p>
                                    </div>
                                </Link>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-8">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 font-sans text-sm text-white/60 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to All Projects
                    </Link>
                </div>
            </main>

            <Footer />
            <ReachMeBox />
        </div>
    )
}