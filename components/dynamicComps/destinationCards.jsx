"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export function DestinationCard({
  destinationName,
  flagUrl,
  imageUrl,
  studyCost,
  accommodationFee,
  description,
}) {
  // handleClick function for redire
  // async function handleClick(e) {
  //   // redirect to the page containing each contryies universities
  //   redirect(`/programs/${destinationName}`);
  // }

  return (
    <Card className="sm:w-[98%] lg:w-[92%] shadow-md hover:scale-105 hover:shadow-lg ">
      <CardContent>
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className={cn(
            " cursor-pointer overflow-hidden relative h-64 rounded-md shadow-xl space-y-3  flex flex-col justify-between p-4 w-full ",
            " bg-cover " 
          )}
        >
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 hover:bg-black opacity-30"></div>
          <div className="flex flex-row items-center justify-between space-x-4 z-10">
            <Image
              height="50"
              width="50"
              alt="Avatar"
              src={`${flagUrl}`}
              className=" object-cover"
            />
          </div>
        </div>
        <Card className="w-full p-4 pt-0 pb-2 ">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Study in {destinationName}{" "}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold  ">study Cost (yearly):-</span>
                <span className="text-muted-foreground font-semibold">
                  ${studyCost}{" "}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold  ">living Cost (monthly):-</span>
                <span className=" text-muted-foreground font-semibold">
                  ${accommodationFee}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex pt-2 items-center justify-start mt-1">
            <Button
              asChild
              className="text-lg shadow-md hover:shadow-xl hover:scale-105 font-semibold text-decoration-line"
              variant="secondary"
            >
              <Link
                href={`/programs&destinations/destination?destinationName=${destinationName}`}
              >
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}
