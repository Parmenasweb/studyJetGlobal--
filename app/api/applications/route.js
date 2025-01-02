import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Application } from "@/models/Application";

export async function GET() {
  try {
    await connectDB();
    const applications = await Application.find().sort({ submittedAt: -1 });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Received application data:", JSON.stringify(data, null, 2));

    // Validate required fields
    if (!data.applicationType || !data.personalInfo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format dates and ensure proper data types
    const formattedData = {
      ...data,
      status: "submitted",
      priority: data.priority || "medium",
      submittedAt: new Date(),
      personalInfo: {
        ...data.personalInfo,
        dateOfBirth: new Date(data.personalInfo.dateOfBirth),
        passportExpiry: data.personalInfo.passportExpiry
          ? new Date(data.personalInfo.passportExpiry)
          : undefined,
        languages: Array.isArray(data.personalInfo.languages)
          ? data.personalInfo.languages.map((lang) => ({
              language: typeof lang === "object" ? lang.language : lang,
              proficiencyLevel:
                typeof lang === "object" ? lang.proficiencyLevel : "basic",
            }))
          : [],
      },
      financialInfo: {
        ...data.financialInfo,
        fundingSource: data.financialInfo.fundingSource || "self",
        annualFamilyIncome: Number(data.financialInfo.annualFamilyIncome) || 0,
        hasExistingFunds: Boolean(data.financialInfo.hasExistingFunds),
        fundingAmount: data.financialInfo.fundingAmount
          ? Number(data.financialInfo.fundingAmount)
          : undefined,
      },
      additionalInfo: {
        ...data.additionalInfo,
        previousVisaRejections: Boolean(
          data.additionalInfo.previousVisaRejections
        ),
        rejectionDetails: data.additionalInfo.rejectionDetails || "",
        travelHistory: Array.isArray(data.additionalInfo.travelHistory)
          ? data.additionalInfo.travelHistory.map((entry) => ({
              ...entry,
              year: Number(entry.year),
            }))
          : [],
        specialRequirements: data.additionalInfo.specialRequirements || "",
        howDidYouHear: data.additionalInfo.howDidYouHear || "",
      },
      timeline: [
        {
          status: "submitted",
          date: new Date(),
          note: "Application submitted successfully",
        },
      ],
    };

    // Handle study details
    if (data.applicationType === "study" && data.studyDetails) {
      formattedData.studyDetails = {
        ...data.studyDetails,
        academicBackground: Array.isArray(data.studyDetails.academicBackground)
          ? data.studyDetails.academicBackground.map((bg) => ({
              ...bg,
              yearCompleted: Number(bg.yearCompleted),
            }))
          : [],
        englishProficiency: {
          ...data.studyDetails.englishProficiency,
          testType: (
            data.studyDetails.englishProficiency.testType || ""
          ).toLowerCase(),
          testDate: new Date(data.studyDetails.englishProficiency.testDate),
          expiryDate: new Date(data.studyDetails.englishProficiency.expiryDate),
          overallScore: Number(
            data.studyDetails.englishProficiency.overallScore
          ),
        },
        hasScholarshipRequirement: Boolean(
          data.studyDetails.hasScholarshipRequirement
        ),
        preferredCities: Array.isArray(data.studyDetails.preferredCities)
          ? data.studyDetails.preferredCities
          : [],
        preferredUniversities: Array.isArray(
          data.studyDetails.preferredUniversities
        )
          ? data.studyDetails.preferredUniversities
          : [],
      };
      formattedData.workDetails = null;
    }

    // Handle work details
    if (data.applicationType === "work" && data.workDetails) {
      formattedData.workDetails = {
        ...data.workDetails,
        yearsOfExperience: Number(data.workDetails.yearsOfExperience) || 0,
        workExperience: Array.isArray(data.workDetails.workExperience)
          ? data.workDetails.workExperience.filter(
              (exp) =>
                exp.company &&
                exp.position &&
                exp.duration &&
                exp.responsibilities
            )
          : [],
        skills: Array.isArray(data.workDetails.skills)
          ? data.workDetails.skills
          : [],
      };
      formattedData.studyDetails = null;
    }

    console.log(
      "Formatted data before submission:",
      JSON.stringify(formattedData, null, 2)
    );

    await connectDB();
    console.log("Connected to database");

    const application = new Application(formattedData);
    console.log("Created application object");

    const validationError = application.validateSync();
    if (validationError) {
      console.error("Validation error:", validationError);
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationError.message,
        },
        { status: 400 }
      );
    }

    await application.save();
    console.log("Application saved successfully");

    return NextResponse.json({
      message: "Application submitted successfully",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      {
        error: "Failed to submit application",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    await Application.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}
