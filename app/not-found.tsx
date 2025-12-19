import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-radial flex flex-col items-center justify-center px-6">
      {/* Film Grain */}
      <div className="film-grain" />

      {/* Ethereal Ribbons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ethereal-ribbon-1" style={{ top: "30%", left: "10%" }} />
        <div className="ethereal-ribbon-2" style={{ top: "60%", right: "5%" }} />
      </div>

      <div className="relative mb-12" style={{ perspective: "800px" }}>
        <div className="animate-rotate-cube relative h-32 w-32" style={{ transformStyle: "preserve-3d" }}>
          {/* Cube faces */}
          {[
            { transform: "translateZ(64px)" },
            { transform: "rotateY(180deg) translateZ(64px)" },
            { transform: "rotateY(90deg) translateZ(64px)" },
            { transform: "rotateY(-90deg) translateZ(64px)" },
            { transform: "rotateX(90deg) translateZ(64px)" },
            { transform: "rotateX(-90deg) translateZ(64px)" },
          ].map((style, i) => (
            <div
              key={i}
              className="absolute h-32 w-32 rounded-xl border border-white/30 bg-white/5 backdrop-blur-xl"
              style={{
                ...style,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)",
              }}
            />
          ))}
        </div>
      </div>

      <h1
        className="mb-4 font-serif text-4xl font-bold text-white md:text-6xl"
        style={{ animation: "fadeInUp 800ms ease-out" }}
      >
        404
      </h1>
      <p
        className="mb-8 text-center font-sans text-xl text-white/70"
        style={{ animation: "fadeInUp 800ms ease-out 200ms backwards" }}
      >
        You have wandered too far.
      </p>

      <Link
        href="/"
        className="group flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-sans text-sm font-medium text-white backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-2xl hover:shadow-blue-500/30"
        style={{ animation: "fadeInUp 800ms ease-out 400ms backwards" }}
      >
        Return to Surface
      </Link>
    </div>
  )
}
