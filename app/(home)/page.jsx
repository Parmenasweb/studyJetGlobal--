import { Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { 
  HeroSkeleton,
  StudyStepsSkeleton,
  ProgramsSkeleton,
  WhyUsSkeleton,
  TestimonialsSkeleton,
  CTASkeleton,
  FAQSSkeleton
} from "@/components/skeletons/index";

// Dynamic imports with loading optimization
const HeroSection = dynamic(() => import("./components/HeroSection"), {
  loading: () => <HeroSkeleton />
});
const StudySteps = dynamic(() => import("@/components/homepagecomps/study-steps"), {
  loading: () => <StudyStepsSkeleton />
});
const Programs = dynamic(() => import("@/components/homepagecomps/programs"), {
  loading: () => <ProgramsSkeleton />
});
const WhyUs = dynamic(() => import("@/components/homepagecomps/whyUs"), {
  loading: () => <WhyUsSkeleton />
});
const Testimonials = dynamic(() => import("@/components/homepagecomps/testimonials"), {
  loading: () => <TestimonialsSkeleton />
});
const CTA = dynamic(() => import("@/components/homepagecomps/cta"), {
  loading: () => <CTASkeleton />
});
const FAQS = dynamic(() => import("@/components/homepagecomps/faqs"), {
  loading: () => <FAQSSkeleton />
});
const Footer = dynamic(() => import("@/components/homepagecomps/Footer"));

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24 py-4 sm:py-6 md:py-8">
          <Suspense fallback={<HeroSkeleton />}>
            <HeroSection />
          </Suspense>
          
          <Suspense fallback={<StudyStepsSkeleton />}>
            <StudySteps />
          </Suspense>
          
          <Suspense fallback={<ProgramsSkeleton />}>
            <Programs />
          </Suspense>
          
          <Suspense fallback={<WhyUsSkeleton />}>
            <WhyUs />
          </Suspense>
          
          <Suspense fallback={<TestimonialsSkeleton />}>
            <Testimonials />
          </Suspense>
          
          <Suspense fallback={<CTASkeleton />}>
            <CTA />
          </Suspense>
          
          <Suspense fallback={<FAQSSkeleton />}>
            <FAQS />
          </Suspense>
          
          <Suspense fallback={<div className="animate-pulse h-40 bg-gray-100" />}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
