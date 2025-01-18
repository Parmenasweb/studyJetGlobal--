"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calculator,
  GraduationCap,
  DollarSign,
  Plane,
  Building2,
  Briefcase,
  BookOpen,
  Home,
  UtensilsCrossed,
  Bus,
  Wifi,
  ShoppingBag,
} from "lucide-react";

// Data for calculations
const destinations = {
  india: {
    name: "India",
    tuitionRange: { min: 1500, max: 2500 },
    livingCosts: {
      accommodation: { monthly: 100, yearly: 1000 },
      food: { monthly: 70, yearly: 100 },
      transport: { monthly: 5, yearly: 50 },
      utilities: { monthly: 12, yearly: 60 },
      misc: { monthly: 10, yearly: 100 },
    },
    currency: "USD",
  },
  usa: {
    name: "United States",
    tuitionRange: { min: 15000, max: 40000 },
    livingCosts: {
      accommodation: { monthly: 800, yearly: 9600 },
      food: { monthly: 400, yearly: 4800 },
      transport: { monthly: 100, yearly: 1200 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 300, yearly: 3600 },
    },
    currency: "USD",
  },
  uk: {
    name: "United Kingdom",
    tuitionRange: { min: 12000, max: 35000 },
    livingCosts: {
      accommodation: { monthly: 700, yearly: 8400 },
      food: { monthly: 300, yearly: 3600 },
      transport: { monthly: 150, yearly: 1800 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "GBP",
  },
  canada: {
    name: "Canada",
    tuitionRange: { min: 15000, max: 35000 },
    livingCosts: {
      accommodation: { monthly: 800, yearly: 9600 },
      food: { monthly: 400, yearly: 4800 },
      transport: { monthly: 120, yearly: 1440 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 300, yearly: 3600 },
    },
    currency: "CAD",
  },
  australia: {
    name: "Australia",
    tuitionRange: { min: 20000, max: 45000 },
    livingCosts: {
      accommodation: { monthly: 1000, yearly: 12000 },
      food: { monthly: 500, yearly: 6000 },
      transport: { monthly: 150, yearly: 1800 },
      utilities: { monthly: 200, yearly: 2400 },
      misc: { monthly: 300, yearly: 3600 },
    },
    currency: "AUD",
  },
  ireland: {
    name: "Ireland",
    tuitionRange: { min: 10000, max: 30000 },
    livingCosts: {
      accommodation: { monthly: 800, yearly: 9600 },
      food: { monthly: 400, yearly: 4800 },
      transport: { monthly: 120, yearly: 1440 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "EUR",
  },
  newzealand: {
    name: "New Zealand",
    tuitionRange: { min: 18000, max: 35000 },
    livingCosts: {
      accommodation: { monthly: 800, yearly: 9600 },
      food: { monthly: 400, yearly: 4800 },
      transport: { monthly: 120, yearly: 1440 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "NZD",
  },
  germany: {
    name: "Germany",
    tuitionRange: { min: 0, max: 3000 },
    livingCosts: {
      accommodation: { monthly: 700, yearly: 8400 },
      food: { monthly: 350, yearly: 4200 },
      transport: { monthly: 100, yearly: 1200 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "EUR",
  },
  france: {
    name: "France",
    tuitionRange: { min: 3000, max: 15000 },
    livingCosts: {
      accommodation: { monthly: 700, yearly: 8400 },
      food: { monthly: 350, yearly: 4200 },
      transport: { monthly: 100, yearly: 1200 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "EUR",
  },
  spain: {
    name: "Spain",
    tuitionRange: { min: 4000, max: 18000 },
    livingCosts: {
      accommodation: { monthly: 600, yearly: 7200 },
      food: { monthly: 300, yearly: 3600 },
      transport: { monthly: 100, yearly: 1200 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "EUR",
  },
  italy: {
    name: "Italy",
    tuitionRange: { min: 3000, max: 15000 },
    livingCosts: {
      accommodation: { monthly: 600, yearly: 7200 },
      food: { monthly: 300, yearly: 3600 },
      transport: { monthly: 100, yearly: 1200 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "EUR",
  },
  netherlands: {
    name: "Netherlands",
    tuitionRange: { min: 8000, max: 20000 },
    livingCosts: {
      accommodation: { monthly: 800, yearly: 9600 },
      food: { monthly: 400, yearly: 4800 },
      transport: { monthly: 100, yearly: 1200 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "EUR",
  },
  sweden: {
    name: "Sweden",
    tuitionRange: { min: 8000, max: 25000 },
    livingCosts: {
      accommodation: { monthly: 700, yearly: 8400 },
      food: { monthly: 350, yearly: 4200 },
      transport: { monthly: 100, yearly: 1200 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "EUR",
  },
  denmark: {
    name: "Denmark",
    tuitionRange: { min: 8000, max: 25000 },
    livingCosts: {
      accommodation: { monthly: 800, yearly: 9600 },
      food: { monthly: 400, yearly: 4800 },
      transport: { monthly: 100, yearly: 1200 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 250, yearly: 3000 },
    },
    currency: "EUR",
  },
  singapore: {
    name: "Singapore",
    tuitionRange: { min: 20000, max: 40000 },
    livingCosts: {
      accommodation: { monthly: 1000, yearly: 12000 },
      food: { monthly: 400, yearly: 4800 },
      transport: { monthly: 100, yearly: 1200 },
      utilities: { monthly: 150, yearly: 1800 },
      misc: { monthly: 300, yearly: 3600 },
    },
    currency: "SGD",
  },
  malaysia: {
    name: "Malaysia",
    tuitionRange: { min: 8000, max: 20000 },
    livingCosts: {
      accommodation: { monthly: 400, yearly: 4800 },
      food: { monthly: 250, yearly: 3000 },
      transport: { monthly: 80, yearly: 960 },
      utilities: { monthly: 100, yearly: 1200 },
      misc: { monthly: 200, yearly: 2400 },
    },
    currency: "USD",
  },
  dubai: {
    name: "Dubai (UAE)",
    tuitionRange: { min: 15000, max: 35000 },
    livingCosts: {
      accommodation: { monthly: 1000, yearly: 12000 },
      food: { monthly: 500, yearly: 6000 },
      transport: { monthly: 150, yearly: 1800 },
      utilities: { monthly: 200, yearly: 2400 },
      misc: { monthly: 300, yearly: 3600 },
    },
    currency: "USD",
  }
};

const programs = {
  undergraduate: {
    name: "Undergraduate",
    duration: "3-4 years",
    scholarshipEligibility: {
      minGPA: 3.0,
      requirements: ["High School Diploma", "Standardized Test Scores"],
    },
  },
  masters: {
    name: "Masters",
    duration: "1-2 years",
    scholarshipEligibility: {
      minGPA: 3.2,
      requirements: ["Bachelor's Degree", "Work Experience (optional)"],
    },
  },
  phd: {
    name: "PhD",
    duration: "3-5 years",
    scholarshipEligibility: {
      minGPA: 3.5,
      requirements: ["Master's Degree", "Research Proposal"],
    },
  },
};

const scholarshipTypes = [
  {
    name: "Merit-Based",
    criteria: ["GPA ≥ 3.5", "Standardized Test Scores", "Extracurricular Activities"],
    coverage: "Up to 100% tuition",
  },
  {
    name: "Need-Based",
    criteria: ["Financial Need Documentation", "Academic Standing"],
    coverage: "Varies based on need",
  },
  {
    name: "Sports",
    criteria: ["Athletic Achievement", "Team Participation"],
    coverage: "Partial to full tuition",
  },
  {
    name: "Cultural Exchange",
    criteria: ["Country of Origin", "Cultural Contribution"],
    coverage: "Partial tuition + stipend",
  },
];

export default function ScholarshipCalculator() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [gpa, setGpa] = useState("");
  const [budget, setBudget] = useState(null);
  const [eligibleScholarships, setEligibleScholarships] = useState([]);

  // Calculate budget based on selection
  const calculateBudget = () => {
    if (!selectedDestination || !selectedProgram) return null;

    const destination = destinations[selectedDestination];
    const yearlyLivingCosts = Object.values(destination.livingCosts).reduce(
      (total, cost) => total + cost.yearly,
      0
    );
    const averageTuition = (destination.tuitionRange.min + destination.tuitionRange.max) / 2;

    return {
      tuition: averageTuition,
      livingCosts: yearlyLivingCosts,
      total: averageTuition + yearlyLivingCosts,
      currency: destination.currency,
      breakdown: destination.livingCosts,
    };
  };

  // Check scholarship eligibility
  const checkScholarshipEligibility = () => {
    if (!gpa || !selectedProgram) return [];

    const numericGpa = parseFloat(gpa);
    return scholarshipTypes.filter(scholarship => {
      if (scholarship.name === "Merit-Based") {
        return numericGpa >= 3.5;
      }
      // Add more specific criteria as needed
      return true;
    });
  };

  // Handle form submission
  const handleCalculate = () => {
    const calculatedBudget = calculateBudget();
    setBudget(calculatedBudget);
    setEligibleScholarships(checkScholarshipEligibility());
  };

  return (
    <section className="py-16 md:py-24">
      <div className="w-[95%] md:w-[85%] mx-auto px-2">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Scholarship & Budget Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your education finances and check scholarship eligibility
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">
              <Calculator className="w-4 h-4 mr-2 text-blue-500" />
              Budget Calculator
            </TabsTrigger>
            <TabsTrigger value="scholarship">
              <GraduationCap className="w-4 h-4 mr-2 text-green-500" />
              Scholarship Checker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle>Budget Calculator</CardTitle>
                <CardDescription>
                  Calculate estimated costs for your study abroad journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Select
                      value={selectedDestination}
                      onValueChange={setSelectedDestination}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(destinations).map(([key, dest]) => (
                          <SelectItem key={key} value={key}>
                            {dest.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program">Program Level</Label>
                    <Select
                      value={selectedProgram}
                      onValueChange={setSelectedProgram}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(programs).map(([key, prog]) => (
                          <SelectItem key={key} value={key}>
                            {prog.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleCalculate}
                  className="w-full"
                  disabled={!selectedDestination || !selectedProgram}
                >
                  Calculate Budget
                </Button>

                {budget && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-6"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-500" />
                          Estimated Annual Costs
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-purple-500" />
                                <span>Tuition</span>
                              </div>
                              <span className="font-semibold">
                                {budget.currency} {budget.tuition.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                              <div className="flex items-center gap-2">
                                <Home className="w-5 h-5 text-orange-500" />
                                <span>Living Costs</span>
                              </div>
                              <span className="font-semibold">
                                {budget.currency} {budget.livingCosts.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <h4 className="font-semibold mb-4">Living Costs Breakdown</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-blue-500" />
                                <span>Accommodation:</span>
                                <span className="font-medium">
                                  {budget.currency} {budget.breakdown.accommodation.monthly}/mo
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <UtensilsCrossed className="w-4 h-4 text-red-500" />
                                <span>Food:</span>
                                <span className="font-medium">
                                  {budget.currency} {budget.breakdown.food.monthly}/mo
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Bus className="w-4 h-4 text-yellow-500" />
                                <span>Transport:</span>
                                <span className="font-medium">
                                  {budget.currency} {budget.breakdown.transport.monthly}/mo
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Wifi className="w-4 h-4 text-indigo-500" />
                                <span>Utilities:</span>
                                <span className="font-medium">
                                  {budget.currency} {budget.breakdown.utilities.monthly}/mo
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4 text-pink-500" />
                                <span>Miscellaneous:</span>
                                <span className="font-medium">
                                  {budget.currency} {budget.breakdown.misc.monthly}/mo
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Total Annual Cost:</span>
                              <span className="text-xl font-bold text-primary">
                                {budget.currency} {budget.total.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scholarship">
            <Card>
              <CardHeader>
                <CardTitle>Scholarship Eligibility Checker</CardTitle>
                <CardDescription>
                  Check your eligibility for various scholarship programs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="program">Program Level</Label>
                    <Select
                      value={selectedProgram}
                      onValueChange={setSelectedProgram}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(programs).map(([key, prog]) => (
                          <SelectItem key={key} value={key}>
                            {prog.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA (4.0 scale)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="4.0"
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      placeholder="Enter your GPA"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleCalculate}
                  className="w-full"
                  disabled={!selectedProgram || !gpa}
                >
                  Check Eligibility
                </Button>

                {eligibleScholarships.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-4"
                  >
                    <h3 className="font-semibold text-lg">Eligible Scholarships</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {eligibleScholarships.map((scholarship, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                            <CardDescription>{scholarship.coverage}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <h4 className="font-medium">Requirements:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {scholarship.criteria.map((criterion, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">
                                    {criterion}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}