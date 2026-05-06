"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements are handled by layout, but we add hero-specific glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary uppercase tracking-widest animate-pulse-slow">
            <Zap className="w-3 h-3" />
            Venture Forge v2.0
          </div>

          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-display font-medium leading-[0.9] tracking-tight text-white">
            Forge the <br />
            <span className="italic text-primary">Future</span> of <br />
            Commerce.
          </h1>

          <p className="text-xl text-muted max-w-lg leading-relaxed font-sans">
            Deep-tier AI validation for high-stakes ventures. Get your <span className="text-white font-semibold">Venture Score</span> and competitive roadmap in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/register" className="btn-primary group">
              Initialize Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#how-it-works" className="btn-secondary">
              View Protocol
            </Link>
          </div>

          {/* Precision Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
            {[
              { label: "Validations", val: "12.4k", icon: ShieldCheck },
              { label: "Growth Rate", val: "142%", icon: TrendingUp },
              { label: "Efficiency", val: "99.8%", icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="flex items-center gap-2 text-muted uppercase text-[10px] tracking-widest font-mono">
                  <stat.icon className="w-3 h-3 text-primary" />
                  {stat.label}
                </div>
                <div className="text-2xl font-display font-medium text-white">{stat.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Technical Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
          
          <div className="relative glass-panel rounded-lg p-8 space-y-8 border-primary/20 shadow-2xl">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">System Analysis</div>
                <h3 className="text-2xl font-display text-white">Project: Aether-7</h3>
              </div>
              <div className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] font-mono text-primary">
                STABLE_V4
              </div>
            </div>

            {/* Score Ring */}
            <div className="flex justify-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r="88" className="stroke-white/5 fill-none" strokeWidth="4" />
                  <circle cx="96" cy="96" r="88" className="stroke-primary fill-none animate-[dash_2s_ease-out]" strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 88}
                    strokeDashoffset={2 * Math.PI * 88 * (1 - 0.94)}
                    strokeLinecap="round" />
                </svg>
                <div className="text-center space-y-0">
                  <div className="text-6xl font-display font-medium text-white">94</div>
                  <div className="text-[10px] font-mono text-muted uppercase tracking-widest">Score</div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Market Fit", val: 98 },
                { label: "Scalability", val: 86 },
                { label: "Innovation", val: 92 },
                { label: "Risk Factor", val: 12 },
              ].map((m) => (
                <div key={m.label} className="space-y-2 p-3 rounded bg-white/5 border border-white/5">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-tighter">
                    <span className="text-muted">{m.label}</span>
                    <span className={m.label === "Risk Factor" ? "text-error" : "text-primary"}>{m.val}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${m.label === "Risk Factor" ? "bg-error" : "bg-primary"}`} style={{ width: `${m.val}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-mono text-muted text-center pt-4 border-t border-white/5">
              ANALYSIS COMPLETE // REDIRECTING TO FORGE
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          from { stroke-dashoffset: ${2 * Math.PI * 88}; }
          to { stroke-dashoffset: ${2 * Math.PI * 88 * (1 - 0.94)}; }
        }
      `}</style>
    </section>
  )
}
