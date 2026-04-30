"use client"

import React, { useState } from "react"
import { DbIdea } from "@/lib/db/ideas"
import { DbApplication } from "@/lib/db/applications"
import { DbUser } from "@/lib/db/users"
import { updateApplicationStatusAction } from "@/actions/applications"
import { ApplicantCard } from "./ApplicantCard"
import { Check } from "lucide-react"

interface AppData {
  app: DbApplication & { ideaTitle: string }
  user: DbUser
}

export function ApplicantsClient({ ideas, allApplicationsWithUsers }: { ideas: DbIdea[], allApplicationsWithUsers: AppData[] }) {
  const [selectedIdea, setSelectedIdea] = useState("all")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  
  // Extract unique skills from all applications
  const availableSkills = Array.from(new Set(allApplicationsWithUsers.flatMap(d => d.user.skills || []))).filter(Boolean).slice(0, 8)

  const experienceOptions = [
    { value: "junior", label: "Junior (1-3y)" },
    { value: "mid", label: "Mid (3-5y)" },
    { value: "senior", label: "Senior (5-8y)" },
    { value: "lead", label: "Lead (8y+)" },
  ]

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Reviewing" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ]

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const toggleExperience = (exp: string) => {
    setSelectedExperiences(prev => 
      prev.includes(exp) ? prev.filter(e => e !== exp) : [...prev, exp]
    )
  }

  const clearAll = () => {
    setSelectedIdea("all")
    setSelectedSkills([])
    setSelectedExperiences([])
    setSelectedStatus("all")
  }

  const filteredApps = allApplicationsWithUsers.filter(({ app, user }) => {
    if (selectedIdea !== "all" && app.idea_id !== selectedIdea) return false;
    
    if (selectedExperiences.length > 0) {
      if (!user.experience || !selectedExperiences.includes(user.experience)) {
        return false;
      }
    }

    if (selectedSkills.length > 0) {
      if (!user.skills) return false;
      const userSkills = user.skills;
      if (!selectedSkills.some(skill => userSkills.includes(skill))) {
        return false;
      }
    }

    if (selectedStatus !== "all" && app.status !== selectedStatus) return false;

    return true;
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Filters Sidebar */}
      <aside className="lg:col-span-3 space-y-8">
          <div className="glass-panel p-6 rounded-[2rem] sticky top-28">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={clearAll} className="text-[10px] font-bold text-[#EAED87] uppercase tracking-wider hover:opacity-80 transition-opacity">Clear All</button>
              </div>

              <div className="space-y-6">
                  {/* Filter Group: Idea */}
                  <div>
                      <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-3">Related Idea</label>
                      <select 
                        value={selectedIdea} 
                        onChange={(e) => setSelectedIdea(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#EAED87]/50 appearance-none cursor-pointer"
                      >
                          <option value="all" className="bg-[#1a2c1b]">All Ideas</option>
                          {ideas.map(idea => (
                            <option key={idea.id} value={idea.id} className="bg-[#1a2c1b]">{idea.title}</option>
                          ))}
                      </select>
                  </div>

                  {/* Filter Group: Skills */}
                  {availableSkills.length > 0 && (
                    <div>
                        <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-3">Skills</label>
                        <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
                            {availableSkills.map(skill => {
                                const isChecked = selectedSkills.includes(skill);
                                return (
                                    <label key={skill} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleSkill(skill)}>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isChecked ? 'border-[#EAED87] bg-[#EAED87]/10' : 'border-white/10 bg-white/5 group-hover:border-[#EAED87]/50'}`}>
                                            <Check className={`text-[#EAED87] w-3 h-3 ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
                                        </div>
                                        <span className={`text-sm transition-colors ${isChecked ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{skill}</span>
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                  )}

                  {/* Filter Group: Experience */}
                  <div>
                      <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-3">Experience</label>
                      <div className="space-y-2">
                          {experienceOptions.map(exp => {
                              const isChecked = selectedExperiences.includes(exp.value);
                              return (
                                  <label key={exp.value} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleExperience(exp.value)}>
                                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isChecked ? 'border-[#EAED87] bg-[#EAED87]/10' : 'border-white/10 bg-white/5 group-hover:border-[#EAED87]/50'}`}>
                                          <div className={`w-2 h-2 rounded-full bg-[#EAED87] transition-all ${isChecked ? 'opacity-100' : 'opacity-0'}`}></div>
                                      </div>
                                      <span className={`text-sm transition-colors ${isChecked ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{exp.label}</span>
                                  </label>
                              )
                          })}
                      </div>
                  </div>

                  {/* Filter Group: Status */}
                  <div>
                      <label className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-3">Status</label>
                      <div className="flex flex-wrap gap-2">
                          {statusOptions.map(status => {
                              const isActive = selectedStatus === status.value;
                              return (
                                  <button 
                                    key={status.value}
                                    onClick={() => setSelectedStatus(status.value)}
                                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${isActive ? 'bg-[#EAED87] text-[#213722]' : 'bg-white/5 border border-white/10 text-white/40 hover:text-white'}`}
                                  >
                                      {status.label}
                                  </button>
                              )
                          })}
                      </div>
                  </div>
              </div>
          </div>
      </aside>

      {/* Main Applicant List */}
      <div className="lg:col-span-9">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
            {filteredApps.length === 0 ? (
              <div className="col-span-full py-12 text-center text-white/40 glass-panel rounded-3xl">No applications match your filters.</div>
            ) : null}

            {filteredApps.map(({ app, user }) => {
              const acceptAction = updateApplicationStatusAction.bind(null, app.id, "accepted");
              const rejectAction = updateApplicationStatusAction.bind(null, app.id, "rejected");

              return (
                <ApplicantCard 
                  key={app.id} 
                  application={app} 
                  user={user} 
                  onAccept={acceptAction}
                  onReject={rejectAction}
                />
              )
            })}
          </div>
      </div>
    </div>
  )
}
