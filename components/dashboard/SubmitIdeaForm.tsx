"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { submitIdeaAction } from "@/actions/ideas"
import { Flame, Target, BrainCircuit, Plus, Sparkles, Loader2 } from "lucide-react"

export function SubmitIdeaForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    
    const target = e.currentTarget
    const title = (target.elements.namedItem("title") as HTMLInputElement).value
    const pitch = (target.elements.namedItem("pitch") as HTMLTextAreaElement).value
    const problem = (target.elements.namedItem("problem") as HTMLTextAreaElement).value
    const market = (target.elements.namedItem("market") as HTMLTextAreaElement).value
    const advantage = (target.elements.namedItem("advantage") as HTMLInputElement).value
    const q1 = (target.elements.namedItem("q1") as HTMLInputElement).value

    // Combine all fields into the description for the backend model
    const description = `Elevator Pitch:\n${pitch}\n\nProblem Statement:\n${problem}\n\nTarget Market:\n${market}\n\nCompetitive Advantage:\n${advantage}\n\nValidation Questions:\n${q1}`

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("industry", "Technology") // Default for now
    formData.append("stage", "idea")

    startTransition(async () => {
      const res = await submitIdeaAction(formData)
      if (res?.error) {
        setError(res.error)
      } else {
        router.push("/dashboard/founder/ideas")
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section 1: Core Identity */}
        <div className="glass-panel p-8 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#EAED87]/10 flex items-center justify-center">
                    <Flame className="text-[#EAED87] w-5 h-5" />
                </div>
                <h3 className="clash text-xl font-semibold">The Core Concept</h3>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Idea Title</label>
                <input required name="title" type="text" placeholder="e.g., NeuralFlow AI Workflow Orchestrator" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#EAED87] transition-all" />
                <p className="text-[10px] text-white/30 ml-1">Choose a punchy, descriptive name for your incubation project.</p>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Elevator Pitch</label>
                <textarea required name="pitch" rows={4} placeholder="How would you explain this to an investor in 30 seconds?" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#EAED87] transition-all"></textarea>
                <p className="text-[10px] text-white/30 ml-1">Focus on the value proposition and unique selling point.</p>
            </div>
        </div>

        {/* Section 2: Market Logic */}
        <div className="glass-panel p-8 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#F86624]/10 flex items-center justify-center">
                    <Target className="text-[#F86624] w-5 h-5" />
                </div>
                <h3 className="clash text-xl font-semibold">Market & Problem</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Problem Statement</label>
                    <textarea required name="problem" rows={3} placeholder="What gap or pain point are you solving?" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#EAED87] transition-all"></textarea>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Target Market</label>
                    <textarea required name="market" rows={3} placeholder="Who are your ideal first 100 customers?" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#EAED87] transition-all"></textarea>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Competitive Advantage</label>
                <input required name="advantage" type="text" placeholder="What prevents others from copying you?" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#EAED87] transition-all" />
            </div>
        </div>

        {/* Section 3: AI Intelligence */}
        <div className="glass-panel p-8 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <BrainCircuit className="text-white/60 w-5 h-5" />
                </div>
                <h3 className="clash text-xl font-semibold">Validation Questions</h3>
            </div>
            
            <p className="text-sm text-white/40">Provide specific questions you want the AI to analyze for this venture.</p>

            <div className="space-y-4">
                <div className="flex gap-3">
                    <input name="q1" type="text" placeholder="e.g., Is the TAM large enough for a VC exit?" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#EAED87] transition-all" />
                    <button type="button" className="w-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Plus className="w-5 h-5 text-white/60" />
                    </button>
                </div>
            </div>
        </div>

        {error && (
            <div className="text-error text-sm bg-error/10 border border-error/20 px-4 py-3 rounded-xl">
                {error}
            </div>
        )}

        {/* Action Area */}
        <div className="flex flex-col items-center gap-4 py-6">
            <button disabled={isPending} type="submit" className="btn-contrast w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-2xl relative overflow-hidden disabled:opacity-70 transition-all">
                {isPending ? (
                  <span className="flex items-center gap-3">
                    <Loader2 className="animate-spin w-5 h-5" /> Generating Score...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" /> Validate with VentureLens AI
                  </span>
                )}
            </button>
            <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-medium">Validation uses 1 venture credit</p>
        </div>
    </form>
  )
}
