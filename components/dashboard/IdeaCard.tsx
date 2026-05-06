"use client"

import React from "react"
import { DbIdea } from "@/lib/db/ideas"
import { StatusBadge } from "./StatusBadge"
import { Building2, Activity, Zap, Target } from "lucide-react"

interface IdeaCardProps {
  idea: DbIdea
  actions?: React.ReactNode
}

export function IdeaCard({ idea, actions }: IdeaCardProps) {
  return (
    <div className="card-forge flex flex-col h-full group">
      <div className="flex justify-between items-start mb-6">
        <StatusBadge status={idea.status} />
        {idea.venture_score !== null && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono font-bold tracking-widest uppercase">
            <Zap className="w-3 h-3" />
            Venture_{idea.venture_score}
          </div>
        )}
      </div>

      <div className="space-y-2 mb-6 flex-1">
        <h3 className="text-2xl font-display text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">{idea.title}</h3>
        <p className="text-sm text-muted line-clamp-3 leading-relaxed">
          {idea.description}
        </p>
      </div>

      <div className="space-y-4 mt-auto">
        <div className="flex flex-wrap gap-3">
          {idea.industry && (
            <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-muted border border-white/5 px-2 py-1 rounded">
              <Building2 className="w-3 h-3 text-primary/50" />
              {idea.industry}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-muted border border-white/5 px-2 py-1 rounded">
            <Target className="w-3 h-3 text-primary/50" />
            {idea.stage}
          </div>
        </div>

        {actions && (
          <div className="pt-6 border-t border-white/5 flex gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
