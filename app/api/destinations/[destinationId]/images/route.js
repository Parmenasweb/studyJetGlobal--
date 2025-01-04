import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Destination from "@/models/Destination";
import sharp from "sharp";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Image dimensions
const DIMENSIONS = {
  mainImage: { width: 1920, height: 1080 },
  flagImage: { width: 256, height: 256 },
  gallery: { width: 800, height: 600 }
};

async function processImage(file, type) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Get image dimensions
  const dimensions = DIMENSIONS[type] || DIMENSIONS.gallery;
  
  // Process image with sharp
  const processedImage = await sharp(buffer)
    .resize(dimensions.width, dimensions.height, {
      fit: 'cover',
      position: 'center'
    })
    .webp({ quality: 80 })
    .toBuffer();

  // Get metadata
  const metadata = await sharp(processedImage).metadata();
  
  // Generate unique filename
  const filename = `${uuidv4()}.webp`;
  
  // Save to disk
  const uploadDir = join(process.cwd(), "public", "uploads", "destinations");
  const filePath = join(uploadDir, filename);
  await writeFile(filePath, processedImage);
  
  return {
    url: `/uploads/destinations/${filename}`,
    width: metadata.width,
    height: metadata.height,
    size: metadata.size,
    alt: file.name.split('.')[0]
  };
}

async function deleteImage(url) {
  if (!url) return;
  
  try {
    const filename = url.split('/').pop();
    const filePath = join(process.cwd(), "public", "uploads", "destinations", filename);
    await unlink(filePath);
  } catch (error) {
    console.error("Error deleting image file:", error);
  }
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
    const imageType = formData.get('type') || 'gallery'; // gallery, mainImage, or flagImage

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

    // Process images
    const processedImages = await Promise.all(
      images.map(image => processImage(image, imageType))
    );

    // Update destination based on image type
    let updateData = {};
    
    if (imageType === 'gallery') {
      // Append to existing gallery or create new array
      const currentGallery = destination.media.galleryImages || [];
      updateData['media.galleryImages'] = [...currentGallery, ...processedImages];
    } else if (imageType === 'mainImage') {
      // Delete old image if it exists
      if (destination.media.mainImage?.url) {
        await deleteImage(destination.media.mainImage.url);
      }
      updateData['media.mainImage'] = processedImages[0];
    } else if (imageType === 'flagImage') {
      // Delete old image if it exists
      if (destination.media.flagImage?.url) {
        await deleteImage(destination.media.flagImage.url);
      }
      updateData['media.flagImage'] = processedImages[0];
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
    });

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
      const gallery = [...(destination.media.galleryImages || [])];
      // Delete the image file
      await deleteImage(gallery[imageIndex]?.url);
      gallery.splice(parseInt(imageIndex), 1);
      updateData['media.galleryImages'] = gallery;
    } else if (imageType === 'mainImage') {
      await deleteImage(destination.media.mainImage?.url);
      updateData['media.mainImage'] = null;
    } else if (imageType === 'flagImage') {
      await deleteImage(destination.media.flagImage?.url);
      updateData['media.flagImage'] = null;
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