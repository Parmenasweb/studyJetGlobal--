import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/db";
import { Client } from "@/models/Client";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const clientId = formData.get("clientId");
    const type = formData.get("type");
    const title = formData.get("title");
    const files = formData.getAll("files");

    if (!type || !title || files.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the client
    const client = await Client.findById(clientId);
    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // Upload files to Cloudinary
    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Convert buffer to base64
      const base64 = buffer.toString("base64");
      const mimeType = file.type;
      const dataURI = `data:${mimeType};base64,${base64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: `studyjet/clients/${clientId}/documents`,
        resource_type: "auto",
      });

      return {
        type,
        title,
        fileUrl: result.secure_url,
        fileType: result.resource_type,
        uploadDate: new Date(),
        status: "pending",
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    // Add documents to client
    client.documents.push(...uploadedFiles);
    await client.save();

    return NextResponse.json({
      message: "Documents uploaded successfully",
      documents: uploadedFiles,
    });
  } catch (error) {
    console.error("Error uploading documents:", error);
    return NextResponse.json(
      { error: "Failed to upload documents" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const client = await Client.findById(clientId);
    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
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

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const documentId = searchParams.get("documentId");

    if (!clientId || !documentId) {
      return NextResponse.json(
        { error: "Client ID and Document ID are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const client = await Client.findById(clientId);
    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // Find the document
    const document = client.documents.id(documentId);
    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    const publicId = document.fileUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    // Remove from client's documents
    client.documents.pull(documentId);
    await client.save();

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