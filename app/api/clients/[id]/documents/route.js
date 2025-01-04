import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import connectDB from "@/lib/db";
import { Client } from "@/models/Client";
import { auth } from "@/auth";

export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const type = formData.get("type");
    const title = formData.get("title");

    if (!file || !type || !title) {
      return NextResponse.json(
        { error: "File, type, and title are required" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Create unique filename
    const timestamp = Date.now();
    const fileName = `${id}-${type}-${timestamp}-${file.name}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file to disk
    const uploadDir = join(process.cwd(), "public", "uploads", "documents");
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Update client document in database
    await connectDB();
    const client = await Client.findById(id);

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const document = {
      type,
      title,
      fileUrl: `/uploads/documents/${fileName}`,
      fileType: file.type,
      uploadDate: new Date(),
      status: "pending",
    };

    client.documents.push(document);
    await client.save();

    return NextResponse.json({
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const client = await Client.findById(id);

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client.documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.id;
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get("documentId");

    if (!id || !documentId) {
      return NextResponse.json(
        { error: "Client ID and Document ID are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const client = await Client.findById(id);

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Find and remove the document
    const documentIndex = client.documents.findIndex(
      (doc) => doc._id.toString() === documentId
    );

    if (documentIndex === -1) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const document = client.documents[documentIndex];
    client.documents.splice(documentIndex, 1);
    await client.save();

    // Delete file from disk
    const filePath = join(
      process.cwd(),
      "public",
      document.fileUrl.replace(/^\//, "")
    );
    try {
      await unlink(filePath);
    } catch (error) {
      console.error("Error deleting file:", error);
    }

    return NextResponse.json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
