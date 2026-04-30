import { auth } from "@/auth"
import { getIdeasByFounder } from "@/lib/db/ideas"
import { getApplicationsForIdea, DbApplication } from "@/lib/db/applications"
import { getUserById } from "@/lib/db/users"
import { ApplicantsClient } from "@/components/dashboard/ApplicantsClient"
import { ChevronRight, Grid, List, UserPlus } from "lucide-react"

export const metadata = { title: "Applicants — VentureLens" }

interface AppWithIdea extends DbApplication {
  ideaTitle: string
}

export default async function FounderApplicantsPage() {
  const session = await auth()
  const ideas = await getIdeasByFounder(session!.user.id)

  const allApplications: AppWithIdea[] = []

  for (const idea of ideas) {
    const apps = await getApplicationsForIdea(idea.id)
    allApplications.push(...apps.map(app => ({ ...app, ideaTitle: idea.title })))
  }

  allApplications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const allApplicationsWithUsers = await Promise.all(allApplications.map(async (app) => {
    const user = await getUserById(app.employee_id)
    return { app, user }
  }))

  // Filter out any null users
  const validAppsWithUsers = allApplicationsWithUsers.filter((data): data is { app: AppWithIdea, user: NonNullable<typeof data.user> } => data.user !== null);

  return (
    <div className="w-full">
      {/* Breadcrumbs & Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
              <div className="flex items-center gap-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-3">
                  <span>Dashboard</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-[#EAED87]">Applicants</span>
              </div>
              <h2 className="clash text-4xl font-semibold tracking-tight">Candidate Pipeline</h2>
          </div>
          <div className="flex items-center gap-4">
              <button className="glass-panel p-3 rounded-xl flex items-center justify-center text-white/60 hover:text-[#EAED87] hover:bg-white/5 transition-all">
                  <Grid className="w-5 h-5" />
              </button>
              <button className="glass-panel p-3 rounded-xl flex items-center justify-center text-white/60 hover:text-[#EAED87] hover:bg-white/5 transition-all">
                  <List className="w-5 h-5" />
              </button>
              <button className="btn-contrast px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-sm shadow-xl">
                  <UserPlus className="w-5 h-5" />
                  Hire Talent
              </button>
          </div>
      </div>

      <ApplicantsClient ideas={ideas} allApplicationsWithUsers={validAppsWithUsers} />
    </div>
  )
}
