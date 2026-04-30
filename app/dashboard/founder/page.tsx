import { auth } from "@/auth"
import { getIdeasByFounder } from "@/lib/db/ideas"
import { getApplicationsForIdea, DbApplication } from "@/lib/db/applications"
import { getUserById } from "@/lib/db/users"
import Link from "next/link"
import { HorizontalIdeaCard } from "@/components/dashboard/IdeaCard"
import { 
  Sparkles, Rocket, Users2, Gauge, Star, Clock, 
  ArrowRight, ExternalLink, Lightbulb as LightbulbIcon 
} from "lucide-react"

export const metadata = { title: "Dashboard — Founder" }

export default async function FounderDashboardPage() {
  const session = await auth()
  const ideas = await getIdeasByFounder(session!.user.id)

  const allApplications: (DbApplication & { ideaTitle: string })[] = []
  for (const idea of ideas) {
    const apps = await getApplicationsForIdea(idea.id)
    allApplications.push(...apps.map(app => ({ ...app, ideaTitle: idea.title })))
  }

  // Calculate stats
  const approvedCount = ideas.filter(i => i.status === "approved").length
  const newApplicants = allApplications.filter(a => a.status === 'pending').length
  
  const scoredIdeas = ideas.filter(i => i.venture_score !== null)
  const avgScore = scoredIdeas.length > 0 
    ? Math.round((scoredIdeas.reduce((acc, curr) => acc + curr.venture_score!, 0) / scoredIdeas.length) * 10) / 10
    : 0


  // Top Candidates
  allApplications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  const topCandidatesApps = allApplications.slice(0, 3)
  
  const topCandidates = await Promise.all(topCandidatesApps.map(async (app) => {
     const user = await getUserById(app.employee_id)
     return { app, user }
  }))

  return (
    <div className="space-y-10 w-full">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-4">
          <div className="max-w-xl"> 
              <h2 className="clash text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
                Welcome back, <span className="text-[#EAED87]">{session!.user.name?.split(" ")[0]}.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                Your AI Startup pipeline is thriving. {ideas.filter(i => i.status === 'pending').length} ideas are currently validating.
              </p>
          </div>
          <Link href="/dashboard/founder/ideas/new" className="btn-contrast px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-base shadow-2xl hover:text-white">
              <Sparkles className="w-5 h-5" /> Validate New Idea
          </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl group hover:border-[#EAED87]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl stat-icon flex items-center justify-center">
                      <Rocket className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-[#EAED87] bg-[#EAED87]/10 px-2 py-1 rounded">Active</span>
              </div>
              <h4 className="text-white/40 text-xs font-semibold uppercase tracking-[1px] mb-1">Ideas Validated</h4>
              <p className="clash text-3xl font-bold">{approvedCount}</p>
          </div>
          <div className="glass-panel p-6 rounded-3xl group hover:border-[#EAED87]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F86624]/10 text-[#F86624] flex items-center justify-center">
                      <Users2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-white/40">{newApplicants} new</span>
              </div>
              <h4 className="text-white/40 text-xs font-semibold uppercase tracking-[1px] mb-1">Applicants</h4>
              <p className="clash text-3xl font-bold">{allApplications.length}</p>
          </div>
          <div className="glass-panel p-6 rounded-3xl group hover:border-[#EAED87]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl stat-icon flex items-center justify-center">
                      <Gauge className="w-6 h-6" />
                  </div>
                  <div className="flex gap-0.5">
                      <Star className="text-[#EAED87] w-3 h-3 fill-[#EAED87]" />
                      <Star className="text-[#EAED87] w-3 h-3 fill-[#EAED87]" />
                      <Star className="text-[#EAED87] w-3 h-3 fill-[#EAED87]" />
                  </div>
              </div>
              <h4 className="text-white/40 text-xs font-semibold uppercase tracking-[1px] mb-1">Avg Venture Score</h4>
              <p className="clash text-3xl font-bold">{avgScore > 0 ? avgScore : "—"}</p>
          </div>

      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Recent Ideas */}
          <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                  <h3 className="clash text-2xl font-semibold">Active Incubations</h3>
                  <Link href="/dashboard/founder/ideas" className="text-sm text-[#EAED87] font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    View all projects <ArrowRight className="w-4 h-4" />
                  </Link>
              </div>
              <div className="space-y-4">
                  {ideas.length === 0 ? (
                    <div className="glass-panel p-10 rounded-3xl text-center text-white/50">
                      No ideas yet. Validate your first idea to get started!
                    </div>
                  ) : (
                    ideas.slice(0, 5).map(idea => {
                      const ideaAppsCount = allApplications.filter(a => a.idea_id === idea.id).length
                      return (
                        <HorizontalIdeaCard key={idea.id} idea={idea} applicantCount={ideaAppsCount} />
                      )
                    })
                  )}
              </div>
          </div>

          {/* Right Sidebar: Applicants */}
          <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between">
                  <h3 className="clash text-xl font-semibold">Top Candidates</h3>
                  <Link href="/dashboard/founder/applicants" className="text-white/40 text-xs hover:text-white transition-all">Refresh</Link>
              </div>
              <div className="glass-panel rounded-3xl p-6 h-fit overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAED87]/5 rounded-full blur-2xl"></div>
                  <div className="space-y-6 relative z-10">
                      {topCandidates.length === 0 ? (
                        <div className="text-center text-sm text-white/40 py-4">
                          No candidates applied yet.
                        </div>
                      ) : (
                        topCandidates.map(({ app, user }, idx) => (
                          <div key={app.id} className="flex items-center gap-4 group">
                              <div className="relative flex-shrink-0">
                                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || idx}`} className="w-12 h-12 rounded-2xl bg-white/5" alt="Candidate" />
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#213722]"></div>
                              </div>
                              <div className="flex-1">
                                  <h5 className="text-sm font-semibold group-hover:text-[#EAED87] transition-all line-clamp-1">{user?.name || 'Unknown'}</h5>
                                  <p className="text-[11px] text-white/40 line-clamp-1">{user?.experience || 'Contributor'} • {user?.skills?.[0] || 'General'}</p>
                              </div>
                              <Link href={`/dashboard/founder/applicants`}>
                                <ExternalLink className="text-white/20 group-hover:text-[#EAED87] cursor-pointer w-4 h-4" />
                              </Link>
                          </div>
                        ))
                      )}
                  </div>
                  {topCandidates.length > 0 && (
                    <Link href="/dashboard/founder/applicants" className="w-full mt-8 py-3 rounded-xl border border-white/10 text-[11px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex justify-center">
                      Browse All Talent
                    </Link>
                  )}
              </div>
              {/* Tip Card */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <LightbulbIcon className="text-[#EAED87] w-6 h-6 mb-4" />
                  <h5 className="text-sm font-semibold mb-2">Incubator Insight</h5>
                  <p className="text-xs text-white/50 leading-relaxed">Teams with a 'Venture Score' above 85 are 40% more likely to secure seed funding within 6 months.</p>
              </div>
          </div>
      </div>
    </div>
  )
}