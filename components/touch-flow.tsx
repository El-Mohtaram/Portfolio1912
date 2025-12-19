"use client"

import { useEffect, useState, useRef } from "react"

interface TouchPoint {
  id: number
  x: number
  y: number
  timestamp: number
}

export function TouchFlow() {
  const [points, setPoints] = useState<TouchPoint[]>([])
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const idCounter = useRef(0)

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }
    checkTouchDevice()

    // Only proceed if touch device
    if (!("ontouchstart" in window) && navigator.maxTouchPoints === 0) {
      return
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return

      const newPoint: TouchPoint = {
        id: idCounter.current++,
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
      }

      setPoints((prev) => {
        const updated = [...prev, newPoint]
        // Keep only last 15 points
        return updated.slice(-15)
      })
    }

    // Clean up old points every 50ms
    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      setPoints((prev) => prev.filter((p) => now - p.timestamp < 500))
    }, 50)

    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("touchmove", handleTouchMove)
      clearInterval(cleanupInterval)
    }
  }, [])

  // Don't render anything on desktop
  if (!isTouchDevice) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {points.map((point) => {
        const age = Date.now() - point.timestamp
        const opacity = Math.max(0, 1 - age / 500)
        const scale = 1 - age / 1000

        return (
          <div
            key={point.id}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: point.x,
              top: point.y,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)",
              boxShadow: `
                0 0 10px rgba(56, 189, 248, ${opacity * 0.8}),
                0 0 20px rgba(59, 130, 246, ${opacity * 0.5}),
                0 0 30px rgba(56, 189, 248, ${opacity * 0.3})
              `,
            }}
          />
        )
      })}
    </div>
  )
}
