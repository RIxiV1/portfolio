'use client';

import { useEffect, useRef } from 'react';

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

const DEFAULT_THRESHOLD = 0.15;
const DEFAULT_ROOT_MARGIN = '0px 0px -60px 0px';
const DEFAULT_ONCE = true;

/**
 * Adds `data-visible` when the element enters the viewport. Depends on
 * primitive option values so inline-object callers don't rebuild the
 * observer on every render.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: RevealOptions,
) {
  const ref = useRef<T>(null);
  const threshold = options?.threshold ?? DEFAULT_THRESHOLD;
  const rootMargin = options?.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const once = options?.once ?? DEFAULT_ONCE;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.removeAttribute('data-visible');
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * Staggers `data-visible` across children marked with `[data-reveal]`.
 * Timers are tracked so unmount during the stagger window doesn't
 * leave pending setTimeouts targeting detached DOM.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options?: RevealOptions & { staggerMs?: number },
) {
  const ref = useRef<T>(null);
  const threshold = options?.threshold ?? DEFAULT_THRESHOLD;
  const rootMargin = options?.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const once = options?.once ?? DEFAULT_ONCE;
  const staggerMs = options?.staggerMs ?? 80;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!children.length) return;

    const timers: number[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            const id = window.setTimeout(() => {
              child.setAttribute('data-visible', 'true');
            }, i * staggerMs);
            timers.push(id);
          });
          if (once) observer.unobserve(container);
        } else if (!once) {
          children.forEach((child) => child.removeAttribute('data-visible'));
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      timers.forEach((id) => clearTimeout(id));
    };
  }, [threshold, rootMargin, once, staggerMs]);

  return ref;
}
