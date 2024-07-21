import { NextResponse } from "next/server";
import Application from "@/models/ApplicationForm";
import Consultation from "@/models/consultationForm";
import connectDB from "@/lib/db";

export async function POST(req, res) {
  // get the query from the search parameters
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query"); //query can be either application or consultation

  // confirm data was received
  const data = await req.json();
  if (!data) {
    return NextResponse.json(
      { Error: "received data wasnt valid" },
      { status: 400 }
    );
  }

  if (query === "application") {
    try {
      const {
        applicantName,
        email,
        homeCountry,
        contactNumber,
        whatsAppNumber,
        destinationCountry,
        programCategory,
        parentName,
        parentOccupation,
        parentContact,
      } = data;

      //  capitalize the name provided
      const nameArray = applicantName.split(" ");

      const capitalizedName = nameArray
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1).toLowerCase();
        })
        .join(" ");
      if (
        !applicantName ||
        !email ||
        !homeCountry ||
        !contactNumber ||
        !whatsAppNumber ||
        !destinationCountry ||
        !programCategory ||
        !parentName ||
        !parentOccupation ||
        !parentContact
      ) {
        return NextResponse.json(
          { Error: "Please fill all the fields" },
          { status: 400 }
        );
      }
      // connnnect to the DB
      await connectDB();

      // create a new application in the database with the application schema
      data.applicantName = capitalizedName;
      const newApplication = await new Application(data);
      await newApplication.save();
      return NextResponse.json(
        { success: "your application has been submitted successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { Error: "Error occurred while submitting your application" },
        { status: 500 }
      );
    }
  } else {
    try {
      const {
        consulteeName,
        email,
        contactNumber,
        whatsAppNumber,
        selectedDate,
        selectedTime,
        description,
      } = data;

      //  capitalize the name provided
      const nameArray = consulteeName.split(" ");

      const capitalizedName = nameArray
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1).toLowerCase();
        })
        .join(" ");
      if (
        !consulteeName ||
        !email ||
        !contactNumber ||
        !whatsAppNumber ||
        !selectedDate ||
        !selectedTime ||
        !description
      ) {
        return NextResponse.json(
          { Error: "Please fill all the fields" },
          { status: 400 }
        );
      }
      // connnnect to the DB
      await connectDB();

      // create a new application in the database with the application schema
      data.consulteeName = capitalizedName;
      const newConsultation = await new Consultation(data);
      await newConsultation.save();
      return NextResponse.json(
        { success: "consultation scheduled successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { Error: "Error occurred while submitting your application" },
        { status: 500 }
      );
    }
    //     const { name, email, nationality } = data;

    //     // check if student already exist in database
    //     const nameArray = name.split(" ");

    //     const capitalizedName = nameArray
    //       .map((name) => {
    //         return name[0].toUpperCase() + name.slice(1).toLowerCase();
    //       })
    //       .join(" ");
    //     await connectDB();
    //     // grab the finance model
    //     const finance = await Finance.findOne({ name: "finance" });
    //     // grab the previous activities array
    //     const prevActivitiesArray = finance.activities;

    //     // check if the student to be added already exist
    //     const studentName = await Student.findOne({ name: capitalizedName });
    //     if (studentName) {
    //       return NextResponse.json(
    //         { Error: "student Already exist" },
    //         { status: 401 }
    //       );
    //     } else {
    //       data.name = capitalizedName;
    //       const newStudent = new Student(data);
    //       await newStudent.save();
    //       // create the registration activities object
    //       const newRegistration = {
    //         type: "Registration",
    //         name: capitalizedName,
    //         country: nationality,
    //         date: new Date().toDateString(),
    //       };
    //       // push the new registration into the activities array
    //       const activities = await Finance.findOneAndUpdate(
    //         { name: "finance" },
    //         { activities: [...prevActivitiesArray, newRegistration] },
    //         { new: true }
    //       );
    //       await activities.save();
    //       return NextResponse.json(
    //         { success: "user successfully created" },
    //         { status: 200 }
    //       );
    //     }
    //   }
  }
}
