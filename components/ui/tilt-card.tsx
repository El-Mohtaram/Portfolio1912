"use client"

import type React from "react"
import { useRef, useState, useEffect, type ReactNode } from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export function TiltCard({ children, className = "", maxTilt = 12 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [sheenPosition, setSheenPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    // 1. Detect Touch Device
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    setIsTouchDevice(isTouch)

    if (isTouch && typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      // 2. Mobile Tilt Logic
      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (!cardRef.current) return
        
        const beta = e.beta ?? 0 // -180 to 180 (front/back tilt)
        const gamma = e.gamma ?? 0 // -90 to 90 (left/right tilt)

        // Clamp values to maxTilt
        const rotateX = Math.max(-maxTilt, Math.min(maxTilt, beta / 3))
        const rotateY = Math.max(-maxTilt, Math.min(maxTilt, gamma / 3))

        // Apply transform directly (CSS transition handles smoothing)
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }

      // 3. iOS Permission Handler (Crucial for iPhones)
      const requestPermission = async () => {
        if (
          typeof DeviceOrientationEvent !== "undefined" &&
          typeof (DeviceOrientationEvent as any).requestPermission === "function"
        ) {
          try {
            const permission = await (DeviceOrientationEvent as any).requestPermission()
            if (permission === "granted") {
              window.addEventListener("deviceorientation", handleOrientation)
            }
          } catch (error) {
            console.error("Gyroscope permission denied")
          }
        } else {
          // Android/Non-iOS devices don't need permission
          window.addEventListener("deviceorientation", handleOrientation)
        }
      }

      requestPermission()

      return () => window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [maxTilt])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const newRotateX = ((y - centerY) / centerY) * -maxTilt
    const newRotateY = ((x - centerX) / centerX) * maxTilt

    // Apply exact Desktop Transform
    card.style.transform = `perspective(1000px) rotateX(${newRotateX}deg) rotateY(${newRotateY}deg) scale3d(1.02, 1.02, 1.02)`

    setSheenPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    // Reset position
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    setSheenPosition({ x: 50, y: 50 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative transition-transform duration-300 ease-out ${className}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
      
      {/* Holographic Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${sheenPosition.x}% ${sheenPosition.y}%, rgba(255,255,255,0.15) 0%, rgba(120,180,255,0.08) 30%, transparent 60%)`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  )
}
