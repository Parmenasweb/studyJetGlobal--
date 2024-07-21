// // import { users } from "@/lib/dummyData";
// import { NextResponse } from "next/server";
// import connectDB from "@/config/db";
// // import Student from "@/models/Students";
// // import Finance from "@/models/Finance";
// // import Leader from "@/models/Leaders";
// import User from "@/models/User";

// // Get all Students
// export async function GET(req, res) {
//   const searchParams = req.nextUrl.searchParams;

//   const id = searchParams.get("id");
//   const studentName = searchParams.get("studentName");
//   const query = searchParams.get("query");

//   // GET A STUDENT BY THE ID QUERY
//   if (id) {
//     try {
//       await connectDB();
//       const searchedStudent = await Student.findOne({ _id: id });
//       return NextResponse.json(searchedStudent, { status: 200 });
//     } catch (err) {
//       return NextResponse.json(
//         { Error: "there was an error while deleting student" },
//         { status: 400 }
//       );
//     }
//     // GET A STUDENT BY NAME QUERY
//   } else if (studentName) {
//     const nameArray = studentName.split(" ");

//     const capitalizedName = nameArray
//       .map((name) => {
//         return name[0].toUpperCase() + name.slice(1).toLowerCase();
//       })
//       .join(" ");
//     // connect Database
//     await connectDB();
//     // Search the database for the student through the name
//     const searchedUser = await Student.findOne({ name: capitalizedName });
//     // return the student object
//     if (!searchedUser) {
//       return NextResponse.json(
//         { Error: "queried student doesn't exist.. check your input" },
//         { status: 401 }
//       );
//     } else {
//       return NextResponse.json(searchedUser, { status: 200 });
//     }

//     // GET ALL STUDENT IN DB
//   } else if (query === "getLeader") {
//     // return the leader object
//     await connectDB();
//     const allLeaders = await Leader.find();
//     return NextResponse.json(allLeaders, { status: 200 });
//   } else {
//     // connect to the database
//     await connectDB();
//     // get all the student from the database
//     const allStudents = await Student.find();
//     // get all leaders in the DB
//     const allLeaders = await Leader.find();
//     // return all the student to the UI
//     return NextResponse.json(allStudents, allLeaders, { status: 200 });
//   }
// }

// // Add New Student

// export async function POST(req, res) {
//   const data = await req.json();
//   const searchParams = req.nextUrl.searchParams;
//   const query = searchParams.get("query");

//   if (!data) {
//     return NextResponse.json(
//       { Error: "received data wasnt valid" },
//       { status: 400 }
//     );
//   }

//   if (query === "addLeader") {
//     try {
//       const { name, email, position, contact } = data;

//       //  capitalize the name provided
//       // check if student already exist in database
//       const nameArray = name.split(" ");

//       const capitalizedName = nameArray
//         .map((name) => {
//           return name[0].toUpperCase() + name.slice(1).toLowerCase();
//         })
//         .join(" ");
//       if (!name || !email || !position || !contact) {
//         return NextResponse.json(
//           { Error: "Please fill all the fields" },
//           { status: 400 }
//         );
//       }
//       // connnnect to the DB
//       await connectDB();
//       // check if leader already exist
//       const leaderExist = await Leader.findOne({ name: capitalizedName });
//       if (leaderExist) {
//         return NextResponse.json(
//           { Error: "this leader already exist" },
//           { status: 500 }
//         );
//       } else {
//         // create a new leader in the database with the leader schema
//         data.name = capitalizedName;
//         const newLeader = await new Leader(data);
//         await newLeader.save();
//         return NextResponse.json(
//           { success: "Leader has been added successfully" },
//           { status: 200 }
//         );
//       }
//     } catch (err) {
//       return NextResponse.json(
//         { Error: "Error occurred while adding the leader" },
//         { status: 500 }
//       );
//     }
//   } else {
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
// }

// // Edit a specific student in the database

// export async function PUT(req, res) {
//   // get all the query in url
//   const searchParams = req.nextUrl.searchParams;

//   const studentId = searchParams.get("id");
//   // get data object from the request

//   const { name, email, nationality, birthday, department, contact } =
//     await req.json();
//   // check the database for the matching queried id

//   if (!studentId) {
//     return NextResponse.json(
//       { Error: "Wrong Student data format" },
//       { status: 400 }
//     );
//   } else {
//     if (name) {
//       const nameArray = name.split(" ");
//       const capitalizedName = nameArray
//         .map((name) => {
//           return name[0].toUpperCase() + name.slice(1).toLowerCase();
//         })
//         .join(" ");
//       // update the user name to the new name
//       await connectDB();
//       const updatedStudentData = await Student.findOneAndUpdate(
//         { _id: studentId },
//         { name: capitalizedName },
//         { new: true }
//       );
//       await updatedStudentData.save();
//     }
//     if (email) {
//       await connectDB();
//       const updatedStudentData = await Student.findOneAndUpdate(
//         { _id: studentId },
//         { email: email },
//         { new: true }
//       );
//       await updatedStudentData.save();
//     }
//     if (nationality) {
//       await connectDB();
//       const updatedStudentData = await Student.findOneAndUpdate(
//         { _id: studentId },
//         { nationality: nationality },
//         { new: true }
//       );
//       await updatedStudentData.save();
//     }
//     if (birthday) {
//       await connectDB();
//       const updatedStudentData = await Student.findOneAndUpdate(
//         { _id: studentId },
//         { birthday: birthday },
//         { new: true }
//       );
//       await updatedStudentData.save();
//     }
//     if (department) {
//       await connectDB();
//       const updatedStudentData = await Student.findOneAndUpdate(
//         { _id: studentId },
//         { department: department },
//         { new: true }
//       );
//       await updatedStudentData.save();
//     }
//     if (contact) {
//       await connectDB();
//       const updatedStudentData = await Student.findOneAndUpdate(
//         { _id: studentId },
//         { contact: contact },
//         { new: true }
//       );
//       await updatedStudentData.save();
//     }

//     return NextResponse.json(
//       { sucess: "student successfully edited" },
//       { status: 200 }
//     );
//   }
// }

// // Delete a specific student in the database

// export async function DELETE(req, res) {
//   // get all the query in url
//   const searchParams = req.nextUrl.searchParams;

//   const studentId = searchParams.get("id");
//   // get data object from the request

//   if (!studentId) {
//     return NextResponse.json(
//       { Error: "No student was selected" },
//       { status: 400 }
//     );
//   } else {
//     await connectDB();
//     const deletedStudent = await Student.findOneAndDelete({ _id: studentId });
//     if (!deletedStudent) {
//       return NextResponse.json(
//         { error: "error occurred while deleting the student" },
//         { status: 400 }
//       );
//     } else {
//       return NextResponse.json(
//         { success: "student successfully deleted" },
//         { status: 200 }
//       );
//     }
//     // await deletedStudent.save();
//   }
// }
