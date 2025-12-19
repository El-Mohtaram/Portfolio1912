export function ThreeDLightBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial" />
      {/* Multiple animated light orbs for depth */}
      <div
        className="absolute left-1/4 top-1/3 h-96 w-96 opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)",
          animation: "float 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 h-80 w-80 opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
          animation: "float 30s ease-in-out infinite reverse",
        }}
      />
    </div>
  )
}
