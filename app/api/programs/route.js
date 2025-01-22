import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Program from "@/models/program";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const programs = await Program.find().sort({ createdAt: -1 }).lean();

    // Convert MongoDB documents to plain objects and handle dates
    const serializedPrograms = programs.map(program => ({
      ...program,
      _id: program._id.toString(),
      createdAt: program.createdAt?.toISOString(),
      updatedAt: program.updatedAt?.toISOString(),
    }));

    return NextResponse.json(serializedPrograms);
  } catch (error) {
    console.error("[PROGRAMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    await connectDB();
    const program = await Program.create({
      ...body,
      createdBy: session.user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Convert MongoDB document to plain object and handle dates
    const serializedProgram = {
      ...program.toObject(),
      _id: program._id.toString(),
      createdAt: program.createdAt?.toISOString(),
      updatedAt: program.updatedAt?.toISOString(),
    };

    return NextResponse.json(serializedProgram);
  } catch (error) {
    console.error("[PROGRAMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 