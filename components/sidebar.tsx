"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, PizzaIcon, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

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
      <div className="md:hidden flex items-center h-16 px-4 border-b">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="ml-2 text-lg font-semibold">Pizza Dashboard</h1>
      </div>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-background shadow-lg">
            <div className="flex items-center justify-between h-16 px-6 border-b">
              <h1 className="text-lg font-semibold">Pizza Dashboard</h1>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="py-4">
              <nav className="space-y-1 px-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                      route.active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <route.icon className="mr-3 h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
              <div className="px-2 mt-6">
                <Button variant="outline" className="w-full justify-start" onClick={() => signOut()}>
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r bg-background">
          <div className="flex items-center h-16 px-6 border-b">
            <h1 className="text-lg font-semibold">Pizza Dashboard</h1>
          </div>
          <div className="flex-grow flex flex-col py-4">
            <nav className="flex-1 space-y-1 px-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                    route.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
            <div className="px-4 mt-6">
              <Button variant="outline" className="w-full justify-start" onClick={() => signOut()}>
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
