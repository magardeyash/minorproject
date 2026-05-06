import { auth } from "@/auth"
import { getPublicIdeas } from "@/lib/db/ideas"
import { getRolesByIdea } from "@/lib/db/roles"
import { getApplicationsByEmployee } from "@/lib/db/applications"
import { Briefcase, Zap, Users, ChevronRight, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { DbRole } from "@/lib/db/roles"
import Link from "next/link"

export const metadata = { title: "Browse Ideas — VentureLens" }

const CATEGORY_COLORS: Record<string, string> = {
  Tech:      "bg-blue-500/10 text-blue-300 border-blue-400/20",
  Marketing: "bg-orange-500/10 text-orange-300 border-orange-400/20",
  Product:   "bg-purple-500/10 text-purple-300 border-purple-400/20",
  Ops:       "bg-yellow-500/10 text-yellow-300 border-yellow-400/20",
  Design:    "bg-pink-500/10 text-pink-300 border-pink-400/20",
  Finance:   "bg-green-500/10 text-green-300 border-green-400/20",
  Sales:     "bg-cyan-500/10 text-cyan-300 border-cyan-400/20",
}

const EXP_LABELS: Record<string, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead / Head",
}

export default async function BrowseIdeasPage() {
  const session = await auth()
  const ideas = await getPublicIdeas()
  const userApps = await getApplicationsByEmployee(session!.user.id)
  
  const appliedRoleIds = new Set(userApps.map(a => a.role_requirement_id).filter(Boolean))
  const ideasWithGeneralApp = new Set(userApps.filter(a => !a.role_requirement_id).map(a => a.idea_id))

  const ideasWithRoles = await Promise.all(
    ideas.map(async idea => {
      const allRoles = await getRolesByIdea(idea.id).catch(() => [] as DbRole[])
      return {
        ...idea,
        roles: allRoles,
        hasGeneralApp: ideasWithGeneralApp.has(idea.id)
      }
    })
  )

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-display text-white">Browse <span className="text-primary italic">Opportunities</span></h1>
        <p className="text-sm font-mono text-muted uppercase tracking-[0.2em]">
          Forge your future in high-stakes ventures.
        </p>
      </div>

      {ideasWithRoles.length === 0 ? (
        <div className="card-forge p-16 text-center border-dashed">
          <p className="text-muted font-mono uppercase tracking-widest text-sm">Zero_Ideas_Detected</p>
        </div>
      ) : (
        <div className="space-y-12">
          {ideasWithRoles.map(idea => {
            const openRoles = idea.roles.filter(r => !appliedRoleIds.has(r.id))
            const appliedRolesInThisIdea = idea.roles.filter(r => appliedRoleIds.has(r.id))
            const isHighVenture = (idea.venture_score || 0) >= 85

            return (
              <div key={idea.id} className={`card-forge !p-0 border-white/5 transition-all duration-500 overflow-hidden ${isHighVenture ? 'ring-1 ring-primary/20 shadow-[0_0_50px_rgba(16,185,129,0.05)]' : ''}`}>
                {/* Header Section */}
                <div className="p-8 lg:p-10 border-b border-white/5 relative">
                  {isHighVenture && (
                    <div className="absolute top-0 right-0 p-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded font-mono text-[9px] text-primary uppercase tracking-widest animate-pulse">
                        <Zap className="w-3 h-3" /> High_Viability_Core
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                      <div className="flex items-center gap-3">
                        {idea.venture_score !== null && (
                          <div className="text-4xl font-display text-primary flex items-baseline gap-1">
                            {idea.venture_score}<span className="text-sm font-mono text-muted">/100</span>
                          </div>
                        )}
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest">{idea.industry}</span>
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest italic">{idea.stage}</span>
                      </div>
                      
                      <h2 className="text-3xl lg:text-4xl font-display text-white group-hover:text-primary transition-colors">{idea.title}</h2>
                      <p className="text-muted text-sm leading-relaxed max-w-xl">{idea.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full bg-card border border-white/10 flex items-center justify-center">
                            <Users className="w-3 h-3 text-muted" />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-mono text-primary">
                          +{idea.roles.length}
                        </div>
                      </div>
                      
                      {idea.roles.length === 0 && !idea.hasGeneralApp && (
                        <Link 
                          href={`/dashboard/employee/browse/apply?ideaId=${idea.id}`}
                          className="btn-primary !px-8 !py-3 font-mono text-xs uppercase tracking-widest"
                        >
                          Initialize Join <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Link>
                      )}
                      {idea.hasGeneralApp && (
                        <div className="flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 text-primary rounded font-mono text-[10px] uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3" /> Protocol_Established
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Open Positions Grid */}
                {(openRoles.length > 0 || appliedRolesInThisIdea.length > 0) && (
                  <div className="p-8 lg:p-10 bg-white/[0.01]">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="text-[10px] font-mono font-bold text-muted uppercase tracking-[0.3em]">Hiring_Matrix</div>
                      <div className="h-px flex-1 bg-white/5" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {openRoles.map(role => (
                        <div key={role.id} className="relative group/role rounded-lg border border-white/5 bg-white/[0.02] p-6 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500">
                          <div className="space-y-6">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h4 className="text-xl font-display text-white group-hover/role:text-primary transition-colors">{role.role_title}</h4>
                                <div className="flex items-center gap-2">
                                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border tracking-tighter ${CATEGORY_COLORS[role.category] || "text-muted border-white/10"}`}>
                                    {role.category}
                                  </span>
                                  {role.ai_suggested && (
                                    <span className="text-[9px] font-mono text-primary italic">AI_MATCHED</span>
                                  )}
                                </div>
                              </div>
                              <div className="text-[10px] font-mono text-muted uppercase italic">{role.experience_level}</div>
                            </div>

                            <p className="text-xs text-muted leading-relaxed line-clamp-2">{role.description}</p>
                            
                            <Link 
                              href={`/dashboard/employee/browse/apply?ideaId=${idea.id}&roleId=${role.id}`}
                              className="flex items-center justify-between w-full p-3 rounded bg-white/5 border border-white/5 hover:border-primary/20 hover:text-primary transition-all group/btn"
                            >
                              <span className="text-[10px] font-mono uppercase tracking-[0.2em]">View_Protocol</span>
                              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      ))}

                      {appliedRolesInThisIdea.map(role => (
                        <div key={role.id} className="rounded-lg border border-primary/10 bg-primary/[0.02] p-6 opacity-60">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="font-display text-lg text-white/70">{role.role_title}</h4>
                              <div className="text-[9px] font-mono text-primary uppercase tracking-widest">Status:Transmitted</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

