import Link from "next/link"
import { Globe, Link2, Code2, Terminal } from "lucide-react"

const links = {
  Protocol: [
    { label: "Synthesis", href: "#how-it-works" },
    { label: "Validation",     href: "#features"     },
    { label: "Pricing",      href: "#"             },
    { label: "Changelog",    href: "#"             },
  ],
  Network: [
    { label: "Contributors",   href: "#" },
    { label: "Founders",    href: "#" },
    { label: "Ventures", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Security: [
    { label: "Privacy Protocol",    href: "#" },
    { label: "Terms of Access",  href: "#" },
    { label: "Cookie Policy",     href: "#" },
  ],
}

import { Logo } from "@/components/ui/Logo"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs font-sans">
              High-precision AI validation for the next generation of commerce. 
              Forge your vision into a validated venture.
            </p>
            <div className="flex gap-4">
              {[Globe, Link2, Code2].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-10 h-10 rounded-lg border border-white/5 text-muted hover:text-primary hover:border-primary/20 flex items-center justify-center transition-all duration-300 bg-white/[0.02]">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="space-y-6">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary">{category}</h4>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-muted hover:text-white transition-colors duration-300 font-sans">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted">
            <Terminal className="w-3 h-3 text-primary" />
            <span>© {new Date().getFullYear()} VentureLens // Build_Status: STABLE</span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
            Validated for high-stakes ventures. 🚀
          </p>
        </div>
      </div>
    </footer>
  )
}
