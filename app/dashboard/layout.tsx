import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Providers } from "@/app/providers"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </Providers>
  )
}
