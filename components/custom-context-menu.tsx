"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Mail, ArrowLeft, RotateCcw, Home, Link2, Type } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function CustomContextMenu() {
    const [visible, setVisible] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [hasSelection, setHasSelection] = useState(false)

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()

            // Check if user has highlighted text
            const selection = window.getSelection()?.toString()
            setHasSelection(!!selection && selection.length > 0)

            // Adjust position to prevent clipping off-screen
            let x = e.clientX
            let y = e.clientY
            if (x > window.innerWidth - 220) x = window.innerWidth - 220
            if (y > window.innerHeight - 300) y = window.innerHeight - 300

            setPosition({ x, y })
            setVisible(true)
        }

        const handleClick = () => setVisible(false)
        const handleScroll = () => setVisible(false)

        window.addEventListener("contextmenu", handleContextMenu)
        window.addEventListener("click", handleClick)
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("contextmenu", handleContextMenu)
            window.removeEventListener("click", handleClick)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleCopyText = () => {
        const selection = window.getSelection()?.toString()
        if (selection) {
            navigator.clipboard.writeText(selection)
        }
        setVisible(false)
    }

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("hi@mohanud.com")
        setVisible(false)
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setVisible(false)
    }

    const handleBack = () => {
        router.back()
        setVisible(false)
    }

    const handleReload = () => {
        window.location.reload()
        setVisible(false)
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }} // Snappy Apple-like ease
                    // THE LIQUID GLASS STYLE:
                    // bg-black/60 = Dark but see-through
                    // backdrop-blur-2xl = Heavy frost effect
                    // border-white/10 = Subtle diamond edge
                    // shadow-2xl = Pops off white backgrounds
                    className="fixed z-[99999] min-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-1.5 shadow-2xl backdrop-blur-2xl"
                    style={{ top: position.y, left: position.x }}
                >
                    <div className="flex flex-col gap-0.5">

                        {/* DYNAMIC: Copy Text (Only shows if text selected) */}
                        {hasSelection && (
                            <>
                                <MenuItem onClick={handleCopyText} icon={Type} label="Copy Selection" />
                                <div className="my-1 h-px w-full bg-white/10" />
                            </>
                        )}

                        {/* NAVIGATION ACTIONS */}
                        <MenuItem onClick={handleBack} icon={ArrowLeft} label="Back" />
                        <MenuItem onClick={handleReload} icon={RotateCcw} label="Refresh Page" />

                        <div className="my-1 h-px w-full bg-white/10" />

                        {/* UTILITY ACTIONS */}
                        <MenuItem onClick={handleCopyEmail} icon={Mail} label="Copy Email" />
                        <MenuItem onClick={handleCopyLink} icon={Link2} label="Copy Link" />

                        {pathname !== "/" && (
                            <MenuItem onClick={() => router.push("/")} icon={Home} label="Go Home" />
                        )}

                        {/* BRANDING FOOTER */}
                        <div className="mt-1 flex items-center justify-center border-t border-white/5 pt-2 pb-1">
              <span className="font-serif text-[10px] uppercase tracking-[0.2em] text-white/20">
                MOHANUD
              </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Helper Component to keep code clean
// Helper Component
function MenuItem({ onClick, icon: Icon, label }: { onClick: () => void; icon: any; label: string }) {
    return (
        <button
            onClick={onClick}
            // Added 'cursor-pointer' class explicitly so the Custom Cursor detects it as a button
            className="force-arrow group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/80 transition-all hover:bg-white/10 hover:text-white"
        >
            <Icon className="h-4 w-4 text-white/50 transition-colors group-hover:text-white" />
            <span className="font-medium">{label}</span>
        </button>
    )
}