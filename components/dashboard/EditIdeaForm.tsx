"use client"

import { reassessIdeaAction } from "@/actions/ideas"
import type { DbIdea } from "@/lib/db/ideas"
import { CheckCircle2, Save, X, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

function Textarea({
  name,
  label,
  value,
  onChange,
  required,
  minLength,
}: {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  minLength?: number
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-accent-muted px-1">
        {label} {required && <span className="text-btn text-xs">*</span>}
      </label>
      <textarea
        name={name}
        required={required}
        minLength={minLength}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="glass-input w-full rounded-2xl px-4 py-3 text-white placeholder:text-accent-muted/40 min-h-[110px] resize-y"
      />
    </div>
  )
}

export function EditIdeaForm({ idea }: { idea: DbIdea }) {
  const router = useRouter()
  const reportHref = `/dashboard/founder/ideas/${idea.id}`
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [title, setTitle] = useState(idea.title)
  const [description, setDescription] = useState(idea.description)
  const [problemStatement, setProblemStatement] = useState(idea.problem_statement ?? "")
  const [solution, setSolution] = useState(idea.solution ?? "")
  const [targetAudience, setTargetAudience] = useState(idea.target_audience ?? "")
  const [revenueModel, setRevenueModel] = useState(idea.revenue_model ?? "")
  const [industry, setIndustry] = useState(idea.industry ?? "")
  const [stage, setStage] = useState(idea.stage)

  useEffect(() => {
    if (!success) return

    const timer = window.setTimeout(() => setSuccess(""), 1000)
    return () => window.clearTimeout(timer)
  }, [success])

  function resetForm() {
    setError("")
    setSuccess("")
    setTitle(idea.title)
    setDescription(idea.description)
    setProblemStatement(idea.problem_statement ?? "")
    setSolution(idea.solution ?? "")
    setTargetAudience(idea.target_audience ?? "")
    setRevenueModel(idea.revenue_model ?? "")
    setIndustry(idea.industry ?? "")
    setStage(idea.stage)
    router.push(reportHref)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setSuccess("")
    const formData = new FormData(e.currentTarget)
    formData.set("stage", stage)

    startTransition(async () => {
      const res = await reassessIdeaAction(idea.id, formData)
      if (res?.error) {
        setError(res.error)
      } else {
        setSuccess("Changes saved successfully. Reassessment started.")
        setTimeout(() => {
          router.push(reportHref)
          router.refresh()
        }, 1200)
      }
    })
  }

  function clearSuccess() {
    if (success) setSuccess("")
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-8 border border-white/5 space-y-6">
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-accent-muted px-1">Startup / Idea Title</label>
        <input
          name="title"
          required
          minLength={5}
          value={title}
          onChange={e => {
            setTitle(e.target.value)
            clearSuccess()
          }}
          className="glass-input w-full rounded-2xl px-4 py-3 text-white placeholder:text-accent-muted/40"
        />
      </div>

      <Textarea name="description" label="Brief Overview" value={description} onChange={value => {
        setDescription(value)
        clearSuccess()
      }} required minLength={20} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textarea name="problemStatement" label="Problem Statement" value={problemStatement} onChange={value => {
          setProblemStatement(value)
          clearSuccess()
        }} minLength={20} />
        <Textarea name="solution" label="Your Solution" value={solution} onChange={value => {
          setSolution(value)
          clearSuccess()
        }} minLength={20} />
        <Textarea name="targetAudience" label="Target Audience" value={targetAudience} onChange={value => {
          setTargetAudience(value)
          clearSuccess()
        }} minLength={10} />
        <Textarea name="revenueModel" label="Revenue Model" value={revenueModel} onChange={value => {
          setRevenueModel(value)
          clearSuccess()
        }} minLength={10} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-accent-muted px-1">Industry</label>
          <input
            name="industry"
            required
            value={industry}
            onChange={e => {
              setIndustry(e.target.value)
              clearSuccess()
            }}
            className="glass-input w-full rounded-2xl px-4 py-3 text-white placeholder:text-accent-muted/40"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-accent-muted px-1">Current Stage</label>
          <div className="relative">
            <select
              value={stage}
              onChange={e => {
                setStage(e.target.value as DbIdea["stage"])
                clearSuccess()
              }}
              className="glass-input w-full rounded-2xl px-4 py-3 text-white appearance-none cursor-pointer"
            >
              <option value="idea" className="bg-card">Just an Idea</option>
              <option value="mvp" className="bg-card">Building MVP</option>
              <option value="growth" className="bg-card">Early Growth</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-accent-muted/40">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-error text-sm bg-error/10 border border-error/20 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-success text-sm bg-success/10 border border-success/20 px-4 py-3 rounded-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {success}
        </div>
      )}

      <div className="pt-4 border-t border-white/5 flex gap-3 justify-end">
        <button
          type="button"
          onClick={resetForm}
          disabled={isPending}
          className="btn-secondary px-6 py-3"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary px-8 py-3"
        >
          {isPending ? <Sparkles className="w-4 h-4 animate-spin text-btn-text" /> : <Save className="w-4 h-4" />}
          {isPending ? "Reassessing..." : "Save & Reassess"}
        </button>
      </div>
    </form>
  )
}
