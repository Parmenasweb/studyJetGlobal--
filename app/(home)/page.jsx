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
const ScrollProgress = dynamic(() => import("@/components/ui/scroll-progress"), {
  ssr: false
});

const HeroSection = dynamic(() => import("./components/HeroSection"), {
  loading: () => <NavHeroSkeleton />,
  ssr: true
});

const StudySteps = dynamic(() => import("@/components/homepagecomps/study-steps"), {
  loading: () => <StudyStepsSkeleton />,
  ssr: true
});

const PopularDestinations = dynamic(() => import("./components/PopularDestinations"), {
  loading: () => <ProgramsSkeleton />,
  ssr: true
});

const PopularPrograms = dynamic(() => import("./components/PopularPrograms"), {
  loading: () => <ProgramsSkeleton />,
  ssr: true
});

const CallToAction = dynamic(() => import("@/components/homepagecomps/CallToAction"), {
  loading: () => <CTASkeleton />,
  ssr: true
});

const SuccessStories = dynamic(() => import("@/components/homepagecomps/SuccessStories"), {
  loading: () => <WhyUsSkeleton />,
  ssr: true
});

const Testimonials = dynamic(() => import("@/components/homepagecomps/testimonials"), {
  loading: () => <TestimonialsSkeleton />,
  ssr: true
});

const CTA = dynamic(() => import("@/components/homepagecomps/cta"), {
  loading: () => <CTASkeleton />,
  ssr: true
});

const FAQS = dynamic(() => import("@/components/homepagecomps/faqs"), {
  loading: () => <FAQSSkeleton />,
  ssr: true
});

const Footer = dynamic(() => import("@/components/homepagecomps/Footer"), {
  ssr: true
});

const TrustIndicators = dynamic(() => import("@/components/homepagecomps/TrustIndicators"), {
  loading: () => <div className="animate-pulse h-96 bg-muted" />,
  ssr: true
});

const QuickApplicationSteps = dynamic(() => import("@/components/homepagecomps/QuickApplicationSteps"), {
  loading: () => <div className="animate-pulse h-96 bg-muted" />,
  ssr: true
});

const ValuePropositionEmergency = dynamic(() => import("@/components/homepagecomps/ValuePropositionEmergency"), {
  loading: () => <div className="animate-pulse h-96 bg-muted" />,
  ssr: true
});

const ScholarshipCalculator = dynamic(() => import("@/components/homepagecomps/ScholarshipCalculator"), {
  loading: () => <div className="animate-pulse h-96 bg-muted" />,
  ssr: false // Client-side only as it requires interactivity
});

export default function Home() {
  return (
    <>
      <ScrollProgress />
      
      <div className="w-[100%] mx-auto flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24"> 
        <HeroSection />
        
        <Suspense fallback={<div className="animate-pulse h-96 bg-muted" />}>
          <TrustIndicators />
        </Suspense>

        <Suspense fallback={<div className="animate-pulse h-96 bg-muted" />}>
          <QuickApplicationSteps />
        </Suspense>
        
        <Suspense fallback={<StudyStepsSkeleton />}>
          <StudySteps />
        </Suspense>
        
        <Suspense fallback={<ProgramsSkeleton />}>
          <PopularDestinations />
        </Suspense>
        
        <Suspense fallback={<ProgramsSkeleton />}>
          <PopularPrograms />
        </Suspense>
        
        <Suspense fallback={<CTASkeleton />}>
          <CallToAction />
        </Suspense>

        <Suspense fallback={<div className="animate-pulse h-96 bg-muted" />}>
          <ValuePropositionEmergency />
        </Suspense>

        <Suspense fallback={<div className="animate-pulse h-96 bg-muted" />}>
          <ScholarshipCalculator />
        </Suspense>

        <Suspense fallback={<WhyUsSkeleton />}>
          <SuccessStories />
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
    </>
  );
}
