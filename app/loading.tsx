export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-accent2)]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[var(--color-text-dark)]/70">Loading...</p>
      </div>
    </div>
  )
}
