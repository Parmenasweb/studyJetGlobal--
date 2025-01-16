import { Suspense } from "react";
import { CardSkeleton } from "@/components/skeletons";
import ErrorBoundary from "./components/ErrorBoundary";

export default function StudentsLayout({ children }) {
  return (
    <div className="flex-1 space-y-2 p-1 ">
      <ErrorBoundary>
        <Suspense fallback={<CardSkeleton />}>{children}</Suspense>
      </ErrorBoundary>
    </div>
  );
} 