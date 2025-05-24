import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { OrdersTable } from "@/components/orders-table"

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Pizza Orders" text="View and manage all pizza orders" />
      <OrdersTable />
    </DashboardShell>
  )
}
