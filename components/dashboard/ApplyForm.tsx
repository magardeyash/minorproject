"use client"

import React, { useState, useTransition } from "react"
import { applyToIdeaAction } from "@/actions/applications"

export function ApplyForm({ ideaId }: { ideaId: string }) {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const formData = new FormData()
    formData.set("message", message)

    startTransition(async () => {
      const res = await applyToIdeaAction(ideaId, formData)
      if (res?.error) {
        setError(res.error)
      } else {
        setSuccess(true)
      }
    })
  }

  if (success) {
    return (
      <p className="text-success text-sm font-medium">✓ Application submitted! Check your applications tab.</p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          type="text"
          placeholder="Why are you a good fit?"
          className="glass-input flex-1 rounded-xl px-4 py-2 text-sm"
          required
          minLength={10}
        />
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary px-5 py-2 rounded-xl text-sm"
        >
          {isPending ? "…" : "Apply"}
        </button>
      </div>
      {error && <p className="text-error text-xs font-medium pl-1">{error}</p>}
    </form>
  )
}
