"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { ReachMeBox } from "@/components/reach-me-box"

export default function WorkTogetherPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
    }

    return (
        <div className="min-h-screen bg-gradient-radial">
            <NavigationBar />

            <main className="mx-auto max-w-7xl px-6 pt-32">
                <div className="mb-16 text-center">
                    <h1
                        className="mb-4 font-serif text-6xl font-bold text-white"
                        style={{ animation: "fadeInUp 800ms ease-out" }}
                    >
                        Let's Work Together
                    </h1>
                    <p
                        className="font-sans text-xl text-white/60"
                        style={{ animation: "fadeInUp 800ms ease-out 200ms backwards" }}
                    >
                        Have a project in mind? Let's make it real.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2" style={{ animation: "fadeInUp 800ms ease-out 400ms backwards" }}>
                    {/* Portrait Frame */}
                    <div className="relative h-[500px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                        {/* Inner glow overlay */}
                        <div className="absolute inset-0 z-10 rounded-3xl shadow-[inset_0_0_60px_rgba(255,255,255,0.05)]" />
                        <Image
                            src="/professional-portrait.png"
                            alt="Mohanud Hassan"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Bottom fade into background */}
                        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030305] to-transparent z-20" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-white/20"
                        >
                            <div>
                                <label htmlFor="name" className="mb-2 block font-sans text-sm font-medium text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    // UPDATED: duration-150 for snappy hover response
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/30 backdrop-blur-xl transition-all duration-150 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] focus:bg-white/10 focus:border-white/30 focus:outline-none focus:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    placeholder="Your name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block font-sans text-sm font-medium text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    // UPDATED: duration-150
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/30 backdrop-blur-xl transition-all duration-150 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] focus:bg-white/10 focus:border-white/30 focus:outline-none focus:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-2 block font-sans text-sm font-medium text-white">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={6}
                                    // UPDATED: duration-150
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/30 backdrop-blur-xl transition-all duration-150 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] focus:bg-white/10 focus:border-white/30 focus:outline-none focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] resize-none"
                                    placeholder="Tell me about your project..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="group relative w-full overflow-hidden rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-sans text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/20 hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)]"
                            >
                                <span className="relative z-10">{isSubmitted ? "Message Sent!" : "Send Message"}</span>
                                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </button>
                        </form>

                        <p className="mt-6 text-center font-sans text-sm text-white/60">
                            Or just email me directly at{" "}
                            <a
                                href="mailto:hi@mohanud.com"
                                className="text-white hover:text-white/80 underline underline-offset-2 transition-colors"
                            >
                                hi@mohanud.com
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
            <ReachMeBox />
        </div>
    )
}