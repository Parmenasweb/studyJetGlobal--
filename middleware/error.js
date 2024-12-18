import { NextResponse } from "next/server";

export function handleError(error) {
  console.error(error);
  
  if (error.name === 'ValidationError') {
    return new NextResponse(error.message, { status: 400 });
  }
  
  if (error.name === 'CastError') {
    return new NextResponse("Invalid ID format", { status: 400 });
  }
  
  if (error.code === 11000) {
    return new NextResponse("Duplicate entry", { status: 409 });
  }
  
  return new NextResponse("Internal Server Error", { status: 500 });
} 