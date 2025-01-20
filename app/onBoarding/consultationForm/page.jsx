import ConsultationForm from "@/components/forms/consultationForm";
import Footer from "@/components/homepagecomps/Footer";

export default function ConsultationFormPage() {
  return (
    <div className="w-full">  
      <main className=" w-full mb-12 flex flex-col sm:overflow-hidden items-center justify-center pt-12">
        <ConsultationForm />
      </main>
        <Footer />
    </div>
  );
}
