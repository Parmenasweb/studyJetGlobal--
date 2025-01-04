import { NextResponse } from "next/server";
import { auth } from "@/auth";
import sharp from "sharp";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises";
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

async function ensureUploadDir() {
  const uploadDir = join(process.cwd(), "public", "uploads", "destinations");
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
  return uploadDir;
}

async function processImage(file, type) {
  try {
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
    
    // Ensure upload directory exists
    const uploadDir = await ensureUploadDir();
    const filePath = join(uploadDir, filename);
    
    // Save to disk
    await writeFile(filePath, processedImage);
    
    return {
      url: `/uploads/destinations/${filename}`,
      alt: file.name.split('.')[0],
      width: metadata.width,
      height: metadata.height,
      size: metadata.size,
      caption: file.name.split('.')[0]
    };
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}

export async function POST(req) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const images = formData.getAll('images');
    const imageType = formData.get('type') || 'gallery';

    // Validate files
    for (const image of images) {
      if (!ALLOWED_TYPES.includes(image.type)) {
        return NextResponse.json({
          success: false,
          error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`
        }, { status: 400 });
      }

      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json({
          success: false,
          error: `File size too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`
        }, { status: 400 });
      }
    }

    // Process images
    const processedImages = await Promise.all(
      images.map(image => processImage(image, imageType))
    );

    // Return the processed images in the correct format
    const response = {
      success: true,
      destination: {
        media: {}
      }
    };

    if (imageType === 'mainImage') {
      response.destination.media.mainImage = processedImages[0];
    } else if (imageType === 'flagImage') {
      response.destination.media.flagImage = processedImages[0];
    } else {
      response.destination.media.galleryImages = processedImages;
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to upload images" 
      },
      { status: 500 }
    );
  }
} 