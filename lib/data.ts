export type OrderStatus = "Pending" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled"

export interface PizzaOrder {
  id: string
  customerName: string
  pizzaType: string
  quantity: number
  orderDate: string
  status: OrderStatus
}

export const pizzaOrders: PizzaOrder[] = [
  {
    id: "PZA001",
    customerName: "John Doe",
    pizzaType: "Margherita",
    quantity: 2,
    orderDate: "2023-05-15 14:30",
    status: "Delivered",
  },
  {
    id: "PZA002",
    customerName: "Jane Smith",
    pizzaType: "Pepperoni",
    quantity: 1,
    orderDate: "2023-05-15 15:45",
    status: "Preparing",
  },
  {
    id: "PZA003",
    customerName: "Bob Johnson",
    pizzaType: "Veggie Supreme",
    quantity: 3,
    orderDate: "2023-05-15 16:20",
    status: "Pending",
  },
  {
    id: "PZA004",
    customerName: "Alice Brown",
    pizzaType: "Hawaiian",
    quantity: 2,
    orderDate: "2023-05-15 17:10",
    status: "Out for Delivery",
  },
  {
    id: "PZA005",
    customerName: "Charlie Wilson",
    pizzaType: "Meat Lovers",
    quantity: 1,
    orderDate: "2023-05-15 18:05",
    status: "Cancelled",
  },
  {
    id: "PZA006",
    customerName: "Diana Miller",
    pizzaType: "BBQ Chicken",
    quantity: 2,
    orderDate: "2023-05-16 12:30",
    status: "Delivered",
  },
  {
    id: "PZA007",
    customerName: "Edward Davis",
    pizzaType: "Buffalo",
    quantity: 1,
    orderDate: "2023-05-16 13:15",
    status: "Preparing",
  },
  {
    id: "PZA008",
    customerName: "Fiona Clark",
    pizzaType: "Cheese",
    quantity: 4,
    orderDate: "2023-05-16 14:00",
    status: "Pending",
  },
  {
    id: "PZA009",
    customerName: "George White",
    pizzaType: "Supreme",
    quantity: 2,
    orderDate: "2023-05-16 15:20",
    status: "Out for Delivery",
  },
  {
    id: "PZA010",
    customerName: "Hannah Green",
    pizzaType: "Mushroom",
    quantity: 1,
    orderDate: "2023-05-16 16:45",
    status: "Delivered",
  },
]
