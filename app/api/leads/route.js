import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Lead from "@/models/leads";

// GET ALL THE LEADS IN THE DATABASE
export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;

  const id = searchParams.get("id");
  const leadName = searchParams.get("leadName");
  //   const query = searchParams.get("query");

  // GET A STUDENT BY THE ID QUERY
  if (id) {
    try {
      await connectDB();
      const searchedLead = await Lead.findOne({ _id: id });
      return NextResponse.json(searchedLead, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { Error: "An error occured while adding the lead" },
        { status: 400 }
      );
    }
    // GET A STUDENT BY NAME QUERY
  } else if (leadName) {
    const nameArray = leadName.split(" ");

    const capitalizedName = nameArray
      .map((name) => {
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
      })
      .join(" ");
    // connect Database
    await connectDB();
    // Search the database for the student through the name
    const searchedLead = await Lead.findOne({ leadName: capitalizedName });
    // return the student object
    if (!searchedUser) {
      return NextResponse.json(
        { Error: "queried student doesn't exist.. check your input" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(searchedUser, { status: 200 });
    }
  } else {
    // GET ALL leads IN DB
    // connect to the database
    await connectDB();
    // get all the student from the database
    const allLeads = await Lead.find();
    // return all the student to the UI
    return NextResponse.json(allLeads, { status: 200 });
  }
}

// Add New Student

export async function POST(req, res) {
  const data = await req.json();

  if (!data) {
    return NextResponse.json(
      { Error: "received data wasnt valid" },
      { status: 400 }
    );
  }

  try {
    const {
      leadName,
      email,
      destinationCountry,
      programChosen,
      universityOfChoice,
    } = data;

    if (
      !leadName ||
      !email ||
      !destinationCountry ||
      !programChosen ||
      !universityOfChoice
    ) {
      return NextResponse.json(
        { Error: "Please fill all the fields" },
        { status: 400 }
      );
    }
    //  capitalize the name provided
    // check if student already exist in database
    const nameArray = leadName.split(" ");

    const capitalizedName = nameArray
      .map((name) => {
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
      })
      .join(" ");
    // connnnect to the DB
    await connectDB();
    // check if lead already exist
    const leaderExist = await Leader.findOne({ leadName: capitalizedName });
    if (leaderExist) {
      return NextResponse.json(
        { Error: "this lead already exist.. try editing the lead instead" },
        { status: 500 }
      );
    } else {
      // create a new leader in the database with the leader schema
      data.leadName = capitalizedName;
      const newLead = await new Lead(data);
      await newLead.save();
      return NextResponse.json(
        { success: "Lead has been added successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { Error: "Error occurred while adding the lead" },
      { status: 500 }
    );
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
