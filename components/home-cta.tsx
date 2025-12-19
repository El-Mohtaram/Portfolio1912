"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function HomeCta() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative mx-auto max-w-[95%] px-4 py-24 md:px-6 2xl:max-w-[1800px]"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-12 shadow-2xl backdrop-blur-2xl md:p-16 lg:p-20">
        {/* Inner glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="font-playfair text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl">
            Ready to create something extraordinary?
          </h2>

          <p className="mt-6 max-w-xl text-lg text-white/60">Let&apos;s turn your vision into a digital masterpiece.</p>

          <Link href="/work-together">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 rounded-full border border-white/20 bg-white/10 px-10 py-4 text-lg font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Start a Project
            </motion.button>
          </Link>
        </div>

        {/* Decorative gradient orbs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>
    </motion.section>
  )
}
