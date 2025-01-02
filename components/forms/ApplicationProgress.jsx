"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ApplicationProgress({ form, className }) {
  const calculateSectionProgress = (section, fields, totalWeight) => {
    const values = form.getValues(section);
    if (!values) return 0;

    const filledFields = fields.filter((field) => {
      const value = values[field];
      return value && (typeof value === "string" ? value.trim() !== "" : true);
    });

    return (filledFields.length / fields.length) * totalWeight;
  };

  const calculateProgress = () => {
    const formValues = form.getValues();
    let progress = 0;

    // Personal Info (25%)
    const personalInfoFields = [
      "fullName",
      "email",
      "phone",
      "whatsapp",
      "dateOfBirth",
      "nationality",
      "currentCountry",
      "currentCity",
      "gender",
      "maritalStatus",
    ];
    progress += calculateSectionProgress(
      "personalInfo",
      personalInfoFields,
      25
    );

    // Application Type Specific Details (25%)
    if (formValues.applicationType === "study") {
      const studyFields = [
        "destinationCountry",
        "intakeDate",
        "programLevel",
        "fieldOfStudy",
        "academicBackground",
        "englishProficiency",
        "studyGoals",
      ];
      progress += calculateSectionProgress("studyDetails", studyFields, 25);
    } else if (formValues.applicationType === "work") {
      const workFields = [
        "destinationCountry",
        "jobCategory",
        "preferredPosition",
        "yearsOfExperience",
        "workExperience",
        "careerGoals",
        "skills",
      ];
      progress += calculateSectionProgress("workDetails", workFields, 25);
    }

    // Financial Info (20%)
    const financialFields = [
      "fundingSource",
      "annualFamilyIncome",
      "hasExistingFunds",
    ];
    progress += calculateSectionProgress("financialInfo", financialFields, 20);

    // Additional Info (20%)
    const additionalFields = ["previousVisaRejections", "howDidYouHear"];
    progress += calculateSectionProgress(
      "additionalInfo",
      additionalFields,
      20
    );

    // Terms and Conditions (10%)
    if (formValues.acceptedTerms) {
      progress += 10;
    }

    return Math.round(progress);
  };

  const progress = calculateProgress();
  const progressColor =
    progress < 50
      ? "bg-red-600"
      : progress < 80
      ? "bg-yellow-500"
      : "bg-green-500";

  const getProgressStatus = () => {
    if (progress === 100) {
      return {
        message: "Your application is complete and ready to submit!",
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        color: "text-green-600",
      };
    } else if (progress >= 80) {
      return {
        message: "Almost there! Just a few more fields to complete.",
        icon: <CheckCircle2 className="h-5 w-5 text-yellow-500" />,
        color: "text-yellow-600",
      };
    } else {
      return {
        message:
          "Please complete all required fields to submit your application.",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        color: "text-red-600",
      };
    }
  };

  const status = getProgressStatus();

  return (
    <Card
      className={cn(
        "sticky top-4 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <CardContent className="py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Application Progress</span>
            {status.icon}
          </div>
          <span className={cn("font-semibold", status.color)}>{progress}%</span>
        </div>
        <Progress value={progress} className={cn("h-2", progressColor)} />
        <p className={cn("text-sm mt-2", status.color)}>{status.message}</p>
      </CardContent>
    </Card>
  );
}
