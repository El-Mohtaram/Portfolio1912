"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export function AnimatedLightBeam() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateMousePosition = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Apply subtle rotation to beam based on mouse position
      const angleX = (y - rect.height / 2) * 0.05
      const angleY = (x - rect.width / 2) * 0.05

      container.style.setProperty("--beam-angle-x", `${angleX}deg`)
      container.style.setProperty("--beam-angle-y", `${angleY}deg`)
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={
        {
          "--beam-angle-x": "0deg",
          "--beam-angle-y": "0deg",
        } as React.CSSProperties
      }
    >
      {/* Main light beam */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            transparent 20%,
            rgba(59, 130, 246, 0.8) 35%,
            rgba(99, 102, 241, 0.9) 45%,
            rgba(168, 85, 247, 0.8) 55%,
            rgba(59, 130, 246, 0.8) 65%,
            transparent 80%,
            transparent 100%)`,
          backgroundSize: "200% 100%",
          backgroundPosition: "var(--beam-position, 0%)",
          clipPath: "polygon(0 35%, 100% 30%, 100% 70%, 0 65%)",
          animation: "beamFlow 4s ease-in-out infinite",
          filter: "blur(30px)",
          opacity: 0.6,
          transform: `perspective(1200px) rotateX(var(--beam-angle-x)) rotateY(var(--beam-angle-y))`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Brighter core of beam */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg,
            transparent 0%,
            transparent 25%,
            rgba(147, 197, 253, 1) 40%,
            rgba(196, 181, 253, 0.9) 50%,
            rgba(147, 197, 253, 1) 60%,
            transparent 75%,
            transparent 100%)`,
          backgroundSize: "200% 100%",
          backgroundPosition: "var(--beam-position, 0%)",
          clipPath: "polygon(0 42%, 100% 40%, 100% 60%, 0 58%)",
          animation: "beamFlow 4s ease-in-out infinite",
          filter: "blur(15px)",
          opacity: 0.7,
          transform: `perspective(1200px) rotateX(var(--beam-angle-x)) rotateY(var(--beam-angle-y))`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Edge glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg,
            transparent 0%,
            transparent 20%,
            rgba(59, 130, 246, 0.4) 30%,
            transparent 40%,
            transparent 60%,
            rgba(168, 85, 247, 0.4) 70%,
            transparent 80%,
            transparent 100%)`,
          backgroundSize: "200% 100%",
          backgroundPosition: "var(--beam-position, 0%)",
          animation: "beamFlow 4s ease-in-out infinite",
          filter: "blur(50px)",
          opacity: 0.3,
          clipPath: "polygon(0 25%, 100% 20%, 100% 80%, 0 75%)",
        }}
      />
    </div>
  )
}
