import { NextResponse } from "next/server";
import  connectDB  from "@/lib/db";
import Application from "@/models/Application";
import { auth } from "@/auth";
import { handleError } from "@/middleware/error";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, filename);

    // Save file to disk
    await writeFile(filePath, buffer);
    
    // Update application with new document
    await connectDB();
    const application = await Application.findByIdAndUpdate(
      params.id,
      {
        $push: {
          documents: {
            name: file.name,
            url: `/uploads/${filename}`,
            uploadDate: new Date(),
            status: "pending"
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