import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

async function convertToBase64(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function POST(req) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    // Return the converted images
    return NextResponse.json({
      destination: {
        media: {
          mainImage: imageType === 'banner' ? base64Images[0] : null,
          flagImage: imageType === 'thumbnail' ? base64Images[0] : null,
          galleryImages: imageType === 'gallery' ? base64Images : []
        }
      }
    });

  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
} 