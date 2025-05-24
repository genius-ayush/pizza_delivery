import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 shadow-sm">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🍕</span>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Pizza Dashboard
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-8 shadow-2xl">
                  <span className="text-4xl">🍕</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome to Pizza Dashboard
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl leading-relaxed">
                  Manage your pizza orders with ease. Track deliveries, monitor sales, and keep your customers happy
                  with our beautiful dashboard.
                </p>
              </div>
              <div className="space-y-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Link href="/auth/signin">Get Started</Link>
                </Button>
                <p className="text-sm text-gray-500">
                  Use demo credentials: <span className="font-semibold text-orange-600">demo/demo</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
