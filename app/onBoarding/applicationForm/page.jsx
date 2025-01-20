// import ApplicationForm from "@/components/forms/applicationsForm";
import ApplicationForm from "@/components/forms/ApplicationFormNew";
// import ApplicationForm from "@/components/forms/ApplicationForm";
import Footer from "@/components/homepagecomps/Footer";

export default function ApplicationFormPage() {
  return (
    <div className="w-full">
      <main className=" w-full mb-12 flex flex-col sm:overflow-hidden items-center justify-center pt-12">
        <ApplicationForm />
      </main>
        <Footer />
    </div>
  );
}
