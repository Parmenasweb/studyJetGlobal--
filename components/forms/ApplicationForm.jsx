"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema } from "@/lib/validations/application";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ApplicationProgress } from "@/components/forms/ApplicationProgress";
import { PersonalInformation } from "@/components/forms/sections/PersonalInformation";
import { StudyDetails } from "@/components/forms/sections/StudyDetails";
import { WorkDetails } from "@/components/forms/sections/WorkDetails";
import { FinancialInformation } from "@/components/forms/sections/FinancialInformation";
import { AdditionalInformation } from "@/components/forms/sections/AdditionalInformation";

export function ApplicationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      applicationType: "",
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        nationality: "",
        currentResidence: "",
        passportNumber: "",
        passportExpiry: "",
        languages: [],
        gender: "",
        maritalStatus: "",
      },
      studyDetails: {
        preferredCourse: "",
        preferredLevel: "",
        preferredCities: [],
        preferredUniversities: [],
        academicBackground: [],
        englishProficiency: {
          testType: "",
          testDate: "",
          expiryDate: "",
          overallScore: "",
        },
        hasScholarshipRequirement: false,
      },
      workDetails: {
        desiredPosition: "",
        desiredIndustry: "",
        yearsOfExperience: "",
        workExperience: [],
        skills: [],
        expectedSalary: "",
      },
      financialInfo: {
        fundingSource: "",
        annualFamilyIncome: "",
        hasExistingFunds: false,
        fundingAmount: "",
        sponsorDetails: {
          name: "",
          relationship: "",
          occupation: "",
          contact: "",
        },
      },
      additionalInfo: {
        previousVisaRejections: false,
        rejectionDetails: "",
        travelHistory: [],
        specialRequirements: "",
        howDidYouHear: "",
      },
    },
  });

  const applicationType = form.watch("applicationType");
  const formValues = form.watch();

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      console.log("Form data before submission:", data);

      // Format dates
      const formattedData = {
        ...data,
        personalInfo: {
          ...data.personalInfo,
          dateOfBirth: new Date(data.personalInfo.dateOfBirth).toISOString(),
          passportExpiry: new Date(
            data.personalInfo.passportExpiry
          ).toISOString(),
        },
      };

      // Format study details if present
      if (data.applicationType === "study") {
        formattedData.studyDetails = {
          ...data.studyDetails,
          englishProficiency: {
            ...data.studyDetails.englishProficiency,
            testDate: new Date(
              data.studyDetails.englishProficiency.testDate
            ).toISOString(),
            expiryDate: new Date(
              data.studyDetails.englishProficiency.expiryDate
            ).toISOString(),
            overallScore: Number(
              data.studyDetails.englishProficiency.overallScore
            ),
          },
          academicBackground: data.studyDetails.academicBackground.map(
            (bg) => ({
              ...bg,
              yearCompleted: Number(bg.yearCompleted),
            })
          ),
        };
        delete formattedData.workDetails;
      }

      // Format work details if present
      if (data.applicationType === "work") {
        formattedData.workDetails = {
          ...data.workDetails,
          yearsOfExperience: Number(data.workDetails.yearsOfExperience),
        };
        delete formattedData.studyDetails;
      }

      // Format financial info
      formattedData.financialInfo = {
        ...data.financialInfo,
        annualFamilyIncome: Number(data.financialInfo.annualFamilyIncome),
        fundingAmount: data.financialInfo.fundingAmount
          ? Number(data.financialInfo.fundingAmount)
          : undefined,
      };

      // Format travel history if present
      if (data.additionalInfo?.travelHistory?.length > 0) {
        formattedData.additionalInfo.travelHistory =
          data.additionalInfo.travelHistory.map((entry) => ({
            ...entry,
            year: Number(entry.year),
          }));
      }

      console.log("Formatted data before submission:", formattedData);

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }

      const result = await response.json();
      console.log("Submission result:", result);

      toast({
        title: "Success",
        description: "Your application has been submitted successfully.",
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ApplicationProgress formValues={formValues} />
        <PersonalInformation form={form} />
        {applicationType === "study" && <StudyDetails form={form} />}
        {applicationType === "work" && <WorkDetails form={form} />}
        <FinancialInformation form={form} />
        <AdditionalInformation form={form} />
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !form.formState.isValid}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </form>
    </Form>
  );
}
