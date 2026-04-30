import React from "react"
import { DbApplication } from "@/lib/db/applications"
import { DbUser } from "@/lib/db/users"
import { Star, MessageSquare, Check, X } from "lucide-react"

interface ApplicantCardProps {
  application: DbApplication & { ideaTitle: string }
  user: DbUser
  onAccept?: (formData: FormData) => Promise<any> | void
  onReject?: (formData: FormData) => Promise<any> | void
}

export function ApplicantCard({ application, user, onAccept, onReject }: ApplicantCardProps) {
  // Map experience
  const expLabel = user.experience === 'junior' ? '1-3 Years' :
    user.experience === 'mid' ? '3-5 Years' :
      user.experience === 'senior' ? '5-8 Years' : '8+ Years';

  return (
    <div className="glass-panel p-6 rounded-[2.5rem] flex flex-col gap-6 hover:border-[#EAED87]/30 transition-all group h-full">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 shadow-lg" alt={user.name} />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-4 border-[#213722]"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold group-hover:text-[#EAED87] transition-all">{user.name}</h3>
            <p className="text-xs text-white/40 mb-2 capitalize">{user.experience} • {user.skills?.[0] || 'General'}</p>
            <div className="flex items-center gap-1">
              <Star className="text-[#EAED87] w-3 h-3 fill-[#EAED87]" />
              <span className="text-[11px] font-bold">4.9</span>
              <span className="text-[11px] text-white/20 ml-1">(New)</span>
            </div>
          </div>
        </div>

        {application.status === 'pending' && (
          <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wider">Reviewing</span>
        )}
        {application.status === 'accepted' && (
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Accepted</span>
        )}
        {application.status === 'rejected' && (
          <span className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wider">Rejected</span>
        )}
      </div>

      <div className="flex-1">
        <div className="text-xs text-[#EAED87] font-semibold mb-2 line-clamp-1">{application.ideaTitle}</div>
        <p className="text-xs text-white/50 line-clamp-3 leading-relaxed mb-4" title={application.message || ''}>
          {application.message || 'No message provided.'}
        </p>
        <div className="flex flex-wrap gap-2">
          {user.skills?.slice(0, 4).map(skill => (
            <span key={skill} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-white/60">
              {skill}
            </span>
          ))}
          {(user.skills?.length || 0) > 4 && (
            <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-white/60">
              +{(user.skills?.length || 0) - 4}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Experience</span>
          <span className="text-xs font-semibold">{expLabel}</span>
        </div>

        <div className="flex items-center gap-3">
          {application.status === 'pending' ? (
            <>
              <form action={onReject}>
                <button type="submit" className="w-10 h-10 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all" title="Reject">
                  <X className="w-5 h-5" />
                </button>
              </form>
              <form action={onAccept}>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#EAED87] text-[#213722] text-xs font-bold hover:bg-[#d4d77a] flex items-center gap-2 transition-all">
                  <Check className="w-4 h-4" />
                  Accept
                </button>
              </form>
            </>
          ) : (
            <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
              <MessageSquare className="w-5 h-5 text-white/60" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
