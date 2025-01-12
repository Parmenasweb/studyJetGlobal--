import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import imagekit from "@/lib/imagekit";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString('base64');

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: base64String,
      fileName: file.name,
      folder: "/documents", // All documents will be stored in this folder
      tags: ["document"], // Add any relevant tags
    });

    return NextResponse.json({ 
      url: result.url,
      fileId: result.fileId,
      success: true 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
} 