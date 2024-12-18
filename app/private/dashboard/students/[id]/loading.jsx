import { CardSkeleton } from "@/components/skeletons";

export default function LoadingClientDetails() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div className="space-y-2">
          <CardSkeleton className="h-8 w-[200px]" />
          <CardSkeleton className="h-4 w-[300px]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <CardSkeleton className="h-[300px]" />
          <CardSkeleton className="h-[300px]" />
          <CardSkeleton className="h-[400px] lg:col-span-2" />
        </div>
      </div>
    </div>
  );
} 