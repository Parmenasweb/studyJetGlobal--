import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Application from "@/models/Application";
import { auth } from "@/auth";
import { handleError } from "@/middleware/error";

// GET application documents
export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const application = await Application.findById(params.id)
      .select("documents")
      .sort({ "documents.uploadDate": -1 });

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json(application.documents);
  } catch (error) {
    return handleError(error);
  }
}

// POST new document
export async function POST(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    if (!body.name || !body.url || !body.type) {
      return new NextResponse("Missing required document fields", { status: 400 });
    }

    await connectToDB();
    const application = await Application.findByIdAndUpdate(
      params.id,
      {
        $push: {
          documents: {
            ...body,
            uploadDate: new Date(),
            status: "pending"
          },
          timeline: {
            title: "Document Added",
            description: `New document "${body.name}" has been added`,
            updatedBy: session.user.email,
            date: new Date()
          }
        }
      },
      { new: true }
    ).select("documents");

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    // Send notification about new document
    // await sendDocumentNotification(application);

    return NextResponse.json(application.documents);
  } catch (error) {
    return handleError(error);
  }
}

// PATCH update document status
export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { documentId, status, notes } = await req.json();
    if (!documentId || !status) {
      return new NextResponse("Document ID and status are required", { status: 400 });
    }

    await connectToDB();
    const application = await Application.findOneAndUpdate(
      { 
        _id: params.id,
        "documents._id": documentId
      },
      {
        $set: {
          "documents.$.status": status,
          "documents.$.notes": notes
        },
        $push: {
          timeline: {
            title: "Document Status Updated",
            description: `Document "${documentId}" status updated to ${status}`,
            updatedBy: session.user.email,
            date: new Date()
          }
        }
      },
      { new: true }
    ).select("documents");

    if (!application) {
      return new NextResponse("Application or document not found", { status: 404 });
    }

    // Send notification about document status update
    // await sendDocumentStatusNotification(application, documentId, status);

    return NextResponse.json(application.documents);
  } catch (error) {
    return handleError(error);
  }
}

// DELETE document
export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");
    
    if (!documentId) {
      return new NextResponse("Document ID is required", { status: 400 });
    }

    await connectToDB();
    const application = await Application.findByIdAndUpdate(
      params.id,
      {
        $pull: { documents: { _id: documentId } },
        $push: {
          timeline: {
            title: "Document Removed",
            description: "A document has been removed from the application",
            updatedBy: session.user.email,
            date: new Date()
          }
        }
      },
      { new: true }
    ).select("documents");

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    return NextResponse.json(application.documents);
  } catch (error) {
    return handleError(error);
  }
} 