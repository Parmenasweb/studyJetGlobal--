import { NextResponse } from "next/server";
import { auth } from "@/auth"
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { destinationSchema } from "@/lib/validations/destination";

export async function POST(req) {
  try {
    

    await connectDB();
    const data = await req.json();

    console.log("Received data:", JSON.stringify(data, null, 2));

    // Validate the data against the schema
    try {
      const validatedData = await destinationSchema.parseAsync(data);
      console.log("Validated data:", JSON.stringify(validatedData, null, 2));
    } catch (error) {
      console.error("Validation error details:", JSON.stringify(error.errors, null, 2));
      return NextResponse.json(
        { 
          success: false,
          error: "Invalid destination data", 
          details: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    // Ensure media objects have all required fields
    const media = {
      mainImage: data.media?.mainImage || null,
      flagImage: data.media?.flagImage || null,
      galleryImages: data.media?.galleryImages || [],
      videoUrl: data.media?.videoUrl || null,
    };

    // Create the destination with validated data
    const destination = await Destination.create({
      ...data,
      media,
    });

    if (!destination) {
      throw new Error("Failed to create destination");
    }

    return NextResponse.json({
      success: true,
      destination
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating destination:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to create destination",
        details: error.errors || []
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    // Get total count for pagination
    const total = await Destination.countDocuments(query);

    // Get destinations with pagination
    const destinations = await Destination.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      destinations,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
} 