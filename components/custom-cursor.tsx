"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// --- 🛠️ CALIBRATION ZONE 🛠️ ---
const ARROW_X = 13
const ARROW_Y = 10
const ARROW_SIZE = "65px"
const ARROW_SPEED = 1.0

const HAND_X = 36
const HAND_Y = 13
const HAND_SIZE = "80px"
const HAND_SPEED = 2.0

const TEXT_X = 32
const TEXT_Y = 32
const TEXT_SIZE = "64px"
const TEXT_SPEED = 1.5
// --------------------------------------

/**
 * ShadowCursorVideo
 * Renders the video inside a "Closed Shadow DOM".
 * This prevents extensions (like IDM) from detecting the <video> tag in the DOM
 * and injecting their buttons over it.
 */
const ShadowCursorVideo = ({ src, speed }: { src: string, speed: number }) => {
    const hostRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const isInitialized = useRef(false)

    // 1. Setup Shadow DOM & Video Element (Run Once)
    useEffect(() => {
        if (!hostRef.current || isInitialized.current) return

        try {
            // Create a CLOSED shadow root - invisible to external scripts
            const shadow = hostRef.current.attachShadow({ mode: "closed" })
            isInitialized.current = true

            // Create video element manually
            const video = document.createElement("video")

            // CSS to force high quality and fill container
            video.style.width = "100%"
            video.style.height = "100%"
            video.style.objectFit = "contain"
            video.style.pointerEvents = "none" // Extra safety
            video.style.display = "block"

            // Attributes
            video.autoplay = true
            video.loop = true;
            video.muted = true;
            video.playsInline = true;

            // Append to shadow DOM
            shadow.appendChild(video)
            videoRef.current = video

        } catch (e) {
            console.error("Shadow DOM attach failed", e)
        }
    }, [])

    // 2. Handle Src (Blob) & Speed Updates
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        // Update Speed
        video.playbackRate = speed

        // Update Source securely via Blob
        let active = true
        let currentBlobUrl = ""

        fetch(src)
            .then((res) => res.blob())
            .then((blob) => {
                if (!active) return
                // Revoke old URL if exists
                if (video.src && video.src.startsWith("blob:")) {
                    URL.revokeObjectURL(video.src)
                }

                const url = URL.createObjectURL(blob)
                currentBlobUrl = url
                video.src = url

                // Force play after source change
                video.play().catch(() => { /* Silent catch */ })
            })
            .catch(() => {
                // Fallback to direct src if blob fails
                if (active) video.src = src
            })

        return () => {
            active = false
            if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl)
        }
    }, [src, speed])

    return <div ref={hostRef} style={{ width: "100%", height: "100%" }} />
}

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isText, setIsText] = useState(false)

    const isHoveringRef = useRef(false)
    const isTextRef = useRef(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 30, stiffness: 350, mass: 0.6 }
    const smoothX = useSpring(mouseX, springConfig)
    const smoothY = useSpring(mouseY, springConfig)

    useEffect(() => {
        isHoveringRef.current = isHovering
        isTextRef.current = isText
    }, [isHovering, isText])

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            let offsetX = ARROW_X
            let offsetY = ARROW_Y

            if (isTextRef.current) {
                offsetX = TEXT_X
                offsetY = TEXT_Y
            } else if (isHoveringRef.current) {
                offsetX = HAND_X
                offsetY = HAND_Y
            }

            mouseX.set(e.clientX - offsetX)
            mouseY.set(e.clientY - offsetY)

            if (!isVisible) setIsVisible(true)
        }

        const handleMouseOver = (e: MouseEvent) => {
            let target = e.target as HTMLElement | null
            let foundPointer = false
            let foundText = false
            let shouldBlockHand = false

            for (let i = 0; i < 8; i++) {
                if (!target) break
                const tagName = target.tagName
                const style = window.getComputedStyle(target)

                if (
                    tagName === "TEXTAREA" ||
                    (tagName === "INPUT" && target.getAttribute("type") !== "submit" && target.getAttribute("type") !== "button" && target.getAttribute("type") !== "checkbox") ||
                    style.cursor === "text"
                ) {
                    foundText = true
                    break
                }

                if (
                    target.classList.contains("force-arrow") ||
                    target.getAttribute("aria-label") === "Close modal" ||
                    target.getAttribute("aria-label") === "Previous Project" ||
                    target.getAttribute("aria-label") === "Next Project"
                ) {
                    shouldBlockHand = true
                    break
                }

                if (
                    tagName === "A" ||
                    tagName === "BUTTON" ||
                    target.getAttribute("role") === "button" ||
                    target.classList.contains("cursor-pointer") ||
                    (tagName === "INPUT" && target.getAttribute("type") === "submit") ||
                    style.cursor === "pointer"
                ) {
                    foundPointer = true
                }

                target = target.parentElement
            }

            setIsText(foundText)
            setIsHovering(foundPointer && !shouldBlockHand && !foundText)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }
        const handleMouseEnter = () => {
            setIsVisible(true)
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseover", handleMouseOver)
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseover", handleMouseOver)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseenter", handleMouseEnter)
        }
    }, [mouseX, mouseY, isVisible])

    // Don't render on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null
    }

    return (
        <motion.div
            className="fixed top-0 left-0 z-[999999] pointer-events-none"
            style={{
                x: smoothX,
                y: smoothY,
                opacity: isVisible ? 1 : 0,
                filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.3))"
            }}
        >
            {/* TEXT CURSOR */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    opacity: isText ? 1 : 0,
                    scale: isText ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
                style={{ width: TEXT_SIZE, height: TEXT_SIZE }}
            >
                <ShadowCursorVideo src="/cursor-select.webm" speed={TEXT_SPEED} />
            </motion.div>

            {/* HAND CURSOR */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    opacity: isHovering && !isText ? 1 : 0,
                    scale: isHovering && !isText ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
                style={{ width: HAND_SIZE, height: HAND_SIZE }}
            >
                <ShadowCursorVideo src="/cursor-hand.webm" speed={HAND_SPEED} />
            </motion.div>

            {/* ARROW CURSOR */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    opacity: (!isHovering && !isText) ? 1 : 0,
                    scale: (!isHovering && !isText) ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
                style={{ width: ARROW_SIZE, height: ARROW_SIZE }}
            >
                <ShadowCursorVideo src="/cursor-loop.webm" speed={ARROW_SPEED} />
            </motion.div>

        </motion.div>
    )
}