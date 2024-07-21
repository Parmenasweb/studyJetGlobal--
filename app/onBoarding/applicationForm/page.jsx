import ApplicationForm from "@/components/forms/applicationsForm";
import Footer from "@/components/homepagecomps/Footer";

export default function ApplicationFormPage() {
  return (
    <main className="flex flex-col sm:overflow-hidden items-center justify-center pt-12">
      <ApplicationForm />
      <Footer />
    </main>
  );
}
