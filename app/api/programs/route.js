import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Program from "@/models/programs";

export async function GET(req, res) {
  // GET ALL THE PROGRAMS IN THE DATABASE
  try {
    // CONNECT TO THE DATABASE
    await connectDB();
    // REQUEST ALL THE RPOGRAMS FROM THE MONGO DB
    const allPrograms = await Program.find();
    // RETURN ALL PROGRAMS WITH A VALID STATUS
    return NextResponse.json(allPrograms, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error occurred while fetching programs from the database",
      },
      { status: 500 }
    );
  }
}

//   POST REQUEST
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
      const { programName } = data;
      //  capitalize the name provided
      const nameArray = programName.split(" ");

      const capitalizedName = nameArray
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1).toLowerCase();
        })
        .join(" ");
      data.programName = capitalizedName;
      const newProgram = await new Program(data);
      await newProgram.save();
      return NextResponse.json(
        { message: "Program has been added successfully" },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          message: "Error occurred while adding the program to the database",
        },
        { status: 500 }
      );
    }
  }
}
