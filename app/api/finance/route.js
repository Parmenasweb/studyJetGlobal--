// import connectDB from "@/config/db";
// import Finance from "@/models/Finance";
// import { NextResponse } from "next/server";

// export async function GET(req, res) {
//   await connectDB();
//   // get the whole finance object
//   const finance = await Finance.find();
//   // return the finance object to the user
//   return NextResponse.json(finance, { status: 200 });
// }

// export async function POST(req, res) {
//   const data = await req.json();
//   const searchParams = req.nextUrl.searchParams;
//   const query = searchParams.get("query");

//   if (!data) {
//     return NextResponse.json(
//       { Error: "received data wasn't valid" },
//       { status: 400 }
//     );
//   }

//   if (!query) {
//     return NextResponse.json({ Error: "Data wasn't valid" }, { status: 400 });
//   } else {
//     if (query === "contribution") {
//       const { type, studentName, amount } = data;
//       // create a new date for the contribution
//       data.date = new Date().toDateString();
//       // connect to the database
//       await connectDB();
//       //   creating new finance
//       // const newFinance = await new Finance({
//       //   name: "finance",
//       //   total: 0,
//       //   contributions: [],
//       //   expenses: [],
//       //   activities: [],
//       //   notices: [],
//       // });
//       // await newFinance.save();

//       //   grab the finance object
//       const finance = await Finance.findOne({ name: "finance" });
//       // grab the previous contributions array too
//       const contributionArray = finance.contributions;
//       //   grab previous finance total
//       const financeTotal = finance.total;
//       //   grab the previous activity array
//       const previousActivityArray = finance.activities;

//       //   update the total
//       const total = await Finance.findOneAndUpdate(
//         { name: "finance" },
//         { total: financeTotal + Number(amount) },
//         { new: true }
//       );
//       await total.save();
//       //   update the activities array
//       const activities = await Finance.findOneAndUpdate(
//         { name: "finance" },
//         { activities: [...previousActivityArray, data] },
//         { new: true }
//       );
//       await activities.save();

//       // create a new contribution doc
//       const contributions = await Finance.findOneAndUpdate(
//         { name: "finance" },
//         { contributions: [...contributionArray, data] },
//         { new: true }
//       );
//       await contributions.save();

//       return NextResponse.json(
//         { success: "contribution has been added successfully" },
//         { status: 200 }
//       );
//     }
//     if (query === "expenses") {
//       // grab the expenses data object
//       const { type, amount, purpose } = data;

//       // connect to the database
//       await connectDB();
//       data.date = new Date().toDateString();

//       //   grab the finance object
//       const finance = await Finance.findOne({ name: "finance" });
//       // grab the previous expenses array too
//       const expensesArray = finance.expenses;
//       //   grab previous finance total
//       const financeTotal = finance.total;
//       //   grab the previous activity array
//       const previousActivityArray = finance.activities;

//       if (amount > financeTotal) {
//         return NextResponse.json(
//           { Error: "The amount is greater than the total" },
//           { status: 401 }
//         );
//       } else {
//         //   update the total
//         const total = await Finance.findOneAndUpdate(
//           { name: "finance" },
//           { total: financeTotal - Number(amount) },
//           { new: true }
//         );
//         await total.save();

//         //   update the activities array
//         const activities = await Finance.findOneAndUpdate(
//           { name: "finance" },
//           { activities: [...previousActivityArray, data] },
//           { new: true }
//         );
//         await activities.save();

//         // create a new expenses doc
//         const expenses = await Finance.findOneAndUpdate(
//           { name: "finance" },
//           { expenses: [...expensesArray, data] },
//           { new: true }
//         );
//         await expenses.save();

//         return NextResponse.json(
//           { success: "The Expenses have been successfully updated" },
//           { status: 200 }
//         );
//       }
//     }

//     if (query === "notice") {
//       // grab the notice data object
//       const { title, content } = data;

//       // connect to the database
//       await connectDB();
//       data.date = new Date().toDateString();
//       data.type = "notice";

//       //   grab the finance object
//       const finance = await Finance.findOne({ name: "finance" });
//       // grab the previous notice array too
//       const noticeArray = finance.notices;
//       //   grab the previous activity array
//       const previousActivityArray = finance.activities;

//       if (!title || !content) {
//         return NextResponse.json(
//           { error: "received data isn't valid" },
//           { status: 400 }
//         );
//       } else {
//         // update the notices array with the received data
//         const newNoticesArray = await Finance.findOneAndUpdate(
//           { name: "finance" },
//           { notices: [...noticeArray, data] },
//           { new: true }
//         );

//         await newNoticesArray.save();

//         // update the activities array

//         const newActivitiesArray = await Finance.findOneAndUpdate(
//           { name: "finance" },
//           { activities: [...previousActivityArray, data] },
//           { new: true }
//         );

//         await newActivitiesArray.save();

//         return NextResponse.json(
//           { success: "notices updated successfully" },
//           { status: 200 }
//         );
//       }
//     }

//     if (query === "addEvent") {
//       // grab the notice data object
//       const { title, date, description } = data;

//       // connect to the database
//       await connectDB();
//       data.type = "event";

//       //   grab the finance object
//       const finance = await Finance.findOne({ name: "finance" });
//       // grab the previous notice array too
//       const eventsArray = finance.events;

//       if (!title || !date || !description) {
//         return NextResponse.json(
//           { error: "received data isn't valid" },
//           { status: 400 }
//         );
//       } else {
//         // create a capitalized version of the title
//         const titleArray = title.split(" ");

//         const capitalizedTitle = titleArray
//           .map((name) => {
//             return name[0].toUpperCase() + name.slice(1).toLowerCase();
//           })
//           .join(" ");
//         // update the events array with the received data
//         data.title = capitalizedTitle;
//         const newEventsArray = await Finance.findOneAndUpdate(
//           { name: "finance" },
//           { events: [...eventsArray, data] },
//           { new: true }
//         );

//         await newEventsArray.save();
//         return NextResponse.json(
//           { success: "Events Created successfully" },
//           { status: 200 }
//         );
//       }
//     }
//   }
// }
