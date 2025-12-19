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

// Speed control constant
const VIDEO_SPEED = 1.5
// --------------------------------------

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)

    const [isHovering, setIsHovering] = useState(false)
    const [isText, setIsText] = useState(false)

    const [arrowBlob, setArrowBlob] = useState<string>("")
    const [handBlob, setHandBlob] = useState<string>("")
    const [selectBlob, setSelectBlob] = useState<string>("")

    const isHoveringRef = useRef(false)
    const isTextRef = useRef(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 30, stiffness: 350, mass: 0.6 }
    const smoothX = useSpring(mouseX, springConfig)
    const smoothY = useSpring(mouseY, springConfig)

    // 1. Load Videos
    useEffect(() => {
        const fetchVideo = async (path: string, setter: (url: string) => void) => {
            try {
                const response = await fetch(path)
                const blob = await response.blob()
                const objectUrl = URL.createObjectURL(blob)
                setter(objectUrl)
            } catch (e) {
                console.error("Failed to load cursor video", e)
            }
        }

        fetchVideo("/cursor-loop.webm", setArrowBlob)
        fetchVideo("/cursor-hand.webm", setHandBlob)
        fetchVideo("/cursor-select.webm", setSelectBlob)

        return () => {
            if (arrowBlob) URL.revokeObjectURL(arrowBlob)
            if (handBlob) URL.revokeObjectURL(handBlob)
            if (selectBlob) URL.revokeObjectURL(selectBlob)
        }
    }, [])

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

        // --- NEW: VISIBILITY HANDLERS ---
        const handleMouseLeave = () => {
            setIsVisible(false)
        }
        const handleMouseEnter = () => {
            setIsVisible(true)
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseover", handleMouseOver)
        // Add listeners for leaving/entering the window
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseover", handleMouseOver)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseenter", handleMouseEnter)
        }
    }, [mouseX, mouseY, isVisible])

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null
    }

    if (!arrowBlob || !handBlob) return null

    return (
        <motion.div
            className="fixed top-0 left-0 z-[999999] pointer-events-none"
            style={{
                x: smoothX,
                y: smoothY,
                opacity: isVisible ? 1 : 0, // This now responds to mouse leave
                filter: "grayscale(100%) brightness(140%) drop-shadow(0px 4px 10px rgba(0,0,0,0.3))"
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
                <div className="relative w-full h-full">
                    {selectBlob && (
                        <video
                            ref={video => { if (video) video.playbackRate = TEXT_SPEED }}
                            src={selectBlob}
                            autoPlay
                            loop
                            muted
                            playsInline
                            disablePictureInPicture
                            controls={false}
                            controlsList="nodownload"
                            className="IDM_hidden w-full h-full object-contain bg-transparent"
                        />
                    )}
                </div>
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
                <div className="relative w-full h-full">
                    {handBlob && (
                        <video
                            ref={video => { if (video) video.playbackRate = HAND_SPEED }}
                            src={handBlob}
                            autoPlay
                            loop
                            muted
                            playsInline
                            disablePictureInPicture
                            controls={false}
                            controlsList="nodownload"
                            className="IDM_hidden w-full h-full object-contain bg-transparent"
                        />
                    )}
                </div>
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
                <div className="relative w-full h-full">
                    {arrowBlob && (
                        <video
                            ref={video => { if (video) video.playbackRate = ARROW_SPEED }}
                            src={arrowBlob}
                            autoPlay
                            loop
                            muted
                            playsInline
                            disablePictureInPicture
                            controls={false}
                            controlsList="nodownload"
                            className="IDM_hidden w-full h-full object-contain bg-transparent"
                        />
                    )}
                </div>
            </motion.div>

        </motion.div>
    )
}