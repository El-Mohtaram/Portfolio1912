"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function MouseSpotlight() {
    const [isHovering, setIsHovering] = useState(false)
    const [mounted, setMounted] = useState(false)

    // 1. Physics (Smooth Liquid Trail)
    // Matches your preferred "Heavy Glass" feel
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
    const x = useSpring(0, springConfig)
    const y = useSpring(0, springConfig)

    useEffect(() => {
        setMounted(true)

        const handleMouseMove = (e: MouseEvent) => {
            // Track mouse position
            x.set(e.clientX)
            y.set(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
            let target = e.target as HTMLElement | null
            let foundPointer = false

            // 2. Smart Detection (Matches your Cursor Logic)
            for (let i = 0; i < 8; i++) {
                if (!target) break

                const tagName = target.tagName
                const style = window.getComputedStyle(target)

                // If it's an input, we treat it as "Hovering" (Focus light)
                // If it's a Link/Button, we treat it as "Hovering"
                if (
                    tagName === "A" ||
                    tagName === "BUTTON" ||
                    tagName === "INPUT" ||
                    tagName === "TEXTAREA" ||
                    style.cursor === "pointer" ||
                    target.classList.contains("cursor-pointer") ||
                    target.getAttribute("role") === "button"
                ) {
                    foundPointer = true
                    break
                }
                target = target.parentElement
            }

            setIsHovering(foundPointer)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [x, y])

    if (!mounted) return null

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-30"
            animate={
                isHovering
                    ? {
                        // HOVER STATE: Condense & Pulse
                        // Shrinks from 600px -> 250px (Concentrated Light)
                        width: [250, 280, 250],
                        height: [250, 280, 250],
                        opacity: [0.4, 0.6, 0.4], // Gets brighter
                    }
                    : {
                        // ARROW STATE: Large & Static
                        width: 600,
                        height: 600,
                        opacity: 0.15, // Subtle ambient light
                    }
            }
            transition={
                isHovering
                    ? {
                        // Loop the pulse while hovering
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }
                    : {
                        // Smoothly relax back to big size
                        duration: 0.5,
                        ease: "easeOut",
                    }
            }
            style={{
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
                background: "radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 60%)",
                mixBlendMode: "screen",
            }}
        />
    )
}