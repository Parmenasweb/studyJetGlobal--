import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ErrorPage({ message = "Something went wrong." }) {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-md text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
        <h2 className="mt-4 text-lg font-semibold">Error</h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <Button
          className="mt-4"
          onClick={() => window.location.reload()}
          variant="outline"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}

export function ErrorAlert({ title = "Error", message = "Something went wrong." }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export function ErrorCard({ title = "Error", message = "Something went wrong." }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-destructive p-8">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <Button
        className="mt-4"
        onClick={() => window.location.reload()}
        variant="outline"
      >
        Try Again
      </Button>
    </div>
  );
} 