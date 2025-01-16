import  connectDB  from "@/lib/db";
import Partner from "@/models/Partner";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const partner = await Partner.findById(params.id)
      .populate({
        path: "referredStudents.student",
        select: "personalInfo.fullName personalInfo.email academicInfo.program",
      })
      .lean();

    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Error in GET /api/partners/[id]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch partner" },
      { status: 400 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const data = await request.json();
    console.log("Update data:", data);

    // Check if partner exists
    const partner = await Partner.findById(params.id);
    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found" },
        { status: 404 }
      );
    }

    // Check if email is being changed and if it's already in use
    if (data.email && data.email !== partner.email) {
      const existingPartner = await Partner.findOne({ email: data.email });
      if (existingPartner) {
        return NextResponse.json(
          { error: "A partner with this email already exists" },
          { status: 409 }
        );
      }
    }

    // Ensure universityDetails structure is correct for university partners
    if (data.type === "university" && data.universityDetails) {
      data.universityDetails = {
        ...data.universityDetails,
        commission: {
          minimum: Number(data.universityDetails.commission?.minimum) || 0,
          maximum: Number(data.universityDetails.commission?.maximum) || 0
        },
        programs: data.universityDetails.programs || partner.universityDetails?.programs || [],
        admissionRequirements: data.universityDetails.admissionRequirements || partner.universityDetails?.admissionRequirements || [],
        facilities: data.universityDetails.facilities || partner.universityDetails?.facilities || [],
        studentServices: data.universityDetails.studentServices || partner.universityDetails?.studentServices || [],
        accreditation: data.universityDetails.accreditation || partner.universityDetails?.accreditation || [],
        scholarshipInfo: data.universityDetails.scholarshipInfo || partner.universityDetails?.scholarshipInfo || {
          types: [],
          coverage: [],
          requirements: []
        },
        internshipOpportunities: data.universityDetails.internshipOpportunities || partner.universityDetails?.internshipOpportunities || {
          types: [],
          duration: [],
          benefits: []
        }
      };
    }

    // Update partner
    Object.assign(partner, data);
    console.log("Partner to update:", partner);
    await partner.save();

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Error in PATCH /api/partners/[id]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update partner" },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const partner = await Partner.findById(params.id);
    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found" },
        { status: 404 }
      );
    }

    // Check if partner has referred students
    if (partner.referredStudents?.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete partner with referred students" },
        { status: 400 }
      );
    }

    await Partner.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/partners/[id]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete partner" },
      { status: 400 }
    );
  }
} 