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
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <h1 className="text-lg font-semibold">Pizza Dashboard</h1>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Welcome to Pizza Dashboard
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Manage your pizza orders with ease. Sign in to get started.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/api/auth/signin">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
