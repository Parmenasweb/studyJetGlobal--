import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { NextResponse } from "next/server";

// GET REQUEST
export async function GET(req, res) {
  // GET ALL THE DESTINATION IN THE DATABASE
  try {
    // CONNECT TO THE DATABASE
    await connectDB();
    // REQUEST ALL THE RPOGRAMS FROM THE MONGO DB
    const allDestination = await Destination.find();
    // RETURN ALL PROGRAMS WITH A VALID STATUS
    return NextResponse.json(allDestination, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error occurred while fetching destinations from the database",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const data = await request.json();

  if (!data) {
    return NextResponse.json(
      { Error: "received data wasnt valid" },
      { status: 400 }
    );
  } else {
    try {
      // connect to the database
      await connectDB();
      // capitalize the name of the country
      const { destinationName } = data;
      //  capitalize the name provided
      const nameArray = destinationName.split(" ");

      const capitalizedName = nameArray
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1).toLowerCase();
        })
        .join(" ");
      data.destinationName = capitalizedName;
      const newDestination = await new Destination(data);
      await newDestination.save();
      return NextResponse.json(
        { message: "New study destination added successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Error occurred while adding destination to the database" },
        { status: 500 }
      );
    }
  }
}
