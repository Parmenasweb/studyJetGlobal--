"use client";
import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  RefreshCcw,
  PieChart,
  Plus,
  Edit,
  Trash2,
  Package2,
  Bell,
  Home,
  ShoppingCart,
  Package,
  Landmark,
  LineChart,
  Search,
  CalendarClock,
  Download,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

// Mock data for charts
const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 15000, 22000, 18000, 25000],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

const expensesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Expenses",
      data: [8000, 11000, 9000, 13000, 10000, 14000],
      backgroundColor: "rgba(255, 99, 132, 0.6)",
    },
  ],
};

const forecastData = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Revenue Forecast",
      data: [27000, 29000, 32000, 35000, 38000, 42000],
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false,
    },
    {
      label: "Expense Forecast",
      data: [15000, 16000, 17000, 18000, 19000, 20000],
      borderColor: "rgba(255, 99, 132, 1)",
      fill: false,
    },
  ],
};

// interface CashFlowItem {
//   id: number;
//   category: string;
//   amount: number;
//   type: 'Inflow' | 'Outflow';
// }

// interface PaymentItem {
//   id: number;
//   student: string;
//   amount: number;
//   date: string;
//   status: 'Paid' | 'Pending' | 'Overdue';
// }

export default function Component() {
  const [cashFlowItems, setCashFlowItems] = useState([
    { id: 1, category: "Student Tuition", amount: 95000, type: "Inflow" },
    { id: 2, category: "Program Fees", amount: 16000, type: "Inflow" },
    { id: 3, category: "Staff Salaries", amount: 45000, type: "Outflow" },
    { id: 4, category: "Marketing Expenses", amount: 12000, type: "Outflow" },
    { id: 5, category: "Operational Costs", amount: 8000, type: "Outflow" },
  ]);

  const [paymentItems, setPaymentItems] = useState([
    {
      id: 1,
      student: "Alice Johnson",
      amount: 5000,
      date: "2023-06-15",
      status: "Paid",
    },
    {
      id: 2,
      student: "Bob Smith",
      amount: 4500,
      date: "2023-06-14",
      status: "Pending",
    },
    {
      id: 3,
      student: "Charlie Brown",
      amount: 5500,
      date: "2023-06-13",
      status: "Overdue",
    },
  ]);

  const [editingCashFlow, setEditingCashFlow] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  const handleAddCashFlow = (item) => {
    const newItem = { ...item, id: Date.now() };
    setCashFlowItems([...cashFlowItems, newItem]);
  };

  const handleUpdateCashFlow = (item) => {
    setCashFlowItems(cashFlowItems.map((i) => (i.id === item.id ? item : i)));
    setEditingCashFlow(null);
  };

  const handleDeleteCashFlow = (id) => {
    setCashFlowItems(cashFlowItems.filter((item) => item.id !== id));
  };

  const handleAddPayment = (item) => {
    const newItem = { ...item, id: Date.now() };
    setPaymentItems([...paymentItems, newItem]);
  };

  const handleUpdatePayment = (item) => {
    setPaymentItems(paymentItems.map((i) => (i.id === item.id ? item : i)));
    setEditingPayment(null);
  };

  const handleDeletePayment = (id) => {
    setPaymentItems(paymentItems.filter((item) => item.id !== id));
  };

  return (
    <div className="grid min-h-screen w-full ">
      {/* <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
           <div className="flex-1 overflow-auto py-2">
             <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Landmark className="h-4 w-4" />
                Finances
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
            </nav> 
          </div> 
        </div> 
      </div>  */}
      <div className="flex flex-col w-[100%] ">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border w-8 h-8"
              >
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ArrowUpRight className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="font-semibold text-lg md:text-xl">Finances</h1>
            <div className="ml-auto flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarClock className="mr-2 h-4 w-4" />
                    June 01, 2023 - June 30, 2023
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid gap-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$111,000</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Expenses
                  </CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$65,000</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Net Profit
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$46,000</div>
                  <p className="text-xs text-muted-foreground">
                    +32.5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Students
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">
                    +7.2% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue and Expenses Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Monthly revenue for the past 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Bar data={revenueData} options={{ responsive: true }} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Expenses Overview</CardTitle>
                  <CardDescription>
                    Monthly expenses for the past 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Bar data={expensesData} options={{ responsive: true }} />
                </CardContent>
              </Card>
            </div>

            {/* Payment Tracking with CRUD */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Payment Tracking</CardTitle>
                    <CardDescription>
                      Recent student payments and status
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Payment</DialogTitle>
                        <DialogDescription>
                          Enter the details for the new payment.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          handleAddPayment({
                            student: formData.get("student"),
                            amount: Number(formData.get("amount")),
                            date: formData.get("date"),
                            status: formData.get("status"),
                          });
                          e.currentTarget.reset();
                        }}
                      >
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="student" className="text-right">
                              Student
                            </Label>
                            <Input
                              id="student"
                              name="student"
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                              Amount
                            </Label>
                            <Input
                              id="amount"
                              name="amount"
                              type="number"
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                              Date
                            </Label>
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <Select name="status" required>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Overdue">Overdue</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add Payment</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.student}</TableCell>
                        <TableCell>${item.amount.toLocaleString()}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <span
                            className={`${
                              item.status === "Paid"
                                ? "text-green-600"
                                : item.status === "Pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Payment</DialogTitle>
                                  <DialogDescription>
                                    Update the payment details.
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(
                                      e.currentTarget
                                    );
                                    handleUpdatePayment({
                                      id: item.id,
                                      student: formData.get("student"),
                                      amount: Number(formData.get("amount")),
                                      date: formData.get("date"),
                                      status: formData.get("status"),
                                    });
                                  }}
                                >
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor={`student-${item.id}`}
                                        className="text-right"
                                      >
                                        Student
                                      </Label>
                                      <Input
                                        id={`student-${item.id}`}
                                        name="student"
                                        defaultValue={item.student}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor={`amount-${item.id}`}
                                        className="text-right"
                                      >
                                        Amount
                                      </Label>
                                      <Input
                                        id={`amount-${item.id}`}
                                        name="amount"
                                        type="number"
                                        defaultValue={item.amount}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor={`date-${item.id}`}
                                        className="text-right"
                                      >
                                        Date
                                      </Label>
                                      <Input
                                        id={`date-${item.id}`}
                                        name="date"
                                        type="date"
                                        defaultValue={item.date}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor={`status-${item.id}`}
                                        className="text-right"
                                      >
                                        Status
                                      </Label>
                                      <Select
                                        name="status"
                                        defaultValue={item.status}
                                      >
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Paid">
                                            Paid
                                          </SelectItem>
                                          <SelectItem value="Pending">
                                            Pending
                                          </SelectItem>
                                          <SelectItem value="Overdue">
                                            Overdue
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">
                                      Update Payment
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeletePayment(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Currency Conversion */}
            <Card>
              <CardHeader>
                <CardTitle>Currency Conversion</CardTitle>
                <CardDescription>
                  Convert between different currencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input type="number" placeholder="Amount" />
                  </div>
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="From Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="gbp">GBP</SelectItem>
                        <SelectItem value="jpy">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="To Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="gbp">GBP</SelectItem>
                        <SelectItem value="jpy">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <RefreshCcw className="mr-2 h-4 w-4" /> Convert
                  </Button>
                </div>
                <div className="mt-4 text-center text-2xl font-bold">
                  1 USD = 0.85 EUR
                </div>
              </CardContent>
            </Card>

            {/* Financial Forecasting */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Forecasting</CardTitle>
                <CardDescription>
                  Projected revenue and expenses for the next 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Line data={forecastData} options={{ responsive: true }} />
              </CardContent>
            </Card>

            {/* Cash Flow Statement with CRUD */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Cash Flow Statement</CardTitle>
                    <CardDescription>
                      Summary of cash inflows and outflows
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Cash Flow Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Cash Flow Item</DialogTitle>
                        <DialogDescription>
                          Enter the details for the new cash flow item.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          handleAddCashFlow({
                            category: formData.get("category"),
                            amount: Number(formData.get("amount")),
                            type: formData.get("type"),
                          });
                          e.currentTarget.reset();
                        }}
                      >
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Category
                            </Label>
                            <Input
                              id="category"
                              name="category"
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                              Amount
                            </Label>
                            <Input
                              id="amount"
                              name="amount"
                              type="number"
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                              Type
                            </Label>
                            <Select name="type" required>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Inflow">Inflow</SelectItem>
                                <SelectItem value="Outflow">Outflow</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add Item</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cashFlowItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>${item.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          {item.type === "Inflow" ? (
                            <span className="text-green-600">
                              <ArrowUpRight className="inline mr-1" /> Inflow
                            </span>
                          ) : (
                            <span className="text-red-600">
                              <ArrowDownRight className="inline mr-1" /> Outflow
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Cash Flow Item</DialogTitle>
                                  <DialogDescription>
                                    Update the cash flow item details.
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(
                                      e.currentTarget
                                    );
                                    handleUpdateCashFlow({
                                      id: item.id,
                                      category: formData.get("category"),
                                      amount: Number(formData.get("amount")),
                                      type: formData.get("type"),
                                    });
                                  }}
                                >
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor={`category-${item.id}`}
                                        className="text-right"
                                      >
                                        Category
                                      </Label>
                                      <Input
                                        id={`category-${item.id}`}
                                        name="category"
                                        defaultValue={item.category}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor={`amount-${item.id}`}
                                        className="text-right"
                                      >
                                        Amount
                                      </Label>
                                      <Input
                                        id={`amount-${item.id}`}
                                        name="amount"
                                        type="number"
                                        defaultValue={item.amount}
                                        className="col-span-3"
                                        required
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor={`type-${item.id}`}
                                        className="text-right"
                                      >
                                        Type
                                      </Label>
                                      <Select
                                        name="type"
                                        defaultValue={item.type}
                                      >
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Inflow">
                                            Inflow
                                          </SelectItem>
                                          <SelectItem value="Outflow">
                                            Outflow
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">Update Item</Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteCashFlow(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Additional Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Revenue per Student
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4,500</div>
                  <p className="text-xs text-muted-foreground">
                    +5.2% from last quarter
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Operational Costs
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$35,000</div>
                  <p className="text-xs text-muted-foreground">
                    -2.5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Profit Margin
                  </CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">41.4%</div>
                  <p className="text-xs text-muted-foreground">
                    +3.2% from last quarter
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
