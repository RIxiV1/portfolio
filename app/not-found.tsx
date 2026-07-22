import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        404 — Not found
      </span>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        This page is off the map.
      </h1>
      <p className="max-w-md leading-relaxed text-muted-foreground">
        The link you followed is broken, or the page was moved.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-accent/90"
      >
        Back home
      </Link>
    </main>
  );
}
