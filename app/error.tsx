"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="mb-6 mt-2 text-lg text-muted-foreground">{error.message || "An unexpected error occurred"}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
