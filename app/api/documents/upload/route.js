import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Client } from "@/models/Client";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
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

    // Process files
    const processedFiles = await Promise.all(files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = buffer.toString('base64');

      return {
        type,
        title,
        fileData: base64Data,
        fileType: file.type,
        fileName: file.name,
        uploadDate: new Date(),
        status: "pending"
      };
    }));

    // Add documents to client
    client.documents.push(...processedFiles);
    await client.save();

    return NextResponse.json({
      message: "Documents uploaded successfully",
      documents: processedFiles.map(file => ({
        type: file.type,
        title: file.title,
        fileName: file.fileName,
        fileType: file.fileType,
        uploadDate: file.uploadDate,
        status: file.status
      }))
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
    const session = await auth();
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
    const session = await auth();
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

    // Find and remove the document
    const document = client.documents.id(documentId);
    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

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