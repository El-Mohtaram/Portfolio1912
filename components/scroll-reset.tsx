"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function ScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    // Instant scroll to top when pathname changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  return null
}
