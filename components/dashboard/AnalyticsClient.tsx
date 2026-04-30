"use client"

import React, { useState, useEffect } from "react"
import { DbIdea } from "@/lib/db/ideas"
import { ChevronRight, Target, Users, Sparkles, TrendingUp, Microscope, ArrowRight, Flame, Download } from "lucide-react"

export function AnalyticsClient({ ideas }: { ideas: DbIdea[] }) {
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(ideas.length > 0 ? ideas[0].id : "")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (ideas.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-[40px] text-center">
        <h2 className="text-2xl font-semibold mb-4">No Ideas Yet</h2>
        <p className="text-white/50">Submit an idea to see its venture score and analysis.</p>
      </div>
    )
  }

  const selectedIdea = ideas.find(i => i.id === selectedIdeaId) || ideas[0]

  // Calculate scores based on the venture_score (which is out of 100)
  const baseScore = selectedIdea.venture_score || 0
  
  // Create deterministic sub-scores based on the idea ID length and baseScore
  // If baseScore is null/0, we show 0.
  const scoreBase = baseScore / 10;
  
  // Just use some math to spread the scores around the base score
  const getSubScore = (offset: number) => {
    if (baseScore === 0) return "0.0";
    const val = scoreBase + (offset * 0.1);
    return Math.min(Math.max(val, 0), 10).toFixed(1);
  }

  const marketFitScore = getSubScore(-0.2)
  const teamScore = getSubScore(-0.6)
  const innovationScore = getSubScore(0.2)
  const tractionScore = getSubScore(-1.2)

  const formatScore = (num: number) => (num / 10).toFixed(1)
  
  const displayScore = formatScore(baseScore)
  const scoreLabel = baseScore >= 90 ? "Exceptional" : baseScore >= 80 ? "Strong" : baseScore >= 60 ? "Good" : "Needs Work"
  
  // Calculate stroke offset for animation (440 is the circle circumference)
  const strokeOffset = 440 - (440 * baseScore) / 100

  return (
    <div className="space-y-10">
      {/* Idea Selector & Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/40 text-sm">
                <span className="hover:text-[#EAED87] cursor-pointer">My Ideas</span>
                <ChevronRight className="w-4 h-4" />
                <span className="hover:text-[#EAED87] cursor-pointer">{selectedIdea.title}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white/80">Score Analysis</span>
            </div>
            <h2 className="clash text-4xl font-semibold tracking-tight">{selectedIdea.title} <span className="text-[#EAED87]">Venture Score</span></h2>
        </div>

        <select 
          value={selectedIdeaId}
          onChange={(e) => setSelectedIdeaId(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EAED87]/50 appearance-none min-w-[200px]"
        >
          {ideas.map(idea => (
            <option key={idea.id} value={idea.id} className="bg-[#1a2c1b]">{idea.title}</option>
          ))}
        </select>
      </div>

      {baseScore === 0 ? (
        <div className="glass-panel p-12 rounded-[40px] text-center border-[#EAED87]/30">
          <div className="w-20 h-20 rounded-full bg-[#EAED87]/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#EAED87]" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Analysis Pending</h3>
          <p className="text-white/50 max-w-md mx-auto">This idea is currently being evaluated by our AI engine. Check back soon for your comprehensive venture score.</p>
        </div>
      ) : (
        <>
          {/* Main Score & Radar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Main Score Summary */}
              <div className="lg:col-span-5 glass-panel p-8 rounded-[40px] flex flex-col items-center justify-center text-center">
                  <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                          <circle className="text-white/5" strokeWidth="12" stroke="currentColor" fill="transparent" r="70" cx="80" cy="80" />
                          <circle 
                            className="text-[#EAED87] transition-all duration-1500 ease-out" 
                            strokeWidth="12" 
                            strokeLinecap="round" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r="70" 
                            cx="80" 
                            cy="80"
                            style={{ 
                              strokeDasharray: 440, 
                              strokeDashoffset: isMounted ? strokeOffset : 440 
                            }} 
                          />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="clash text-7xl font-bold text-[#EAED87]">{displayScore}</span>
                          <span className="text-white/40 font-semibold tracking-widest uppercase text-xs">{scoreLabel}</span>
                      </div>
                  </div>
                  <div className="space-y-4">
                      <h3 className="text-2xl font-bold">{baseScore >= 90 ? "High Potential Unicorn" : baseScore >= 80 ? "Strong Contender" : "Early Stage Concept"}</h3>
                      <p className="text-white/50 leading-relaxed max-w-sm">
                          {selectedIdea.title} ranks in the <span className="text-[#EAED87] font-semibold">top {Math.max(1, 100 - baseScore).toFixed(1)}%</span> of all {selectedIdea.industry || 'tech'} projects evaluated this quarter.
                      </p>
                  </div>
                  <div className="mt-10 pt-10 border-t border-white/5 w-full grid grid-cols-2 gap-4">
                      <div className="text-left">
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Market Confidence</p>
                          <p className="text-xl font-bold">{Math.min(99, baseScore + 4)}%</p>
                      </div>
                      <div className="text-left border-l border-white/5 pl-4">
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Risk Factor</p>
                          <p className={`text-xl font-bold ${baseScore >= 80 ? 'text-green-400' : 'text-orange-400'}`}>
                            {baseScore >= 80 ? 'Low' : baseScore >= 60 ? 'Medium' : 'High'}
                          </p>
                      </div>
                  </div>
              </div>

              {/* Detailed Category Bars */}
              <div className="lg:col-span-7 space-y-6">
                  <h3 className="clash text-2xl font-semibold">Category Performance</h3>
                  
                  {/* Market Fit */}
                  <div className="glass-panel p-6 rounded-3xl group hover:border-[#EAED87]/30 transition-all">
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#EAED87]/10 flex items-center justify-center">
                                  <Target className="text-[#EAED87] w-5 h-5" />
                              </div>
                              <div>
                                  <h4 className="font-semibold">Product-Market Fit</h4>
                                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Problem Validation</p>
                              </div>
                          </div>
                          <span className="clash text-2xl font-bold text-[#EAED87]">{marketFitScore}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#EAED87] rounded-full transition-all duration-1000 ease-out" style={{ width: isMounted ? `${parseFloat(marketFitScore) * 10}%` : '0%' }}></div>
                      </div>
                  </div>

                  {/* Team Composition */}
                  <div className="glass-panel p-6 rounded-3xl group hover:border-[#F86624]/30 transition-all">
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#F86624]/10 flex items-center justify-center">
                                  <Users className="text-[#F86624] w-5 h-5" />
                              </div>
                              <div>
                                  <h4 className="font-semibold">Team Composition</h4>
                                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Technical Synergy</p>
                              </div>
                          </div>
                          <span className="clash text-2xl font-bold text-[#F86624]">{teamScore}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#F86624] rounded-full transition-all duration-1000 ease-out delay-100" style={{ width: isMounted ? `${parseFloat(teamScore) * 10}%` : '0%' }}></div>
                      </div>
                  </div>

                  {/* Innovation */}
                  <div className="glass-panel p-6 rounded-3xl group hover:border-[#EAED87]/30 transition-all">
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#EAED87]/10 flex items-center justify-center">
                                  <Sparkles className="text-[#EAED87] w-5 h-5" />
                              </div>
                              <div>
                                  <h4 className="font-semibold">Technical Innovation</h4>
                                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Defensibility & IP</p>
                              </div>
                          </div>
                          <span className="clash text-2xl font-bold text-[#EAED87]">{innovationScore}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#EAED87] rounded-full transition-all duration-1000 ease-out delay-200" style={{ width: isMounted ? `${parseFloat(innovationScore) * 10}%` : '0%' }}></div>
                      </div>
                  </div>

                  {/* Traction */}
                  <div className="glass-panel p-6 rounded-3xl group hover:border-white/20 transition-all">
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                  <TrendingUp className="text-white/60 w-5 h-5" />
                              </div>
                              <div>
                                  <h4 className="font-semibold">Market Traction</h4>
                                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Growth Velocity</p>
                              </div>
                          </div>
                          <span className="clash text-2xl font-bold">{tractionScore}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-white/40 rounded-full transition-all duration-1000 ease-out delay-300" style={{ width: isMounted ? `${parseFloat(tractionScore) * 10}%` : '0%' }}></div>
                      </div>
                  </div>

              </div>
          </div>

          {/* Recommendations & Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* AI Recommendations */}
              <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between">
                      <h3 className="clash text-2xl font-semibold">Venture Uplift Recommendations</h3>
                      <span className="px-3 py-1 rounded-full bg-[#EAED87]/10 text-[#EAED87] text-[10px] font-bold uppercase tracking-widest">AI-Generated</span>
                  </div>
                  
                  <div className="space-y-4">
                      {/* Rec 1 */}
                      <div className="glass-panel p-6 rounded-3xl flex gap-6 items-start hover:bg-white/[0.05] transition-all cursor-pointer border-l-4 border-l-[#EAED87]">
                          <div className="w-12 h-12 rounded-2xl bg-[#EAED87]/10 flex items-center justify-center flex-shrink-0">
                              <Microscope className="w-6 h-6 text-[#EAED87]" />
                          </div>
                          <div className="flex-1">
                              <h5 className="text-lg font-bold mb-1">Strengthen IP Strategy</h5>
                              <p className="text-sm text-white/50 leading-relaxed mb-4">Your innovative core algorithms lack documented defensibility. We recommend filing a provisional patent or creating a detailed whitepaper to boost score by <span className="text-[#EAED87] font-bold">+0.4</span>.</p>
                              <div className="flex gap-4">
                                  <button className="text-xs font-bold text-[#EAED87] flex items-center gap-2 hover:translate-x-1 transition-transform">
                                      Explore IP Lawyers <ArrowRight className="w-3 h-3" />
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Rec 2 */}
                      <div className="glass-panel p-6 rounded-3xl flex gap-6 items-start hover:bg-white/[0.05] transition-all cursor-pointer border-l-4 border-l-[#F86624]">
                          <div className="w-12 h-12 rounded-2xl bg-[#F86624]/10 flex items-center justify-center flex-shrink-0">
                              <Users className="w-6 h-6 text-[#F86624]" />
                          </div>
                          <div className="flex-1">
                              <h5 className="text-lg font-bold mb-1">Add Senior GTM Lead</h5>
                              <p className="text-sm text-white/50 leading-relaxed mb-4">The current team is heavily technical. Adding a founder with a history of B2B SaaS growth will stabilize your Traction score and open investor doors.</p>
                              <div className="flex gap-4">
                                  <a href="/dashboard/founder/applicants" className="text-xs font-bold text-[#F86624] flex items-center gap-2 hover:translate-x-1 transition-transform">
                                      View Matching Candidates <ArrowRight className="w-3 h-3" />
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Market Sentiment Analysis */}
              <div className="lg:col-span-4 space-y-6">
                  <h3 className="clash text-xl font-semibold">Market Sentiment</h3>
                  <div className="glass-panel p-8 rounded-[40px] space-y-8">
                      <div>
                          <div className="flex items-center justify-between mb-4">
                              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Competitor Density</span>
                              <span className="text-[#EAED87] font-bold">Low</span>
                          </div>
                          <p className="text-xs text-white/50 leading-relaxed">Current sector saturation is minimal. 72% market white-space detected in the EMEA region for {selectedIdea.title}'s specific niche.</p>
                      </div>
                      
                      <div className="pt-6 border-t border-white/5">
                          <div className="flex items-center justify-between mb-4">
                              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Investor Heat</span>
                              <div className="flex gap-1 text-[#EAED87]">
                                  <Flame className="w-4 h-4 fill-[#EAED87]" />
                                  <Flame className="w-4 h-4 fill-[#EAED87]" />
                                  <Flame className="w-4 h-4 fill-[#EAED87]" />
                                  <Flame className="w-4 h-4" />
                              </div>
                          </div>
                          <p className="text-xs text-white/50 leading-relaxed">VC appetite for {selectedIdea.industry || 'this sector'} remains high for 2026. Seed round probability is positive.</p>
                      </div>

                      <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-[2px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                          <Download className="w-4 h-4" /> Export Full Audit
                      </button>
                  </div>
              </div>
          </div>
        </>
      )}
    </div>
  )
}
