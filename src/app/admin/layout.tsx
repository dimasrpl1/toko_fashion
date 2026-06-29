export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-soft-border bg-warm-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-6">
          {/* judul asli nya nojstudioid cuman untuk sementara n1mpo dulu */}
          <span className="text-sm font-medium text-charcoal">n1mpo — Admin</span>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
