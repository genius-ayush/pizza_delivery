import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 md:ml-64">
      <div className="flex-1 space-y-6 bg-gradient-to-br from-orange-50/30 to-red-50/30 min-h-screen pb-20 md:pb-6">
        {children}
      </div>
    </div>
  )
}
