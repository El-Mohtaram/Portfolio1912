"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"

export interface Project {
  id: string
  title: string
  description: string
  src: string
  type: "image" | "gif"
  width: number
  height: number
}

interface PortfolioGridProps {
  projects: Project[]
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([])
  const [loadedChunks, setLoadedChunks] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const animationFrameRef = useRef<number>()
  const CHUNK_SIZE = 8

  // Lazy loading with IntersectionObserver
  useEffect(() => {
    setVisibleProjects(projects.slice(0, CHUNK_SIZE))
  }, [projects])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && loadedChunks * CHUNK_SIZE < projects.length) {
            const nextChunk = loadedChunks + 1
            setLoadedChunks(nextChunk)
            setVisibleProjects(projects.slice(0, nextChunk * CHUNK_SIZE))
          }
        })
      },
      { rootMargin: "200px" },
    )

    const sentinel = document.getElementById("load-more-sentinel")
    if (sentinel) observer.observe(sentinel)

    return () => observer.disconnect()
  }, [loadedChunks, projects])

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id))
  }, [])

  const handleMouseEnter = useCallback((id: string, event: React.MouseEvent<HTMLDivElement>) => {
    // Cancel any ongoing animations
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setHoveredId(id)
      return
    }

    // FLIP: First - record initial positions
    const firstPositions = new Map<string, DOMRect>()
    itemRefs.current.forEach((element, itemId) => {
      if (element) {
        firstPositions.set(itemId, element.getBoundingClientRect())
      }
    })

    // Last - apply hover state
    setHoveredId(id)

    // Invert & Play - animate from first to last position
    animationFrameRef.current = requestAnimationFrame(() => {
      itemRefs.current.forEach((element, itemId) => {
        if (element) {
          const first = firstPositions.get(itemId)
          const last = element.getBoundingClientRect()

          if (first && last) {
            const deltaX = first.left - last.left
            const deltaY = first.top - last.top

            // Apply inverse transform
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
            element.style.transition = "none"

            // Force reflow
            element.offsetHeight

            // Animate to final position
            element.style.transform = ""
            element.style.transition = "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
          }
        }
      })
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setHoveredId(null)
      return
    }

    // FLIP animation for mouse leave
    const firstPositions = new Map<string, DOMRect>()
    itemRefs.current.forEach((element, itemId) => {
      if (element) {
        firstPositions.set(itemId, element.getBoundingClientRect())
      }
    })

    setHoveredId(null)

    animationFrameRef.current = requestAnimationFrame(() => {
      itemRefs.current.forEach((element, itemId) => {
        if (element) {
          const first = firstPositions.get(itemId)
          const last = element.getBoundingClientRect()

          if (first && last) {
            const deltaX = first.left - last.left
            const deltaY = first.top - last.top

            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
            element.style.transition = "none"
            element.offsetHeight
            element.style.transform = ""
            element.style.transition = "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
          }
        }
      })
    })
  }, [])

  const getExpandDirection = (element: HTMLDivElement): "left" | "right" => {
    if (!gridRef.current) return "right"
    const gridRect = gridRef.current.getBoundingClientRect()
    const itemRect = element.getBoundingClientRect()
    const itemCenter = itemRect.left + itemRect.width / 2
    const gridCenter = gridRect.left + gridRect.width / 2
    return itemCenter < gridCenter ? "right" : "left"
  }

  return (
    <div ref={gridRef} className="grid auto-rows-auto grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
      {visibleProjects.map((project, index) => {
        const isHovered = hoveredId === project.id
        const isOtherHovered = hoveredId && hoveredId !== project.id
        const isLoaded = loadedImages.has(project.id)

        return (
          <div
            key={project.id}
            ref={(el) => {
              if (el) itemRefs.current.set(project.id, el)
            }}
            onMouseEnter={(e) => handleMouseEnter(project.id, e)}
            onMouseLeave={handleMouseLeave}
            className={`
              group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl
              transition-all duration-500 ease-in-out
              ${isHovered ? "z-30 col-span-2" : "z-10"}
            `}
            style={{
              aspectRatio: `${project.width} / ${project.height}`,
              willChange: isHovered ? "transform" : "auto",
              animation: isLoaded ? `fadeUp 400ms ease-out ${index * 50}ms backwards` : "none",
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ${project.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleMouseEnter(project.id, e as any)
              }
            }}
          >
            {/* Skeleton placeholder */}
            {!isLoaded && <div className="absolute inset-0 animate-pulse bg-slate-800" />}

            {/* Image */}
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {project.type === "gif" ? (
                <img
                  src={project.src || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onLoad={() => handleImageLoad(project.id)}
                />
              ) : (
                <Image
                  src={project.src || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onLoad={() => handleImageLoad(project.id)}
                />
              )}
            </div>

            {isHovered && (
              <div className="absolute inset-x-0 bottom-0 animate-[fadeUp_300ms_ease-out] bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                <h3 className="font-serif text-2xl font-bold text-white">{project.title}</h3>
                <p className="mt-1 font-sans text-sm text-white/70">{project.description}</p>
              </div>
            )}
          </div>
        )
      })}

      {/* Lazy loading sentinel */}
      {loadedChunks * CHUNK_SIZE < projects.length && <div id="load-more-sentinel" className="col-span-full h-20" />}
    </div>
  )
}
