import connectDB from "@/lib/db";
import Client from "@/models/Client";
import mongoose from "mongoose";

const sampleClients = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    clientType: "study",
    status: "active",
    destination: "Canada",
    applicationDate: new Date(),
    studyDetails: {
      university: "University of Toronto",
      course: "Computer Science",
      programLevel: "undergraduate",
      startDate: new Date("2024-09-01"),
    },
    commissionAmount: 2000,
    notes: "Interested in AI specialization",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    clientType: "work",
    status: "pending",
    destination: "Australia",
    applicationDate: new Date(),
    workDetails: {
      company: "Tech Corp",
      jobTitle: "Software Engineer",
      contractDuration: "2 years",
      expectedSalary: 85000,
    },
    commissionAmount: 1500,
    notes: "Seeking permanent residency",
  },
];

async function seedData() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Insert sample data
    await Client.insertMany(sampleClients);
    console.log("Sample data inserted successfully");

  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seedData(); 