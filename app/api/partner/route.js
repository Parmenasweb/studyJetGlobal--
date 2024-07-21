import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Partner from "@/models/partners";
import Scholarship from "@/models/Scholarship";

// GET ALL THE SCHOLARSHIP AND PARTNERSHIP IN THE DATABASE
export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;

  //   const id = searchParams.get("id");
  //   const leadName = searchParams.get("leadName");
  const query = searchParams.get("query");

  // GET A STUDENT BY THE ID QUERY
  if (query === "scholarship") {
    try {
      await connectDB();
      const allScholarship = await Scholarship.find();
      return NextResponse.json(allScholarship, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { Error: "An error occured while fetching all scholarship" },
        { status: 400 }
      );
    }
    // GET A STUDENT BY NAME QUERY
  } else {
    try {
      // GET ALL partners IN DB
      // connect to the database
      await connectDB();
      // get all the partners from the database
      const allPartners = await Partner.find();
      // return all the partners to the UI
      return NextResponse.json(allPartners, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { Error: "An error occured while fetching all partners" },
        { status: 400 }
      );
    }
  }
}

// Add New Student

export async function POST(req, res) {
  const data = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!data) {
    return NextResponse.json(
      { Error: "received data wasnt valid" },
      { status: 400 }
    );
  }

  if (query === "scholarship") {
    try {
      const { title, UniversityName, description, status } = data;

      //  capitalize the name provided
      // check if student already exist in database
      const nameArray = title.split(" ");

      const capitalizedName = nameArray
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1).toLowerCase();
        })
        .join(" ");
      if (!title || !UniversityName || !description || !status) {
        return NextResponse.json(
          { Error: "Please fill all the fields" },
          { status: 400 }
        );
      }
      // connnnect to the DB
      await connectDB();
      // create a new scholarship in the database with the scholarship schema
      data.title = capitalizedName;
      const newScholarship = await new Scholarship(data);
      await newScholarship.save();
      return NextResponse.json(
        { success: "Schorlarship has been activated successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { Error: "Error occurred while creating new Scholarship" },
        { status: 500 }
      );
    }
  } else {
    try {
      // ADD NEW PARTNER
      const { universityName } = data;

      // check if student already exist in database
      const nameArray = universityName.split(" ");

      const capitalizedName = nameArray
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1).toLowerCase();
        })
        .join(" ");
      await connectDB();
      data.universityName = capitalizedName;
      const newPartner = await new Partner(data);
      await newPartner.save();
      return NextResponse.json(
        { success: "Congratulations you've gotten a new partner!!" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { Error: "Error occurred while creating new Scholarship" },
        { status: 500 }
      );
    }
  }
}

// Edit a specific student in the database

export async function PUT(req, res) {
  // get all the query in url
  const searchParams = req.nextUrl.searchParams;

  const studentId = searchParams.get("id");
  // get data object from the request

  const { name, email, nationality, birthday, department, contact } =
    await req.json();
  // check the database for the matching queried id

  if (!studentId) {
    return NextResponse.json(
      { Error: "Wrong Student data format" },
      { status: 400 }
    );
  } else {
    if (name) {
      const nameArray = name.split(" ");
      const capitalizedName = nameArray
        .map((name) => {
          return name[0].toUpperCase() + name.slice(1).toLowerCase();
        })
        .join(" ");
      // update the user name to the new name
      await connectDB();
      const updatedStudentData = await Student.findOneAndUpdate(
        { _id: studentId },
        { name: capitalizedName },
        { new: true }
      );
      await updatedStudentData.save();
    }
    if (email) {
      await connectDB();
      const updatedStudentData = await Student.findOneAndUpdate(
        { _id: studentId },
        { email: email },
        { new: true }
      );
      await updatedStudentData.save();
    }
    if (nationality) {
      await connectDB();
      const updatedStudentData = await Student.findOneAndUpdate(
        { _id: studentId },
        { nationality: nationality },
        { new: true }
      );
      await updatedStudentData.save();
    }
    if (birthday) {
      await connectDB();
      const updatedStudentData = await Student.findOneAndUpdate(
        { _id: studentId },
        { birthday: birthday },
        { new: true }
      );
      await updatedStudentData.save();
    }
    if (department) {
      await connectDB();
      const updatedStudentData = await Student.findOneAndUpdate(
        { _id: studentId },
        { department: department },
        { new: true }
      );
      await updatedStudentData.save();
    }
    if (contact) {
      await connectDB();
      const updatedStudentData = await Student.findOneAndUpdate(
        { _id: studentId },
        { contact: contact },
        { new: true }
      );
      await updatedStudentData.save();
    }

    return NextResponse.json(
      { sucess: "student successfully edited" },
      { status: 200 }
    );
  }
}

// Delete a specific student in the database

export async function DELETE(req, res) {
  // get all the query in url
  const searchParams = req.nextUrl.searchParams;

  const studentId = searchParams.get("id");
  // get data object from the request

  if (!studentId) {
    return NextResponse.json(
      { Error: "No student was selected" },
      { status: 400 }
    );
  } else {
    await connectDB();
    const deletedStudent = await Student.findOneAndDelete({ _id: studentId });
    if (!deletedStudent) {
      return NextResponse.json(
        { error: "error occurred while deleting the student" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: "student successfully deleted" },
        { status: 200 }
      );
    }
    // await deletedStudent.save();
  }
}
