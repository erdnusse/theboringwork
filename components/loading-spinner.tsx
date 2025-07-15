import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string; // Accepts any valid CSS color
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  color = "#f3864d",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const dotSize = size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4";
  const glowSize = size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8";

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer smooth spinning ring */}
      <span
        className={cn(
          "absolute rounded-full border-4 border-transparent animate-spin-smooth",
          sizeClasses[size]
        )}
        style={{
          borderTopColor: color,
          borderRightColor: color + "80", // 50% opacity for a modern effect
        }}
      />
      {/* Inner pulsing dot */}
      <span
        className={cn(
          "rounded-full animate-pulse-scale",
          dotSize
        )}
        style={{
          backgroundColor: color,
        }}
      />
      {/* Glow effect */}
      <span
        className={cn(
          "absolute rounded-full blur-sm animate-pulse-scale",
          glowSize
        )}
        style={{
          backgroundColor: color,
          opacity: 0.3,
        }}
      />
      <style jsx global>{`
        @keyframes spin-smooth {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-spin-smooth {
          animation: spin-smooth 1s linear infinite;
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1);}
          50% { transform: scale(1.25);}
        }
        .animate-pulse-scale {
          animation: pulse-scale 1.2s cubic-bezier(0.4,0,0.2,1) infinite;
        }
      `}</style>
    </div>
  );
}