"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRupeeSign } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { unstable_noStore as noStore } from "next/cache";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";

export function LoadingActivities() {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">loading...</TableCell>
        <TableCell className=" ">loading...</TableCell>
        <TableCell className="font-medium  text-right">loading...</TableCell>
      </TableRow>
    </>
  );
}

function Activities({ activities, isFetching }) {
  noStore();
  const [filteredActivities, setFilteredActivities] = useState(null);

  useEffect(() => {
    activities && setFilteredActivities(activities.reverse());
  }, [activities]);

  function handleClick(e) {
    e.preventDefault();
    setFilteredActivities(
      activities.reverse().filter((act) => act.type === e.target.name)
    );
  }

  return (
    <main className="my-5 w-[90%] mx-auto">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <CardTitle>Recent Activities</CardTitle>
          <p className="font-semibold">Sort By: </p>

          <div className="flex items-center justify-between">
            <Button
              name="contribution"
              onClick={handleClick}
              className="ml-auto active:bg-slate-500 "
              size="sm"
            >
              Contributions
            </Button>
            <Button
              name="expenses"
              onClick={handleClick}
              className="ml-auto active:bg-slate-500 "
              size="sm"
            >
              expenses
            </Button>
            <Button
              name="Registration"
              onClick={handleClick}
              className="ml-auto active:bg-slate-500 "
              size="sm"
            >
              Registrations
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <Table>
            <TableCaption>A List of all recent activities... </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Type</TableHead>
                <TableHead className=" w-[50%]">Activity</TableHead>
                <TableHead className="w-[25%] text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!filteredActivities ? (
                <LoadingActivities />
              ) : (
                filteredActivities.map((act, ind) => {
                  if (act.type === "contribution") {
                    return (
                      <TableRow key={ind}>
                        <TableCell className="font-medium">
                          <FaRupeeSign className=" inline " />
                          {act.type}
                        </TableCell>
                        <TableCell className="font-semibold ">
                          {act.studentName} paid{" "}
                          <FaRupeeSign className=" inline " />
                          {act.amount} to the Treasury
                        </TableCell>
                        <TableCell className=" text-md text-right font-semibold">
                          {act.date}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  if (act.type === "expenses") {
                    return (
                      <TableRow key={ind}>
                        <TableCell className="font-medium">
                          <FaRupeeSign className=" inline " />
                          {act.type}
                        </TableCell>
                        <TableCell className=" font-semibold ">
                          {act.purpose} Expenses{" "}
                          <FaRupeeSign className=" inline " />
                          {act.amount}
                        </TableCell>
                        <TableCell className="text-md text-right font-semibold">
                          {act.date}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  if (act.type === "Registration") {
                    return (
                      <TableRow key={ind}>
                        <TableCell className="font-medium">
                          <FaUser className=" inline " />
                          New Registration
                        </TableCell>
                        <TableCell className="font-semibold ">
                          Welcome {act.name} From {act.country} to the
                          Institution
                        </TableCell>
                        <TableCell className="font-medium  text-right">
                          {act.date}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

export default Activities;