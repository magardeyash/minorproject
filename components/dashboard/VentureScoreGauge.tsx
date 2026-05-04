"use client"

import React from "react"

interface VentureScoreGaugeProps {
  score: number // 0-100
  size?: number
}

function scoreColor(score: number): string {
  if (score >= 70) return "#10B981" // Emerald
  if (score >= 50) return "#34D399" // Mint
  return "#EF4444" // Red/Error
}

function scoreLabel(score: number): string {
  if (score >= 80) return "Exceptional"
  if (score >= 70) return "Strong"
  if (score >= 60) return "Promising"
  if (score >= 50) return "Moderate"
  if (score >= 35) return "Needs Work"
  return "Early Stage"
}

function r(n: number) {
  return Math.round(n * 1e4) / 1e4
}

export function VentureScoreGauge({ score, size = 220 }: VentureScoreGaugeProps) {
  const clampedScore = Math.max(0, Math.min(100, score))
  const color = scoreColor(clampedScore)
  const label = scoreLabel(clampedScore)

  const cx = size / 2
  const cy = size / 2 // FIX: removed +16 shift
  const radius = (size / 2) * 0.75
  const strokeWidth = size * 0.08

  const startAngle = 210
  const sweepAngle = 240
  const endAngle = startAngle + sweepAngle * (clampedScore / 100)

  function polarToCartesian(angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180
    return {
      x: r(cx + radius * Math.cos(rad)),
      y: r(cy + radius * Math.sin(rad)),
    }
  }

  function arcPath(startDeg: number, endDeg: number) {
    const start = polarToCartesian(startDeg)
    const end = polarToCartesian(endDeg)
    const largeArc = (endDeg - startDeg) > 180 ? 1 : 0
    return `M ${start.x} ${start.y} A ${r(radius)} ${r(radius)} 0 ${largeArc} 1 ${end.x} ${end.y}`
  }

  const trackPath = arcPath(startAngle, startAngle + sweepAngle)
  const fillPath = clampedScore > 0 ? arcPath(startAngle, endAngle) : ""

  // FIX: increase SVG height so arc doesn't clip or overlap text
  const svgHeight = size * 0.9

  // FIX: reposition text safely inside arc
  const scoreY = cy - radius * 0.05
  const subY = scoreY + size * 0.14

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        {/* Glow background */}
        <div 
          className="absolute inset-0 blur-[40px] opacity-20 transition-opacity duration-500 group-hover:opacity-30"
          style={{ backgroundColor: color }}
        />

        <svg
          width={size}
          height={svgHeight}
          viewBox={`0 0 ${size} ${svgHeight}`}
          className="overflow-visible relative z-10"
        >
          {/* Track */}
          <path
            d={trackPath}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={r(strokeWidth)}
            strokeLinecap="round"
          />

          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = startAngle + sweepAngle * (tick / 100)
            const rad = ((angle - 90) * Math.PI) / 180
            const inner = radius - strokeWidth * 0.8
            const outer = radius + strokeWidth * 0.2
            return (
              <line
                key={tick}
                x1={r(cx + inner * Math.cos(rad))}
                y1={r(cy + inner * Math.sin(rad))}
                x2={r(cx + outer * Math.cos(rad))}
                y2={r(cy + outer * Math.sin(rad))}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={2}
                strokeLinecap="round"
              />
            )
          })}

          {/* Fill arc */}
          {fillPath && (
            <>
              {/* Outer glow arc */}
              <path
                d={fillPath}
                fill="none"
                stroke={color}
                strokeWidth={r(strokeWidth * 1.5)}
                strokeLinecap="round"
                className="opacity-20 blur-sm"
              />
              {/* Main arc */}
              <path
                d={fillPath}
                fill="none"
                stroke={color}
                strokeWidth={r(strokeWidth)}
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 ${r(strokeWidth * 0.6)}px ${color})`,
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            </>
          )}

          {/* Score */}
          <text
            x={cx}
            y={scoreY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size * 0.22}
            className="font-black tracking-tighter"
            fill="white"
            style={{ filter: `drop-shadow(0 0 12px ${color}40)` }}
          >
            {clampedScore}
          </text>

          {/* /100 */}
          <text
            x={cx}
            y={subY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size * 0.07}
            className="font-bold opacity-40"
            fill="white"
          >
            SCORE
          </text>
        </svg>
      </div>

      <div className="text-center animate-fade-in-up">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color }}>
            {label}
          </span>
        </div>
        <div className="text-[10px] font-bold text-white/30 mt-2 uppercase tracking-widest">
          AI Venture Analysis
        </div>
      </div>
    </div>
  )
  }