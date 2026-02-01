"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface CanvasVideoProps {
    src: string
    className?: string
    playbackRate?: number
    loop?: boolean
    muted?: boolean
    autoPlay?: boolean
}

/**
 * CanvasVideo - Renders video frames to canvas to hide from download grabbers (IDM)
 * 
 * The video element is created in memory (never added to DOM), so download
 * extensions cannot detect it. Frames are drawn to canvas in real-time.
 */
export function CanvasVideo({
                                src,
                                className = "",
                                playbackRate = 1.0,
                                loop = true,
                                muted = true,
                                autoPlay = true,
                            }: CanvasVideoProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const animationRef = useRef<number>(0)
    const [isReady, setIsReady] = useState(false)

    // Initialize video in memory
    useEffect(() => {
        const video = document.createElement("video")
        video.src = src
        video.crossOrigin = "anonymous"
        video.loop = loop
        video.muted = muted
        video.playsInline = true
        video.playbackRate = playbackRate

        videoRef.current = video

        const handleCanPlay = () => {
            setIsReady(true)
            if (autoPlay) {
                video.play().catch(() => {
                    // Autoplay may fail silently
                })
            }
        }

        const handleEnded = () => {
            if (loop) {
                video.currentTime = 0
                video.play().catch(() => {})
            }
        }

        video.addEventListener("canplay", handleCanPlay)
        video.addEventListener("ended", handleEnded)

        video.load()

        return () => {
            video.removeEventListener("canplay", handleCanPlay)
            video.removeEventListener("ended", handleEnded)
            video.pause()
            video.src = ""
            videoRef.current = null
        }
    }, [src, loop, muted, playbackRate, autoPlay])

    // Animation loop - draw video frames to canvas with DPI scaling
    useEffect(() => {
        if (!isReady) return

        const canvas = canvasRef.current
        const video = videoRef.current
        if (!canvas || !video) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const draw = () => {
            const rect = canvas.getBoundingClientRect()

            // 1. حساب معامل كثافة الشاشة (للشاشات الريتنا والعالية بيكون 2 أو 3)
            // ولو مش موجود بنفترض إنه 1
            const dpr = window.devicePixelRatio || 1;

            // 2. حساب الأبعاد الفعلية بناءً على الكثافة
            const targetWidth = Math.floor(rect.width * dpr);
            const targetHeight = Math.floor(rect.height * dpr);

            // 3. تحديث أبعاد الكانفاس الداخلية لتطابق دقة الشاشة
            if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
                canvas.width = targetWidth;
                canvas.height = targetHeight;
            }

            if (video.readyState >= 2) {
                // 4. رسم الفيديو لملء المساحة عالية الدقة بالكامل
                // هذا سيستفيد من جودة الفيديو الـ 600px ولن يحدث بكسلة
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            }

            animationRef.current = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isReady])

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                // مهم جداً: بنسيب المتصفح يحدد طريقة العرض، والكانفاس نفسه بقى عالي الدقة
                pointerEvents: "none",
            }}
            onContextMenu={(e) => e.preventDefault()}
        />
    )
}