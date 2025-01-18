import { programs } from "@/lib/data/programs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Briefcase,
} from "lucide-react";

export const metadata = {
  title: "Study Abroad Programs - StudyJetGlobal",
  description: "Explore popular study abroad programs across various disciplines and destinations.",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="w-[95%] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Study Abroad Programs
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover world-class academic programs across various disciplines. Find the perfect course to achieve your career goals.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12">
        <div className="w-[95%] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  {/* Program Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{program.name}</h3>
                    </div>
                  </div>

                  {/* Program Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{program.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Career Opportunities</p>
                        <p className="font-medium">{program.careers.join(", ")}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6">
                    <Link href="/onBoarding/applicationForm">
                      <Button className="w-full bg-primary hover:bg-primary/90">Apply Now</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/50">
        <div className="w-[95%] mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help Choosing a Program?</h2>
            <p className="text-muted-foreground mb-6">
              Get personalized guidance from our education experts to find the perfect program for your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onBoarding/consultationForm">
                <Button className="w-full sm:w-auto">Book Free Consultation</Button>
              </Link>
              <Link href="/onBoarding/applicationForm">
                <Button variant="outline" className="w-full sm:w-auto">
                  Apply Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
} 