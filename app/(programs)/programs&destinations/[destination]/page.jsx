"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { unstable_noStore as noStore } from "next/cache";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import ApplicationForm from "@/components/forms/applicationsForm";
import { countries } from "@/lib/countrydetails";
import QuickFacts from "@/app/(ProgramsPage)/programs/components/QuickFacts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DetailedFacts from "./components/DetailedFact";
import DestinationFacts from "./components/DestinationFacts";
import FullDetailsTabs from "./components/FullDetails";
import DestinationStatistics from "./components/Statistics";
import AdmissionRequirements from "./components/AdmissionRequire";
import LivingCost from "./components/LivingCost";
import RelatedBlog from "@/components/RelatedBlog";

export default function DestinationPage() {
  noStore();
  const searchParams = useSearchParams();
  const countryName = searchParams.get("destinationName");
  const country = countries.find((country) => country.name === countryName);

  const [isPending, startTransition] = useTransition();

  // const [destination, setDestination] = useState({});

  const fetchData = async () => {
    try {
      const data = await fetch(`/api/destination?countryName=${countryName}`);
      const response = await data.json();
      // setDestination(response);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const countryQuery = useQuery({
    queryKey: ["country"],
    queryFn: () => {
      return fetchData();
    },
  });
  return (
    <section className="w-full py-12 md:py-16">
      <div className="  grid gap-20">
        <div className="mb-8 w-[90%] mx-auto relative rounded-lg">
          <Image
            src={country.backgroundUrl}
            alt="study abroad agency @studyJetGlobal"
            width={900}
            height={500}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8 rounded-lg">
            <h1 className=" flex items-center justify-center text-5xl font-extrabold mb-4 text-white">
              Study in {country.name}
            </h1>
            {/* show the basic facts about each programs sub category */}
            <DestinationFacts
              capital={country.capital}
              quickFacts={country.quickFacts}
            />
          </div>
        </div>

        {/* destination description goes here */}
        <div>
          <div className="w-[95%] mx-auto p-4 flex flex-col items-center ">
            {/* Destination Quickfacts and Overview */}
            <Card className="mb-8 w-[90%] mx-auto p-4 flex items-center flex-col justify-center rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Destination Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-md">{country.description}</p>
              </CardContent>
            </Card>
            <div className="w-full flex flex-col items-center justify-center">
              <h2 className=" flex items-center font-bold text-xl mx-auto text-center">
                Quick Facts
              </h2>
              <p>
                Learn the fundamentals of what it takes to be an international
                student in {country.name}
              </p>
              <DetailedFacts details={country.details} />
            </div>
            <br />
            <br />
            <FullDetailsTabs
              tabContent={country.tabContent}
              name={countryName}
            />
            <DestinationStatistics name={countryName} />
            <AdmissionRequirements name={countryName} />
            <LivingCost
              name={countryName}
              livingCost={country.livingCost}
              feedingCost={country.feedingCost}
              transportCost={country.transportCost}
              miscCost={country.miscCost}
            />
            <div className="w-full flex items-center justify-center">
              <h2 className=" flex items-center font-bold text-xl mx-auto text-center">
                Apply to study in {countryName}{" "}
              </h2>
            </div>
            <ApplicationForm />
            <RelatedBlog />
          </div>
        </div>
      </div>
      {/* university display for each destination */}
      {/* <div className="w-[90%] mx-auto"> */}
      {/* <div> */}
      {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Program</span>
              </Link>
              <Image
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Study Abroad Program"
                width={600}
                height={400}
                className="object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-semibold">
                  University of Birmingham
                </h3>
                <p className="text-sm text-muted-foreground">
                  Immerse yourself in the rich culture and history of the City
                  of Light.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-primary font-medium">
                    $12,500 / per year
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Program</span>
              </Link>
              <Image
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Study Abroad Program"
                width={600}
                height={400}
                className="object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-semibold">
                  Royal Global University
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover the vibrant culture and modern technology of Japan.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-primary font-medium">
                    $3,000 / per year
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Program</span>
              </Link>
              <Image
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Study Abroad Program"
                width={600}
                height={400}
                className="object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-semibold">
                  Noida International School
                </h3>
                <p className="text-sm text-muted-foreground">
                  Improve your Spanish skills while exploring the vibrant city
                  of Barcelona.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-primary font-medium">
                    $2,500 / per year
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Program</span>
              </Link>
              <Image
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Study Abroad Program"
                width={600}
                height={400}
                className="object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-semibold">Kaziranga University</h3>
                <p className="text-sm text-muted-foreground">
                  Experience the vibrant culture and stunning natural beauty of
                  Australia.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-primary font-medium">
                    $2,000 / per year
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Program</span>
              </Link>
              <Image
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Study Abroad Program"
                width={600}
                height={400}
                className="object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-semibold">Summer in Cape Town</h3>
                <p className="text-sm text-muted-foreground">
                  Explore the rich history and diverse culture of South Africa.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-primary font-medium">
                    $7,000 / 6 weeks
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Program</span>
              </Link>
              <Image
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Study Abroad Program"
                width={600}
                height={400}
                className="object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-semibold">Semester in London</h3>
                <p className="text-sm text-muted-foreground">
                  Immerse yourself in the rich history and vibrant culture of
                  the UK.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-primary font-medium">
                    $14,000 / 4 months
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </section>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/goT0CURPYKG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// "use client"

// import { useState, useMemo } from "react"
// import { Input } from "@/components/ui/input"
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// export default function Component() {
//   const programs = [
//     {
//       id: 1,
//       category: "Summer",
//       image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       title: "Summer in London",
//       description: "Explore the vibrant city of London while earning credits towards your degree.",
//       link: "#",
//     },
//     {
//       id: 2,
//       category: "Semester",
//       image: "/placeholder.svg",
//       title: "Semester in Tokyo",
//       description: "Immerse yourself in the rich culture and modern technology of Tokyo.",
//       link: "#",
//     },
//     {
//       id: 3,
//       category: "Year",
//       image: "/placeholder.svg",
//       title: "Year in Sydney",
//       description: "Spend a transformative year studying and living in the beautiful city of Sydney.",
//       link: "#",
//     },
//     {
//       id: 4,
//       category: "Summer",
//       image: "/placeholder.svg",
//       title: "Summer in Paris",
//       description: "Experience the romance and history of Paris while taking classes.",
//       link: "#",
//     },
//     {
//       id: 5,
//       category: "Semester",
//       image: "/placeholder.svg",
//       title: "Semester in Barcelona",
//       description: "Immerse yourself in the vibrant culture and stunning architecture of Barcelona.",
//       link: "#",
//     },
//     {
//       id: 6,
//       category: "Year",
//       image: "/placeholder.svg",
//       title: "Year in Cape Town",
//       description: "Explore the natural wonders and diverse communities of Cape Town for a year.",
//       link: "#",
//     },
//   ]
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const filteredPrograms = useMemo(() => {
//     return programs.filter((program) => {
//       const searchMatch = program.title.toLowerCase().includes(searchTerm.toLowerCase())
//       const categoryMatch = selectedCategory === "all" || program.category === selectedCategory
//       return searchMatch && categoryMatch
//     })
//   }, [searchTerm, selectedCategory])
//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32">
//       <div className="container px-4 md:px-6">
//         <div className="grid gap-8">
//           <div className="grid gap-4">
//             <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Study Abroad Programs</h1>
//             <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//               Explore our wide range of study abroad programs and find the perfect fit for your academic and personal
//               goals.
//             </p>
//           </div>
//           <div className="grid gap-4">
//             <div className="flex items-center gap-4">
//               <Input
//                 placeholder="Search programs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="flex-1"
//               />
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" className="flex items-center gap-2">
//                     <span>{selectedCategory === "all" ? "All Categories" : selectedCategory}</span>
//                     <ChevronDownIcon className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem
//                     onSelect={() => setSelectedCategory("all")}
//                     className={selectedCategory === "all" ? "bg-muted" : ""}
//                   >
//                     All Categories
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     onSelect={() => setSelectedCategory("Summer")}
//                     className={selectedCategory === "Summer" ? "bg-muted" : ""}
//                   >
//                     Summer
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onSelect={() => setSelectedCategory("Semester")}
//                     className={selectedCategory === "Semester" ? "bg-muted" : ""}
//                   >
//                     Semester
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onSelect={() => setSelectedCategory("Year")}
//                     className={selectedCategory === "Year" ? "bg-muted" : ""}
//                   >
//                     Year
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//               {filteredPrograms.map((program) => (
//                 <div
//                   key={program.id}
//                   className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out"
//                 >
//                   <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
//                     <span className="sr-only">View {program.title}</span>
//                   </Link>
//                   <img
//                     src="/placeholder.svg"
//                     alt={program.title}
//                     width={500}
//                     height={300}
//                     className="object-cover w-full h-64"
//                   />
//                   <div className="p-4 bg-background">
//                     <h3 className="text-xl font-bold">{program.title}</h3>
//                     <p className="text-sm text-muted-foreground">{program.description}</p>
//                     <div className="mt-4">
//                       <Link
//                         href="#"
//                         className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
//                         prefetch={false}
//                       >
//                         Learn More
//                         <ArrowRightIcon className="h-4 w-4" />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// function ArrowRightIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14" />
//       <path d="m12 5 7 7-7 7" />
//     </svg>
//   )
// }

// function ChevronDownIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m6 9 6 6 6-6" />
//     </svg>
//   )
// }

// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }
