"use client";

import { scholarships } from "@/lib/data/scholarships";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  GraduationCap,
  CalendarDays,
  Globe,
  Clock,
  DollarSign,
  ClipboardList,
  CheckCircle2,
  Search,
} from "lucide-react";
import { useState, useMemo } from "react";

const filters = {
  countries: ["All Countries", "United States", "United Kingdom", "Germany", "Australia", "Multiple EU Countries"],
  types: ["All Types", "Merit-based", "Full Scholarship", "Full/Partial Scholarship"],
  levels: ["All Levels", "Bachelor's", "Master's", "PhD"],
};

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  // Filter scholarships based on search query and selected filters
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {
      // Search filter
      const searchMatch = searchQuery === "" || 
        scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Country filter
      const countryMatch = selectedCountry === "All Countries" ||
        scholarship.countries.some(country => country === selectedCountry);

      // Type filter
      const typeMatch = selectedType === "All Types" ||
        scholarship.type === selectedType;

      // Level filter
      const levelMatch = selectedLevel === "All Levels" ||
        scholarship.studyLevels.some(level => level.includes(selectedLevel));

      return searchMatch && countryMatch && typeMatch && levelMatch;
    });
  }, [searchQuery, selectedCountry, selectedType, selectedLevel]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="w-[95%] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Study Abroad Scholarships
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover prestigious scholarships and funding opportunities to support your international education journey.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-[95%] mx-auto px-4">
        <Card className="p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto,auto] gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search scholarships..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {filters.countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {filters.types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {filters.levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Found {filteredScholarships.length} scholarship{filteredScholarships.length !== 1 ? 's' : ''}
          </div>
        </Card>
      </section>

      {/* Scholarships Grid */}
      <section className="py-12">
        <div className="w-[95%] mx-auto px-4">
          {filteredScholarships.length === 0 ? (
            <Card className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No scholarships found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query to find more scholarships.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCountry("All Countries");
                  setSelectedType("All Types");
                  setSelectedLevel("All Levels");
                }}
              >
                Clear all filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredScholarships.map((scholarship) => (
                <Card key={scholarship.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    {/* Scholarship Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{scholarship.name}</h3>
                        <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
                      </div>
                      <Badge className="ml-auto" variant="secondary">
                        {scholarship.type}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">
                      {scholarship.description}
                    </p>

                    {/* Scholarship Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Amount</p>
                          <p className="font-medium">{scholarship.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="font-medium">{scholarship.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Globe className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Country</p>
                          <p className="font-medium">{scholarship.countries.join(", ")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                          <CalendarDays className="h-4 w-4 text-rose-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className="font-medium">{scholarship.deadline}</p>
                        </div>
                      </div>
                    </div>

                    {/* Coverage & Requirements */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <h4 className="font-medium">Coverage</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {scholarship.coverage.map((item, index) => (
                            <Badge key={index} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <ClipboardList className="h-4 w-4 text-indigo-500" />
                          <h4 className="font-medium">Key Requirements</h4>
                        </div>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {scholarship.requirements.slice(0, 3).map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6">
                      <Link href="/onBoarding/consultationForm">
                        <Button className="w-full bg-primary hover:bg-primary/90">Apply for Scholarship</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/50">
        <div className="w-[95%] mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help with Your Scholarship Application?</h2>
            <p className="text-muted-foreground mb-6">
              Get expert guidance on scholarship applications and increase your chances of success.
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