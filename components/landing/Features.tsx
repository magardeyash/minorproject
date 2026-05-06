import { Sparkles, BarChart3, Users, Shield, Zap, Target } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Synthesis Engine",
    description:
      "Proprietary models evaluate market size, competition, and feasibility vectors — returning structured insights in under 30 seconds.",
    tags: ["CORE_PROTOCOL", "LENS_V4"],
  },
  {
    icon: BarChart3,
    title: "Venture Score™",
    description:
      "A high-precision 0–100 viability score backed by 4-dimensional benchmarking against 10k+ validated data points.",
    tags: ["DATA_DRIVEN", "SCORE_ENGINE"],
  },
  {
    icon: Users,
    title: "Contributor Forge",
    description:
      "Automated matching with co-founders, engineers, and designers based on tech stack, domain, and stage.",
    tags: ["NETWORK_MATCH", "TEAM_SYNC"],
  },
  {
    icon: Shield,
    title: "Risk Vector Map",
    description:
      "Identify regulatory, market timing, and execution risks before they manifest. Mitigation roadmap included.",
    tags: ["RISK_MITIGATION", "SECURITY"],
  },
  {
    icon: Zap,
    title: "Zero-Latency Input",
    description:
      "Submit and iterate in real-time. Watch your score evolve as you refine your concept through our forge.",
    tags: ["INSTANT_ITERATION", "FAST_TRACK"],
  },
  {
    icon: Target,
    title: "Market Resonance",
    description:
      "Understand how well your idea resonates with target demographics using signals from public startup trend databases.",
    tags: ["PMF_ANALYSIS", "MARKET_FIT"],
  },
]

export function Features() {
  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block text-[10px] font-mono font-bold px-3 py-1 rounded border border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.2em]">
            Capabilities
          </div>
          <h2 className="text-5xl lg:text-6xl font-display text-white">
            Precision Tools for <br className="hidden sm:block" /> 
            <span className="italic text-primary">High-Stakes</span> Ventures.
          </h2>
          <p className="text-muted max-w-xl mx-auto text-lg">
            Every instrument you need to transform a concept into a validated protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="card-forge group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500 mb-6">
                <f.icon className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-xl text-white">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-6">
                {f.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono bg-white/5 border border-white/10 rounded px-2 py-1 text-primary/70 tracking-tighter">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
