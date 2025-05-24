import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={`Hello, ${session.user?.name || "User"}!`} text="Welcome to your pizza dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Orders</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Pending Orders</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">-0.5% from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Delivered Orders</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
