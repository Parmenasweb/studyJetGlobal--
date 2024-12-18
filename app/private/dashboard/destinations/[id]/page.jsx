import { notFound } from "next/navigation";
import { getDestination } from "@/actions/destination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Edit, Globe, School, GraduationCap } from "lucide-react";

export default async function DestinationPage({ params }) {
  const { data: destination, error } = await getDestination(params.id);

  if (error || !destination) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Globe className="h-8 w-8" />
            {destination.name}
          </h2>
          <p className="text-muted-foreground">
            Study destination details and management
          </p>
        </div>
        <Button asChild>
          <Link href={`/private/dashboard/destinations/${params.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" /> Edit Destination
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={destination.media.mainImage}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={destination.media.flagImage}
                      alt={`${destination.name} flag`}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{destination.name}</h3>
                    <p className="text-muted-foreground">
                      Capital: {destination.capital}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    destination.status === "active"
                      ? "success"
                      : destination.status === "inactive"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {destination.status}
                </Badge>
                <p>{destination.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="study">Study Information</TabsTrigger>
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
                <CardDescription>Key information about {destination.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Population</p>
                    <p className="text-sm text-muted-foreground">
                      {destination.quickFacts.population}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">
                      {destination.quickFacts.language}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Currency</p>
                    <p className="text-sm text-muted-foreground">
                      {destination.quickFacts.currency}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">International Students</p>
                    <p className="text-sm text-muted-foreground">
                      {destination.quickFacts.internationalStudents}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Average Cost of Living</p>
                    <p className="text-sm text-muted-foreground">
                      ${destination.quickFacts.averageCostOfLiving.toLocaleString()} USD/year
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Climate</p>
                    <p className="text-sm text-muted-foreground">
                      {destination.quickFacts.climateInfo}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Performance metrics and data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Student Satisfaction</p>
                    <p className="text-2xl font-bold">
                      {destination.statistics.studentSatisfactionRate}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Employment Rate</p>
                    <p className="text-2xl font-bold">
                      {destination.statistics.employmentRate}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">International Student Ratio</p>
                    <p className="text-2xl font-bold">
                      {destination.statistics.internationalStudentRatio}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="study" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Study Information</CardTitle>
                <CardDescription>Academic details and requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Average Tuition Fee</p>
                      <p className="text-2xl font-bold">
                        ${destination.studyInfo.averageTuitionFee.toLocaleString()} USD/year
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Academic Year</p>
                      <p className="text-lg">
                        {destination.studyInfo.academicYear}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Major Cities</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.studyInfo.majorCities.map((city) => (
                        <Badge key={city} variant="secondary">
                          {city}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Popular Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.studyInfo.popularPrograms.map((program) => (
                        <Badge key={program} variant="secondary">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="universities" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Universities</h3>
                <p className="text-sm text-muted-foreground">
                  Partner universities in {destination.name}
                </p>
              </div>
              <Button asChild>
                <Link
                  href={`/private/dashboard/destinations/${params.id}/universities/new`}
                >
                  <School className="mr-2 h-4 w-4" /> Add University
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.universities.map((university) => (
                <Card key={university._id}>
                  <CardHeader>
                    <CardTitle>{university.name}</CardTitle>
                    <CardDescription>{university.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {university.ranking && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Ranking:</span>
                          <Badge variant="secondary">#{university.ranking}</Badge>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium mb-1">Programs:</p>
                        <div className="flex flex-wrap gap-1">
                          {university.programs.map((program) => (
                            <Badge key={program.name} variant="outline">
                              {program.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scholarships" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Scholarships</h3>
                <p className="text-sm text-muted-foreground">
                  Available scholarships for {destination.name}
                </p>
              </div>
              <Button asChild>
                <Link
                  href={`/private/dashboard/destinations/${params.id}/scholarships/new`}
                >
                  <GraduationCap className="mr-2 h-4 w-4" /> Add Scholarship
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.scholarships.map((scholarship) => (
                <Card key={scholarship._id}>
                  <CardHeader>
                    <CardTitle>{scholarship.name}</CardTitle>
                    <CardDescription>
                      ${scholarship.amount.toLocaleString()} USD
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scholarship.criteria && (
                        <div>
                          <p className="text-sm font-medium">Criteria:</p>
                          <p className="text-sm text-muted-foreground">
                            {scholarship.criteria}
                          </p>
                        </div>
                      )}
                      {scholarship.deadline && (
                        <div>
                          <p className="text-sm font-medium">Deadline:</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(scholarship.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 