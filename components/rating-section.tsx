"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Star } from "lucide-react"

export function RatingSection() {
    const [isVisible, setIsVisible] = useState(false)
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                    }
                })
            },
            { threshold: 0.3 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const handleRatingClick = (value: number) => {
        setRating(value)
        setShowForm(true)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("[v0] Rating submitted:", { rating, ...formData })
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return null // Remove section after submission
    }

    return (
        <div
            ref={sectionRef}
            className={`
        col-span-full my-16 flex flex-col items-center justify-center space-y-8 transition-all duration-700
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
      `}
        >
            <div className="text-center">
                <p className="font-sans text-xl text-white/90">I'm not a web developer but i created this website ❤️👀</p>
                <p className="mt-2 font-sans text-lg text-white/70">could you please rate it for me?</p>
            </div>

            {/* Star Rating */}
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        // REMOVED: focus:ring-2 focus:ring-yellow-400 ...
                        // ADDED: focus:outline-none (removes default ring)
                        className="force-arrow transition-transform duration-150 hover:scale-110 focus:outline-none rounded-full"
                        aria-label={`Rate ${star} stars`}
                    >
                        <Star
                            // ADDED: animate-pulse on active stars for a breathing glow effect
                            className={`h-10 w-10 transition-all duration-150 ${
                                star <= (hoveredRating || rating)
                                    ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]"
                                    : "fill-slate-600 text-slate-600"
                            }`}
                        />
                    </button>
                ))}
            </div>

            {/* Contact Form */}
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className={`
            w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl
            transition-all duration-500
            ${showForm ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
          `}
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/70">
                            Name <span className="text-xs text-white/50">(optional)</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            // ADDED: focus:shadow-[0_0_25px_rgba(255,255,255,0.2)] and slightly brighter border
                            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/40 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] focus:bg-white/10 focus:border-white/60 focus:outline-none focus:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/70">
                            Email <span className="text-xs text-white/50">(optional)</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            // ADDED: same focus glow as above
                            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/40 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] focus:bg-white/10 focus:border-white/60 focus:outline-none focus:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white/70">
                            Message <span className="text-xs text-white/50">(optional)</span>
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            // ADDED: same focus glow as above
                            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/40 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] focus:bg-white/10 focus:border-white/60 focus:outline-none focus:shadow-[0_0_25px_rgba(255,255,255,0.2)] resize-none"
                            placeholder="Your feedback..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="force-arrow w-full rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition-all duration-150 hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
                    >
                        Submit Rating
                    </button>
                </form>
            )}
        </div>
    )
}