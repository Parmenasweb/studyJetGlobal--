"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "../../../students/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFinanceStore } from "../../store/finance-store";
import { TransactionForm } from "../forms/TransactionForm";
import { StudentPaymentForm } from "../forms/StudentPaymentForm";
import { BudgetForm } from "../forms/BudgetForm";
import { transactionColumns, studentPaymentColumns, budgetColumns } from "../columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FinanceTables() {
  const { finance } = useFinanceStore();
  const [activeTab, setActiveTab] = useState("transactions");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    setIsDialogOpen(false);
  };

  const renderForm = () => {
    switch (activeTab) {
      case "transactions":
        return <TransactionForm onSuccess={handleSuccess} />;
      case "payments":
        return <StudentPaymentForm onSuccess={handleSuccess} />;
      case "budgets":
        return <BudgetForm onSuccess={handleSuccess} />;
      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (activeTab) {
      case "transactions":
        return "Add Transaction";
      case "payments":
        return "Add Student Payment";
      case "budgets":
        return "Add Budget";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Financial Records</CardTitle>
            <CardDescription>
              Manage transactions, payments, and budgets
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{getDialogTitle()}</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new record.
                </DialogDescription>
              </DialogHeader>
              {renderForm()}
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="transactions"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payments">Student Payments</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="mt-4">
            <DataTable
              columns={transactionColumns}
              data={finance.transactions}
              searchKey="category"
            />
          </TabsContent>

          <TabsContent value="payments" className="mt-4">
            <DataTable
              columns={studentPaymentColumns}
              data={finance.studentPayments}
              searchKey="studentId"
            />
          </TabsContent>

          <TabsContent value="budgets" className="mt-4">
            <DataTable
              columns={budgetColumns}
              data={finance.budgets}
              searchKey="category"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 