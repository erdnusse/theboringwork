"use client"

import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "pulse" | "orbit" | "wave" | "dots" | "ring"
  color?: string
  className?: string
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
}

export default function ModernSpinner({ size = "lg", variant = "ring", color = "#f3864d", className }: SpinnerProps) {
  const baseClasses = cn(sizeClasses[size], className)

  // Generate complementary colors
  const primaryColor = color
  const secondaryColor = adjustBrightness(color, 40)
  const tertiaryColor = adjustBrightness(color, -20)

  const spinnerVariants = {
    pulse: (
      <div className={cn(baseClasses, "relative")}>
        <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${primaryColor}40` }} />
        <div className="absolute inset-0 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
        <div
          className="absolute inset-2 rounded-full animate-ping animation-delay-200"
          style={{ backgroundColor: secondaryColor }}
        />
      </div>
    ),

    orbit: (
      <div className={cn(baseClasses, "relative")}>
        <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: primaryColor,
            borderRightColor: secondaryColor,
            animationDuration: "1s",
          }}
        />
        <div
          className="absolute inset-1 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderBottomColor: tertiaryColor,
            borderLeftColor: `${primaryColor}60`,
            animationDuration: "1.5s",
            animationDirection: "reverse",
          }}
        />
      </div>
    ),

    wave: (
      <div className={cn(baseClasses, "flex items-center justify-center space-x-1")}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1 rounded-full animate-wave"
            style={{
              backgroundColor: i % 2 === 0 ? primaryColor : secondaryColor,
              height: size === "sm" ? "16px" : size === "md" ? "20px" : size === "lg" ? "28px" : "36px",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    ),

    dots: (
      <div className={cn(baseClasses, "relative")}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bounce"
            style={{
              backgroundColor: [primaryColor, secondaryColor, tertiaryColor][i],
              width: size === "sm" ? "8px" : size === "md" ? "10px" : size === "lg" ? "14px" : "18px",
              height: size === "sm" ? "8px" : size === "md" ? "10px" : size === "lg" ? "14px" : "18px",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${i * 120}deg) translateY(-${size === "sm" ? "12px" : size === "md" ? "16px" : size === "lg" ? "24px" : "32px"})`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.2s",
            }}
          />
        ))}
      </div>
    ),

    ring: (
      <div className={cn(baseClasses, "relative")}>
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: `conic-gradient(from 0deg, ${primaryColor}, ${secondaryColor}, ${tertiaryColor}, ${primaryColor})`,
            animationDuration: "1s",
          }}
        />
        <div className="absolute inset-1 rounded-full" style={{ backgroundColor: "white" }} />
        <div className="absolute inset-2 rounded-full animate-pulse" style={{ backgroundColor: `${primaryColor}20` }} />
      </div>
    ),
  }

  return <div className="inline-block">{spinnerVariants[variant]}</div>
}

// Utility function to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  const num = Number.parseInt(hex.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

// Demo component to showcase all variants
export function SpinnerShowcase() {
  const variants: Array<SpinnerProps["variant"]> = ["pulse", "orbit", "wave", "dots", "ring"]
  const sizes: Array<SpinnerProps["size"]> = ["sm", "md", "lg", "xl"]

  return (
    <div className="p-8 space-y-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Modern Loading Spinners</h1>
        <p className="text-gray-600">Customizable spinners with #f3864d color scheme</p>
      </div>

      {/* Variants showcase */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-700">Spinner Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-sm">
              <ModernSpinner variant={variant} size="lg" />
              <span className="text-sm font-medium text-gray-600 capitalize">{variant}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes showcase */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-700">Size Options</h2>
        <div className="flex items-end justify-center space-x-8 p-8 bg-white rounded-xl shadow-sm">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center space-y-4">
              <ModernSpinner variant="orbit" size={size} />
              <span className="text-sm font-medium text-gray-600 uppercase">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom colors showcase */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-700">Custom Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["#f3864d", "#3b82f6", "#10b981", "#8b5cf6"].map((color) => (
            <div key={color} className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-sm">
              <ModernSpinner variant="ring" size="lg" color={color} />
              <span className="text-xs font-mono text-gray-500">{color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage examples */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-700">Usage Examples</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">Loading Button</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#f3864d] text-white rounded-lg hover:bg-[#e07940] transition-colors">
              <ModernSpinner variant="wave" size="sm" color="white" />
              <span>Loading...</span>
            </button>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">Card Loading</h3>
            <div className="border border-gray-200 rounded-lg p-8 flex flex-col items-center space-y-4">
              <ModernSpinner variant="pulse" size="lg" />
              <p className="text-gray-500">Loading content...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
