import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TrendingUp, Clock, CheckCircle, Package } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const stats = [
    {
      title: "Total Orders",
      value: "12",
      change: "+2.1% from last month",
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      title: "Pending Orders",
      value: "3",
      change: "-0.5% from last month",
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-100",
    },
    {
      title: "Delivered Orders",
      value: "8",
      change: "+1.2% from last month",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      title: "Revenue",
      value: "$1,234",
      change: "+5.4% from last month",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
  ]

  return (
    <DashboardShell>
      <div className="p-6">
        <DashboardHeader
          heading={`Hello, ${session.user?.name || "User"}! 👋`}
          text="Welcome back to your pizza dashboard. Here's what's happening today."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div
                className={`rounded-xl bg-gradient-to-br ${stat.bgColor} p-6 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Order #PZA010 was delivered</p>
                <span className="text-xs text-gray-400">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">New order #PZA011 received</p>
                <span className="text-xs text-gray-400">5 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Order #PZA009 is out for delivery</p>
                <span className="text-xs text-gray-400">10 min ago</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Pizzas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    🍕
                  </div>
                  <span className="text-sm font-medium text-gray-900">Margherita</span>
                </div>
                <span className="text-sm text-gray-500">24 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    🍕
                  </div>
                  <span className="text-sm font-medium text-gray-900">Pepperoni</span>
                </div>
                <span className="text-sm text-gray-500">18 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    🍕
                  </div>
                  <span className="text-sm font-medium text-gray-900">Veggie Supreme</span>
                </div>
                <span className="text-sm text-gray-500">15 orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
