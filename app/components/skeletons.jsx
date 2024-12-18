import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden">
      <div className="container px-4 py-24 md:py-32 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Badge Skeleton */}
            <Skeleton className="h-8 w-48 rounded-full" />

            {/* Heading Skeleton */}
            <div className="space-y-4 w-full">
              <Skeleton className="h-12 w-full max-w-xl" />
              <Skeleton className="h-12 w-3/4 max-w-lg" />
            </div>

            {/* Subheading Skeleton */}
            <Skeleton className="h-6 w-full max-w-lg" />

            {/* CTA Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Skeleton className="h-12 w-[200px]" />
              <Skeleton className="h-12 w-[200px]" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-3 gap-8 pt-8 w-full max-w-md">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          {/* Right Column - Image Skeleton */}
          <div className="relative h-[500px] w-full">
            <Skeleton className="h-full w-full rounded-lg" />
            {/* Floating card skeleton */}
            <div className="absolute bottom-8 left-8 w-[200px]">
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 