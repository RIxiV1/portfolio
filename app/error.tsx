'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        500 — Unexpected error
      </span>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Something went sideways.
      </h1>
      <p className="max-w-md leading-relaxed text-muted-foreground">
        The page hit an unexpected error. Refreshing usually fixes it.
      </p>
      <button
        onClick={reset}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-accent/90"
      >
        Try again
      </button>
    </main>
  );
}
