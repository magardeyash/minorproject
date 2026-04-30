import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SidebarNavigation from "@/components/dashboard/SidebarNavigation"
import HeaderBar from "@/components/dashboard/HeaderBar"
import { getIdeasByFounder } from "@/lib/db/ideas"
import { getApplicantsCountForFounder } from "@/lib/db/applications"

export default async function FounderDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) redirect("/login")
  if (session.user.role !== "founder") redirect("/dashboard")

  const founderId = session.user.id
  const [ideas, applicantsCount] = await Promise.all([
    getIdeasByFounder(founderId),
    getApplicantsCountForFounder(founderId)
  ])

  const maxIdeas = 20
  const creditUsagePercent = Math.min(Math.round((ideas.length / maxIdeas) * 100), 100)
  const creditUsageText = `${ideas.length}/${maxIdeas} ideas`

  return (
    <div className="flex min-h-screen bg-[#213722]">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[15%] -left-[10%] w-[500px] h-[500px] bg-[#EAED87]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] right-[2%] w-[400px] h-[400px] bg-[#F86624]/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Sidebar */}
      <SidebarNavigation 
        role="founder" 
        applicantsCount={applicantsCount}
        creditUsagePercent={creditUsagePercent}
        creditUsageText={creditUsageText}
      />

      {/* Main Content */}
      <main className="flex-1 ml-72 relative z-10 overflow-x-hidden flex flex-col">
        <HeaderBar userName={session.user.name || "Founder"} />
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}