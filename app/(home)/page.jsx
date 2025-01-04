import { Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { 
  NavHeroSkeleton,
  StudyStepsSkeleton,
  ProgramsSkeleton,
  WhyUsSkeleton,
  TestimonialsSkeleton,
  CTASkeleton,
  FAQSSkeleton
} from "@/components/skeletons/index";

// Dynamic imports with loading optimization
const HeroSection = dynamic(() => import("./components/HeroSection"), {
  loading: () => <NavHeroSkeleton />
});
const StudySteps = dynamic(() => import("@/components/homepagecomps/study-steps"), {
  loading: () => <StudyStepsSkeleton />
});
const Programs = dynamic(() => import("@/components/homepagecomps/programs"), {
  loading: () => <ProgramsSkeleton />
});
const WhyUs = dynamic(() => import("@/components/homepagecomps/WhyChooseUs"), {
  loading: () => <WhyUsSkeleton />
});
const CallToAction = dynamic(() => import("@/components/homepagecomps/CallToAction"), {
  loading: () => <CTASkeleton />
});
const SuccessStories = dynamic(() => import("@/components/homepagecomps/SuccessStories"), {
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
    // <main className=" min-h-screen overflow-x-hidden">
      // <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" w-[98%] mx-auto flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24 py-1 sm:py-2 md:py-4"> 
          <Suspense fallback={<NavHeroSkeleton />}>
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

          <Suspense fallback={<WhyUsSkeleton />}>
            <SuccessStories />
          </Suspense>

          <Suspense fallback={<CTASkeleton />}>
            <CallToAction />
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
        {/* </div> */}
      </div>
    // </main>
  );
}
