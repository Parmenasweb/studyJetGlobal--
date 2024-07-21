import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question:
      "What are the eligibility requirements for your study abroad programs?",
    answer:
      "To be eligible for our study abroad programs, you must be a currently enrolled student at one of our partner universities, maintain a minimum GPA of 3.0, and have completed at least one year of undergraduate studies. Additional requirements may vary by program.",
    value: "faq-1",
  },
  {
    question: " How do I apply for a study abroad program?",
    answer:
      "To apply for a study abroad program, please visit our website and navigate to the program you're interested in. There, you'll find detailed instructions on the application process, including required documents and deadlines. Our team is also available to assist you throughout the application process.",
    value: "faq-2",
  },
  {
    question:
      " What kind of support does your agency provide during the study abroad experience?",
    answer:
      " We pride ourselves on the comprehensive support we offer our students throughout their study abroad experience. This includes pre-departure orientation, on-site assistance, 24/7 emergency support, cultural immersion activities, and academic advising. Our goal is to ensure you have a safe, enriching, and unforgettable time abroad.",
    value: "faq-2",
  },
  {
    question:
      " Do you offer any scholarships or financial aid for study abroad programs?",
    answer:
      " Yes, we have a variety of scholarship and financial aid opportunities available to help make study abroad more accessible. These include merit-based scholarships, need-based grants, and partnerships with universities and external organizations. We encourage all interested students to explore the financial aid options on our website.",
    value: "faq-3",
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
