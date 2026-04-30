import { auth } from "@/auth"
import { getIdeasByFounder } from "@/lib/db/ideas"
import { AnalyticsClient } from "@/components/dashboard/AnalyticsClient"

export const metadata = { title: "Venture Score Analysis — VentureLens" }

export default async function FounderAnalyticsPage() {
  const session = await auth()
  const ideas = await getIdeasByFounder(session!.user.id)

  return (
    <div className="w-full">
      <AnalyticsClient ideas={ideas} />
    </div>
  )
}
