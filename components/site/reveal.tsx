"use client"

import type { ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.15, rootMargin: "0px 0px -8% 0px" })

  return (
    <div
      ref={elementRef}
      data-visible={isVisible}
      className={cn("reveal", className)}
      style={delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
