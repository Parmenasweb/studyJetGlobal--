import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Client from "@/models/Client";

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();
    console.log('Received client data:', data);

    // Create new client
    const client = new Client(data);
    console.log('Created client instance:', client);

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

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Duplicate entry found", field: Object.keys(error.keyPattern)[0] },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Failed to create client" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = {
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
      status: searchParams.get("status"),
      clientType: searchParams.get("clientType"),
      search: searchParams.get("search"),
    };

    // Build query
    const dbQuery = {};
    if (query.status) dbQuery.status = query.status;
    if (query.clientType) dbQuery.clientType = query.clientType;
    if (query.search) {
      dbQuery.$or = [
        { "personalInfo.fullName": { $regex: query.search, $options: "i" } },
        { "personalInfo.email": { $regex: query.search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Client.countDocuments(dbQuery);

    // Get clients with pagination
    const clients = await Client.find(dbQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      clients,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error in GET /api/clients:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
