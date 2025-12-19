"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { TiltCard } from "./ui/tilt-card"
import { BackgroundOrbits } from "./background-orbits"
import type { Project, ProjectMedia } from "@/lib/types"

interface IntegratedHeroGridProps {
  projects: Project[]
  name: string
  title: string
  photoSrc: string
  brandLogos?: Array<{ name: string; logoSrc: string }>
  columnCount?: number
}

export function IntegratedHeroGrid({
  projects,
  name,
  title,
  photoSrc,
  brandLogos = [],
  columnCount = 4,
}: IntegratedHeroGridProps) {
  const sortedProjects = useMemo(() => [...projects].sort((a, b) => Number(b.id) - Number(a.id)), [projects])
  const [visibleCount, setVisibleCount] = useState(4)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [columns, setColumns] = useState<Project[][]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [currentColumnCount, setCurrentColumnCount] = useState(columnCount)
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1)
  const modalRef = useRef<HTMLDivElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())

  const displayedProjects = useMemo(() => sortedProjects.slice(0, visibleCount), [sortedProjects, visibleCount])
  const hasMore = visibleCount < sortedProjects.length

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, sortedProjects.length))
  }

  useEffect(() => {
    setIsTouchDevice(() => {
      return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.25 },
    )

    videoRefs.current.forEach((video) => {
      observer.observe(video)
    })

    return () => observer.disconnect()
  }, [displayedProjects])

  useEffect(() => {
    const newColumns: Project[][] = Array.from({ length: currentColumnCount }, () => [])
    const columnHeights = Array(currentColumnCount).fill(0)

    displayedProjects.forEach((project) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      newColumns[shortestColumnIndex].push(project)
      columnHeights[shortestColumnIndex] += project.height / project.width
    })

    setColumns(newColumns)
  }, [displayedProjects, currentColumnCount])

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id))
  }, [])

  const handleProjectClick = useCallback((project: Project, index: number) => {
    setSelectedProject(project)
    setSelectedProjectIndex(index)
    setCurrentGalleryIndex(0)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null)
    setSelectedProjectIndex(-1)
    setCurrentGalleryIndex(0)
  }, [])

  const handleModalBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleCloseModal()
      }
    },
    [handleCloseModal],
  )

  const handleGalleryPrev = useCallback(() => {
    if (!selectedProject) return
    setCurrentGalleryIndex((prev) => (prev === 0 ? selectedProject.gallery.length - 1 : prev - 1))
  }, [selectedProject])

  const handleGalleryNext = useCallback(() => {
    if (!selectedProject) return
    setCurrentGalleryIndex((prev) => (prev === selectedProject.gallery.length - 1 ? 0 : prev + 1))
  }, [selectedProject])

  const handlePrevProject = useCallback(() => {
    if (selectedProjectIndex <= 0) return
    setSlideDirection(-1)
    const newIndex = selectedProjectIndex - 1
    setSelectedProject(sortedProjects[newIndex])
    setSelectedProjectIndex(newIndex)
    setCurrentGalleryIndex(0)
  }, [selectedProjectIndex, sortedProjects])

  const handleNextProject = useCallback(() => {
    if (selectedProjectIndex >= sortedProjects.length - 1) return
    setSlideDirection(1)
    const newIndex = selectedProjectIndex + 1
    setSelectedProject(sortedProjects[newIndex])
    setSelectedProjectIndex(newIndex)
    setCurrentGalleryIndex(0)
  }, [selectedProjectIndex, sortedProjects])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        handleCloseModal()
      }
      if (e.key === "ArrowLeft" && selectedProject) {
        handleGalleryPrev()
      }
      if (e.key === "ArrowRight" && selectedProject) {
        handleGalleryNext()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [selectedProject, handleCloseModal, handleGalleryPrev, handleGalleryNext])

  useEffect(() => {
    const updateColumnCount = () => {
      let newColumnCount: number
      if (window.innerWidth < 640) {
        newColumnCount = 1 // Mobile: 1 column
      } else if (window.innerWidth < 1024) {
        newColumnCount = 2 // Tablet: 2 columns
      } else if (window.innerWidth < 1440) {
        newColumnCount = 3 // Laptop: 3 columns
      } else if (window.innerWidth < 1920) {
        newColumnCount = 4 // Wide Desktop: 4 columns
      } else {
        newColumnCount = 5 // Ultra Wide: 5 columns
      }
      setCurrentColumnCount(newColumnCount)
    }

    if (!initializedRef.current) {
      initializedRef.current = true
      updateColumnCount()
    }

    window.addEventListener("resize", updateColumnCount)
    return () => window.removeEventListener("resize", updateColumnCount)
  }, [columnCount])

  const renderMedia = (media: ProjectMedia, alt: string, fill = true, className = "") => {
    if (!media || !media.src) {
      return <div className="h-full w-full bg-slate-800" />
    }

    if (media.type === "youtube") {
      const videoId = media.src.includes("youtube.com")
        ? new URL(media.src).searchParams.get("v")
        : media.src.split("/").pop()
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
          className={`h-full w-full ${className}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }

    if (media.type === "video") {
      return (
        <video
          src={media.src}
          poster={media.poster}
          className={`h-full w-full object-cover ${className}`}
          autoPlay
          loop
          muted
          playsInline
        />
      )
    }

    return fill ? (
      <Image
        src={media.src || "/placeholder.svg"}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        onLoad={() => handleImageLoad(media.src || "")}
      />
    ) : (
      <img src={media.src || "/placeholder.svg"} alt={alt} className={`h-full w-full object-cover ${className}`} />
    )
  }

  const currentMedia = selectedProject?.gallery?.[currentGalleryIndex] || selectedProject?.thumbnail
  const gallerySlideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <>
      <BackgroundOrbits />

      <div className="film-grain" style={{ zIndex: 5 }} />

      {/* Hero Section */}
      <section className="relative min-h-screen py-20 pt-32 md:py-32 md:pt-40">
        <div className="relative mx-auto max-w-[95%] px-4 md:px-6 2xl:max-w-[1800px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="ethereal-ribbon-1" style={{ top: "20%", left: "-10%" }} />
            <div className="ethereal-ribbon-2" style={{ top: "50%", right: "-5%", transform: "rotate(-15deg)" }} />
            <div className="ethereal-ribbon-3" style={{ bottom: "30%", left: "20%", transform: "rotate(10deg)" }} />
          </div>

          <div className="relative mx-auto w-full max-w-[96%] px-4 md:px-8 2xl:max-w-[1800px]">
            <div
              className="relative z-10 mb-12 flex flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left"
              style={{ animation: "fadeUp 800ms ease-out" }}
            >
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center">
                <div className="relative flex-shrink-0">
                  <div
                    className="absolute inset-0 rounded-3xl opacity-50"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 70%)",
                      filter: "blur(50px)",
                      animation: "pulse 3s ease-in-out infinite",
                    }}
                  />
                  {/* Mobile: h-24 w-24 | Desktop: md:h-32 md:w-32 */}
<div className="relative h-24 w-24 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl md:h-32 md:w-32 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
                    <Image
                      src={photoSrc || "/placeholder.svg?height=160&width=160"}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center lg:items-start">
  {/* Name: Bigger & Bold */}
  <h1 className="font-serif text-4xl font-bold text-white md:text-6xl whitespace-nowrap">
    {name}
  </h1>
  
  {/* Title: Increased Weight & White Color */}
  <p className="mt-2 font-sans text-xl font-medium text-white md:text-2xl">
    {title}
  </p>
  
  {/* Value Prop: Added below title */}
  <p className="mt-1 font-sans text-sm text-white/60 md:text-base">
    Helping brands stand out with elegant visuals & motion.
  </p>
</div>
              </div>

              {!isTouchDevice && brandLogos.length > 0 && (
                <div className="hidden lg:grid mt-12 grid-cols-2 gap-4 lg:mt-0 lg:flex-shrink-0">
                  {brandLogos.map((brand, index) => (
                    <Link
                      key={brand.name}
                      href="/brands"
                      className="group relative h-20 w-20 overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 md:h-24 md:w-24"
                      style={{ animation: `fadeUp 800ms ease-out ${(index + 1) * 150}ms backwards` }}
                    >
                      <Image
                        src={brand.logoSrc || "/placeholder.svg?height=96&width=96"}
                        alt={brand.name}
                        fill
                        className="object-contain p-4 transition-all duration-500"
                        sizes="96px"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div ref={gridContainerRef} className="flex gap-5" style={{ perspective: "1200px" }}>
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-1 flex-col gap-5">
                  {column.map((project, itemIndex) => {
                    const globalIndex = sortedProjects.findIndex((p) => p.id === project.id)
                    const isLoaded = loadedImages.has(project.id)

                    return (
                      <TiltCard key={project.id}>
                        <div
                          onClick={() => handleProjectClick(project, globalIndex)}
                          onMouseEnter={() => setHoveredId(project.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          role="button"
                          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-xl backdrop-blur-xl transition-all duration-500 ease-out hover:border-white/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10"
                          style={{
                            aspectRatio: `${project.width} / ${project.height}`,
                            animation: isLoaded
                              ? `fadeUp 600ms ease-out ${columnIndex * 100 + itemIndex * 150}ms backwards`
                              : "none",
                          }}
                        >
                          {!isLoaded && (
                            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm" />
                          )}

                          <div className="relative h-full w-full overflow-hidden">
                            {project.thumbnail?.type === "video" ? (
                              <video
                                ref={(el) => {
                                  if (el) videoRefs.current.set(project.id, el)
                                }}
                                src={project.thumbnail?.src || ""}
                                poster={project.thumbnail?.poster}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                autoPlay
                                loop
                                muted
                                playsInline
                                onLoadedData={() => handleImageLoad(project.id)}
                              />
                            ) : (
                              <Image
                                src={project.thumbnail?.src || "/placeholder.svg"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                onLoad={() => handleImageLoad(project.id)}
                              />
                            )}
                          </div>

                          <div
                            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-all duration-500 ${
                              isTouchDevice ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            <h3 className="font-serif text-xl font-bold text-white">{project.title}</h3>
                          </div>
                        </div>
                      </TiltCard>
                    )
                  })}
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={loadMore}
                  className="group rounded-full border border-white/30 bg-white/10 px-8 py-4 font-sans text-sm font-medium text-white backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-2xl hover:shadow-white/20"
                >
                  Load More Projects
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          ref={modalRef}
          className="modal-overlay fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={handleModalBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{ animation: "fadeIn 300ms ease-out" }}
        >
          {!isTouchDevice && selectedProjectIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevProject()
              }}
              className="fixed left-4 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-4 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}
          {!isTouchDevice && selectedProjectIndex < sortedProjects.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNextProject()
              }}
              className="fixed right-4 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-4 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={selectedProject.id}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "circOut" }}
              drag={isTouchDevice ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipeConfidenceThreshold = 10000
                const swipePower = Math.abs(offset.x) * velocity.x

                if (offset.x > 100 || swipePower > swipeConfidenceThreshold) {
                  handlePrevProject()
                } else if (offset.x < -100 || swipePower < -swipeConfidenceThreshold) {
                  handleNextProject()
                }
              }}
              className="relative my-20 flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/10 shadow-2xl backdrop-blur-2xl md:flex-row"
              style={{ maxHeight: "80vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-110 hover:bg-white/20 backdrop-blur-md"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className="relative w-full md:w-1/2 flex items-center justify-center bg-black/20 overflow-hidden"
                style={{ aspectRatio: `${selectedProject.width} / ${selectedProject.height}`, maxHeight: "70vh" }}
              >
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={currentGalleryIndex}
                    custom={slideDirection}
                    variants={gallerySlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative h-full w-full"
                    drag={isTouchDevice && selectedProject.gallery && selectedProject.gallery.length > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipeThreshold = 50
                      if (offset.x > swipeThreshold) {
                        handleGalleryPrev()
                      } else if (offset.x < -swipeThreshold) {
                        handleGalleryNext()
                      }
                    }}
                  >
                    {currentMedia &&
                      renderMedia(currentMedia, selectedProject.title, true, "transition-transform duration-500")}
                  </motion.div>
                </AnimatePresence>

                {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                  <>
                    {!isTouchDevice && (
                      <>
                        <button
                          onClick={handleGalleryPrev}
                          className="force-arrow absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-2 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleGalleryNext}
                          className="force-arrow absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-2 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                      {selectedProject.gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentGalleryIndex(idx)}
                          className={`force-arrow h-2 w-2 rounded-full transition-all ${
                            idx === currentGalleryIndex ? "bg-white scale-125" : "bg-white/40"
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

              <div className="flex w-full flex-col justify-center gap-4 p-6 md:w-1/2 md:p-10">
                <h2 id="modal-title" className="font-serif text-2xl font-bold text-white md:text-3xl">
                  {selectedProject.title}
                </h2>
                <span className="w-fit rounded-full bg-white/10 px-3 py-1 font-sans text-xs text-white/70">
                  {selectedProject.category}
                </span>
                <p className="font-sans text-sm text-white/80 md:text-base">{selectedProject.description}</p>
                <div className="font-sans text-xs leading-relaxed text-white/60 md:text-sm">
                  {selectedProject.details}
                </div>

                <Link
                  href={selectedProject.detailsLink || `/project/${selectedProject.id}`}
                  className="group mt-4 flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-sans text-sm font-medium text-white backdrop-blur-md transition-all hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
                >
                  Project Details
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
