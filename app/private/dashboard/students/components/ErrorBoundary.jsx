"use client";

import { useEffect } from "react";
import { TableError } from "./TableError";

export default function ErrorBoundary({ children, error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught error:", error);
  }, [error]);

  if (error) {
    return <TableError error={error} reset={reset} />;
  }

  return children;
} 