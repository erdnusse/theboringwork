import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ArrowConnectorProps {
  fromId: string;
  toId: string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  animate?: boolean;
}

export default function ArrowConnector({
  fromId,
  toId,
  color = "#222",
  strokeWidth = 4,
  className = "",
  animate = true,
}: ArrowConnectorProps) {
  const [coords, setCoords] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);

  // Helper to get the center of an element
  function getCenter(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top + rect.height / 2 + window.scrollY,
    };
  }

  // Calculate coordinates on mount and on window resize/scroll
  useEffect(() => {
    function updateCoords() {
      const fromEl = document.getElementById(fromId);
      const toEl = document.getElementById(toId);
      if (fromEl && toEl) {
        const from = getCenter(fromEl);
        const to = getCenter(toEl);
        setCoords({
          x1: from.x,
          y1: from.y,
          x2: to.x,
          y2: to.y,
        });
      }
    }
    updateCoords();
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords, true);
    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [fromId, toId]);

  if (!coords) return null;

  // Calculate SVG container
  const left = Math.min(coords.x1, coords.x2) - 40;
  const top = Math.min(coords.y1, coords.y2) - 40;
  const width = Math.abs(coords.x2 - coords.x1) + 80;
  const height = Math.abs(coords.y2 - coords.y1) + 80;

  // Start/end relative to SVG
  const startX = coords.x1 - left;
  const startY = coords.y1 - top;
  const endX = coords.x2 - left;
  const endY = coords.y2 - top;

  // Create a smooth curve
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const curve = `M${startX},${startY} C${startX + deltaX * 0.25},${startY + deltaY * 0.1} ${startX + deltaX * 0.75},${startY + deltaY * 0.9} ${endX},${endY}`;

  return (
    <svg
      className={`pointer-events-none fixed left-0 top-0 z-50 ${className}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: "none",
      }}
      width={width}
      height={height}
    >
      <motion.path
        d={curve}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={
          animate
            ? {
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
      />
      {/* Arrowhead */}
      <motion.polygon
        points={getArrowHead(endX, endY, startX, startY, 18)}
        fill={color}
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: 1 } : false}
        transition={
          animate
            ? {
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
      />
    </svg>
  );
}

// Helper to draw an arrowhead at the end of the path
function getArrowHead(x2: number, y2: number, x1: number, y1: number, size: number) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const angle1 = angle - Math.PI / 7;
  const angle2 = angle + Math.PI / 7;
  const x3 = x2 - size * Math.cos(angle1);
  const y3 = y2 - size * Math.sin(angle1);
  const x4 = x2 - size * Math.cos(angle2);
  const y4 = y2 - size * Math.sin(angle2);
  return `${x2},${y2} ${x3},${y3} ${x4},${y4}`;
}