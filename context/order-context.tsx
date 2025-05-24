"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { PizzaOrder } from "@/lib/data"

interface OrdersContextType {
  orders: PizzaOrder[]
  setOrders: (orders: PizzaOrder[]) => void
  filteredOrders: PizzaOrder[]
  setFilteredOrders: (orders: PizzaOrder[]) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<PizzaOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<PizzaOrder[]>([])

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        filteredOrders,
        setFilteredOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrdersContext() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrdersContext must be used within an OrdersProvider")
  }
  return context
}
