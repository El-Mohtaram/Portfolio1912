"use client"

import { useEffect, useState } from "react"

interface OrientationState {
    isPortrait: boolean
    isLandscape: boolean
    isMobile: boolean      // width <= 640px
    isTablet: boolean      // touch device (coarse pointer) AND width > 640px
    isDesktop: boolean     // mouse/trackpad (fine pointer) AND width >= 1024px
    isTouchDevice: boolean // has coarse pointer (touch screen)
}

export function useOrientation(): OrientationState {
    const [state, setState] = useState<OrientationState>({
        isPortrait: true,
        isLandscape: false,
        isMobile: false,
        isTablet: false,
        isDesktop: true, // SSR safe default
        isTouchDevice: false,
    })

    useEffect(() => {
        const updateState = () => {
            const width = window.innerWidth
            const height = window.innerHeight

            // Detect touch capability via pointer type
            // coarse = touch/stylus, fine = mouse/trackpad
            const isTouchDevice = window.matchMedia("(pointer: coarse)").matches

            // Orientation based strictly on dimensions
            const isPortrait = height > width
            const isLandscape = width > height

            // Mobile: small screens (regardless of input type)
            const isMobile = width <= 640

            // Tablet: touch device with larger screen (even iPad Pro 12.9")
            // This ensures iPads never get Desktop layout
            const isTablet = isTouchDevice && width > 640

            // Desktop: ONLY if using mouse/trackpad AND large screen
            // Touch devices are NEVER considered desktop
            const isDesktop = !isTouchDevice && width >= 1024

            setState({
                isPortrait,
                isLandscape,
                isMobile,
                isTablet,
                isDesktop,
                isTouchDevice,
            })
        }

        // Initial check
        updateState()

        // Listen for resize and orientation changes
        window.addEventListener("resize", updateState)
        window.addEventListener("orientationchange", updateState)

        // Also listen for pointer changes (e.g., connecting a mouse to tablet)
        const pointerQuery = window.matchMedia("(pointer: coarse)")
        pointerQuery.addEventListener("change", updateState)

        return () => {
            window.removeEventListener("resize", updateState)
            window.removeEventListener("orientationchange", updateState)
            pointerQuery.removeEventListener("change", updateState)
        }
    }, [])

    return state
}
