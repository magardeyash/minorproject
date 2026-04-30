import { SubmitIdeaForm } from "@/components/dashboard/SubmitIdeaForm"
import { CheckCircle, Lightbulb } from "lucide-react"

export const metadata = { title: "Submit Idea — VentureLens" }

export default function NewIdeaPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 w-full">
      {/* Intro & Progress Indicator */}
      <div className="space-y-8 text-center">
          <div className="space-y-4">
              <h2 className="clash text-4xl md:text-5xl font-semibold tracking-tight">Spark a New <span className="text-[#EAED87]">Venture.</span></h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">Feed our AI model your vision. We'll analyze the market, quantify the risk, and generate your Venture Score in seconds.</p>
          </div>
          
          <div className="flex items-center justify-center gap-4">
              <div className="bg-[#EAED87] text-[#213722] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Core Concept
              </div>
              <div className="w-8 h-px bg-white/10"></div>
              <div className="bg-white/5 text-white/40 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Market Fit</div>
              <div className="w-8 h-px bg-white/10"></div>
              <div className="bg-white/5 text-white/40 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Validation</div>
          </div>
      </div>

      {/* Idea Form */}
      <SubmitIdeaForm />

      {/* Footer Tip */}
      <div className="pb-20">
          <div className="bg-[#EAED87]/5 border border-[#EAED87]/10 p-6 rounded-3xl flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#EAED87]/10 flex-shrink-0 flex items-center justify-center">
                  <Lightbulb className="text-[#EAED87] w-6 h-6" />
              </div>
              <div className="space-y-1">
                  <h5 className="text-[#EAED87] font-semibold">Founder Tip</h5>
                  <p className="text-sm text-white/40 leading-relaxed">The more detailed your Problem Statement, the more accurate the Venture Score. AI analysis considers market saturation and current startup trends from the last 6 months.</p>
              </div>
          </div>
      </div>
    </div>
  )
}
