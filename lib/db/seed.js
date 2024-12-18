import { connectToDB } from "@/lib/db";
import Client from "@/models/Client";
import mongoose from "mongoose";

async function seed() {
  try {
    await connectToDB();
    console.log("Connected to MongoDB");

    // Drop existing collections if needed
    await mongoose.connection.db.dropCollection("clients");
    console.log("Dropped existing clients collection");

    // Create indexes
    await Client.createIndexes();
    console.log("Created indexes for Client model");

    console.log("Database schema updated successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed(); 