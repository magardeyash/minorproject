import React from "react"

export function DataTable({
  columns,
  data,
  emptyMessage = "No data found"
}: {
  columns: string[]
  data: React.ReactNode[][]
  emptyMessage?: string
}) {
  return (
    <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] text-accent-muted uppercase bg-white/[0.02] border-b border-white/5 tracking-widest">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-5 font-bold">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-accent-muted italic">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors duration-200">
                  {row.map((cell, j) => (
                    <td key={j} className="px-6 py-4.5 whitespace-nowrap text-white/80">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
