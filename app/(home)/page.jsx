import HeroSection from "@/components/homepagecomps/HeroSection";
import Navbar from "./components/Navbar";
import Programs from "@/components/homepagecomps/programs";
import WhyUs from "@/components/homepagecomps/whyUs";
import StudySteps from "@/components/homepagecomps/study-steps";
import Testimonials from "@/components/homepagecomps/testimonials";
import Footer from "@/components/homepagecomps/Footer";
import FAQS from "@/components/homepagecomps/faqs";
import CTA from "@/components/homepagecomps/cta";
import NavHero from "./components/Nav+Hero";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className=" w-[99%] mx-auto  sm:pt-5 ">
        {/* <Navbar /> */}
        <NavHero />
        <br />
        <StudySteps />
        <br />
        <Programs />
        <br />
        <WhyUs />
        <br />
        <Testimonials />
        <br />
        <CTA />
        <br />
        <FAQS />
        <br />
        <Footer />
      </div>
    </main>
  );
}
