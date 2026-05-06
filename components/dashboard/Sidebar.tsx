"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, X, UserCircle, ChevronLeft, ChevronRight, Hash } from "lucide-react"
import { useState, useTransition } from "react"
import { signOut } from "next-auth/react"
import { saveActivePathAction } from "@/actions/nav"

export interface NavLink {
  label: string
  href: string
  icon: React.ReactNode
  exact?: boolean
}

interface SidebarProps {
  role: "admin" | "founder" | "employee"
  userName: string
  links: NavLink[]
  isCollapsed?: boolean
  onToggle?: () => void
}

function resolveActive(links: NavLink[], pathname: string): string | null {
  const matches = links.filter((link) => {
    if (pathname === link.href) return true
    if (link.exact) return false
    return pathname.startsWith(link.href + "/")
  })
  if (matches.length === 0) return null
  matches.sort((a, b) => b.href.length - a.href.length)
  return matches[0].href
}

import { Logo } from "@/components/ui/Logo"

export function Sidebar({ role, userName, links, isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [, startTransition] = useTransition()

  const activeHref = resolveActive(links, pathname)
  const homeHref = role === "admin" ? "/admin/dashboard" : `/dashboard/${role}`
  const profileHref = role === "admin" ? "/admin/dashboard/profile" : `/dashboard/${role}/profile`

  const roleConfigs = {
    admin:    { label: "SYS_ADMIN", color: "text-error border-error/20 bg-error/5" },
    founder:  { label: "FOUNDER_CORE", color: "text-primary border-primary/20 bg-primary/5" },
    employee: { label: "CONTRIBUTOR", color: "text-accent border-accent/20 bg-accent/5" },
  }

  function handleNavClick(href: string) {
    setIsOpen(false)
    startTransition(() => {
      saveActivePathAction(href)
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-50 w-12 h-12 rounded-lg bg-card border border-white/10 flex items-center justify-center shadow-2xl"
      >
        <Menu className="w-5 h-5 text-primary" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-background border-r border-white/5
        flex flex-col transform transition-all duration-500 ease-in-out lg:translate-x-0
        ${isCollapsed ? "lg:w-20 w-72" : "w-72"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Header */}
        <div className="h-24 flex items-center px-6 justify-between border-b border-white/5">
          <Link
            href={homeHref}
            onClick={() => handleNavClick(homeHref)}
          >
            <Logo iconOnly={isCollapsed} size="sm" />
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Line */}
        {!isCollapsed && (
          <div className="px-6 py-4 flex items-center gap-2">
            <div className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border tracking-[0.2em] ${roleConfigs[role].color}`}>
              {roleConfigs[role].label}
            </div>
            <div className="h-px flex-1 bg-white/5" />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {links.map((link) => {
            const isActive = activeHref === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`
                  flex items-center gap-4 py-3 rounded-lg text-sm font-medium
                  transition-all duration-300 group relative
                  ${isCollapsed ? "px-0 justify-center" : "px-4"}
                  ${isActive
                    ? "bg-white/5 text-primary border border-white/10"
                    : "text-muted hover:bg-white/[0.02] hover:text-white border border-transparent"
                  }
                `}
                title={isCollapsed ? link.label : ""}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full shadow-[0_0_8px_rgba(16,185,129,1)]" />
                )}

                <span className={`shrink-0 transition-all duration-300 ${isActive ? "text-primary scale-110" : "group-hover:text-white group-hover:scale-110"}`}>
                  {link.icon}
                </span>

                {!isCollapsed && (
                  <span className="flex-1 font-mono text-[11px] uppercase tracking-widest">{link.label}</span>
                )}
                
                {!isCollapsed && isActive && (
                  <Hash className="w-3 h-3 text-primary/40 animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User / Footer */}
        <div className="p-4 bg-white/[0.02] border-t border-white/5">
          <div className={`flex flex-col ${isCollapsed ? "items-center gap-6" : "px-4 py-2"}`}>
            <Link
              href={profileHref}
              onClick={() => handleNavClick(profileHref)}
              className={`flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted hover:text-primary transition-all duration-300 ${isCollapsed ? "justify-center" : "mb-4"}`}
            >
              <UserCircle className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span className="truncate">{userName}</span>}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className={`flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-error/60 hover:text-error transition-all duration-300 ${isCollapsed ? "justify-center" : "w-full"}`}
            >
              <LogOut className="w-4 h-4" />
              {!isCollapsed && "Terminate Session"}
            </button>
          </div>
        </div>

        {/* Toggle */}
        {onToggle && (
          <button
            onClick={onToggle}
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-white/10 text-muted items-center justify-center hover:text-primary hover:border-primary/50 transition-all duration-500 z-50 shadow-xl"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </aside>
    </>
  )
}
