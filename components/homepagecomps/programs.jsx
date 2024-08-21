"use client";
import { cn } from "@/lib/utils";
import { DestinationCard } from "../dynamicComps/destinationCards";
// import { countries } from "@/lib/countrydetails";
// import { redirect } from "next/navigation";
// import { useEffect, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { unstable_noStore as noStore } from "next/cache";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// skeleton for loading each country
export function ProgramSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 items-center  justify-around w-[90%] mx-auto p-8 ">
      {/* ----------------------------------card 1 -------------- */}

      <Card className="sm:w-[98%] lg:w-[92%] shadow-md hover:scale-105 hover:shadow-lg ">
        <CardContent>
          <div
            className={cn(
              " cursor-pointer overflow-hidden relative h-64 rounded-md shadow-xl space-y-3 bg-slate-400 animate-pulse flex flex-col justify-between p-4 w-full "
            )}
          >
            <div className="absolute w-full h-full top-0 left-0 transition duration-300 hover:bg-black opacity-30"></div>
            <div className="flex flex-row items-center h-12 w-12 bg-slate-300 animate-pulse justify-between space-x-4 z-10 rounded-md"></div>
          </div>
          <Card className="w-full p-4 pt-0 pb-2 ">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                <div className="h-[2px] w-[100px] animate-pulse bg-slate-300"></div>
              </CardTitle>
              <CardDescription>
                <div className="h-[2px] w-[80%] animate-pulse bg-slate-300"></div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold  ">study Cost (yearly):-</span>
                  <span className="text-muted-foreground font-semibold">-</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold  ">
                    living Cost (monthly):-
                  </span>
                  <span className=" text-muted-foreground font-semibold">
                    -
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex pt-2 items-center justify-start mt-1">
              <Button
                className="text-lg shadow-md hover:shadow-xl hover:scale-105 font-semibold text-decoration-line"
                variant="secondary"
              >
                Loading...
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
      <Card className="sm:w-[98%] lg:w-[92%] shadow-md hover:scale-105 hover:shadow-lg ">
        <CardContent>
          <div
            className={cn(
              " cursor-pointer overflow-hidden relative h-64 rounded-md shadow-xl space-y-3 bg-slate-400 animate-pulse flex flex-col justify-between p-4 w-full "
            )}
          >
            <div className="absolute w-full h-full top-0 left-0 transition duration-300 hover:bg-black opacity-30"></div>
            <div className="flex flex-row items-center h-12 w-12 bg-slate-300 animate-pulse justify-between space-x-4 z-10 rounded-md"></div>
          </div>
          <Card className="w-full p-4 pt-0 pb-2 ">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                <div className="h-[2px] w-[100px] animate-pulse bg-slate-300"></div>
              </CardTitle>
              <CardDescription>
                <div className="h-[2px] w-[80%] animate-pulse bg-slate-300"></div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold  ">study Cost (yearly):-</span>
                  <span className="text-muted-foreground font-semibold">-</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold  ">
                    living Cost (monthly):-
                  </span>
                  <span className=" text-muted-foreground font-semibold">
                    -
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex pt-2 items-center justify-start mt-1">
              <Button
                className="text-lg shadow-md hover:shadow-xl hover:scale-105 font-semibold text-decoration-line"
                variant="secondary"
              >
                Loading...
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
      <Card className="sm:w-[98%] lg:w-[92%] shadow-md hover:scale-105 hover:shadow-lg ">
        <CardContent>
          <div
            className={cn(
              " cursor-pointer overflow-hidden relative h-64 rounded-md shadow-xl space-y-3 bg-slate-400 animate-pulse flex flex-col justify-between p-4 w-full "
            )}
          >
            <div className="absolute w-full h-full top-0 left-0 transition duration-300 hover:bg-black opacity-30"></div>
            <div className="flex flex-row items-center h-12 w-12 bg-slate-300 animate-pulse justify-between space-x-4 z-10 rounded-md"></div>
          </div>
          <Card className="w-full p-4 pt-0 pb-2 ">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                <div className="h-[2px] w-[100px] animate-pulse bg-slate-300"></div>
              </CardTitle>
              <CardDescription>
                <div className="h-[2px] w-[80%] animate-pulse bg-slate-300"></div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold  ">study Cost (yearly):-</span>
                  <span className="text-muted-foreground font-semibold">-</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold  ">
                    living Cost (monthly):-
                  </span>
                  <span className=" text-muted-foreground font-semibold">
                    -
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex pt-2 items-center justify-start mt-1">
              <Button
                className="text-lg shadow-md hover:shadow-xl hover:scale-105 font-semibold text-decoration-line"
                variant="secondary"
              >
                Loading...
              </Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Programs() {
  noStore();
  const getDestinations = async () => {
    const response = await fetch("/api/destination");
    const data = await response.json();
    console.log(data);
    return data;
  };

  // function handleClick(countryName) {
  //   redirect(`/programs&destinations/${countryName}`);
  // }

  const destinationQuery = useQuery({
    queryKey: ["destinations"],
    queryFn: () => {
      return getDestinations();
    },
  });
  // fetch all destinations array from the database and render it here

  return (
    <main className="  ">
      <h2 className="flex text-center items-center text-2xl font-bold my-4  justify-center">
        Our Top Study Destinations and Programs
      </h2>
      <div>
        <p className="flex flex-col items-center font-semibold text-md my-3 justify-center w-[90%] mx-auto text-center">
          explore our top study abroad destinations and find the perfect fit for
          your academic and cultural goals
        </p>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 items-center  justify-around w-[90%] mx-auto p-8 ">
          {destinationQuery.isPending ? (
            <ProgramSkeleton />
          ) : (
            destinationQuery.data?.map((country, ind) => (
              <DestinationCard
                key={ind}
                destinationName={country.destinationName}
                flagUrl={country.flagUrl}
                imageUrl={country.imageUrl}
                studyCost={country.studyCost}
                accommodationFee={country.accommodationFee}
                description={country.description}
                countryId={country._id}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
