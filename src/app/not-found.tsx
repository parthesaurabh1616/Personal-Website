import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid mask-radial opacity-50" />
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">404 · NODE NOT FOUND</p>
      <h1 className="mt-6 font-display text-5xl font-semibold text-gradient md:text-7xl">Topology broken.</h1>
      <p className="mt-4 max-w-md text-white/55">
        The route you requested doesn&apos;t exist in this distributed mesh. Reroute to the home node.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white shadow-glow transition-all hover:brightness-110"
      >
        Return Home
      </Link>
    </main>
  );
}
