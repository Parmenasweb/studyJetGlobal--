import { NextResponse } from "next/server";
import  connectDB from "@/lib/db";
import Application from "@/models/Application";
import { auth } from "@/auth";
import { handleError } from "@/middleware/error";

export async function POST(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content } = await req.json();
    await connectDB();

    const application = await Application.findByIdAndUpdate(
      params.id,
      {
        $push: {
          notes: {
            content,
            author: session.user.email,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    ).populate('clientId', 'name email');

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json(application);
  } catch (error) {
    return handleError(error);
  }
} 