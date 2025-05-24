"use client"

import type React from "react"

import { OrdersProvider } from "@/context/order-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <OrdersProvider>{children}</OrdersProvider>
}
