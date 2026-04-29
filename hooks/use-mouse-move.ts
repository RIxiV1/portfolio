"use client"

import { useState, useEffect, RefObject } from "react"

export function useMouseMove(ref: RefObject<HTMLElement | null>) {
  const [point, setPoint] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      if (rect) {
        setPoint({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    node.addEventListener("mousemove", handleMouseMove)

    return () => {
      node.removeEventListener("mousemove", handleMouseMove)
    }
  }, [ref])

  return point
}
