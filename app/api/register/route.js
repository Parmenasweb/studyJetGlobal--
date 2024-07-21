import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const { firstName, lastName, email, password } = await request.json();
    const exists = await User.findOne({ $or: [{ email }, { firstName }] });
    if (exists) {
      return NextResponse.json(
        { message: "User or email already exists" },
        { status: 500 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User successfully registered" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error occurred while registering the user... try again" },
      { status: 500 }
    );
  }
}
