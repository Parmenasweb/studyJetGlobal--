import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does studyjetGlobal offer?",
    answer:
      "studyjetglobal offers a comprehensive range of services including university selection guidance, application assistance, visa processing, scholarship assistance, budget management, pre-departure briefings, and 24/7 client support.",
    value: "faq-1",
  },
  {
    question: " How do I start the application process with studyjetglobal?*",
    answer:
      "To apply for a study abroad program, please visit our website and navigate to the program&destinations page. There, you'll find detailed instructions on the application process, including required documents and deadlines. Our counselors will guide you through the initial steps and provide you with all the necessary information.",
    value: "faq-2",
  },
  {
    question: " Is there a fee for your counseling services?*",
    answer:
      "We offer expert free counseling services to help you navigate your study abroad journey. Certain premium services may incur additional costs, but our initial consultation and basic support are provided at no charge.",
    value: "faq-3",
  },
  {
    question: "Can you help me find scholarships?*",
    answer:
      "Yes, our counselors can provide information on various scholarship opportunities available for international students and guide you through the application process to increase your chances of securing financial aid.",
    value: "faq-4",
  },
  {
    question: "How long does the application process take?*",
    answer:
      "The duration of the application process can vary depending on the university and country of choice. Our instant application process helps expedite this timeline, and we keep you informed with real-time updates throughout.",
    value: "faq-5",
  },
  {
    question: "Do you assist with visa applications?*",
    answer:
      "Absolutely. We provide detailed guidance on visa requirements, assist with the preparation of necessary documents, and offer support throughout the visa application process to ensure a smooth and successful outcome.",
    value: "faq-6",
  },
  {
    question: "What kind of support can I expect once I reach my destination?*",
    answer:
      "Our support doesn’t end once you arrive at your study destination. We offer ongoing assistance to help you settle in, including pre-departure briefings, accommodation advice, and 24/7 support for any issues you may encounter.",
    value: "faq-7",
  },
  {
    question: " How can studyjetglobal help with budget management?*",
    answer:
      "Our budget management services include creating a realistic financial plan, advising on cost-effective solutions, and identifying potential scholarships. We help you manage your finances wisely to reduce stress and ensure a smooth study abroad experience.",
    value: "faq-8",
  },
  {
    question:
      " What kind of support does your agency provide during the study abroad experience?",
    answer:
      " We pride ourselves on the comprehensive support we offer our students throughout their study abroad experience. This includes pre-departure orientation, on-site assistance, 24/7 emergency support, cultural immersion activities, and academic advising. Our goal is to ensure you have a safe, enriching, and unforgettable time abroad.",
    value: "faq-9",
  },
  {
    question: " Can I apply to multiple universities through studyjetglobal?*",
    answer:
      "Yes, we encourage applying to multiple universities to increase your chances of acceptance. Our counselors will help you select the best options based on your academic profile and career goals, and guide you through the application process for each university.",
    value: "faq-10",
  },
];

export default function FAQS() {
  return (
    <section className="py-10 px-6">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Accordion type="single" collapsible>
            {faqs.map((faq) => {
              return (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
