"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, PizzaIcon, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/orders",
      label: "Pizza Orders",
      icon: PizzaIcon,
      active: pathname === "/dashboard/orders",
    },
  ]

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center h-16 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white hover:bg-white/20">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">🍕 Pizza Dashboard</h1>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-3 h-16">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors",
                route.active
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50",
              )}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          ))}
          <button
            onClick={() => signOut()}
            className="flex flex-col items-center justify-center space-y-1 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <h1 className="text-lg font-bold">🍕 Pizza Dashboard</h1>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="py-6">
              <div className="px-6 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{session?.user?.name || "User"}</p>
                    <p className="text-sm text-gray-500">{session?.user?.email || "user@example.com"}</p>
                  </div>
                </div>
              </div>
              <nav className="space-y-2 px-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      route.active
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600",
                    )}
                  >
                    <route.icon className="mr-3 h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
              <div className="px-4 mt-8">
                <Button
                  variant="outline"
                  className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-lg">
          <div className="flex items-center h-16 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <h1 className="text-lg font-bold">🍕 Pizza Dashboard</h1>
          </div>
          <div className="flex-grow flex flex-col py-6">
            <div className="px-6 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{session?.user?.name || "User"}</p>
                  <p className="text-sm text-gray-500">{session?.user?.email || "user@example.com"}</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 space-y-2 px-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    route.active
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600",
                  )}
                >
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
            <div className="px-4 mt-6">
              <Button
                variant="outline"
                className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                onClick={() => signOut()}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
