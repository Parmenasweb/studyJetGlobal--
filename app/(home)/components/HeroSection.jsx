import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GraduationCap, Globe, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      <div className="container px-4 py-24 md:py-32 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Announcement Badge */}
            <Badge variant="secondary" className="px-4 py-2 text-sm animate-fade-in">
              <span className="text-primary">New:</span> 2024 Scholarship Round Now Open
            </Badge>

            {/* Main Heading */}
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-6xl">
              Transform Your Future with{" "}
              <span className="text-primary relative inline-block">
                StudyJet
                <span className="absolute -top-1 -right-4">
                  <Globe className="w-6 h-6 text-primary animate-bounce" />
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-muted-foreground">
              Unlock global opportunities, discover new cultures, and gain an international education that sets you apart.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
              <Button size="lg" asChild className="gap-2">
                <Link href="/onboarding/consultation">
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link href="/scholarship">
                  Explore Scholarships
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
              src="/images/hero-image.jpg"
              alt="Students studying abroad"
              fill
              className="object-cover rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent" />
            
            {/* Floating elements */}
            <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
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