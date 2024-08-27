"use client";

import Activities from "./components/activities";
import { FaRupeeSign } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormError from "@/components/dynamicComps/form-error";
import FormSuccess from "@/components/dynamicComps/form-success";
import { Suspense, useState, useTransition } from "react";
// import LoadingSpinner from "@/components/loadingspinner";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { unstable_noStore as noStore } from "next/cache";
import { Skeleton } from "@/components/ui/skeleton";

export function FinanceSkeleton() {
    return <Skeleton className="h-4 w-[100px]" />;
  }

function Finances() {
  noStore();
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [contribution, setContribution] = useState({
    type: "contribution",
    studentName: "",
    amount: Number,
  });
  const [expenses, setExpenses] = useState({
    type: "expenses",
    amount: Number,
    purpose: "",
  });

  async function getFinance() {
    const response = await fetch(`/api/finance`);
    const data = await response.json();
    return data;
  }

  const { isFetching, isError, data } = useQuery({
    queryKey: ["finances"],
    queryFn: getFinance,
  });

  const totalContributions = data?.[0].contributions.reduce(
    (acc, mov) => acc + Number(mov.amount),
    0
  );

  const totalExpenses = data?.[0].expenses.reduce(
    (acc, mov) => acc + Number(mov.amount),
    0
  );

  function handleContributionChange(e) {
    const { name, value } = e.target;
    setContribution((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleExpensesChange(e) {
    const { name, value } = e.target;
    setExpenses((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleContributionSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    startTransition(async () => {
      if (!contribution.studentName || !contribution.amount) {
        setError("All fields are required");
      } else if (contribution.amount < 200) {
        setError("Amount is lesser than minimum contribution(200rps)");
      } else {
        try {
          const response = await fetch(
            `/api/finance?query=${contribution.type}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(contribution),
            }
          );
          if (response.status === 200) {
            setContribution({
              type: "",
              studentName: "",
              amount: Number,
            });
            setSuccess("contribution added successfully 🎉");
          } else {
            setContribution({
              type: "",
              studentName: "",
              amount: Number,
            });
            setError("A server error occurred ..try later");
          }
        } catch (error) {
          setError(error.message);
        }
      }
    });
  }
  async function handleExpenseSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    startTransition(async () => {
      if (!expenses.amount || !expenses.purpose) {
        setError("All fields are required");
      } else if (expenses.amount <= 0) {
        setError("enter a valid amount");
      } else {
        try {
          const response = await fetch(`/api/finance?query=${expenses.type}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(expenses),
          });
          if (response.status === 200) {
            setExpenses({
              type: "",
              amount: Number,
              purpose: "",
            });
            setSuccess("Expenses updated successfully");
          } else {
            setExpenses({
              type: "",
              amount: Number,
              purpose: "",
            });
            setError("A server error occurred... try later!");
          }
        } catch (error) {
          setError(error.message);
        }
      }
    });
  }

  return (
    <main>
      <div className="grid gap-4 md:grid-cols-2 w-[90%] mx-auto my-7 ">
        {/* ------------------------------------------------------------------------- */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total contribution
            </CardTitle>
            -<h3 className="font-bold text-xl dark:text-gray-400">INR</h3>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center justify-start">
              <FaRupeeSign />
              {totalContributions ? +totalContributions : <FinanceSkeleton />}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              total amount contributed
            </p>
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------------- */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total expenses
            </CardTitle>
            <h3 className="font-bold text-xl dark:text-gray-400">INR</h3>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center justify-start">
              <FaRupeeSign />
              {totalExpenses ? -totalExpenses : <FinanceSkeleton />}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              total amount spent
            </p>
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------------- */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Revenue Balance
            </CardTitle>
            -<h3 className="font-bold text-xl dark:text-gray-400">INR</h3>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center justify-start">
              <FaRupeeSign />
              {isFetching ? <FinanceSkeleton /> : data[0].total}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Grand total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ----------------------- add new contribution and expenses ----------------------*/}

      <div className="w-[90%] m-auto">
        {session?.user.role === "user" ? (
          <>
            <Card className="w-[98%] m-auto">
              <CardHeader>
                <CardTitle>Create A New Finance</CardTitle>
                <CardDescription>
                  Add a new contribution or expenses to the database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="contribution" className="w-[80%] m-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contribution">
                      New Contribution
                    </TabsTrigger>
                    <TabsTrigger value="expenses">New Expense</TabsTrigger>
                  </TabsList>
                  <TabsContent value="contribution">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contribution</CardTitle>
                        <CardDescription>
                          Add a new contribution here, The amount entered will
                          be added to the total revenue.
                        </CardDescription>
                      </CardHeader>
                      <form onSubmit={handleContributionSubmit}>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label>Type</Label>
                            <Input
                              name="type"
                              disabled
                              defaultValue="contribution"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Name</Label>
                            <Input
                              onChange={handleContributionChange}
                              name="studentName"
                              value={contribution.studentName}
                              placeholder="john doe"
                              disabled={isPending}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>amount</Label>
                            <Input
                              onChange={handleContributionChange}
                              name="amount"
                              value={contribution.amount}
                              type="number"
                              placeholder="Enter amount contributed"
                              disabled={isPending}
                            />
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                          <FormError message={error} />
                          <FormSuccess message={success} />
                          <Button disabled={isPending} type="submit">
                            {isPending ? "wait a sec..." : "Add Contribution"}
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>
                  </TabsContent>
                  <TabsContent value="expenses">
                    <Card>
                      <CardHeader>
                        <CardTitle>New Expenses</CardTitle>
                        <CardDescription>
                          Add a new expenses here, the sum will be deducted from
                          the total contributed.
                        </CardDescription>
                      </CardHeader>
                      <form onSubmit={handleExpenseSubmit}>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label>Type</Label>
                            <Input
                              disabled
                              defaultValue="expenses"
                              name="type"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Amount</Label>
                            <Input
                              onChange={handleExpensesChange}
                              name="amount"
                              value={expenses.amount}
                              type="number"
                              placeholder="Enter Expense amount"
                              disabled={isPending}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Purpose</Label>
                            <Input
                              onChange={handleExpensesChange}
                              name="purpose"
                              value={expenses.purpose}
                              type="text"
                              placeholder="purpose of the expense"
                              disabled={isPending}
                            />
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                          <FormError message={error} />
                          <FormSuccess message={success} />
                          <Button disabled={isPending} type="submit">
                            {isPending ? "Adding Expenses..." : "Add Expense"}
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        ) : (
          "you are not authorized"
        )}
      </div>
      {/* show all expenses and contributions */}
      <h2 className="w-[80%] m-auto">
        Show All expenses and contributions (experimental)
      </h2>
      {/* show all activities information and dates */}
      <Suspense fallback="loading...">
        <Activities
          isFetching={isFetching}
          activities={data && data[0]?.activities.reverse()}
        />
      </Suspense>
    </main>
  );
}

export default Finances;