"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconOnly?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, iconOnly = false, size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-2xl" },
    lg: { icon: 48, text: "text-4xl" },
  }

  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className="relative flex items-center justify-center">
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* SVG Lens Icon */}
        <svg 
          width={sizeMap[size].icon} 
          height={sizeMap[size].icon} 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Outer ring */}
          <circle cx="20" cy="20" r="18" className="stroke-white/10 group-hover:stroke-primary/30 transition-colors duration-500" strokeWidth="1" />
          
          {/* Inner aperture/lens */}
          <circle cx="20" cy="20" r="12" className="stroke-primary" strokeWidth="2" strokeDasharray="4 4" />
          <path 
            d="M20 8V12M20 28V32M8 20H12M28 20H32" 
            className="stroke-primary/50 group-hover:stroke-primary transition-colors" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
          
          {/* Center focal point */}
          <circle cx="20" cy="20" r="3" className="fill-primary animate-pulse" />
          
          {/* Diagonal shutter lines */}
          <path d="M14 14L16 16M24 24L26 26M14 26L16 24M24 14L26 16" className="stroke-white/20" strokeWidth="1" />
        </svg>
      </div>

      {!iconOnly && (
        <span className={cn("font-display tracking-tight text-white", sizeMap[size].text)}>
          Venture<span className="text-primary italic">Lens</span>
        </span>
      )}
    </div>
  )
}
