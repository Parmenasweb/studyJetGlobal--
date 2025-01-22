import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Client from "@/models/Client";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();
    console.log("Creating client with data:", data);
    
    // Validate email
    if (!data.personalInfo?.email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check for existing email - case insensitive
    const existingClient = await Client.findOne({
      "personalInfo.email": { $regex: new RegExp(`^${data.personalInfo.email}$`, 'i') }
    });

    if (existingClient) {
      return NextResponse.json(
        { 
          message: `A client with email "${data.personalInfo.email}" already exists`,
          field: "personalInfo.email",
          value: data.personalInfo.email
        },
        { status: 409 }
      );
    }

    // Create new client
    const client = new Client(data);

    // Save to database
    const savedClient = await client.save();
    console.log('Saved client to database:', savedClient);

    return NextResponse.json(savedClient, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/clients:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: "Validation failed", errors: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Failed to create client" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    const clients = await Client.find(
      {},
      {
        "personalInfo.fullName": 1,
        "personalInfo.email": 1,
        "personalInfo.phone": 1,
        "personalInfo.currentResidence.country": 1,
        "academicInfo.program.name": 1,
        "academicInfo.university.name": 1,
      }
    ).lean();

    return NextResponse.json(clients);
  } catch (error) {
    console.error("[CLIENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
