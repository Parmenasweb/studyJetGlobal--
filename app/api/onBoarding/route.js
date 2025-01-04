import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Consultation from "@/models/consultationForm";
import { Application } from "@/models/Application";
import { handleError } from "@/middleware/error";

export async function POST(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const body = await req.json();

    if (query === "consultation") {
      // Handle consultation form submission
      const consultation = await Consultation.create({
        ...body,
        status: "pending",
        createdAt: new Date(),
      });

      return NextResponse.json({
        message: "Consultation request submitted successfully",
        data: consultation,
      });
    }

    if (query === "application") {
      // Handle application form submission
      const application = await Application.create({
        ...body,
        status: "draft",
        progress: 0,
        createdAt: new Date(),
      });

      return NextResponse.json({
        message: "your application has been submitted successfully!..",
        data: application,
      });
    }

    return new NextResponse("Invalid query parameter", { status: 400 });
  } catch (error) {
    return handleError(error);
  }
}
