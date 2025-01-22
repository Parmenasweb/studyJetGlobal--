import { destinations } from "@/lib/data/destinations";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DestinationImage } from "../components/DestinationImage";
import {
  Globe2,
  GraduationCap,
  Building2,
  Users,
  Clock,
  Briefcase,
  DollarSign,
  BookOpen,
  Home,
  Plane,
  Heart,
  Award,
  FileText,
  MapPin,
  Calendar,
  Languages,
  Wallet,
  Sun,
  Clock3,
  ArrowLeft,
  Layout,
  ClipboardCheck,
  Stamp,
} from "lucide-react";
import Link from "next/link";

async function getDestination(id) {
  return destinations.find(d => d.id === id) || null;
}

export async function generateMetadata({ params }) {
  const destination = await getDestination(params.destinationId);
  if (!destination) return { title: 'Destination Not Found' };
  
  return {
    title: `Study in ${destination.name} - StudyJetGlobal`,
    description: destination.description,
    openGraph: {
      title: `Study in ${destination.name}`,
      description: destination.description,
      images: [destination.media.mainImage.url],
    },
  };
}

export default async function DestinationPage({ params }) {
  const destination = await getDestination(params.destinationId);
  if (!destination) notFound();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Floating Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/destinations">
          <Button variant="secondary" size="sm" className="gap-2 shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[600px]">
        <div className="absolute inset-0">
          <DestinationImage
            src={destination.media.mainImage.url}
            alt={destination.media.mainImage.alt}
            fill
            priority
            className="brightness-75"
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6 animate-fade-in">
                <div className="relative w-[80px] h-[50px] rounded-md overflow-hidden shadow-lg">
                  <Image
                    src={destination.media.flagImage.url}
                    alt={destination.media.flagImage.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                    Study in {destination.name}
                  </h1>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{destination.capital}</span>
                  </div>
                </div>
              </div>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl animate-fade-in-up">
                {destination.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-muted/50">
        <div className="w-full mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { 
                icon: Building2, 
                label: "Universities", 
                value: destination.overview.totalUniversities,
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              { 
                icon: Users, 
                label: "International Students", 
                value: destination.overview.internationalStudents,
                color: "text-green-500",
                bg: "bg-green-500/10"
              },
              { 
                icon: Clock, 
                label: "Post Study Work", 
                value: destination.overview.postStudyWork,
                color: "text-orange-500",
                bg: "bg-orange-500/10"
              },
              { 
                icon: DollarSign, 
                label: "Avg. Tuition", 
                value: destination.overview.averageTuitionRange,
                color: "text-purple-500",
                bg: "bg-purple-500/10"
              },
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="p-4 md:p-6 text-center bg-background hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <p className="text-xl md:text-2xl font-bold mb-1 line-clamp-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-background">
        <div className="w-full mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {destination.media.galleryImages.map((image, index) => (
              <div key={index} className="relative w-full aspect-[4/3] group overflow-hidden rounded-lg">
                <DestinationImage
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <p className="text-sm text-white">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="w-full mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-5xl  mx-auto grid-cols-3 md:grid-cols-6 gap-2 mb-12">
              <TabsTrigger value="overview" className="flex items-center gap-2 text-sm md:text-base  ">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Layout className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
                </div>
                <span className="hidden md:inline">Overview</span>
                <span className="md:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <GraduationCap className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                </div>
                <span className="hidden md:inline">Programs</span>
                <span className="md:hidden">Study</span>
              </TabsTrigger>
              <TabsTrigger value="requirements" className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <ClipboardCheck className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                </div>
                <span className="hidden md:inline">Requirements</span>
                <span className="md:hidden">Reqs</span>
              </TabsTrigger>
              <TabsTrigger value="costs" className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
                </div>
                <span className="hidden md:inline">Costs</span>
                <span className="md:hidden">Fees</span>
              </TabsTrigger>
              <TabsTrigger value="visa" className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Stamp className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                </div>
                <span>Visa</span>
              </TabsTrigger>
              <TabsTrigger value="life" className="flex items-center gap-2 text-sm md:text-base">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <Heart className="w-3 h-3 md:w-4 md:h-4 text-pink-500" />
                </div>
                <span>Life</span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-fade-in">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Quick Facts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Globe2, label: "Population", value: destination.quickFacts?.population, color: "text-cyan-500", bg: "bg-cyan-500/10" },
                    { icon: Languages, label: "Language", value: destination.quickFacts?.language, color: "text-indigo-500", bg: "bg-indigo-500/10" },
                    { icon: Wallet, label: "Currency", value: destination.quickFacts?.currency, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { icon: Sun, label: "Climate", value: destination.quickFacts?.climate, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                    { icon: Clock3, label: "Time Zone", value: destination.quickFacts?.timeZone, color: "text-rose-500", bg: "bg-rose-500/10" },
                    { icon: DollarSign, label: "GDP", value: destination.quickFacts?.gdp, color: "text-violet-500", bg: "bg-violet-500/10" },
                  ].map((fact, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className={`p-2 rounded-lg ${fact.bg} group-hover:bg-opacity-20 transition-colors`}>
                        <fact.icon className={`h-5 w-5 ${fact.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{fact.label}</p>
                        <p className="font-medium">{fact.value || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Education System & Work Opportunities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Education System</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-400" />
                      <span className="text-muted-foreground">Top Universities</span>
                      </div>
                      <span>{destination.overview.topRankedUniversities}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-400" />
                      <span className="text-muted-foreground">Acceptance Rate</span>
                      </div>
                      <span>{destination.overview.averageAcceptanceRate}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Work Opportunities</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-400" />
                        <span className="text-muted-foreground">Work While Studying</span>
                      </div>
                      <span>{destination.overview.workWhileStudying}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-400" />
                        <span className="text-muted-foreground">Average Salary</span>
                      </div>
                      <span>{destination.overview.averageGraduateSalary}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA Section */}
              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
                <p className="text-muted-foreground mb-6">Take the first step towards your international education</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/onBoarding/consultationForm">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                      Book Free Consultation
                    </Button>
                  </Link>
                  <Link href="/onBoarding/applicationForm">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-8 animate-fade-in">
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Popular Programs</h2>
                    <p className="text-sm text-muted-foreground">Most sought-after courses</p>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {destination.popularPrograms?.map((program, index) => (
                    <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300">
                      <h3 className="font-semibold mb-2">{program.name}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-blue-400" />
                          <span>{program.avgTuition}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="w-4 h-4 text-blue-400" />
                            <span className="font-medium text-foreground">Career Opportunities:</span>
                          </div>
                          <ul className="list-disc list-inside pl-1 space-y-1">
                            {program.careers?.map((career, idx) => (
                              <li key={idx} className="text-muted-foreground">{career}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {/* CTA Section */}
                <div className="mt-8 text-center">
                  <Link href="/onBoarding/applicationForm">
                    <Button className="bg-primary hover:bg-primary/90">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-8 animate-fade-in">
              <div className="grid gap-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Admission Requirements</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                        Undergraduate Requirements
                      </h3>
                      <ul className="space-y-2">
                        {destination.admissionRequirements?.undergraduate.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Postgraduate Requirements
                    </h3>
                      <ul className="space-y-2">
                        {destination.admissionRequirements?.postgraduate.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">English Language Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Undergraduate</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">IELTS</p>
                          <p className="font-medium">{destination.studyInfo?.englishRequirements?.undergraduate?.ielts}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">TOEFL</p>
                          <p className="font-medium">{destination.studyInfo?.englishRequirements?.undergraduate?.toefl}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Postgraduate</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">IELTS</p>
                          <p className="font-medium">{destination.studyInfo?.englishRequirements?.postgraduate?.ielts}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">TOEFL</p>
                          <p className="font-medium">{destination.studyInfo?.englishRequirements?.postgraduate?.toefl}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="costs" className="space-y-8 animate-fade-in">
              <div className="grid gap-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Tuition Fees</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Undergraduate Programs</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Public Universities</span>
                          <span className="font-medium">{destination.studyInfo?.averageTuitionFee?.undergraduate?.public}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Private Universities</span>
                          <span className="font-medium">{destination.studyInfo?.averageTuitionFee?.undergraduate?.private}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Postgraduate Programs</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Public Universities</span>
                          <span className="font-medium">{destination.studyInfo?.averageTuitionFee?.postgraduate?.public}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Private Universities</span>
                          <span className="font-medium">{destination.studyInfo?.averageTuitionFee?.postgraduate?.private}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Living Costs</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(destination.quickFacts?.costOfLiving?.monthly || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="visa" className="space-y-8 animate-fade-in">
              <div className="grid gap-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Visa Information</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Details</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-muted-foreground">Visa Type</p>
                          <p className="font-medium">{destination.studyInfo?.visaInfo?.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Processing Time</p>
                          <p className="font-medium">{destination.studyInfo?.visaInfo?.processingTime}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {destination.studyInfo?.visaInfo?.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Work Rights</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-2">During Study</p>
                      <p>{destination.studyInfo?.visaInfo?.workRights?.duringStudy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">Post Study</p>
                      <p>{destination.studyInfo?.visaInfo?.workRights?.postStudy}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="life" className="space-y-8 animate-fade-in">
              <div className="grid gap-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Accommodation</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {destination.livingInfo?.accommodation?.types.map((type, index) => (
                      <Card key={index} className="p-4">
                        <h3 className="font-semibold mb-2">{type.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">Cost: {type.cost}</p>
                        <ul className="space-y-1 text-sm">
                          {type.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Transportation</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Public Transport</h3>
                      <p className="text-muted-foreground mb-2">Available Options:</p>
                      <div className="flex flex-wrap gap-2">
                        {destination.livingInfo?.transportation?.public?.types?.map((type, index) => (
                          <Badge key={index} variant="secondary">{type}</Badge>
                        ))}
                      </div>
                      <p className="mt-3">
                        <span className="text-muted-foreground">Monthly Cost: </span>
                        <span className="font-medium">{destination.livingInfo?.transportation?.public?.cost}</span>
                      </p>
                      {destination.livingInfo?.transportation?.public?.studentDiscount && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Student discounts available
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Additional Transport Options</h3>
                      {destination.livingInfo?.transportation?.cycling && (
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Cycling: </span>
                            {destination.livingInfo.transportation.cycling.availability}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Bike Share: </span>
                            {destination.livingInfo.transportation.cycling.bikeshare}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Healthcare</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Insurance</h3>
                      <div className="space-y-2">
                        <p>
                          <span className="text-muted-foreground">Annual Cost: </span>
                          <span className="font-medium">{destination.livingInfo?.healthcare?.insurance?.cost}</span>
                        </p>
                        <div>
                          <p className="text-muted-foreground mb-2">Coverage:</p>
                        <div className="flex flex-wrap gap-2">
                            {destination.livingInfo?.healthcare?.insurance?.coverage.map((item, index) => (
                              <Badge key={index} variant="secondary">{item}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Medical Facilities</h3>
                      <ul className="space-y-2">
                        {destination.livingInfo?.healthcare?.facilities.map((facility, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{facility}</span>
                          </li>
                        ))}
                      </ul>
                      </div>
                    </div>
                  </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="w-full mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey in {destination.name}?
            </h2>
            <p className="text-muted-foreground mb-6">
              Get personalized guidance on admission requirements, visa process, and more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Download Guide
              </Button>
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
} 