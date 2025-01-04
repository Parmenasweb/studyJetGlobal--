"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function ConsultationsError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-full p-6">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-destructive/10 p-3 rounded-full">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Oops! Something went wrong
            </h2>
            <p className="text-muted-foreground">
              {error?.message || "We encountered an error while loading the consultations. Please try again."}
            </p>
            <div className="flex gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh Page
              </Button>
              <Button onClick={reset} className="gap-2">
                Try Again
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              If the problem persists, please contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 