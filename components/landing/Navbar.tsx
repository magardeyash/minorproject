"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Terminal } from "lucide-react"

import { Logo } from "@/components/ui/Logo"

export function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "#how-it-works", label: "Protocol" },
    { href: "#features",     label: "Capabilities" },
    { href: "#testimonials", label: "Network"  },
  ]

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Logo size="sm" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
              className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-muted hover:text-primary transition-colors duration-300">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/login"
            className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-muted hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/register"
            className="btn-primary !px-5 !py-2 !text-[11px] font-mono tracking-widest uppercase">
            Initialize
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-primary p-1" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl px-6 py-8 space-y-6 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block text-sm font-mono font-bold uppercase tracking-widest text-muted hover:text-primary py-2 border-b border-white/5">
              {l.label}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-4">
            <Link href="/login" onClick={() => setOpen(false)}
              className="text-center font-mono text-sm uppercase tracking-widest text-muted border border-white/10 py-3 rounded">
              Login
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}
              className="btn-primary w-full font-mono text-sm uppercase tracking-widest">
              Initialize
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
