import { auth } from "@/auth"
import { getApplicationsByEmployee } from "@/lib/db/applications"
import { getAllIdeas } from "@/lib/db/ideas"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { CancelApplicationButton } from "@/components/dashboard/CancelApplicationButton"
import { Calendar, Briefcase, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = { title: "My Applications — VentureLens" }

export default async function ApplicationsPage() {
  const session = await auth()
  const applications = await getApplicationsByEmployee(session!.user.id)

  const ideas = await getAllIdeas()
  const ideaMap = new Map(ideas.map(i => [i.id, i.title]))

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-display text-white">My <span className="text-primary italic">Applications</span></h1>
        <p className="text-sm font-mono text-muted uppercase tracking-[0.2em]">
          Tracking protocol status for active transmissions.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="card-forge p-16 text-center border-dashed">
          <p className="text-muted font-mono uppercase tracking-widest text-sm">No_Active_Applications</p>
          <Link href="/dashboard/employee/browse" className="btn-primary mt-8">
            Browse Ideas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applications.map(app => (
            <div key={app.id} className="card-forge group hover:border-primary/20 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <StatusBadge status={app.status} />
                <div className="flex items-center gap-2 text-[9px] font-mono text-muted uppercase tracking-widest">
                  <Calendar className="w-3 h-3 text-primary/40" />
                  {new Date(app.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-display text-white group-hover:text-primary transition-colors">
                    {ideaMap.get(app.idea_id) || "Unknown Venture"}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
                    <Briefcase className="w-3.5 h-3.5" />
                    {app.role_title || "General Interest"}
                  </div>
                </div>

                <div className="p-4 rounded bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-muted uppercase tracking-tighter">
                    <FileText className="w-3 h-3" /> Message_Transmission
                  </div>
                  <p className="text-sm text-muted italic line-clamp-2 leading-relaxed">
                    "{app.message || "No message included in protocol."}"
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <Link 
                  href={`/dashboard/employee/browse/apply?ideaId=${app.idea_id}${app.role_requirement_id ? `&roleId=${app.role_requirement_id}` : ''}`}
                  className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
                >
                  View_Venture <ArrowRight className="w-3 h-3" />
                </Link>

                {app.status === "pending" && (
                  <CancelApplicationButton applicationId={app.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
