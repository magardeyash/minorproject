"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

// ─── Navbar ────────────────────────────────────────────────────────────────
export function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#features",     label: "Features"     },
    { href: "#testimonials", label: "Testimonials"  },
  ]

  const logoContent = (
    <div className="flex items-center gap-2.5" suppressHydrationWarning>
      <Image
        src="/logo/logo.png"
        alt="VentureLens"
        width={36}
        height={36}
        priority
        className="h-9 w-auto object-contain"
        suppressHydrationWarning
      />
      <span className="font-bold text-lg tracking-tight">
        <span className="text-btn">Venture</span>
        <span className="text-accent-yellow">Lens</span>
      </span>
    </div>
  )

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl h-16 flex items-center justify-between px-6 pointer-events-auto border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

        {/* Logo */}
        <Link href="/" className="group transition-transform hover:scale-105 active:scale-95">
          {logoContent}
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm font-medium text-accent-muted hover:text-accent-yellow hover:bg-white/5 px-4 py-2 rounded-xl transition-all duration-300">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login"
            className="text-sm font-semibold px-5 py-2 rounded-xl border border-white/10 text-accent-muted hover:text-accent-yellow hover:bg-white/5 transition-all duration-300">
            Login
          </Link>
          <Link href="/register"
            className="btn-primary text-sm px-6 py-2 shadow-[0_0_20px_rgba(248,198,34,0.3)]">
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-accent-yellow p-2 hover:bg-white/5 rounded-xl transition-colors" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-4 space-y-3 pointer-events-auto animate-in slide-in-from-top-2 duration-300">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block text-sm font-medium text-accent-muted hover:text-accent-yellow hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all">
              {l.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2 border-t border-white/5">
            <Link href="/login" onClick={() => setOpen(false)}
              className="text-center text-sm font-semibold py-3 rounded-xl border border-white/10 text-accent-muted">
              Login
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}
              className="btn-primary py-3">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
