"use client"

import { useEffect, useState } from "react"

export function BackgroundOrbits() {
    const [mounted, setMounted] = useState(false)

    // Generate random stars only after mount to avoid hydration mismatch
    const [particles, setParticles] = useState<Array<{ left: string; duration: string; delay: string; size: string }>>([])

    useEffect(() => {
        setMounted(true)

        // Create 20 random dust particles
        const newParticles = Array.from({ length: 20 }).map(() => ({
            left: `${Math.random() * 100}%`,
            duration: `${Math.random() * 20 + 10}s`, // 10s to 30s float time
            delay: `${Math.random() * -30}s`, // Start at random times
            size: `${Math.random() * 3 + 1}px` // 1px to 4px size
        }))

        setParticles(newParticles)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {/* 1. The Nebula Glows (Atmosphere) */}
            <div className="nebula-orb-1" style={{ top: "-10%", left: "-10%" }} />
            <div className="nebula-orb-2" style={{ top: "40%", right: "-10%" }} />
            <div className="nebula-orb-3" style={{ bottom: "-20%", left: "20%" }} />

            {/* 2. The Stardust (Depth) */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="dust-particle"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                    }}
                />
            ))}
        </div>
    )
}