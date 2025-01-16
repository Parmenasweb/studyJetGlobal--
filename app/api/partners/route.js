import  connectDB  from "@/lib/db";
import Partner from "@/models/Partner";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();
    console.log("Received data:", data);

    // Check for existing partner with same email
    const existingPartner = await Partner.findOne({ email: data.email });
    if (existingPartner) {
      return NextResponse.json(
        { error: "A partner with this email already exists" },
        { status: 409 }
      );
    }

    // Extract commission from universityDetails/agencyDetails and set it at root level
    if (data.type === "university" && data.universityDetails?.commission) {
      data.commission = {
        minimum: Number(data.universityDetails.commission.minimum) || 0,
        maximum: Number(data.universityDetails.commission.maximum) || 0
      };
      delete data.universityDetails.commission;
    } else if (data.type === "agency" && data.agencyDetails?.commission) {
      data.commission = {
        minimum: Number(data.agencyDetails.commission.minimum) || 0,
        maximum: Number(data.agencyDetails.commission.maximum) || 0
      };
      delete data.agencyDetails.commission;
    }

    // Ensure commission exists with proper values
    if (!data.commission || typeof data.commission !== 'object') {
      data.commission = {
        minimum: 0,
        maximum: 0
      };
    } else {
      // Convert commission values to numbers and ensure they exist
      data.commission = {
        minimum: Number(data.commission.minimum) || 0,
        maximum: Number(data.commission.maximum) || 0
      };
    }

    // Structure the data according to the schema
    if (data.type === "university" && data.universityDetails) {
      data.universityDetails = {
        ranking: data.universityDetails.ranking ? Number(data.universityDetails.ranking) : undefined,
        programs: data.universityDetails.programs || [],
        admissionRequirements: data.universityDetails.admissionRequirements || [],
        facilities: data.universityDetails.facilities || [],
        studentServices: data.universityDetails.studentServices || [],
        accreditation: data.universityDetails.accreditation || [],
        scholarshipInfo: {
          types: data.universityDetails.scholarshipInfo?.types || [],
          coverage: data.universityDetails.scholarshipInfo?.coverage || [],
          requirements: data.universityDetails.scholarshipInfo?.requirements || []
        },
        internshipOpportunities: {
          types: data.universityDetails.internshipOpportunities?.types || [],
          duration: data.universityDetails.internshipOpportunities?.duration || [],
          benefits: data.universityDetails.internshipOpportunities?.benefits || []
        }
      };
    }

    console.log("Structured data:", data);

    // Create new partner with explicit commission
    const partnerData = {
      ...data,
      commission: {
        minimum: Number(data.commission.minimum),
        maximum: Number(data.commission.maximum)
      }
    };

    const partner = new Partner(partnerData);
    console.log("Partner to save:", partner.toObject());
    await partner.save();

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Error in POST /api/partners:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create partner" },
      { status: 400 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (type) query.type = type;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "contactPersons.name": { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query with pagination
    const [partners, total] = await Promise.all([
      Partner.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Partner.countDocuments(query),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      partners,
      pagination: {
        total,
        page,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/partners:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch partners" },
      { status: 400 }
    );
  }
}
