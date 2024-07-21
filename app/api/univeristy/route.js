import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import University from "@/models/University";

// GET REQUEST

export async function GET(req, res) {
  // GET ALL THE UNIVERSITY IN THE DATABASE
  try {
    // CONNECT TO THE DATABASE
    await connectDB();
    // REQUEST ALL THE UNIVERSITY FROM THE MONGO DB
    const allUniversity = await University.find();
    // RETURN ALL UNIVERSITY WITH A VALID STATUS
    return NextResponse.json(allUniversity, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error occurred while fetching universities from the database",
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
      const { universityName } = data;
      //  capitalize the name provided
      const nameArray = universityName.split(" ");

      const capitalizedName = nameArray
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1).toLowerCase();
        })
        .join(" ");
      data.universityName = capitalizedName;
      const university = await new University(data);
      await university.save();
      return NextResponse.json(
        { message: "University has been added successfully" },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          message: "Error occurred while adding the university to the database",
        },
        { status: 500 }
      );
    }
  }
}
