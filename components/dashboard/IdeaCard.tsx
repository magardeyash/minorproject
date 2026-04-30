"use client"

import React from "react"
import { DbIdea } from "@/lib/db/ideas"
import { StatusBadge } from "./StatusBadge"
import { Building2, Activity, Zap, BrainCircuit, Box, Loader2, ChevronRight } from "lucide-react"
import Link from "next/link"

interface IdeaCardProps {
  idea: DbIdea
  actions?: React.ReactNode
}

export function IdeaCard({ idea, actions }: IdeaCardProps) {
  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <StatusBadge status={idea.status} />
        {idea.venture_score !== null && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-xs font-bold">
            <Zap className="w-3 h-3 fill-accent-yellow" />
            {idea.venture_score}/100
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{idea.title}</h3>
      <p className="text-sm text-accent-muted mb-6 flex-1 line-clamp-3">
        {idea.description}
      </p>

      <div className="space-y-4 mt-auto">
        <div className="flex flex-wrap gap-2">
          {idea.industry && (
            <span className="flex items-center gap-1.5 text-xs text-accent-muted bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
              <Building2 className="w-3 h-3" />
              {idea.industry}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-accent-muted bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            <Activity className="w-3 h-3" />
            <span className="capitalize">{idea.stage}</span>
          </span>
        </div>

        {actions && (
          <div className="pt-4 border-t border-white/5">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export function HorizontalIdeaCard({ idea, applicantCount = 0 }: { idea: DbIdea, applicantCount?: number }) {
  const isPending = idea.status === 'pending';

  return (
    <div className="glass-panel p-6 rounded-3xl flex items-center gap-8 group hover:bg-white/[0.05] transition-all cursor-pointer">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 flex items-center justify-center flex-shrink-0 border border-white/5">
        {idea.industry?.toLowerCase().includes('ai') || idea.industry?.toLowerCase().includes('tech') ? (
          <BrainCircuit className="w-8 h-8 text-[#EAED87]" />
        ) : (
          <Box className={`w-8 h-8 ${isPending ? 'text-[#F86624]' : 'text-[#EAED87]'}`} />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="text-lg font-semibold text-white">{idea.title}</h4>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isPending ? 'bg-[#F86624]/10 text-[#F86624]' : 'bg-green-500/10 text-green-400'
            }`}>
            {idea.status}
          </span>
        </div>
        <p className="text-sm text-white/40 line-clamp-1">{idea.description}</p>
      </div>

      <div className="hidden md:flex flex-col items-end gap-1">
        <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Venture Score</p>
        <div className="flex items-end gap-2">
          {isPending ? (
            <Loader2 className="animate-spin text-white/20 w-6 h-6 mb-1" />
          ) : (
            <>
              <span className="clash text-2xl font-bold text-[#EAED87]">{idea.venture_score ?? 'N/A'}</span>
              <span className="text-[10px] text-white/20 mb-1">/100</span>
            </>
          )}
        </div>
      </div>

      <div className="w-px h-10 bg-white/5 hidden md:block"></div>

      <div className="flex items-center gap-4">
        {applicantCount > 0 && (
          <div className="flex -space-x-3">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${idea.id}1`} className="w-8 h-8 rounded-full border-2 border-[#1a2c1b] bg-white/10" alt="Applicant" />
            {applicantCount > 1 && (
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${idea.id}2`} className="w-8 h-8 rounded-full border-2 border-[#1a2c1b] bg-white/10" alt="Applicant" />
            )}
            {applicantCount > 2 && (
              <div className="w-8 h-8 rounded-full border-2 border-[#1a2c1b] bg-white/5 flex items-center justify-center text-[10px] font-bold text-white">
                +{applicantCount - 2}
              </div>
            )}
          </div>
        )}
        <Link href={`/dashboard/founder/ideas`} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#EAED87]/10 hover:text-[#EAED87] transition-all flex items-center justify-center text-white/50">
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
