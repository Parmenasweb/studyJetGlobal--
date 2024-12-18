import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { CardContainer } from "@/app/private/dashboard/components/cardWrapper";

export const NavHeroSkeleton = () => (
  <div className="space-y-8 w-full">
    {/* Nav Skeleton */}
    <div className="flex justify-between items-center h-16">
      <Skeleton className="h-8 w-32" />
      <div className="flex gap-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
    
    {/* Hero Skeleton */}
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-10 w-40 mt-6" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  </div>
);

export const StudyStepsSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-10 w-48 mx-auto" />
    <div className="grid md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  </div>
);

export const ProgramsSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-10 w-48 mx-auto" />
    <div className="grid md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export const WhyUsSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-8">
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-5/6" />
      <div className="space-y-4 mt-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
    <Skeleton className="h-[500px] rounded-lg" />
  </div>
);

export const TestimonialsSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-10 w-48 mx-auto" />
    <div className="grid md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4 p-6 border rounded-lg">
          <Skeleton className="h-16 w-16 rounded-full mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  </div>
);

export const CTASkeleton = () => (
  <div className="space-y-6 text-center">
    <Skeleton className="h-10 w-64 mx-auto" />
    <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
    <Skeleton className="h-12 w-48 mx-auto" />
  </div>
);

export const FAQSSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-10 w-48 mx-auto" />
    <div className="space-y-4 max-w-3xl mx-auto">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-12 w-full rounded" />
        </div>
      ))}
    </div>
  </div>
);

export function CardSkeleton() {
  return (
    <CardContainer>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-3 w-[140px]" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-[120px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </CardContainer>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <CardContainer>
      <div className="p-6">
        <Skeleton className="h-[300px]" />
      </div>
    </CardContainer>
  );
}

export function StudentCardSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-3 w-[200px]" />
      </div>
      <Skeleton className="ml-auto h-4 w-[100px]" />
    </div>
  );
} 