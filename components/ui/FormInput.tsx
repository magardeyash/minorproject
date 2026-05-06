"use client"

import { forwardRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, type = "text", className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
      <div className="space-y-2 flex flex-col w-full">
        <label className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest pl-1">
          {label}
        </label>
        <div className="relative">
          <input
            {...props}
            type={inputType}
            ref={ref}
            className={cn(
              "glass-input w-full px-4 py-3 text-sm text-white placeholder:text-white/10 outline-none transition-all duration-300",
              isPassword && "pr-12",
              error && "border-error focus:ring-error/20 focus:border-error animate-shake",
              className
            )}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-error text-[10px] font-mono uppercase tracking-tighter pl-1 animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"
