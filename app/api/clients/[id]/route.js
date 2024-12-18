import { NextResponse } from "next/server";
import  connectDB  from "@/lib/db";
import Client from "@/models/Client";
import { auth } from "@/auth";

// GET single client
export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const client = await Client.findById(params.id);
    
    if (!client) {
      return new NextResponse("Client not found", { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PATCH update client
export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const updatedClient = await Client.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return new NextResponse("Client not found", { status: 404 });
    }

    return NextResponse.json(updatedClient);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

// DELETE client
export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const client = await Client.findByIdAndDelete(params.id);

    if (!client) {
      return new NextResponse("Client not found", { status: 404 });
    }

    return new NextResponse("Client deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 