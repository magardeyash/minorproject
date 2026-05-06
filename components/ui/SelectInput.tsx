"use client"

import { ChevronDown } from "lucide-react"
import React from "react"

interface SelectOption { value: string; label: string }

interface SelectInputProps {
  label: string
  name?: string
  value?: string
  onChange?: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  defaultValue?: string
}

export function SelectInput({ label, name, value, onChange, options, placeholder = "Select an option", error, disabled, required, defaultValue }: SelectInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono font-bold text-muted uppercase tracking-widest pl-1">{label}</label>
      <div className="relative">
        <select
          name={name}
          {...(value !== undefined ? { value } : { defaultValue: defaultValue ?? "" })}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          disabled={disabled}
          required={required}
          className={`w-full h-11 px-4 pr-10 appearance-none
            bg-background border backdrop-blur-md text-sm transition-all duration-300 outline-none text-white rounded-lg
            ${error
              ? "border-error focus:border-error"
              : "border-card-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            }
            ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-hover:text-primary transition-colors" />
      </div>
      {error && <p className="text-[10px] font-mono text-error uppercase tracking-tighter mt-1">{error}</p>}
    </div>
  )
}
