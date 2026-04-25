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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-black text-white">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
        500 — Unexpected error
      </span>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Something went sideways.
      </h1>
      <p className="text-neutral-400 max-w-md">
        The page hit an unexpected error. Refreshing usually fixes it.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm font-mono uppercase tracking-wider transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Try again
      </button>
    </div>
  );
}
