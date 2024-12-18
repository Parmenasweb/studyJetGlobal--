import { connectToDB } from "@/lib/db";
import Client from "@/models/Client";
import mongoose from "mongoose";

async function validateSchema() {
  try {
    await connectToDB();
    console.log("Connected to MongoDB");

    // Validate existing documents against schema
    const clients = await Client.find({});
    let hasErrors = false;

    for (const client of clients) {
      try {
        await client.validate();
      } catch (error) {
        console.error(`Validation error for client ${client._id}:`, error.message);
        hasErrors = true;
      }
    }

    if (!hasErrors) {
      console.log("All documents are valid according to the schema");
    }

  } catch (error) {
    console.error("Error validating schema:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

validateSchema(); 