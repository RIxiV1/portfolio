import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-black text-white">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
        404 — Not found
      </span>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        This page is off the map.
      </h1>
      <p className="text-neutral-400 max-w-md">
        The link you followed is broken, or the page was moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm font-mono uppercase tracking-wider transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Back home
      </Link>
    </div>
  );
}
