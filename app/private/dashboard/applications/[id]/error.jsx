"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function ApplicationDetailsError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Details Error:", error);
  }, [error]);

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle>Error Loading Application</CardTitle>
          </div>
          <CardDescription>
            There was a problem loading the application details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {error?.message || "Please try again or contact support if the problem persists."}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={reset} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button asChild className="flex items-center gap-2">
              <Link href="/private/dashboard/applications">
                <Home className="h-4 w-4" />
                Back to Applications
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 