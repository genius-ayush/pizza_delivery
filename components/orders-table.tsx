"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { type PizzaOrder, type OrderStatus, pizzaOrders } from "@/lib/data"
import { useOrdersContext } from "@/context/order-context"
import { Search, Filter } from "lucide-react"

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
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300 hover:from-yellow-200 hover:to-yellow-300"
      case "Preparing":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 hover:from-blue-200 hover:to-blue-300"
      case "Out for Delivery":
        return "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300 hover:from-purple-200 hover:to-purple-300"
      case "Delivered":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300 hover:from-green-200 hover:to-green-300"
      case "Cancelled":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300 hover:from-red-200 hover:to-red-300"
      default:
        return ""
    }
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 h-4 w-4" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-gray-200 focus:border-orange-500 focus:ring-orange-500">
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
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100">
                <TableHead className="cursor-pointer font-semibold text-gray-700" onClick={() => requestSort("id")}>
                  Order ID
                  {sortConfig?.key === "id" && (
                    <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer font-semibold text-gray-700"
                  onClick={() => requestSort("customerName")}
                >
                  Customer Name
                  {sortConfig?.key === "customerName" && (
                    <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead className="font-semibold text-gray-700">Pizza Type</TableHead>
                <TableHead className="font-semibold text-gray-700">Quantity</TableHead>
                <TableHead
                  className="cursor-pointer font-semibold text-gray-700"
                  onClick={() => requestSort("orderDate")}
                >
                  Order Date
                  {sortConfig?.key === "orderDate" && (
                    <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead className="cursor-pointer font-semibold text-gray-700" onClick={() => requestSort("status")}>
                  Status
                  {sortConfig?.key === "status" && (
                    <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                        <Search className="h-8 w-8 text-orange-500" />
                      </div>
                      <p className="text-gray-500 font-medium">No orders found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className={`hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 transition-all duration-200 ${index % 2 === 0 ? "bg-gray-50/30" : "bg-white"}`}
                  >
                    <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                    <TableCell className="text-gray-700">{order.customerName}</TableCell>
                    <TableCell className="text-gray-700">{order.pizzaType}</TableCell>
                    <TableCell className="text-gray-700">{order.quantity}</TableCell>
                    <TableCell className="text-gray-700">{order.orderDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusBadgeColor(order.status)} font-medium`}>
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
    </div>
  )
}
