import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Destination from "@/models/Destination";

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

async function convertToBase64(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function POST(req, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Get the destination
    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const images = formData.getAll('images');
    const imageType = formData.get('type') || 'gallery'; // gallery, banner, or thumbnail

    // Validate files
    for (const image of images) {
      if (!ALLOWED_TYPES.includes(image.type)) {
        return NextResponse.json({
          error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`
        }, { status: 400 });
      }

      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json({
          error: `File size too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`
        }, { status: 400 });
      }
    }

    // Convert images to base64
    const base64Images = await Promise.all(
      images.map(async (image) => ({
        data: await convertToBase64(image),
        type: image.type,
        name: image.name
      }))
    );

    // Update destination based on image type
    let updateData = {};
    
    if (imageType === 'gallery') {
      // Append to existing gallery or create new array
      const currentGallery = destination.gallery || [];
      updateData.gallery = [...currentGallery, ...base64Images];
    } else if (imageType === 'banner') {
      updateData.bannerImage = base64Images[0];
    } else if (imageType === 'thumbnail') {
      updateData.thumbnailImage = base64Images[0];
    }

    // Update the destination
    const updatedDestination = await Destination.findByIdAndUpdate(
      params.destinationId,
      {
        $set: updateData,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Images uploaded successfully",
      destination: updatedDestination
    }, { status: 200 });

  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const imageIndex = searchParams.get('index');
    const imageType = searchParams.get('type') || 'gallery';

    const destination = await Destination.findById(params.destinationId);
    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    let updateData = {};

    if (imageType === 'gallery' && imageIndex !== null) {
      const gallery = [...(destination.gallery || [])];
      gallery.splice(parseInt(imageIndex), 1);
      updateData.gallery = gallery;
    } else if (imageType === 'banner') {
      updateData.bannerImage = null;
    } else if (imageType === 'thumbnail') {
      updateData.thumbnailImage = null;
    }

    const updatedDestination = await Destination.findByIdAndUpdate(
      params.destinationId,
      {
        $set: updateData,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Image deleted successfully",
      destination: updatedDestination
    });

  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
} 