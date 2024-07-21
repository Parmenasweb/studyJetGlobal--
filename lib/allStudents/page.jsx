"use client";

import LoadingSkeleton from "./LoadingSkeleton";
import UserCard from "@/components/User";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AllStudents() {
  const { data: session, status } = useSession();
  const fetchAllStudents = async () => {
    const data = await fetch("/api/user");
    const response = await data.json();
    return response;
  };

  const router = useRouter();
  // const [id, setId] = useState("");

  // useEffect(() => {
  //   setId(props.student._id);
  // }, [props.student._id]);

  const { isPending, error, data } = useQuery({
    queryKey: ["students"],
    queryFn: fetchAllStudents,
  });

  if (isPending) return "loading...";

  if (error) return "error occured..." + error.message;

  return (
    <Card className="w-[90%] mx-auto">
      <CardHeader className="pb-0">
        <CardTitle>Student Information</CardTitle>
        <CardDescription>Search for a student by name</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            className="pl-8"
            placeholder="Search students..."
            type="search"
          />
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>country</TableHead>
                <TableHead>birthday</TableHead>
                <TableHead>department</TableHead>
                <TableHead className="w-[150px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((student) => {
                return (
                  <TableRow key={student._id}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {student.nationality}
                    </TableCell>
                    <TableCell>{student.birthday}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell className="flex  justify-between">
                      <Button
                        disabled={session.role === "user"}
                        onClick={() => {
                          router.push(
                            `/dashboard/editStudent?id=${student._id}`
                          );
                        }}
                        className=""
                      >
                        edit
                      </Button>
                      <Button
                        disabled={session.role === "user"}
                        onClick={() => {
                          router.push(
                            `/dashboard/deleteStudent?id=${student._id}`
                          );
                        }}
                        className=""
                      >
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

// function AllStudent() {

//   return (
//     <div className="container flex w-[95%] m-auto items-center justify-center flex-col">
//       <div className="header h-12 w-[100%] mx-auto my-3 flex flex-row items-center justify-start border ">
//         <h1 className=" flex items-center flex-grow font-bold text-2xl justify-center ">
//           All African Students (ADTU)
//         </h1>
//       </div>
//       <div className=" w-full h-full flex-wrap flex justify-around">
//         <section>
//           all Leaders
//             <DisplayLeaders />
//           </section>
//         <section>
//           all students
//           <DisplayStudents />
//           </section>
//       </div>
//     </div>
//   );
// }

// export default AllStudent;
