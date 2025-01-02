import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { Application } from "@/models/Application";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request, { params }) {
  try {
    const applicationId = params.id;

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only PDF, JPEG, and PNG files are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Generate unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const ext = file.type.split("/")[1];
    const filename = `${timestamp}-${uuidv4()}.${ext}`;

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "uploads");
    try {
      await writeFile(
        join(uploadDir, filename),
        Buffer.from(await file.arrayBuffer())
      );
    } catch (error) {
      console.error("Error saving file:", error);
      return NextResponse.json(
        { error: "Failed to save file to storage" },
        { status: 500 }
      );
    }

    // Update application with document reference
    await connectToDatabase();
    const application = await Application.findById(applicationId);

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Add document to application
    if (!application.documents) {
      application.documents = [];
    }

    const document = {
      filename,
      originalName: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
    };

    application.documents.push(document);

    try {
      await application.save();
    } catch (error) {
      console.error("Error saving document reference:", error);
      return NextResponse.json(
        { error: "Failed to save document reference" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      {
        error: "Failed to upload document",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const applicationId = params.id;

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const application = await Application.findById(applicationId);

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(application.documents || []);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch documents",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const applicationId = params.id;
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!applicationId || !filename) {
      return NextResponse.json(
        { error: "Application ID and filename are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const application = await Application.findById(applicationId);

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Remove document from application
    if (application.documents) {
      application.documents = application.documents.filter(
        (doc) => doc.filename !== filename
      );
      await application.save();
    }

    // Delete file from disk
    try {
      const filePath = join(process.cwd(), "public", "uploads", filename);
      await unlink(filePath);
    } catch (error) {
      console.error("Error deleting file:", error);
      // Continue even if file deletion fails
    }

    return NextResponse.json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      {
        error: "Failed to delete document",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
