import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { scholarships } from "@/lib/countrydetails";
import ScholarshipCard from "./components/schorlarshipCard";
import Footer from "@/components/homepagecomps/Footer";

export default function Component() {
  return (
    <main className="flex-1">
      <section className="w-full p-12 pt-32 border-y bg-gradient-to-r from-primary to-primary-foreground">
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div className="text-primary-foreground">
              <h1 className="text-4xl text-center font-bold tracking-tight sm:text-5xl md:text-6xl">
                Unlock Your Global Potential with Our Scholarships
              </h1>
              <p className="text-lg md:text-xl">
                Explore a world of opportunities and find the perfect
                scholarship to fund your study abroad dreams.
              </p>
              <div className="mt-6 space-x-4">
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Browse Scholarships
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 md:grid-cols-[250px_2fr] gap-8 px-4 md:px-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Filter Scholarships</h2>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Location</h3>
              <div className="space-y-1">
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Europe</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Asia</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>North America</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>South America</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Africa</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Oceania</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Program</h3>
              <div className="space-y-1">
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Undergraduate</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Graduate</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Doctorate</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Language</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Internship</span>
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {scholarships.map((item, ind) => {
              return (
                <ScholarshipCard
                  key={ind}
                  name={item.name}
                  description={item.description}
                  imageUrl={item.imageUrl}
                />
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

// function MountainIcon(props) {
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
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   );
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
//   );
// }
