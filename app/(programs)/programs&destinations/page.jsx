import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/homepagecomps/Footer";
import { countries, featuredPrograms } from "@/lib/countrydetails";
import { programs } from "@/lib/countrydetails";
import FeaturedCards from "./components/featuredPrograms";
import DestinationCard from "./components/DestinationsCard";
import ProgramsCard from "./components/programsCard";
import SearchDestinations from "./components/searchDestination";
import DestinationsCard from "./components/DestinationsCard";

export default function Destinations() {
  return (
    <main>
      <div className="flex flex-col">
        {/* <Navbar /> */}
        <section className="w-full mx-auto sm:py-32 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-foreground px-4 md:px-6">
          <div className="w-full mx-auto sm:py-32 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-foreground px-4 md:px-6 animated-background">
            <div className="container mx-auto max-w-4xl text-center text-primary-foreground">
              <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
                Unlock the World with Our Study Abroad Programs
              </h1>
              <p className="mt-4 text-lg w-[80%] mx-auto">
                Discover life-changing experiences and expand your horizons with
                our curated study abroad programs.
              </p>
              <Link
                href="#"
                className="mt-8 inline-flex items-center rounded-md bg-primary-foreground px-6 py-3 text-sm font-medium text-primary shadow-sm transition-all hover:bg-gradient-to-r hover:from-primary hover:to-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Popular Programs
              </h2>
              <p className="mt-4 text-muted-foreground">
                Discover our most sought-after study abroad programs.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {programs.map((prog, ind) => {
                return (
                  <ProgramsCard
                    key={ind}
                    name={prog.name}
                    imageUrl={prog.imageUrl}
                    description={prog.description}
                    programName={prog.programName}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Explore Destinations
              </h2>
              <p className="mt-4 text-muted-foreground">
                Discover our diverse range of study abroad locations.
              </p>
              <SearchDestinations />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {countries.map((country, ind) => {
                return (
                  <DestinationsCard
                    key={ind}
                    name={country.name}
                    imageUrl={country.backgroundUrl}
                    capital={country.capital}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- */}

        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Study Abroad Programs
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our curated selection of study abroad programs across
                  the globe.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              {featuredPrograms.map((prog, ind) => {
                return (
                  <FeaturedCards
                    key={ind}
                    programName={prog.programName}
                    imageUrl={prog.imageUrl}
                    capital={prog.capital}
                    description={prog.description}
                  />
                );
              })}
            </div>
          </div>
        </section> */}
      </div>
      <Footer />
    </main>
  );
}

function FlagIcon(props) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
