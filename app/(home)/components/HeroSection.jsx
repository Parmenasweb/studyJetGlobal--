import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GraduationCap, Globe, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="w-full overflow-hidden rounded-lg">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-40">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[70%] -translate-x-1/2 rotate-[10deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      <div className=" px-4 py-16 md:py-24 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center sm:w-[90%] mx-auto md:items-start text-center sm:text-left lg:text-left space-y-8">
            {/* Announcement Badge */}
            <Link href="/onBoarding/applicationForm">
              <Badge variant="secondary" className=" flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <span className="text-primary">New:</span> 
                2025 Scholarship Round Now Open
                <ArrowRight className="w-4 h-4 ml-3 opacity-100  transition-all duration-300 animate-pulse animate-in" />
                <span className="relative -top-4 -right-5 w-2 h-2 bg-primary rounded-full z-10 animate-ping pointer-events-none opacity-100" />
              </Badge>
            </Link>

            {/* Main Heading */}
            <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-6xl">
              Transform Your Future with{" "}
              <span className="text-primary relative inline-block">
                StudyJet
                <span className="absolute -top-1 -right-4">
                  <Globe className="w-6 h-6 text-primary animate-bounce" />
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl flex flex-col w-[90%] mx-auto items-center md:items-start text-muted-foreground">
              Unlock global opportunities, discover new cultures, and gain an international education that sets you apart.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-[90%]  mx-auto justify-center lg:justify-start">
              <Button  asChild className="gap-2 w-[80%] ">
                <Link href="/onBoarding/consultationForm">
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button  variant="outline" asChild className="gap-2 w-[80%]">
                <Link href="/onBoarding/applicationForm">
                  Apply Now!
                  <GraduationCap className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 w-full max-w-md">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold text-primary">50+</span>
                <span className="text-sm text-muted-foreground">Universities</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold text-primary">1000+</span>
                <span className="text-sm text-muted-foreground">Students Placed</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold text-primary">25+</span>
                <span className="text-sm text-muted-foreground">Countries</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
            <Image
              src="/images/studyjet-hero-advanced.webp"
              alt="Students studying abroad"
              fill
              className="object-cover rounded-lg"
              priority
              quality={100}
            />
            {/* Overlay gradient */}
            {/* <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent" /> */}
            
            {/* Floating elements */}
            <div className="absolute bottom-8 left-0 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Success Rate</p>
                  <p className="text-2xl font-bold">98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 