import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Shield } from "lucide-react"

interface AuthCardProps {
  children: ReactNode
  title: string
  subtitle?: string
  className?: string
  icon?: ReactNode
}

export function AuthCard({ children, title, subtitle, className, icon }: AuthCardProps) {
  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in zoom-in-95 duration-700">
      <div className={cn(
        "card-forge !p-10 sm:!p-12 !bg-background/40 backdrop-blur-3xl border-primary/10 shadow-2xl relative",
        className
      )}>
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 space-y-4 relative z-10">
          <div className="w-16 h-16 rounded-lg bg-primary/5 border border-primary/20 mb-2 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.1)] group transition-all duration-500 hover:border-primary/40">
            {icon ?? <Shield className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-500" />}
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-medium text-white tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted italic">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="relative z-10">
          {children}
        </div>

        {/* Technical Footer Decoration */}
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
          <div className="text-[9px] font-mono text-muted uppercase tracking-[0.3em]">
            Secure_Access_Enforced
          </div>
        </div>
      </div>
    </div>
  )
}
