"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export interface Project {
  id: string
  title: string
  description: string
  details: string
  src: string
  type: "image" | "gif"
  width: number
  height: number
}

interface MasonryGridProps {
  projects: Project[]
  columnCount?: number
}

export function MasonryGrid({ projects, columnCount = 4 }: MasonryGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [columns, setColumns] = useState<Project[][]>([])
  const modalRef = useRef<HTMLDivElement>(null)

  // Distribute projects into columns for true masonry layout
  useEffect(() => {
    const newColumns: Project[][] = Array.from({ length: columnCount }, () => [])
    const columnHeights = Array(columnCount).fill(0)

    projects.forEach((project) => {
      // Find shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      newColumns[shortestColumnIndex].push(project)
      // Add approximate height based on aspect ratio
      columnHeights[shortestColumnIndex] += project.height / project.width
    })

    setColumns(newColumns)
  }, [projects, columnCount])

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id))
  }, [])

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project)
    document.body.style.overflow = "hidden"
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null)
    document.body.style.overflow = "auto"
  }, [])

  const handleModalBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleCloseModal()
      }
    },
    [handleCloseModal],
  )

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        handleCloseModal()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [selectedProject, handleCloseModal])

  return (
    <>
      <div className="flex gap-5">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-1 flex-col gap-5">
            {column.map((project, itemIndex) => {
              const isHovered = hoveredId === project.id
              const isLoaded = loadedImages.has(project.id)

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleProjectClick(project)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-[3000ms] ease-in-out hover:shadow-2xl"
                  style={{
                    aspectRatio: `${project.width} / ${project.height}`,
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    animation: isLoaded
                      ? `fadeUp 600ms ease-out ${columnIndex * 100 + itemIndex * 150}ms backwards`
                      : "none",
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleProjectClick(project)
                    }
                  }}
                >
                  {/* Skeleton placeholder */}
                  {!isLoaded && <div className="absolute inset-0 animate-pulse bg-slate-800" />}

                  {/* Image */}
                  <div className="relative h-full w-full">
                    {project.type === "gif" ? (
                      <img
                        src={project.src || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        onLoad={() => handleImageLoad(project.id)}
                      />
                    ) : (
                      <Image
                        src={project.src || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        onLoad={() => handleImageLoad(project.id)}
                      />
                    )}
                  </div>

                  {/* Three-dot menu icon */}
                  <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex flex-col gap-0.5">
                      <div className="h-1 w-1 rounded-full bg-white" />
                      <div className="h-1 w-1 rounded-full bg-white" />
                      <div className="h-1 w-1 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={handleModalBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative flex h-[80vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white/10 shadow-2xl backdrop-blur-xl">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image side (50%) */}
            <div className="relative w-1/2">
              {selectedProject.type === "gif" ? (
                <img
                  src={selectedProject.src || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={selectedProject.src || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              )}
            </div>

            {/* Details side (50%) */}
            <div className="flex w-1/2 flex-col justify-center p-12">
              <h2 id="modal-title" className="font-serif text-4xl font-bold text-white">
                {selectedProject.title}
              </h2>
              <p className="mt-4 font-sans text-lg text-white/80">{selectedProject.description}</p>
              <div className="mt-8 font-sans text-base leading-relaxed text-white/70">{selectedProject.details}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
