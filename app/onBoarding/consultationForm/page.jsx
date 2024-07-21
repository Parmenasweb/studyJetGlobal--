import ConsultationForm from "@/components/forms/consultationForm";
import Footer from "@/components/homepagecomps/Footer";

export default function ConsultationFormPage() {
  return (
    <main className="flex flex-col sm:overflow-hidden items-center justify-center pt-12">
      <ConsultationForm />
      <Footer />
    </main>
  );
}
