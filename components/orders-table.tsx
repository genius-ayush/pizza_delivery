"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { type PizzaOrder, type OrderStatus, pizzaOrders } from "@/lib/data"
import { useOrdersContext } from "@/context/order-context"

export function OrdersTable() {
  const { orders, setOrders, filteredOrders, setFilteredOrders } = useOrdersContext()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PizzaOrder
    direction: "ascending" | "descending"
  } | null>(null)

  useEffect(() => {
    // Initialize orders from the data file
    setOrders(pizzaOrders)
  }, [setOrders])

  useEffect(() => {
    let result = [...orders]

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter)
    }

    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase()
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(lowercasedSearch) ||
          order.customerName.toLowerCase().includes(lowercasedSearch) ||
          order.pizzaType.toLowerCase().includes(lowercasedSearch),
      )
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredOrders(result)
  }, [orders, statusFilter, searchTerm, sortConfig, setFilteredOrders])

  const requestSort = (key: keyof PizzaOrder) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Preparing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Out for Delivery":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Preparing">Preparing</SelectItem>
            <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => requestSort("id")}>
                Order ID
                {sortConfig?.key === "id" && <span>{sortConfig.direction === "ascending" ? " ↑" : " ↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort("customerName")}>
                Customer Name
                {sortConfig?.key === "customerName" && (
                  <span>{sortConfig.direction === "ascending" ? " ↑" : " ↓"}</span>
                )}
              </TableHead>
              <TableHead>Pizza Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort("orderDate")}>
                Order Date
                {sortConfig?.key === "orderDate" && <span>{sortConfig.direction === "ascending" ? " ↑" : " ↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort("status")}>
                Status
                {sortConfig?.key === "status" && <span>{sortConfig.direction === "ascending" ? " ↑" : " ↓"}</span>}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.pizzaType}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadgeColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
