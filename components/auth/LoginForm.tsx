"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, KeyRound } from "lucide-react"
import { AuthCard } from "@/components/auth/AuthCard"
import { FormInput } from "@/components/ui/FormInput"
import { login } from "@/actions/auth/login"
import { LoginSchema, type LoginInput } from "@/lib/validations"

export function LoginForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState<LoginInput>({ email: "", password: "", role: "founder" })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [generalError, setGeneralError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setGeneralError("")

    const parsed = LoginSchema.safeParse(formData)
    if (!parsed.success) {
      const formattedErrors: Record<string, string> = {}
      parsed.error.issues.forEach((issue) => {
        formattedErrors[String(issue.path[0])] = issue.message
      })
      setErrors(formattedErrors)
      return
    }

    startTransition(async () => {
      const data = new FormData()
      data.append("email", formData.email)
      data.append("password", formData.password)

      const res = await login(data)
      if (res.error) {
        setGeneralError(res.error)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    })
  }

  return (
    <AuthCard 
      title="Aether Access" 
      subtitle="Protocol_Authentication" 
      icon={<KeyRound className="w-7 h-7 text-primary" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Credentials:Email"
          type="email"
          placeholder="id_042@venture.lens"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          disabled={isPending}
        />

        <FormInput
          label="Credentials:Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          disabled={isPending}
        />

        {generalError && (
          <div className="bg-error/5 text-error px-4 py-3 rounded border border-error/20 text-[10px] font-mono uppercase tracking-widest text-center animate-in fade-in">
            Authentication_Failed: {generalError}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full h-12 font-mono text-sm uppercase tracking-widest disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Establish Session"}
        </button>

        <div className="text-center space-y-2">
          <p className="text-[10px] font-mono text-muted uppercase tracking-[0.2em]">
            No access protocol yet?
          </p>
          <Link href="/register" className="text-[10px] font-mono text-primary hover:text-primary-hover font-bold uppercase tracking-[0.3em] transition-colors">
            Register_New_Entity
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}
