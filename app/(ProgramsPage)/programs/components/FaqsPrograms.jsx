import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FaqsPrograms = () => {
  const faqs = [
    {
      question: "What are the eligibility requirements for the programs?",
      answer:
        "Eligibility varies by program. Generally, you’ll need a minimum GPA and may need to meet specific academic or language prerequisites.",
    },
    {
      question: "How do I apply for a program?",
      answer:
        "The application process typically involves filling out an online form, submitting academic transcripts, and providing a personal statement or recommendation letters.",
    },
    {
      question: "What is included in the program fee?",
      answer:
        "Program fees usually cover tuition, accommodation, some meals, and scheduled activities. Additional expenses may include travel, personal spending, and insurance.",
    },
    {
      question: "What is the application deadline?",
      answer:
        "The application deadline varies by program. Generally, you should apply at least 3 months before the program start date.",
    },
    {
      question: "Are there scholarships or financial aid options available?",
      answer:
        "Yes, many programs offer scholarships or grants. We also provide information on external funding sources and scholarship on out website.",
    },
    {
      question:
        "What should I do if I have special dietary needs or health concerns?",
      answer:
        "Please inform us during the application process. We can accommodate various dietary restrictions and will provide necessary support for health concerns.",
    },
    {
      question: "What kind of accommodation will be provided?",
      answer:
        "Accommodations vary by program. Options may include host families, dormitories, or apartments. Detailed information will be provided upon acceptance.",
    },
    {
      question: "Do I need health insurance while studying abroad?",
      answer:
        "Yes, all participants are required to have health insurance for the duration of the program. We can help guide you in obtaining appropriate coverage.",
    },
    {
      question: "What safety measures are in place during the program?",
      answer:
        "Our programs prioritize student safety with local staff available for support, emergency contact information, and pre-departure safety orientations.",
    },
    {
      question:
        "How can I stay connected with other participants after the program?",
      answer:
        "We encourage participants to join our alumni network, where you can connect with fellow travelers and share experiences.",
    },
    {
      question: "Is a visa required for this program?",
      answer:
        "For stays longer than 90 days, you will need to obtain a student visa. Our program staff will assist you with the visa application process after you're accepted into the program.",
    },
  ];
  return (
    <Accordion type="single" collapsible>
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqsPrograms;
