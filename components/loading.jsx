import { Loader2 } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      <h2 className="mt-4 text-lg font-semibold">Loading...</h2>
      <p className="text-sm text-muted-foreground">Please wait while we fetch the data.</p>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border p-8">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Loading...</h3>
      <p className="text-sm text-muted-foreground">Please wait while we load the content.</p>
    </div>
  );
}

export function LoadingRow() {
  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
      <div className="space-y-2">
        <div className="h-4 w-[200px] animate-pulse rounded bg-muted" />
        <div className="h-4 w-[100px] animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
} 