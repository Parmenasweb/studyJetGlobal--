import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Client } from "@/models/Client";
import { Application } from "@/models/Application";
import { auth } from "@/auth";

// Helper function to check if an application is completed
function isApplicationCompleted(application) {
  return (
    application.status === "approved" &&
    application.studyDetails?.university &&
    application.studyDetails?.program
  );
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = {};

    // Handle search and filtering
    const search = searchParams.get("search");
    if (search) {
      query["$or"] = [
        { "personalInfo.fullName": { $regex: search, $options: "i" } },
        { "personalInfo.email": { $regex: search, $options: "i" } },
        { "academicInfo.studentId": { $regex: search, $options: "i" } },
      ];
    }

    const status = searchParams.get("status");
    if (status) {
      query.status = status;
    }

    const advisor = searchParams.get("advisor");
    if (advisor) {
      query.assignedAdvisor = advisor;
    }

    await connectDB();
    const clients = await Client.find(query)
      .populate("applicationId", "applicationType status")
      .populate("assignedAdvisor", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if application exists and is completed
    const application = await Application.findById(data.applicationId);
    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (!isApplicationCompleted(application)) {
      return NextResponse.json(
        { error: "Application is not completed" },
        { status: 400 }
      );
    }

    // Check if client already exists for this application
    const existingClient = await Client.findOne({
      applicationId: data.applicationId,
    });
    if (existingClient) {
      return NextResponse.json(
        { error: "Client already exists for this application" },
        { status: 400 }
      );
    }

    // Create client with application data
    const clientData = {
      ...data,
      personalInfo: {
        ...application.personalInfo,
      },
      academicInfo: {
        university: {
          name: application.studyDetails.university,
          country: application.studyDetails.destinationCountry,
          city: application.studyDetails.destinationCity,
        },
        program: {
          name: application.studyDetails.program,
          level: application.studyDetails.programLevel,
          duration: application.studyDetails.duration,
        },
      },
      status: "active",
    };

    const client = new Client(clientData);
    await client.save();

    return NextResponse.json({
      message: "Client created successfully",
      client,
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      {
        error: "Failed to create client",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    const data = await request.json();
    await connectDB();

    const client = await Client.findById(id);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Update client data
    Object.assign(client, data);
    await client.save();

    return NextResponse.json({
      message: "Client updated successfully",
      client,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Failed to update client" },
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
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}
