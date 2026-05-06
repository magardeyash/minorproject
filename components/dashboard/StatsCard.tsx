import React from "react"

export function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  color = "primary",
  trend
}: { 
  icon: React.ElementType
  label: string
  value: string | number
  color?: string
  trend?: { value: string; positive: boolean }
}) {
  return (
    <div className="card-forge">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-10 h-10 rounded-lg bg-${color}/10 border border-${color}/20 flex items-center justify-center`}>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
        {trend && (
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${trend.positive ? 'text-success border-success/20 bg-success/5' : 'text-error border-error/20 bg-error/5'}`}>
            {trend.positive ? '+' : '-'}{trend.value}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-4xl font-display font-medium text-white">{value}</div>
        <div className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest">{label}</div>
      </div>
    </div>
  )
}
