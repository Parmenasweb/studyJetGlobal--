import connectDB from "@/lib/db";
import Destination from "@/models/Destination";
import { NextResponse } from "next/server";

// GET REQUEST
export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const countryName = searchParams.get("countryName");
  if (countryName) {
    try {
      // CONNECT TO THE DATABASE
      await connectDB();
      // GET THE SPECIFIC COUNTRY FROM THE MONGO DB
      const country = await Destination.findOne({ countryName });
      // RETURN ALL PROGRAMS WITH A VALID STATUS
      return NextResponse.json(country, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        {
          message:
            "Error occurred while fetching destinations from the database",
        },
        { status: 500 }
      );
    }
  } else {
    // GET ALL THE DESTINATION IN THE DATABASE
    try {
      // CONNECT TO THE DATABASE
      await connectDB();
      // REQUEST ALL THE PROGRAMS FROM THE MONGO DB
      const allDestination = await Destination.find();
      // RETURN ALL PROGRAMS WITH A VALID STATUS
      return NextResponse.json(allDestination, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        {
          message:
            "Error occurred while fetching destinations from the database",
        },
        { status: 500 }
      );
    }
  }
}

export async function POST(request) {
  const data = await request.json();
  const {
    destinationName,
    description,
    destinationCapital,
    studyCost,
    accommodationFee,
    imageUrl,
    flagUrl,
  } = data;

  if (
    !destinationName ||
    !description ||
    !destinationCapital ||
    !studyCost ||
    !accommodationFee ||
    !imageUrl ||
    !flagUrl
  ) {
    return NextResponse.json(
      { Error: "received data wasnt valid" },
      { status: 400 }
    );
  } else {
    try {
      // connect to the database
      await connectDB();

      // capitalize the name of the country
      const nameArray = destinationName.split(" ");

      const capitalizedName = nameArray
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1).toLowerCase();
        })
        .join(" ");

      // create a new destination object with the received data
      data.destinationName = capitalizedName;

      const newDestination = await new Destination(data);
      await newDestination.save();
      return NextResponse.json(
        { message: "New study destination added successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json({ message: { err } }, { status: 500 });
    }
  }
}
