import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Client from "@/models/Client";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const client = await Client.findById(params.id).lean();
    if (!client) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error in GET /api/clients/[id]:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch client" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const data = await request.json();
    console.log('Updating client with data:', { id: params.id, data });

    const client = await Client.findById(params.id);
    if (!client) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    // Update client fields
    Object.assign(client, data);
    
    // Save the updated client
    const updatedClient = await client.save();
    console.log('Updated client:', updatedClient);

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error in PATCH /api/clients/[id]:", error);

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
      { message: error.message || "Failed to update client" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const client = await Client.findByIdAndDelete(params.id);
    if (!client) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/clients/[id]:", error);
    return NextResponse.json(
      { message: error.message || "Failed to delete client" },
      { status: 500 }
    );
  }
} 