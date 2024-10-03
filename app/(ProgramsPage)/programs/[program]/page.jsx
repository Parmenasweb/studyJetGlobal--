"use client";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Home,
  Book,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import QuickFacts from "../components/QuickFacts";
import FaqsPrograms from "../components/FaqsPrograms";
import ChatAi from "../components/ChatAi";
import { programs } from "@/lib/countrydetails";
import { useRouter } from "next/navigation";
import Footer from "@/components/homepagecomps/Footer";

export default function ProgramDetails({ params }) {
  const program = programs.find(
    (program) => program.programName === params.program
  );
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Image */}
      <div className="mb-8 relative">
        <Image
          src={program.imageUrl}
          alt="study abroad agency @studyJetGlobal"
          width={800}
          height={400}
          className="w-full h-[400px] object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Study {program.name}
          </h1>
          {/* show the basic facts about each programs sub category */}
          <QuickFacts quickFacts={program.quickFacts} />
        </div>
      </div>

      {/* Program Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Program Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{program.description}</p>
        </CardContent>
      </Card>

      {/* Eligibility Requirements */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Eligibility Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {program.eligibilityRequirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Program Duration */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Program Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Choose from flexible program lengths to fit your schedule:</p>
          <ul className="list-disc pl-5 mt-2">
            {program.programDurations.map((duration, index) => (
              <li key={index}>{duration}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Application Process */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Application Process</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5">
            {program.applicationSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <p className="mt-4">Application deadlines:</p>
          <ul className="list-disc pl-5">
            {program.applicationDeadlines.map((deadline, index) => (
              <li key={index}>
                {deadline.term}: {deadline.date}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Accommodation Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Accommodation Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {program.accommodationOptions.map((option, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">{option.title}</h3>
                <p>{option.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Costs and Financial Aid */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Costs and Financial Aid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Program Fees</h3>
              <ul className="list-disc pl-5">
                {program.programFees.map((fee, index) => (
                  <li key={index}>
                    {fee.duration}: {fee.fee}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is Included</h3>
              <ul className="list-disc pl-5">
                {program.includedItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Financial Aid</h3>
              <p>
                We have Various scholarships opportunities available, our
                experienced consultants will help you avail possible
                scholarships once you start your application process or if you
                book a consultation with us .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <FaqsPrograms />
        </CardContent>
      </Card>

      {/* Related Programs */}
      <Card className="mb-20">
        <CardHeader>
          <CardTitle>Related Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => {
              if (program.programName !== params.program) {
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{program.name}</CardTitle>
                      <CardDescription>
                        {program.quickFacts[0].text}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{program.description.substring(0, 30)}...</p>
                      <Link
                        href={`/programs/${program.programName}`}
                        className="text-primary hover:underline mt-2 inline-block"
                      >
                        Learn More
                      </Link>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        </CardContent>
      </Card>

      {/* Apply Now Button (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Ready to apply?</div>
          <Button
            onClick={() => {
              router.push("/onBoarding/applicationForm");
            }}
            size="lg"
          >
            Apply Now
          </Button>
        </div>
      </div>

      {/* Chat Feature */}
      <div className="fixed bottom-20 right-4 z-50">
        <ChatAi />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
