import { Lightbulb, Brain, BarChart3, Users } from "lucide-react"

const steps = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Input Phase",
    description: "Submit your startup concept — product, market, and problem statement to our AI ingestion engine.",
  },
  {
    icon: Brain,
    step: "02",
    title: "Synthesis Phase",
    description: "Our neural networks evaluate market dynamics, competition, and feasibility in sub-second cycles.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Score Generation",
    description: "Receive a 0–100 Venture Score with multidimensional breakdowns and risk vectors.",
  },
  {
    icon: Users,
    step: "04",
    title: "Match Protocol",
    description: "Activate contributor matching to connect with validated founders, developers, and designers.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block text-[10px] font-mono font-bold px-3 py-1 rounded border border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.2em]">
            The Protocol
          </div>
          <h2 className="text-5xl lg:text-6xl font-display text-white">
            From Concept to <br className="hidden sm:block" /> 
            <span className="italic text-primary">Validation</span> in Four Steps.
          </h2>
          <p className="text-muted max-w-xl mx-auto text-lg">
            A high-precision workflow powered by advanced neural analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-white/5 -z-10" />

          {steps.map((s) => (
            <div key={s.step} className="group space-y-8 relative">
              {/* Step Index */}
              <div className="flex flex-col items-center lg:items-start space-y-4">
                <div className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-primary group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-500 z-10">
                  {s.step}
                </div>
                
                <div className="w-px h-12 bg-white/5 lg:hidden" />
              </div>

              <div className="space-y-4 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                    <s.icon className="w-6 h-6 text-muted group-hover:text-primary transition-colors" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-display text-white">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed font-sans">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
