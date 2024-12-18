import { NextResponse } from "next/server";
import  connectDB  from "@/lib/db";
import Client from "@/models/Client";
import { auth } from "@/auth";

// GET all clients
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const clients = await Client.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(clients);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST new client
export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const newClient = await Client.create(body);
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("Client creation error:", error);
    return new NextResponse(error.message, { status: 500 });
  }
} 