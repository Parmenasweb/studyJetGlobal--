import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import Application from "@/models/Application";

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const destination = await Destination.findById(params.destinationId).lean();

    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
    return NextResponse.json(
      { error: "Failed to fetch destination" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    // const session = await auth();
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await connectDB();
    const data = await req.json();

    // Ensure media objects have all required fields
    const media = {
      mainImage: data.media?.mainImage || null,
      flagImage: data.media?.flagImage || null,
      galleryImages: data.media?.galleryImages || [],
      videoUrl: data.media?.videoUrl || null,
    };

    // Update the destination with validated data
    const destination = await Destination.findByIdAndUpdate(
      params.destinationId,
      {
        ...data,
        media,
        
      },
      { 
        new: true, 
        runValidators: true,
        lean: true,
      }
    );

    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      destination
    });
  } catch (error) {
    console.error("Error updating destination:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to update destination" 
      },
      { status: 500 }
    );
  }
}

export const DELETE = auth(async function DELETE(req, { params }) {
  if (!req.auth) {
    console.log("is you crazy tryna come here");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    try {
      // const session = await auth();
      // if (!session || !session.user) {
      //   console.log("is you crazy tryna come here");
      //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      // }
  
      await connectDB();
  
      // First, find the destination to check if it exists
      const destination = await Destination.findById(params.destinationId);
      if (!destination) {
        return NextResponse.json(
          { error: "Destination not found" },
          { status: 404 }
        );
      }
  
      // Check if there are any active applications referencing this destination
      const applications = await Application.find({ 
        "studyDetails.destinationCountry": destination.name 
      });
  
      if (applications.length > 0) {
        return NextResponse.json(
          { error: "Cannot delete destination with active applications" },
          { status: 400 }
        );
      }
  
      // Delete the destination and all its nested documents
      const deletedDestination = await Destination.findByIdAndDelete(params.destinationId);
  
      if (!deletedDestination) {
        return NextResponse.json(
          { error: "Failed to delete destination" },
          { status: 500 }
        );
      }
  
      return NextResponse.json({ 
        message: "Destination and all associated data deleted successfully",
        deletedDestination 
      });
    } catch (error) {
      console.error("Error deleting destination:", error);
      return NextResponse.json(
        { error: error.message || "Failed to delete destination" },
        { status: 500 }
      );
    }
    }
});
