"use client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function TableError({ error, reset }) {
  const router = useRouter();

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />
          <CardTitle>Error Loading Clients</CardTitle>
        </div>
        <CardDescription>
          There was a problem loading the client data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {error?.message || "Please try again or contact support if the problem persists."}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              router.refresh();
              reset?.();
            }}
          >
            Try Again
          </Button>
          <Button
            variant="default"
            onClick={() => router.push("/private/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 