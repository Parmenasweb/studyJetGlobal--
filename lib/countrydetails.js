import {
  CalendarDays,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Home,
  Book,
} from "lucide-react";

export const countries = [
  {
    name: "India",
    capital: "New Delhi",
    language: "Hindi, English",
    currency: "Indian Rupee (INR)",
    quickFacts: {
      population: "1.4 billion",
      universities: "1000+",
      internationalStudents: "100,000+",
      gdp: "$3 trillion",
      dialingCode: "+91",
    },
    details: {
      avgLivingCost: "100 (monthly)",
      avgTuitionFees: "3200 (annual)",
      majorIntakes: "january, may, september",
      avgGraduationIncome: "10000 (annual)",
      immigrationRules: "yes",
      scholarship: "Available!",
      studentVisa: "Available",
      workPermit: "No",
      internship: "Available",
    },
    tabContent: {
      "why-india": {
        title: "Reasons for Considering India",
        content: [
          {
            subtitle: "1. Diverse Educational Institutions:",
            text: "Wide range of universities and colleges offering various courses.",
          },
          {
            subtitle: "Affordable Education",
            text: "Competitive tuition fees compared to Western countries.",
          },
          {
            subtitle: "Growing Economy",
            text: "Opportunities in emerging industries and sectors.",
          },
          {
            subtitle: "Scholarship Opportunities",
            text: "Various funding options for international students.",
          },
          {
            subtitle: "Cultural Experience",
            text: "Immerse in a rich cultural heritage and traditions.",
          },
          {
            subtitle: "Growing Economy",
            text: "Opportunities in emerging industries and sectors.",
          },
        ],
      },
      "student-guide": {
        title: "Student Guide for International Students",
        content: [
          {
            subtitle: "1. Accommodation:",
            text: "Learn about on-campus housing options and off-campus apartments. Consider factors like proximity to campus, safety, and cost.",
          },
          {
            subtitle: "2. Healthcare:",
            text: "Understand the Indian healthcare system and ensure you have appropriate health insurance coverage during your stay.",
          },
          {
            subtitle: "Visa Process",
            text: "Understand the requirements and steps to obtain a student visa.",
          },
          {
            subtitle: "3. Transportation:",
            text: "Familiarize yourself with local public transportation options and consider whether you'll need a car depending on your location.",
          },
          {
            subtitle: "Safety and Security",
            text: "Understand safety measures and emergency contacts in your area.",
          },
          {
            subtitle: "Cultural Experience",
            text: "Immerse in a rich cultural heritage and traditions.",
          },
          {
            subtitle: "Financial Management",
            text: "Managing expenses and banking options available to students.",
          },
        ],
      },
      application: {
        title: "Application Process for International Students",
        content: [
          {
            subtitle: "1. Choose Your Programs:",
            text: "Research and select the universities and programs that best fit your academic goals and interests.",
          },
          {
            subtitle: "Check Eligibility",
            text: "Review the admission requirements and eligibility criteria for your chosen program.",
          },

          {
            subtitle: "2. Prepare Required Documents:",
            text: "Gather transcripts, test scores (like TOEFL or IELTS), letters of recommendation, and write a compelling personal statement.",
          },
          {
            subtitle: "Application Form",
            text: "Complete the online application form for the chosen institution.",
          },
          {
            subtitle: "Application Fee",
            text: "Pay the One-time application fee as specified by the institution to lock your seat.",
          },
          {
            subtitle: "Submit Application",
            text: "Submit your application along with all required documents before the deadline.",
          },
          {
            subtitle: "Interview",
            text: "Prepare for and attend any required interviews.",
          },
          {
            subtitle: "Admission Decision",
            text: "Wait for the admission decision, which is typically communicated via email.",
          },
          {
            subtitle: "Acceptance and Enrollment",
            text: "Accept the offer and follow the enrollment procedures as instructed by the institution.",
          },
        ],
      },
      "visa-requirements": {
        title: "Visa Requirements for International Students",
        content: [
          {
            subtitle: "Valid Passport",
            text: "Ensure your passport is valid for at least six months beyond your intended stay.",
          },
          {
            subtitle: "Visa Application",
            text: "Apply for the appropriate visa type (e.g., student visa) through the Indian embassy or consulate.",
          },
          {
            subtitle: "Admission Letter",
            text: "Obtain an official admission letter from a recognized Indian educational institution.",
          },
          {
            subtitle: "Financial Proof",
            text: "Demonstrate financial capability to cover tuition fees and living expenses.",
          },
          {
            subtitle: "Medical Certificate",
            text: "Obtain a medical certificate confirming your fitness and any required vaccinations.",
          },

          {
            subtitle: "Visa Fee",
            text: "Pay the visa fee as specified by the Indian embassy or consulate.",
          },
          {
            subtitle: "Additional Documents",
            text: "Provide any additional documents as requested by the embassy or consulate.",
          },
          {
            subtitle: "Interview",
            text: "Prepare for and attend any required interviews.",
          },
          {
            subtitle: "Visa Approval",
            text: "Wait for the visa approval and follow any instructions provided by the embassy or consulate.",
          },
        ],
      },
      "intake-dates": {
        title: "Intake Dates for International Students",
        content: [
          {
            subtitle: "Spring Intake",
            text: "Typically begins in January or February, ideal for courses that allow for a mid-year start.",
          },
          {
            subtitle: "Summer Intake",
            text: "Usually starts in May or June, suitable for short-term courses or summer programs.",
          },
          {
            subtitle: "Fall Intake",
            text: "Main intake period starting in August or September, most popular for degree programs.",
          },
          {
            subtitle: "Application Deadlines",
            text: "Check specific application deadlines for each intake as they vary by institution.",
          },
          {
            subtitle: "Course Availability",
            text: "Not all programs may be available in every intake; verify with the institution.",
          },
          {
            subtitle: "Orientation Programs",
            text: "Attend orientation sessions offered by institutions to help new students acclimate.",
          },
          {
            subtitle: "Scholarship Opportunities",
            text: "Explore scholarship options that may be available for different intakes.",
          },
        ],
      },
    },
    flagUrl: "/countryflags/india.png",
    backgroundUrl:
      " https://media.istockphoto.com/id/492494571/photo/morning-in-taj-mahal.jpg?s=612x612&w=0&k=20&c=E47RjlOLttxB0wf2xhZhFIIxfqiSu7_JkoOP6E2g3oI= ",
    studyCost: "3200",
    livingCost: "100",
    feedingCost: "50",
    transportCost: "10",
    miscCost: "10",
    description:
      "From the bustling streets of Delhi to the tranquil backwaters of kerala, India offers a vibrant lend of ancient heritage and modern dynamism",
  },
  {
    name: "Malaysia",
    capital: "Kuala Lumpur",
    language: "Malay, English, Chinese, Tamil, etc.",
    currency: "Malaysian Ringgit (MYR)",
    quickFacts: {
      population: "33 million",
      universities: "200+",
      internationalStudents: "100,000+",
      gdp: "$300 billion",
      dialingCode: "+60",
    },
    details: {
      avgLivingCost: "100 (monthly)",
      avgTuitionFees: "3200 (annual)",
      majorIntakes: "january, may, september",
      avgGraduationIncome: "10000 (annual)",
      immigrationRules: "yes",
      scholarship: "Available!",
      studentVisa: "Available",
      workPermit: "No",
      internship: "Available",
    },
    flagUrl: "/countryflags/malaysia.png",
    backgroundUrl:
      "https://images.pexels.com/photos/22804/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    studyCost: "6000",
    livingCost: "600",
    feedingCost: "50",
    transportCost: "10",
    miscCost: "10",
    description:
      "Malaysia offers a unique blend of ubran excitement and natural beauty, with a mix of malay, chinese Indian, malaysia is know for its warm hospitality",
  },
  {
    name: "Canada",
    capital: "Toronto",
    language: "English, French",
    currency: "Canadian Dollar (CAD)",
    quickFacts: {
      population: "38 million",
      universities: "200+",
      internationalStudents: "100,000+",
      gdp: "$2 trillion",
      dialingCode: "+1",
    },
    details: {
      avgLivingCost: "100 (monthly)",
      avgTuitionFees: "3200 (annual)",
      majorIntakes: "january, may, september",
      avgGraduationIncome: "10000 (annual)",
      immigrationRules: "yes",
      scholarship: "Available!",
      studentVisa: "Available",
      workPermit: "No",
      internship: "Available",
    },
    tabContent: {
      "why-canada": {
        title: "Reasons for Considering studies in Canada",
        content: [
          {
            subtitle: "High-Quality Education",
            text: "Canada is known for its world-class education system and prestigious universities.",
          },
          {
            subtitle: "Diverse Programs",
            text: "Wide range of courses and programs offered in various fields of study.",
          },
          {
            subtitle: "Cultural Diversity",
            text: "Canada is a multicultural country, providing a rich and diverse cultural experience.",
          },
          {
            subtitle: "Affordable Tuition",
            text: "Tuition fees are generally lower than in other Western countries like the USA and UK.",
          },
          {
            subtitle: "Work Opportunities",
            text: "International students can work part-time during their studies and full-time during breaks.",
          },
          {
            subtitle: "Post-Graduation Work Permit",
            text: "Eligible graduates can apply for a work permit to gain Canadian work experience.",
          },
          {
            subtitle: "Safe Environment",
            text: "Canada is known for its safety and high standard of living.",
          },
          {
            subtitle: "Health Care Benefits",
            text: "Some provinces offer health care coverage to international students.",
          },

          {
            subtitle: "Global Recognition",
            text: "Canadian degrees are recognized and respected worldwide.",
          },
        ],
      },
      // "student-guide": {
      //   title: "Student Guide for International Students",
      //   content: [
      //     {
      //       subtitle: "1. Accommodation:",
      //       text: "Learn about on-campus housing options and off-campus apartments. Consider factors like proximity to campus, safety, and cost."
      //     },
      //     {
      //       subtitle: "2. Healthcare:",
      //       text: "Understand the Indian healthcare system and ensure you have appropriate health insurance coverage during your stay."
      //     },
      //     {
      //       subtitle: "Visa Process",
      //       text: "Understand the requirements and steps to obtain a student visa."
      //     },
      //     {
      //       subtitle: "3. Transportation:",
      //       text: "Familiarize yourself with local public transportation options and consider whether you'll need a car depending on your location."
      //     },
      //     {
      //       subtitle: "Safety and Security",
      //       text: "Understand safety measures and emergency contacts in your area."
      //     },
      //     {
      //       subtitle: "Cultural Experience",
      //       text: "Immerse in a rich cultural heritage and traditions."
      //     },
      //     {
      //       subtitle: "Financial Management",
      //       text: "Managing expenses and banking options available to students."
      //     }

      //   ]
      // },
      application: {
        title: "Application Process for International Students in Canada",
        content: [
          {
            subtitle: "Research Institutions",
            text: "Identify universities and colleges that fit your academic and career goals.",
          },
          {
            subtitle: "Check Admission Requirements",
            text: "Review specific admission requirements for each program and institution.",
          },
          {
            subtitle: "Prepare Application Documents",
            text: "Gather transcripts, letters of recommendation, and a statement of purpose.",
          },
          {
            subtitle: "Language Proficiency Tests",
            text: "Take required tests like IELTS or TOEFL if applicable.",
          },
          {
            subtitle: "Complete Application Form",
            text: "Fill out the online application form for the chosen institution.",
          },
          {
            subtitle: "Pay Application Fees",
            text: "Submit the required application fees as outlined by the institution.",
          },
          {
            subtitle: "Submit Application",
            text: "Ensure all documents are submitted before the application deadline.",
          },
          {
            subtitle: "Interviews (if required)",
            text: "Attend interviews as needed, either in-person or online.",
          },
          {
            subtitle: "Receive Admission Decision",
            text: "Wait for the institution to communicate their admission decision.",
          },
          {
            subtitle: "Accept Offer and Enroll",
            text: "Accept the admission offer and complete the enrollment process.",
          },
        ],
      },
      "visa-requirements": {
        title: "Visa Requirements for International Students in Canada",
        content: [
          {
            subtitle: "Valid Passport",
            text: "Ensure your passport is valid for the duration of your stay.",
          },
          {
            subtitle: "Letter of Acceptance",
            text: "Obtain a letter of acceptance from a Designated Learning Institution (DLI).",
          },
          {
            subtitle: "Visa Application Form",
            text: "Complete the study permit application form online or on paper.",
          },
          {
            subtitle: "Photographs",
            text: "Provide recent passport-sized photographs as per specified guidelines.",
          },
          {
            subtitle: "Financial Proof",
            text: "Demonstrate sufficient funds to cover tuition fees and living expenses.",
          },
          {
            subtitle: "Medical Exam (if required)",
            text: "Undergo a medical exam by an approved physician if required.",
          },
          {
            subtitle: "Visa Fees",
            text: "Pay the applicable fees for processing the study permit application.",
          },
          {
            subtitle: "Additional Documents",
            text: "Provide any additional documents as requested by immigration authorities.",
          },
          {
            subtitle: "Biometrics Appointment",
            text: "Attend a biometrics appointment if required.",
          },
          {
            subtitle: "Application Processing Time",
            text: "Be aware of processing times and apply well in advance of your intended start date.",
          },
        ],
      },
      "intake-dates": {
        title: "Intake Dates for International Students",
        content: [
          {
            subtitle: "Winter Intake",
            text: "Begins in January; suitable for students who wish to start mid-academic year.",
          },
          {
            subtitle: "Spring Intake",
            text: "Usually starts in May; ideal for certain programs or short courses.",
          },
          {
            subtitle: "Fall Intake",
            text: "The main intake period beginning in September; most popular for full degree programs.",
          },
          {
            subtitle: "Application Deadlines",
            text: "Check specific deadlines for each intake as they vary by institution.",
          },
          {
            subtitle: "Course Availability",
            text: "Not all programs may be available in every intake; confirm with the institution.",
          },
          {
            subtitle: "Preparation Time",
            text: "Plan ahead for visa processing and relocation to Canada.",
          },

          {
            subtitle: "Academic Calendar",
            text: "Familiarize yourself with the academic calendar for important dates and breaks.",
          },
          {
            subtitle: "Scholarship Opportunities",
            text: "Explore scholarships and financial aid options available for different intakes.",
          },
        ],
      },
    },
    flagUrl: "/countryflags/canada.png",
    backgroundUrl:
      "https://images.pexels.com/photos/3076104/pexels-photo-3076104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    studyCost: "10000",
    livingCost: "600",
    feedingCost: "50",
    transportCost: "10",
    miscCost: "10",
    description:
      "renowed for its vast landscapes, multinatural cities and high quality of life, stands as a eacon of oppurtunity for international students.",
  },
  {
    name: "UAE",
    capital: "Abu Dhabi",
    language: "Arabic, English",
    currency: "United Arab Emirates Dirham (AED)",
    quickFacts: {
      population: "10 million",
      universities: "50+",
      internationalStudents: "50,000+",
      gdp: "$400 billion",
      dialingCode: "+971",
    },
    details: {
      avgLivingCost: "100 (monthly)",
      avgTuitionFees: "3200 (annual)",
      majorIntakes: "january, may, september",
      avgGraduationIncome: "10000 (annual)",
      immigrationRules: "yes",
      scholarship: "Available!",
      studentVisa: "Available",
      workPermit: "No",
      internship: "Available",
    },
    tabContent: {
      "why-UAE": {
        title: "Reasons for Considering studies in UAE",
        content: [
          {
            subtitle: "World-Class Universities",
            text: "The UAE is home to several internationally recognized universities offering high-quality education.",
          },
          {
            subtitle: "Diverse Programs",
            text: "Many institutions offer a wide range of programs in various fields, including business, engineering, and health sciences.",
          },
          {
            subtitle: "English-Taught Courses",
            text: "Most programs are taught in English, making it accessible for international students.",
          },
          {
            subtitle: "Cultural Diversity",
            text: "Experience a vibrant multicultural environment with students from all over the globe.",
          },
          {
            subtitle: "Strong Economy",
            text: "Studying in a rapidly growing economy offers valuable insights into global business practices.",
          },
          {
            subtitle: "Strategic Location",
            text: "The UAE’s location serves as a gateway to both Asia and Europe, making travel convenient.",
          },
          {
            subtitle: "Safe Environment",
            text: "The UAE is known for its low crime rate and high safety standards, making it a secure place to study.",
          },
          {
            subtitle: "Innovative Learning Facilities",
            text: "Universities provide state-of-the-art facilities and technology to enhance learning experiences.",
          },
          {
            subtitle: "Networking Opportunities",
            text: "Students have access to numerous professional and networking events within various industries.",
          },
          {
            subtitle: "Cultural Experiences",
            text: "Enjoy a rich cultural heritage, modern architecture, and diverse recreational activities.",
          },
        ],
      },

      // "student-guide": {
      //   title: "Student Guide for International Students",
      //   content: [
      //     {
      //       subtitle: "1. Accommodation:",
      //       text: "Learn about on-campus housing options and off-campus apartments. Consider factors like proximity to campus, safety, and cost."
      //     },
      //     {
      //       subtitle: "2. Healthcare:",
      //       text: "Understand the Indian healthcare system and ensure you have appropriate health insurance coverage during your stay."
      //     },
      //     {
      //       subtitle: "Visa Process",
      //       text: "Understand the requirements and steps to obtain a student visa."
      //     },
      //     {
      //       subtitle: "3. Transportation:",
      //       text: "Familiarize yourself with local public transportation options and consider whether you'll need a car depending on your location."
      //     },
      //     {
      //       subtitle: "Safety and Security",
      //       text: "Understand safety measures and emergency contacts in your area."
      //     },
      //     {
      //       subtitle: "Cultural Experience",
      //       text: "Immerse in a rich cultural heritage and traditions."
      //     },
      //     {
      //       subtitle: "Financial Management",
      //       text: "Managing expenses and banking options available to students."
      //     }

      //   ]
      // },
      application: {
        title: "Application Process for International Students in UAE",
        content: [
          {
            subtitle: "Research Institutions",
            text: "Identify universities in the UAE that offer programs aligned with your interests.",
          },
          {
            subtitle: "Check Admission Requirements",
            text: "Review specific admission criteria for your chosen program and institution.",
          },
          {
            subtitle: "Prepare Application Documents",
            text: "Gather necessary documents, including transcripts, a personal statement, and letters of recommendation.",
          },
          {
            subtitle: "Language Proficiency Tests",
            text: "Take required language tests like TOEFL or IELTS if necessary.",
          },
          {
            subtitle: "Complete Application Form",
            text: "Fill out the application form for the university or college.",
          },
          {
            subtitle: "Pay Application Fees",
            text: "Submit the required application fees as specified by the institution.",
          },
          {
            subtitle: "Submit Application",
            text: "Ensure all application materials are submitted by the deadline.",
          },
          {
            subtitle: "Interviews (if required)",
            text: "Attend interviews if requested, either in-person or online.",
          },
          {
            subtitle: "Receive Admission Decision",
            text: "Wait for the university to communicate their admission decision.",
          },
          {
            subtitle: "Accept Offer and Enroll",
            text: "Accept the admission offer and complete the enrollment process as instructed.",
          },
        ],
      },
      "visa-requirements": {
        title: "Visa Requirements for International Students in UAE",
        content: [
          {
            subtitle: "Valid Passport",
            text: "Ensure your passport is valid for at least six months beyond your intended stay in the UAE.",
          },
          {
            subtitle: "Letter of Acceptance",
            text: "Obtain a letter of acceptance from a recognized educational institution in the UAE.",
          },
          {
            subtitle: "Visa Application Form",
            text: "Complete the visa application form for a student visa.",
          },
          {
            subtitle: "Photographs",
            text: "Provide recent passport-sized photographs that meet UAE visa requirements.",
          },
          {
            subtitle: "Financial Proof",
            text: "Demonstrate sufficient funds to cover tuition fees and living expenses.",
          },
          {
            subtitle: "Health Insurance",
            text: "Obtain health insurance that covers your stay in the UAE.",
          },
          {
            subtitle: "Visa Fees",
            text: "Pay the applicable visa fees as specified by the UAE authorities.",
          },
          {
            subtitle: "Medical Examination",
            text: "Complete a medical examination as part of the visa application process.",
          },
          {
            subtitle: "Additional Documents",
            text: "Provide any additional documents required by the visa application process.",
          },
          {
            subtitle: "Application Processing Time",
            text: "Apply well in advance of your intended start date to allow for processing time.",
          },
        ],
      },
      "intake-dates": {
        title: "Intake Dates for International Students in UAE",
        content: [
          {
            subtitle: "Fall Intake",
            text: "The primary intake, usually starting in September; most programs begin then.",
          },
          {
            subtitle: "Spring Intake",
            text: "Typically starts in January; suitable for students who missed the fall intake.",
          },
          {
            subtitle: "Summer Programs",
            text: "Some universities offer short-term courses or summer programs starting in June.",
          },
          {
            subtitle: "Application Deadlines",
            text: "Check specific application deadlines for each intake, as they may vary by institution.",
          },
          {
            subtitle: "Course Availability",
            text: "Not all programs may be available in every intake; confirm with the institution.",
          },
          {
            subtitle: "Preparation Time",
            text: "Plan ahead for visa processing and accommodation before the start of classes.",
          },
          {
            subtitle: "Orientation Programs",
            text: "Participate in orientation sessions to help you adjust to your new environment.",
          },
          {
            subtitle: "Academic Calendar",
            text: "Familiarize yourself with the academic calendar for important dates and holidays.",
          },
          {
            subtitle: "Scholarship Opportunities",
            text: "Explore scholarships and financial aid options available for different intakes.",
          },
          {
            subtitle: "Post-Admission Steps",
            text: "Follow through on necessary steps like registration and course selection after acceptance.",
          },
        ],
      },
    },
    flagUrl: "/countryflags/united-arab-emirates.png",
    backgroundUrl:
      "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    studyCost: "7000",
    livingCost: "500",
    feedingCost: "50",
    transportCost: "10",
    miscCost: "10",
    description:
      "situated in the heart of the  Middle East, is a dynamic and futuristic country known for it stunning modern architecture",
  },
  {
    name: "Hungary",
    capital: "Budapest",
    language: "Hungarian, English",
    currency: "Hungarian Forint (HUF)",
    quickFacts: {
      population: "9 million",
      universities: "100+",
      internationalStudents: "50,000+",
      gdp: "$150 billion",
      dialingCode: "+36",
    },
    details: {
      avgLivingCost: "100 (monthly)",
      avgTuitionFees: "3200 (annual)",
      majorIntakes: "january, may, september",
      avgGraduationIncome: "10000 (annual)",
      immigrationRules: "yes",
      scholarship: "Available!",
      studentVisa: "Available",
      workPermit: "No",
      internship: "Available",
    },
    tabContent: {
      "why-Hungary": {
        title: "Reasons for Considering studies in Hungary",
        content: [
          {
            subtitle: "Affordable Education",
            text: "Tuition fees and living costs in Hungary are generally lower compared to Western Europe.",
          },
          {
            subtitle: "High-Quality Universities",
            text: "Hungary is home to several reputable universities offering recognized degrees.",
          },
          {
            subtitle: "Diverse Programs in English",
            text: "Many institutions offer a variety of programs in English, attracting international students.",
          },
          {
            subtitle: "Rich Cultural Experience",
            text: "Experience Hungary's vibrant culture, history, and architectural heritage.",
          },
          {
            subtitle: "Central Location in Europe",
            text: "Hungary's location allows for easy travel to other European countries.",
          },
        ],
      },

      // "student-guide": {
      //   title: "Student Guide for International Students",
      //   content: [
      //     {
      //       subtitle: "1. Accommodation:",
      //       text: "Learn about on-campus housing options and off-campus apartments. Consider factors like proximity to campus, safety, and cost."
      //     },
      //     {
      //       subtitle: "2. Healthcare:",
      //       text: "Understand the Indian healthcare system and ensure you have appropriate health insurance coverage during your stay."
      //     },
      //     {
      //       subtitle: "Visa Process",
      //       text: "Understand the requirements and steps to obtain a student visa."
      //     },
      //     {
      //       subtitle: "3. Transportation:",
      //       text: "Familiarize yourself with local public transportation options and consider whether you'll need a car depending on your location."
      //     },
      //     {
      //       subtitle: "Safety and Security",
      //       text: "Understand safety measures and emergency contacts in your area."
      //     },
      //     {
      //       subtitle: "Cultural Experience",
      //       text: "Immerse in a rich cultural heritage and traditions."
      //     },
      //     {
      //       subtitle: "Financial Management",
      //       text: "Managing expenses and banking options available to students."
      //     }

      //   ]
      // },
      application: {
        title: "Application Process for International Students in Hungary",
        content: [
          {
            subtitle: "Research Institutions",
            text: "Identify universities in Hungary that offer programs matching your interests.",
          },
          {
            subtitle: "Check Admission Requirements",
            text: "Review specific admission criteria for your chosen program and institution.",
          },
          {
            subtitle: "Prepare Application Documents",
            text: "Gather necessary documents, including transcripts, a personal statement, and letters of recommendation.",
          },
          {
            subtitle: "Language Proficiency Tests",
            text: "Take required language tests like TOEFL or IELTS if applicable.",
          },
          {
            subtitle: "Complete Application Form",
            text: "Fill out the application form for the university or college.",
          },
          {
            subtitle: "Pay Application Fees",
            text: "Submit the required application fees as specified by the institution.",
          },
          {
            subtitle: "Submit Application",
            text: "Ensure all application materials are submitted before the deadline.",
          },
          {
            subtitle: "Interviews (if required)",
            text: "Attend interviews if requested, either in-person or online.",
          },
          {
            subtitle: "Receive Admission Decision",
            text: "Wait for the university to communicate their admission decision.",
          },
          {
            subtitle: "Accept Offer and Enroll",
            text: "Accept the admission offer and complete the enrollment process as instructed.",
          },
        ],
      },
      "visa-requirements": {
        title: "Visa Requirements for International Students in Hungary",
        content: [
          {
            subtitle: "Valid Passport",
            text: "Ensure your passport is valid for the duration of your stay in Hungary.",
          },
          {
            subtitle: "Letter of Acceptance",
            text: "Obtain a letter of acceptance from a recognized educational institution in Hungary.",
          },
          {
            subtitle: "Visa Application Form",
            text: "Complete the visa application form for a student visa if required.",
          },
          {
            subtitle: "Photographs",
            text: "Provide recent passport-sized photographs that meet visa requirements.",
          },
          {
            subtitle: "Financial Proof",
            text: "Demonstrate sufficient funds to cover tuition fees and living expenses.",
          },
          {
            subtitle: "Health Insurance",
            text: "Obtain health insurance that covers your stay in Hungary.",
          },
          {
            subtitle: "Visa Fees",
            text: "Pay the applicable visa fees as specified by the Hungarian authorities.",
          },
          {
            subtitle: "Additional Documents",
            text: "Provide any additional documents required by the visa application process.",
          },
          {
            subtitle: "Biometrics Appointment",
            text: "Attend a biometrics appointment if required.",
          },
          {
            subtitle: "Application Processing Time",
            text: "Apply well in advance of your intended start date to allow for processing time.",
          },
        ],
      },
      "intake-dates": {
        title: "Intake Dates for International Students in Hungary",
        content: [
          {
            subtitle: "September Intake",
            text: "The main intake for most undergraduate and postgraduate courses, starting in late September.",
          },
          {
            subtitle: "February Intake",
            text: "Some universities offer courses starting in February, suitable for those who missed the September intake.",
          },
          {
            subtitle: "Summer Programs",
            text: "Many universities offer short-term courses or summer programs starting in June.",
          },
          {
            subtitle: "Application Deadlines",
            text: "Check specific application deadlines for each intake, as they may vary by institution.",
          },
          {
            subtitle: "Course Availability",
            text: "Not all programs may be available in every intake; confirm with the institution.",
          },
          {
            subtitle: "Preparation Time",
            text: "Plan ahead for visa processing and accommodation before the start of classes.",
          },
          {
            subtitle: "Orientation Programs",
            text: "Participate in orientation sessions to help you adjust to your new environment.",
          },
          {
            subtitle: "Academic Calendar",
            text: "Familiarize yourself with the academic calendar for important dates and holidays.",
          },
          {
            subtitle: "Scholarship Opportunities",
            text: "Explore scholarships and financial aid options available for different intakes.",
          },
          {
            subtitle: "Post-Admission Steps",
            text: "Follow through on necessary steps like registration and course selection after acceptance.",
          },
        ],
      },
    },
    flagUrl: "/countryflags/hungary.png",
    backgroundUrl:
      "https://images.pexels.com/photos/3605968/pexels-photo-3605968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    studyCost: "8000",
    livingCost: "500",
    feedingCost: "50",
    transportCost: "10",
    miscCost: "10",
    description:
      "with its majestic parliament building and historic ridges spanning the Danube river, Hungary offers a rich lend of history and culture",
  },
  {
    name: "Georgia",
    capital: "Tbilisi",
    language: "Georgian, English",
    currency: "Georgian Lari (GEL)",
    quickFacts: {
      population: "3.7 million",
      universities: "100+",
      internationalStudents: "50,000+",
      gdp: "$100 billion",
      dialingCode: "+995",
    },
    details: {
      avgLivingCost: "100 (monthly)",
      avgTuitionFees: "3200 (annual)",
      majorIntakes: "january, may, september",
      avgGraduationIncome: "10000 (annual)",
      immigrationRules: "yes",
      scholarship: "Available!",
      studentVisa: "Available",
      workPermit: "No",
      internship: "Available",
    },
    tabContent: {
      "why-Georgia": {
        title: "Reasons for Considering studies in Georgia",
        content: [
          {
            subtitle: "Affordable Education",
            text: "Tuition fees and living costs in Georgia are significantly lower compared to many Western countries.",
          },
          {
            subtitle: "Quality Universities",
            text: "Georgia has several universities recognized for their quality education and research opportunities.",
          },
          {
            subtitle: "English-Taught Programs",
            text: "Many universities offer programs in English, making it accessible for international students.",
          },
          {
            subtitle: "Rich Cultural Heritage",
            text: "Georgia boasts a unique culture, history, and traditions, providing an enriching study experience.",
          },
          {
            subtitle: "Safe Environment",
            text: "Georgia is known for its friendly locals and a low crime rate, making it a safe destination for students.",
          },
          {
            subtitle: "Diverse Community",
            text: "An increasing number of international students contribute to a multicultural environment.",
          },
          {
            subtitle: "Gateway to Europe",
            text: "Located at the crossroads of Europe and Asia, Georgia offers easy access to travel around the region.",
          },
          {
            subtitle: "Support for International Students",
            text: "Universities provide various services and support systems for international students.",
          },
          {
            subtitle: "Vibrant Lifestyle",
            text: "Experience a lively atmosphere with numerous social and recreational activities.",
          },
        ],
      },

      // "student-guide": {
      //   title: "Student Guide for International Students",
      //   content: [
      //     {
      //       subtitle: "1. Accommodation:",
      //       text: "Learn about on-campus housing options and off-campus apartments. Consider factors like proximity to campus, safety, and cost."
      //     },
      //     {
      //       subtitle: "2. Healthcare:",
      //       text: "Understand the Indian healthcare system and ensure you have appropriate health insurance coverage during your stay."
      //     },
      //     {
      //       subtitle: "Visa Process",
      //       text: "Understand the requirements and steps to obtain a student visa."
      //     },
      //     {
      //       subtitle: "3. Transportation:",
      //       text: "Familiarize yourself with local public transportation options and consider whether you'll need a car depending on your location."
      //     },
      //     {
      //       subtitle: "Safety and Security",
      //       text: "Understand safety measures and emergency contacts in your area."
      //     },
      //     {
      //       subtitle: "Cultural Experience",
      //       text: "Immerse in a rich cultural heritage and traditions."
      //     },
      //     {
      //       subtitle: "Financial Management",
      //       text: "Managing expenses and banking options available to students."
      //     }

      //   ]
      // },
      application: {
        title: "Application Process for International Students in Georgia",
        content: [
          {
            subtitle: "Research Institutions",
            text: "Identify universities in Georgia that offer programs relevant to your interests.",
          },
          {
            subtitle: "Check Admission Requirements",
            text: "Review specific admission criteria for your chosen program and institution.",
          },
          {
            subtitle: "Prepare Application Documents",
            text: "Gather necessary documents, including transcripts, a personal statement, and letters of recommendation.",
          },
          {
            subtitle: "Language Proficiency Tests",
            text: "Take required tests like TOEFL or IELTS if necessary.",
          },
          {
            subtitle: "Complete Application Form",
            text: "Fill out the application form for the university or college.",
          },
          {
            subtitle: "Pay Application Fees",
            text: "Submit the required application fees as specified by the institution.",
          },
          {
            subtitle: "Submit Application",
            text: "Ensure all application materials are submitted by the deadline.",
          },
          {
            subtitle: "Interviews (if required)",
            text: "Attend interviews if requested, either in-person or online.",
          },
          {
            subtitle: "Receive Admission Decision",
            text: "Wait for the university to communicate their admission decision.",
          },
          {
            subtitle: "Accept Offer and Enroll",
            text: "Accept the admission offer and complete the enrollment process as instructed.",
          },
        ],
      },
      "visa-requirements": {
        title: "Visa Requirements for International Students in Georgia",
        content: [
          {
            subtitle: "Valid Passport",
            text: "Ensure your passport is valid for the duration of your stay in Georgia.",
          },
          {
            subtitle: "Letter of Acceptance",
            text: "Obtain a letter of acceptance from a recognized educational institution in Georgia.",
          },
          {
            subtitle: "Visa Application Form",
            text: "Complete the visa application form for a student visa if required.",
          },
          {
            subtitle: "Photographs",
            text: "Provide recent passport-sized photographs that meet visa requirements.",
          },
          {
            subtitle: "Financial Proof",
            text: "Demonstrate sufficient funds to cover tuition fees and living expenses.",
          },
          {
            subtitle: "Health Insurance",
            text: "Obtain health insurance that covers your stay in Georgia.",
          },
          {
            subtitle: "Visa Fees",
            text: "Pay the applicable visa fees as specified by the Georgian authorities.",
          },
          {
            subtitle: "Additional Documents",
            text: "Provide any additional documents required by the visa application process.",
          },
          {
            subtitle: "Biometrics Appointment",
            text: "Attend a biometrics appointment if required.",
          },
          {
            subtitle: "Application Processing Time",
            text: "Apply well in advance of your intended start date to allow for processing time.",
          },
        ],
      },
      "intake-dates": {
        title: "Intake Dates for International Students in Georgia",
        content: [
          {
            subtitle: "Fall Intake",
            text: "The primary intake, starting in September; most programs begin then.",
          },
          {
            subtitle: "Spring Intake",
            text: "Usually starts in February; suitable for students who missed the fall intake.",
          },
          {
            subtitle: "Summer Programs",
            text: "Some universities offer short-term courses or summer programs starting in June.",
          },
          {
            subtitle: "Application Deadlines",
            text: "Check specific application deadlines for each intake as they may vary by institution.",
          },
          {
            subtitle: "Course Availability",
            text: "Not all programs may be available in every intake; confirm with the institution.",
          },
          {
            subtitle: "Preparation Time",
            text: "Plan ahead for visa processing and accommodation before the start of classes.",
          },
          {
            subtitle: "Orientation Programs",
            text: "Participate in orientation sessions to help you adjust to your new environment.",
          },
          {
            subtitle: "Academic Calendar",
            text: "Familiarize yourself with the academic calendar for important dates and holidays.",
          },
          {
            subtitle: "Scholarship Opportunities",
            text: "Explore scholarships and financial aid options available for different intakes.",
          },
          {
            subtitle: "Post-Admission Steps",
            text: "Follow through on necessary steps like registration and course selection after acceptance.",
          },
        ],
      },
    },
    flagUrl: "/countryflags/georgia.png",
    backgroundUrl:
      "https://images.pexels.com/photos/4916535/pexels-photo-4916535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    studyCost: "5000",
    livingCost: "400",
    feedingCost: "50",
    transportCost: "10",
    miscCost: "10",
    description:
      "Georgia nestled in the crossroads of europe and Asia, beckons with its breathtaking landscapes, rich history and arm hospitality",
  },
  {
    name: "Malta",
    capital: "Valletta",
    language: "Maltese, English",
    currency: "Maltese Lira (MTL)",
    quickFacts: {
      population: "500,000",
      universities: "10+",
      internationalStudents: "10,000+",
      gdp: "$10 billion",
      dialingCode: "+356",
    },
    details: {
      avgLivingCost: "100 (monthly)",
      avgTuitionFees: "3200 (annual)",
      majorIntakes: "january, may, september",
      avgGraduationIncome: "10000 (annual)",
      immigrationRules: "yes",
      scholarship: "Available!",
      studentVisa: "Available",
      workPermit: "No",
      internship: "Available",
    },
    tabContent: {
      "why-MALTA": {
        title: "Reasons for Considering studies in Malta",
        content: [
          {
            subtitle: "High-Quality Education",
            text: "Malta offers a robust education system with universities that meet European standards.",
          },
          {
            subtitle: "English Language",
            text: "English is one of the official languages, making it easier for international students to communicate and study.",
          },
          {
            subtitle: "Cultural Heritage",
            text: "Rich in history and culture, Malta boasts historical sites and a vibrant cultural scene.",
          },
          {
            subtitle: "Diverse Programs",
            text: "A range of courses is available in various fields, including business, engineering, and arts.",
          },
          {
            subtitle: "Affordable Living Costs",
            text: "The cost of living in Malta is generally lower compared to other Western European countries.",
          },
          {
            subtitle: "Safe Environment",
            text: "Malta is known for its low crime rates and friendly atmosphere, making it a safe place for students.",
          },
          {
            subtitle: "Mediterranean Climate",
            text: "Enjoy a warm Mediterranean climate with beautiful beaches and outdoor activities year-round.",
          },
          {
            subtitle: "EU Member State",
            text: "As an EU member, Malta offers the opportunity for international students to experience European culture.",
          },
          {
            subtitle: "Work Opportunities",
            text: "Students can work part-time while studying, allowing them to gain work experience and support their living costs.",
          },
          {
            subtitle: "Strong International Community",
            text: "A diverse community of international students makes it easy to meet people from various backgrounds.",
          },
        ],
      },

      // "student-guide": {
      //   title: "Student Guide for International Students",
      //   content: [
      //     {
      //       subtitle: "1. Accommodation:",
      //       text: "Learn about on-campus housing options and off-campus apartments. Consider factors like proximity to campus, safety, and cost."
      //     },
      //     {
      //       subtitle: "2. Healthcare:",
      //       text: "Understand the Indian healthcare system and ensure you have appropriate health insurance coverage during your stay."
      //     },
      //     {
      //       subtitle: "Visa Process",
      //       text: "Understand the requirements and steps to obtain a student visa."
      //     },
      //     {
      //       subtitle: "3. Transportation:",
      //       text: "Familiarize yourself with local public transportation options and consider whether you'll need a car depending on your location."
      //     },
      //     {
      //       subtitle: "Safety and Security",
      //       text: "Understand safety measures and emergency contacts in your area."
      //     },
      //     {
      //       subtitle: "Cultural Experience",
      //       text: "Immerse in a rich cultural heritage and traditions."
      //     },
      //     {
      //       subtitle: "Financial Management",
      //       text: "Managing expenses and banking options available to students."
      //     }

      //   ]
      // },
      application: {
        title: "Application Process for International Students in Malta",
        content: [
          {
            subtitle: "Research Institutions",
            text: "Identify universities or colleges in Malta that offer programs of interest.",
          },
          {
            subtitle: "Check Admission Requirements",
            text: "Review specific admission criteria for the chosen program and institution.",
          },
          {
            subtitle: "Prepare Application Documents",
            text: "Gather necessary documents such as transcripts, a personal statement, and letters of recommendation.",
          },
          {
            subtitle: "Language Proficiency Tests",
            text: "Take required language tests like IELTS or TOEFL if applicable.",
          },
          {
            subtitle: "Complete Application Form",
            text: "Fill out the application form for the university or college.",
          },
          {
            subtitle: "Pay Application Fees",
            text: "Submit the required application fees as specified by the institution.",
          },
          {
            subtitle: "Submit Application",
            text: "Ensure all application materials are submitted by the deadline.",
          },
          {
            subtitle: "Interviews (if required)",
            text: "Attend interviews if requested, either in-person or online.",
          },
          {
            subtitle: "Receive Admission Decision",
            text: "Wait for the university to communicate their admission decision.",
          },
          {
            subtitle: "Accept Offer and Enroll",
            text: "Accept the admission offer and complete the enrollment process as instructed.",
          },
        ],
      },
      "visa-requirements": {
        title: "Visa Requirements for International Students in Malta",
        content: [
          {
            subtitle: "Valid Passport",
            text: "Ensure your passport is valid for the duration of your stay in Malta.",
          },
          {
            subtitle: "Letter of Acceptance",
            text: "Obtain a letter of acceptance from a recognized educational institution in Malta.",
          },
          {
            subtitle: "Visa Application Form",
            text: "Complete the visa application form for a student visa (if applicable).",
          },
          {
            subtitle: "Photographs",
            text: "Provide recent passport-sized photographs that meet visa requirements.",
          },
          {
            subtitle: "Financial Proof",
            text: "Demonstrate sufficient funds to cover tuition fees and living expenses.",
          },
          {
            subtitle: "Health Insurance",
            text: "Obtain health insurance that covers your stay in Malta.",
          },
          {
            subtitle: "Visa Fees",
            text: "Pay the applicable visa fees as specified by the Maltese authorities.",
          },
          {
            subtitle: "Additional Documents",
            text: "Provide any additional documents required by the visa application process.",
          },
          {
            subtitle: "Biometrics Appointment",
            text: "Attend a biometrics appointment if required.",
          },
          {
            subtitle: "Application Processing Time",
            text: "Apply well in advance of your intended start date to allow for processing time.",
          },
        ],
      },
      "intake-dates": {
        title: "Intake Dates for International Students in Malta",
        content: [
          {
            subtitle: "September Intake",
            text: "The main intake for most undergraduate and postgraduate courses, starting in late September.",
          },
          {
            subtitle: "February Intake",
            text: "Some institutions offer courses starting in February, suitable for those who missed the September intake.",
          },
          {
            subtitle: "Summer Programs",
            text: "Many universities offer short-term courses or summer programs starting in June.",
          },

          {
            subtitle: "Course Availability",
            text: "Not all programs may be available in every intake; confirm with the institution.",
          },

          {
            subtitle: "Orientation Programs",
            text: "Participate in orientation sessions to help you adjust to your new environment.",
          },
          {
            subtitle: "Academic Calendar",
            text: "Familiarize yourself with the academic calendar for important dates and holidays.",
          },
          {
            subtitle: "Scholarship Opportunities",
            text: "Explore scholarships and financial aid options available for different intakes.",
          },
        ],
      },
    },
    flagUrl: "/countryflags/malta (1).png",
    backgroundUrl:
      "https://images.pexels.com/photos/16569858/pexels-photo-16569858/free-photo-of-palm-trees-on-street-in-valletta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    studyCost: "3500",
    livingCost: "400",
    feedingCost: "50",
    transportCost: "10",
    miscCost: "10",
    description:
      "This small archipelago oasts a lend of ancient architecture, such as UNESCO-listed valletta.",
  },
  {
    name: "UK",
    capital: "London",
    language: "English",
    currency: "British Pound (GBP)",
    quickFacts: {
      population: "67 million",
      universities: "100+",
      internationalStudents: "100,000+",
      gdp: "$3 trillion",
      dialingCode: "+44",
    },
    details: {
      avgLivingCost: "100 (monthly)",
      avgTuitionFees: "3200 (annual)",
      majorIntakes: "january, may, september",
      avgGraduationIncome: "10000 (annual)",
      immigrationRules: "yes",
      scholarship: "Available!",
      studentVisa: "Available",
      workPermit: "No",
      internship: "Available",
    },
    tabContent: {
      "why-UK": {
        title: "Reasons for Considering studies in the UK",
        content: [
          {
            subtitle: "World-Class Education",
            text: "The UK is home to some of the oldest and most prestigious universities in the world.",
          },
          {
            subtitle: "Diverse Course Options",
            text: "A wide range of programs and courses available across various fields of study.",
          },
          {
            subtitle: "Cultural Diversity",
            text: "The UK is a multicultural society, providing a rich and varied cultural experience.",
          },
          {
            subtitle: "Shorter Duration of Courses",
            text: "Many undergraduate courses can be completed in three years and master's programs in one year.",
          },
          {
            subtitle: "Work Opportunities",
            text: "International students can work part-time during their studies and full-time during holidays.",
          },
          {
            subtitle: "Post-Study Work Visa",
            text: "Graduates can apply for a post-study work visa to gain experience in the UK after completing their studies.",
          },
          {
            subtitle: "Rich Historical Heritage",
            text: "Experience a country steeped in history and culture with numerous attractions.",
          },
          {
            subtitle: "Access to Research",
            text: "Opportunities to engage in groundbreaking research with leading academics.",
          },
        ],
      },

      // "student-guide": {
      //   title: "Student Guide for International Students",
      //   content: [
      //     {
      //       subtitle: "1. Accommodation:",
      //       text: "Learn about on-campus housing options and off-campus apartments. Consider factors like proximity to campus, safety, and cost."
      //     },
      //     {
      //       subtitle: "2. Healthcare:",
      //       text: "Understand the Indian healthcare system and ensure you have appropriate health insurance coverage during your stay."
      //     },
      //     {
      //       subtitle: "Visa Process",
      //       text: "Understand the requirements and steps to obtain a student visa."
      //     },
      //     {
      //       subtitle: "3. Transportation:",
      //       text: "Familiarize yourself with local public transportation options and consider whether you'll need a car depending on your location."
      //     },
      //     {
      //       subtitle: "Safety and Security",
      //       text: "Understand safety measures and emergency contacts in your area."
      //     },
      //     {
      //       subtitle: "Cultural Experience",
      //       text: "Immerse in a rich cultural heritage and traditions."
      //     },
      //     {
      //       subtitle: "Financial Management",
      //       text: "Managing expenses and banking options available to students."
      //     }

      //   ]
      // },
      application: {
        title: "Application Process for International Students in the UK",
        content: [
          {
            subtitle: "Research Universities",
            text: "Identify universities and courses that align with your academic and career aspirations.",
          },
          {
            subtitle: "Check Admission Requirements",
            text: "Review specific admission criteria for your chosen program and institution.",
          },
          {
            subtitle: "Prepare Application Documents",
            text: "Gather necessary documents such as transcripts, personal statements, and references.",
          },
          {
            subtitle: "Language Proficiency Tests",
            text: "Take required tests like IELTS or TOEFL if necessary.",
          },
          {
            subtitle: "Complete UCAS Application",
            text: "Fill out the UCAS application form for undergraduate programs or the university’s application for postgraduate courses.",
          },
          {
            subtitle: "Pay Application Fees",
            text: "Submit the required application fees as indicated by the institution.",
          },
          {
            subtitle: "Submit Application",
            text: "Ensure all application materials are submitted by the deadline.",
          },
          {
            subtitle: "Interviews (if required)",
            text: "Attend interviews if requested, either in-person or online.",
          },
          {
            subtitle: "Receive Admission Decision",
            text: "Wait for the university to communicate their admission decision.",
          },
          {
            subtitle: "Accept Offer and Enroll",
            text: "Accept the offer and complete the enrollment process as instructed.",
          },
        ],
      },
      "visa-requirements": {
        title: "Visa Requirements for International Students in the UK",
        content: [
          {
            subtitle: "Valid Passport",
            text: "Ensure your passport is valid for the duration of your stay in the UK.",
          },
          {
            subtitle: "Confirmation of Acceptance for Studies (CAS)",
            text: "Obtain a CAS statement from your chosen university.",
          },
          {
            subtitle: "Visa Application Form",
            text: "Complete the Student Visa application form online.",
          },
          {
            subtitle: "Photographs",
            text: "Provide recent passport-sized photographs that meet UKVI requirements.",
          },
          {
            subtitle: "Financial Proof",
            text: "Demonstrate sufficient funds to cover tuition fees and living expenses.",
          },
          {
            subtitle: "Health Surcharge",
            text: "Pay the Immigration Health Surcharge for access to the UK’s National Health Service.",
          },
          {
            subtitle: "Visa Fees",
            text: "Pay the applicable visa fees as specified by UKVI.",
          },
          {
            subtitle: "Additional Documents",
            text: "Provide any additional documents requested by the UK visa authorities.",
          },
          {
            subtitle: "Biometrics Appointment",
            text: "Attend a biometrics appointment to provide fingerprints and photographs.",
          },
          {
            subtitle: "Application Processing Time",
            text: "Be aware of processing times and apply well in advance of your intended start date.",
          },
        ],
      },
      "intake-dates": {
        title: "Intake Dates for International Students in the UK",
        content: [
          {
            subtitle: "September Intake",
            text: "The primary intake for most undergraduate and postgraduate courses, starting in late September.",
          },
          {
            subtitle: "January Intake",
            text: "Many institutions offer courses starting in January; ideal for students who miss the September intake.",
          },
          {
            subtitle: "May/June Intake",
            text: "Some universities offer short-term courses or summer programs during this period.",
          },
          {
            subtitle: "Application Deadlines",
            text: "Check specific application deadlines for each intake as they vary by institution.",
          },
          {
            subtitle: "Course Availability",
            text: "Not all programs may be available in every intake; confirm with the institution.",
          },
          {
            subtitle: "Preparation Time",
            text: "Plan ahead for visa processing and accommodation before the start of classes.",
          },
          {
            subtitle: "Orientation Programs",
            text: "Participate in orientation sessions to help you adjust to your new environment.",
          },
          {
            subtitle: "Academic Calendar",
            text: "Familiarize yourself with the academic calendar for important dates and holidays.",
          },
          {
            subtitle: "Scholarship Opportunities",
            text: "Explore scholarships and funding options available for different intakes.",
          },
          {
            subtitle: "Post-Admission Steps",
            text: "Follow through on necessary steps like registration and course selection after acceptance.",
          },
        ],
      },
    },
    flagUrl: "/countryflags/united-kingdom.png",
    backgroundUrl:
      "https://images.pexels.com/photos/1427579/pexels-photo-1427579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    studyCost: "12000",
    livingCost: "800",
    feedingCost: "50",
    transportCost: "10",
    miscCost: "10",
    description:
      "The United Kingdom(UK) is a diverse and historic nation renowned for its academia excellence and global influence",
  },
  {
    name: "USA",
    capital: "washington DC",
    language: "English",
    currency: "United States Dollar (USD)",
    quickFacts: {
      population: "331 million",
      universities: "1000+",
      internationalStudents: "1,000,000+",
      gdp: "$20 trillion",
      dialingCode: "+1",
    },
    details: {
      avgLivingCost: "100 (monthly)",
      avgTuitionFees: "3200 (annual)",
      majorIntakes: "january, may, september",
      avgGraduationIncome: "10000 (annual)",
      immigrationRules: "yes",
      scholarship: "Available!",
      studentVisa: "Available",
      workPermit: "Yes",
      internship: "Available",
    },
    tabContent: {
      "why-USA": {
        title: "Reasons for Considering studies in the USA",
        content: [
          {
            subtitle: "Top-Ranked Universities",
            text: "The USA is home to many of the worlds leading universities and colleges.",
          },
          {
            subtitle: "Diverse Academic Programs",
            text: "A wide variety of courses and programs are available across different fields of study.",
          },
          {
            subtitle: "Cultural Diversity",
            text: "Experience a rich multicultural environment with students from all over the world.",
          },
          {
            subtitle: "Research Opportunities",
            text: "Access to extensive research resources and opportunities in various disciplines.",
          },
          {
            subtitle: "Work Opportunities",
            text: "International students can work part-time during their studies and full-time during breaks.",
          },
          {
            subtitle: "Flexible Curriculum",
            text: "Many programs allow students to explore different subjects before declaring a major.",
          },
          {
            subtitle: "High-Quality Facilities",
            text: "Universities offer state-of-the-art facilities, libraries, and technology.",
          },
          {
            subtitle: "Post-Completion Work Options",
            text: "Students may be eligible for Optional Practical Training (OPT) to gain work experience after graduation.",
          },
          {
            subtitle: "Networking Opportunities",
            text: "Connect with professionals and alumni through university events and internships.",
          },
          {
            subtitle: "Global Recognition",
            text: "Degrees from US institutions are recognized and respected worldwide.",
          },
        ],
      },
      // "student-guide": {
      //   title: "Student Guide for International Students",
      //   content: [
      //     {
      //       subtitle: "1. Accommodation:",
      //       text: "Learn about on-campus housing options and off-campus apartments. Consider factors like proximity to campus, safety, and cost."
      //     },
      //     {
      //       subtitle: "2. Healthcare:",
      //       text: "Understand the Indian healthcare system and ensure you have appropriate health insurance coverage during your stay."
      //     },
      //     {
      //       subtitle: "Visa Process",
      //       text: "Understand the requirements and steps to obtain a student visa."
      //     },
      //     {
      //       subtitle: "3. Transportation:",
      //       text: "Familiarize yourself with local public transportation options and consider whether you'll need a car depending on your location."
      //     },
      //     {
      //       subtitle: "Safety and Security",
      //       text: "Understand safety measures and emergency contacts in your area."
      //     },
      //     {
      //       subtitle: "Cultural Experience",
      //       text: "Immerse in a rich cultural heritage and traditions."
      //     },
      //     {
      //       subtitle: "Financial Management",
      //       text: "Managing expenses and banking options available to students."
      //     }

      //   ]
      // },
      application: {
        title: "Application Process for International Students in the USA",
        content: [
          {
            subtitle: "Valid Passport",
            text: "Ensure your passport is valid for the duration of your stay.",
          },
          {
            subtitle: "Form I-20",
            text: "Obtain the Form I-20 from your chosen institution, confirming your acceptance.",
          },
          {
            subtitle: "Visa Application Form",
            text: "Complete the DS-160 online visa application form.",
          },
          {
            subtitle: "Photographs",
            text: "Provide recent passport-sized photographs as per US visa requirements.",
          },
          {
            subtitle: "Financial Proof",
            text: "Demonstrate sufficient funds to cover tuition and living expenses.",
          },
          {
            subtitle: "Visa Fees",
            text: "Pay the SEVIS fee and visa application fees as required.",
          },
          {
            subtitle: "Additional Documents",
            text: "Provide any additional documents requested during the visa application process.",
          },
          {
            subtitle: "Visa Interview",
            text: "Attend a visa interview at a US embassy or consulate.",
          },
          {
            subtitle: "Health Insurance",
            text: "Consider obtaining health insurance for your stay in the USA.",
          },
          {
            subtitle: "Application Processing Time",
            text: "Apply well in advance of your intended start date to allow for processing time.",
          },
        ],
      },
      "visa-requirements": {
        title: "Visa Requirements for International Students in the USA",
        content: [
          {
            subtitle: "Valid Passport",
            text: "Ensure your passport is valid for the duration of your stay.",
          },
          {
            subtitle: "Form I-20",
            text: "Obtain the Form I-20 from your chosen institution, confirming your acceptance.",
          },
          {
            subtitle: "Visa Application Form",
            text: "Complete the DS-160 online visa application form.",
          },
          {
            subtitle: "Photographs",
            text: "Provide recent passport-sized photographs as per US visa requirements.",
          },
          {
            subtitle: "Financial Proof",
            text: "Demonstrate sufficient funds to cover tuition and living expenses.",
          },
          {
            subtitle: "Visa Fees",
            text: "Pay the SEVIS fee and visa application fees as required.",
          },
          {
            subtitle: "Additional Documents",
            text: "Provide any additional documents requested during the visa application process.",
          },
          {
            subtitle: "Visa Interview",
            text: "Attend a visa interview at a US embassy or consulate.",
          },
          {
            subtitle: "Health Insurance",
            text: "Consider obtaining health insurance for your stay in the USA.",
          },
          {
            subtitle: "Application Processing Time",
            text: "Apply well in advance of your intended start date to allow for processing time.",
          },
        ],
      },
      "intake-dates": {
        title: "Intake Dates for International Students in the USA",
        content: [
          {
            subtitle: "Fall Intake",
            text: "The primary intake, starting in August or September; most programs begin then.",
          },
          {
            subtitle: "Spring Intake",
            text: "Usually starts in January; suitable for students who missed the fall intake.",
          },
          {
            subtitle: "Summer Intake",
            text: "Some universities offer summer courses or programs starting in May or June.",
          },
          {
            subtitle: "Application Deadlines",
            text: "Check specific deadlines for each intake as they vary by institution.",
          },
          {
            subtitle: "Course Availability",
            text: "Not all programs may be available in every intake; confirm with the institution.",
          },
          {
            subtitle: "Preparation Time",
            text: "Plan ahead for visa processing and accommodation before the start of classes.",
          },
          {
            subtitle: "Orientation Programs",
            text: "Participate in orientation sessions to help you adjust to your new environment.",
          },
          {
            subtitle: "Academic Calendar",
            text: "Familiarize yourself with the academic calendar for important dates and breaks.",
          },
          {
            subtitle: "Scholarship Opportunities",
            text: "Explore scholarships and financial aid options available for different intakes.",
          },
          {
            subtitle: "Post-Admission Steps",
            text: "Follow through on necessary steps like registration and course selection after acceptance.",
          },
        ],
      },
    },
    flagUrl: "/countryflags/united-states-of-america.png",
    backgroundUrl:
      "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    studyCost: "15000",
    livingCost: "800",
    feedingCost: "50",
    transportCost: "50-150",
    miscCost: "50-150",
    description:
      "USA, a vast and diverse country, from the skyscrapers of New York City to the beaches of california",
  },
];

export const programs = [
  {
    name: "Medical",
    programName: "Medical",
    description:
      "Take a intensive journey into the intricacies of human health and well-being, with a foundation in anatomy, physiology and biochemistry",
    imageUrl:
      "https://images.pexels.com/photos/8460349/pexels-photo-8460349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quickFacts: [
      { icon: MapPin, text: "India, Usa, Uk, Canada, Malaysia, Georgia" },
      { icon: CalendarDays, text: "Fall, Spring, Summer" },
      { icon: Clock, text: "4-6 years" },
      { icon: GraduationCap, text: "3 credits per semester" },
    ],
    eligibilityRequirements: [
      "Minimum GPA of 2.5",
      "At least one year of college-level Spanish or equivalent",
      "Good academic and disciplinary standing",
      "18 years or older",
    ],
    applicationSteps: [
      "Complete online application form",
      "Submit official transcripts",
      "Provide two academic references",
      "Write a 500-word statement of purpose",
      "Pay application fee ($50)",
    ],
    applicationDeadlines: [
      { term: "Fall Semester", date: "April 1" },
      { term: "Spring Semester", date: "October 1" },
      { term: "Summer Programs", date: "March 1" },
    ],
    programDurations: [
      "4 weeks (Summer intensive)",
      "8 weeks (Half semester)",
      "16 weeks (Full semester)",
    ],
    accommodationOptions: [
      {
        title: "Homestay",
        description:
          "Live with a local family for full cultural immersion and language practice.",
      },
      {
        title: "Student Residence",
        description:
          "Stay in a dormitory-style accommodation with other international students.",
      },
      {
        title: "Shared Apartment",
        description:
          "Rent an apartment with other program participants for more independence.",
      },
    ],

    programFees: [
      { duration: "4 weeks", fee: "$4,500" },
      { duration: "8 weeks", fee: "$8,000" },
      { duration: "16 weeks", fee: "$14,500" },
    ],
    includedItems: [
      "Tuition and fees",
      "Housing",
      "Cultural excursions",
      "Health insurance",
      "On-site support",
    ],
  },

  {
    name: "Law",
    programName: "Law",
    programDurations: [
      "4 weeks (Summer intensive)",
      "8 weeks (Half semester)",
      "16 weeks (Full semester)",
    ],
    description:
      "Take a journey into the intricate framework that shapes the society",
    imageUrl:
      "https://images.pexels.com/photos/159832/justice-law-case-hearing-159832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quickFacts: [
      { icon: MapPin, text: "India, Usa, Uk, Canada, Malaysia, Georgia" },
      { icon: CalendarDays, text: "Fall, Spring, Summer" },
      { icon: Clock, text: "4-6 years" },
      { icon: GraduationCap, text: "3 credits per semester" },
    ],
    eligibilityRequirements: [
      "Minimum GPA of 2.5",
      "At least one year of college-level Spanish or equivalent",
      "Good academic and disciplinary standing",
      "18 years or older",
    ],
    applicationSteps: [
      "Complete online application form",
      "Submit official transcripts",
      "Provide two academic references",
      "Write a 500-word statement of purpose",
      "Pay application fee ($50)",
    ],
    applicationDeadlines: [
      { term: "Fall Semester", date: "April 1" },
      { term: "Spring Semester", date: "October 1" },
      { term: "Summer Programs", date: "March 1" },
    ],
    accommodationOptions: [
      {
        title: "Homestay",
        description:
          "Live with a local family for full cultural immersion and language practice.",
      },
      {
        title: "Student Residence",
        description:
          "Stay in a dormitory-style accommodation with other international students.",
      },
      {
        title: "Shared Apartment",
        description:
          "Rent an apartment with other program participants for more independence.",
      },
    ],

    programFees: [
      { duration: "4 weeks", fee: "$4,500" },
      { duration: "8 weeks", fee: "$8,000" },
      { duration: "16 weeks", fee: "$14,500" },
    ],
    includedItems: [
      "Tuition and fees",
      "Housing",
      "Cultural excursions",
      "Health insurance",
      "On-site support",
    ],
  },
  {
    name: "Science",
    programName: "Science",
    programDurations: [
      "4 weeks (Summer intensive)",
      "8 weeks (Half semester)",
      "16 weeks (Full semester)",
    ],
    description:
      "a gateway to understanding the fundamental workings of the universe, from microscopic cells to laws of physics",
    imageUrl:
      "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quickFacts: [
      { icon: MapPin, text: "India, Usa, Uk, Canada, Malaysia, Georgia" },
      { icon: CalendarDays, text: "Fall, Spring, Summer" },
      { icon: Clock, text: "4-6 years" },
      { icon: GraduationCap, text: "3 credits per semester" },
    ],
    eligibilityRequirements: [
      "Minimum GPA of 2.5",
      "At least one year of college-level Spanish or equivalent",
      "Good academic and disciplinary standing",
      "18 years or older",
    ],
    applicationSteps: [
      "Complete online application form",
      "Submit official transcripts",
      "Provide two academic references",
      "Write a 500-word statement of purpose",
      "Pay application fee ($50)",
    ],
    applicationDeadlines: [
      { term: "Fall Semester", date: "April 1" },
      { term: "Spring Semester", date: "October 1" },
      { term: "Summer Programs", date: "March 1" },
    ],
    accommodationOptions: [
      {
        title: "Homestay",
        description:
          "Live with a local family for full cultural immersion and language practice.",
      },
      {
        title: "Student Residence",
        description:
          "Stay in a dormitory-style accommodation with other international students.",
      },
      {
        title: "Shared Apartment",
        description:
          "Rent an apartment with other program participants for more independence.",
      },
    ],

    programFees: [
      { duration: "4 weeks", fee: "$4,500" },
      { duration: "8 weeks", fee: "$8,000" },
      { duration: "16 weeks", fee: "$14,500" },
    ],
    includedItems: [
      "Tuition and fees",
      "Housing",
      "Cultural excursions",
      "Health insurance",
      "On-site support",
    ],
  },
  {
    name: "Technology and Engineering",
    programName: "Technology",
    programDurations: [
      "4 weeks (Summer intensive)",
      "8 weeks (Half semester)",
      "16 weeks (Full semester)",
    ],
    description:
      "Studying technology and engineering is a voyage into the realm of innovation and problem solving",
    imageUrl:
      "https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quickFacts: [
      { icon: MapPin, text: "India, Usa, Uk, Canada, Malaysia, Georgia" },
      { icon: CalendarDays, text: "Fall, Spring, Summer" },
      { icon: Clock, text: "4-5 years" },
      { icon: GraduationCap, text: "4 credits per semester" },
    ],
    eligibilityRequirements: [
      "Minimum GPA of 2.5",
      "At least one year of college-level Spanish or equivalent",
      "Good academic and disciplinary standing",
      "18 years or older",
    ],
    applicationSteps: [
      "Complete online application form",
      "Submit official transcripts",
      "Provide two academic references",
      "Write a 500-word statement of purpose",
      "Pay application fee ($50)",
    ],
    applicationDeadlines: [
      { term: "Fall Semester", date: "April 1" },
      { term: "Spring Semester", date: "October 1" },
      { term: "Summer Programs", date: "March 1" },
    ],
    accommodationOptions: [
      {
        title: "Homestay",
        description:
          "Live with a local family for full cultural immersion and language practice.",
      },
      {
        title: "Student Residence",
        description:
          "Stay in a dormitory-style accommodation with other international students.",
      },
      {
        title: "Shared Apartment",
        description:
          "Rent an apartment with other program participants for more independence.",
      },
    ],

    programFees: [
      { duration: "4 weeks", fee: "$4,500" },
      { duration: "8 weeks", fee: "$8,000" },
      { duration: "16 weeks", fee: "$14,500" },
    ],
    includedItems: [
      "Tuition and fees",
      "Housing",
      "Cultural excursions",
      "Health insurance",
      "On-site support",
    ],
  },
  {
    name: "Management and Commerce",
    programName: "Management",
    programDurations: [
      "4 weeks (Summer intensive)",
      "8 weeks (Half semester)",
      "16 weeks (Full semester)",
    ],
    description:
      "Gain practical experience and a global perspective in business.",
    imageUrl:
      "https://images.pexels.com/photos/210574/pexels-photo-210574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quickFacts: [
      { icon: MapPin, text: "India, Usa, Uk, Canada, Malaysia, Georgia" },
      { icon: CalendarDays, text: "Fall, Spring, Summer" },
      { icon: Clock, text: "3-4 years" },
      { icon: GraduationCap, text: "3 credits per semester" },
    ],
    eligibilityRequirements: [
      "Minimum GPA of 2.5",
      "At least one year of college-level Spanish or equivalent",
      "Good academic and disciplinary standing",
      "18 years or older",
    ],
    applicationSteps: [
      "Complete online application form",
      "Submit official transcripts",
      "Provide two academic references",
      "Write a 500-word statement of purpose",
      "Pay application fee ($50)",
    ],
    applicationDeadlines: [
      { term: "Fall Semester", date: "April 1" },
      { term: "Spring Semester", date: "October 1" },
      { term: "Summer Programs", date: "March 1" },
    ],
    accommodationOptions: [
      {
        title: "Homestay",
        description:
          "Live with a local family for full cultural immersion and language practice.",
      },
      {
        title: "Student Residence",
        description:
          "Stay in a dormitory-style accommodation with other international students.",
      },
      {
        title: "Shared Apartment",
        description:
          "Rent an apartment with other program participants for more independence.",
      },
    ],

    programFees: [
      { duration: "4 weeks", fee: "$4,500" },
      { duration: "8 weeks", fee: "$8,000" },
      { duration: "16 weeks", fee: "$14,500" },
    ],
    includedItems: [
      "Tuition and fees",
      "Housing",
      "Cultural excursions",
      "Health insurance",
      "On-site support",
    ],
  },
  {
    name: "Polytechnic",
    programName: "Polytechnic",
    programDurations: [
      "4 weeks (Summer intensive)",
      "8 weeks (Half semester)",
      "16 weeks (Full semester)",
    ],
    description:
      "A dynamic blend of theoretical learning and hands on practical experience",
    imageUrl:
      "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quickFacts: [
      { icon: MapPin, text: "India, Usa, Uk, Canada, Malaysia, Georgia" },
      { icon: CalendarDays, text: "Fall, Spring, Summer" },
      { icon: Clock, text: "2-3 years" },
      { icon: GraduationCap, text: "2 credits per semester" },
    ],
    eligibilityRequirements: [
      "Minimum GPA of 2.5",
      "At least one year of college-level Spanish or equivalent",
      "Good academic and disciplinary standing",
      "18 years or older",
    ],
    applicationSteps: [
      "Complete online application form",
      "Submit official transcripts",
      "Provide two academic references",
      "Write a 500-word statement of purpose",
      "Pay application fee ($50)",
    ],
    applicationDeadlines: [
      { term: "Fall Semester", date: "April 1" },
      { term: "Spring Semester", date: "October 1" },
      { term: "Summer Programs", date: "March 1" },
    ],
    accommodationOptions: [
      {
        title: "Homestay",
        description:
          "Live with a local family for full cultural immersion and language practice.",
      },
      {
        title: "Student Residence",
        description:
          "Stay in a dormitory-style accommodation with other international students.",
      },
      {
        title: "Shared Apartment",
        description:
          "Rent an apartment with other program participants for more independence.",
      },
    ],

    programFees: [
      { duration: "4 weeks", fee: "$4,500" },
      { duration: "8 weeks", fee: "$8,000" },
      { duration: "16 weeks", fee: "$14,500" },
    ],
    includedItems: [
      "Tuition and fees",
      "Housing",
      "Cultural excursions",
      "Health insurance",
      "On-site support",
    ],
  },
];

export const featuredPrograms = [
  {
    id: 1,
    programName: "Business Administration",
    destination: "United Kingdom",
    capital: "London",
    description:
      "Take a intensive journey into the intricacies of human health and well-being, with a foundation in anatomy, physiology and biochemistry",
    imageUrl:
      "https://images.pexels.com/photos/1427579/pexels-photo-1427579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 1,
    programName: "Bachelors Pharmacy(B.pharm)",
    destination: "INDIA",
    capital: "New Delhi",
    description:
      "Take a intensive journey into the intricacies of human health and well-being, with a foundation in anatomy, physiology and biochemistry",
    imageUrl:
      "https://media.istockphoto.com/id/492494571/photo/morning-in-taj-mahal.jpg?s=612x612&w=0&k=20&c=E47RjlOLttxB0wf2xhZhFIIxfqiSu7_JkoOP6E2g3oI=",
  },
  {
    id: 1,
    programName: "Business Administration",
    destination: "INDIA",
    capital: "New Delhi",
    description:
      "Explore the frontiers of sustainable development in the lush, eco-friendly landscapes of New-Delhi, while earning your degree in business administration",
    imageUrl:
      "https://media.istockphoto.com/id/492494571/photo/morning-in-taj-mahal.jpg?s=612x612&w=0&k=20&c=E47RjlOLttxB0wf2xhZhFIIxfqiSu7_JkoOP6E2g3oI=",
  },
];

export const scholarships = [
  {
    name: "Fulright Schorlarship(INDIA)",
    description: "A scholarship for students from developing countries",
    amount: "5000",
    duration: "3 years",
    conditions: "Undergraduate and postgraduate students",
    imageUrl:
      "https://images.pexels.com/photos/22819724/pexels-photo-22819724/free-photo-of-buddhist-temple-in-forest-on-hill-over-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Chevening Schorlarship (UK)",
    description:
      "Fully funded scholarships for master's-level study in the UK.",
    amount: "5000",
    duration: "3 years",
    conditions: "Undergraduate and postgraduate students",
    imageUrl:
      "https://images.pexels.com/photos/19025312/pexels-photo-19025312/free-photo-of-river-and-st-johns-college-in-cambridge-in-usa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Schwarzman Scholars (China)",
    description:
      "Fully funded master's program at Tsinghua University in Beijing.",
    amount: "5000",
    duration: "3 years",
    conditions: "Undergraduate and postgraduate students",
    imageUrl:
      "https://images.pexels.com/photos/21862234/pexels-photo-21862234/free-photo-of-aerial-view-of-jiujiang-city-above-hukou-jinshawan-school.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Boren Scholarship (United States)",
    description:
      "Funding for undergraduate study of languages and cultures critical to U.S. interests.",
    amount: "5000",
    duration: "3 years",
    conditions: "Undergraduate and postgraduate students",
    imageUrl:
      "https://images.pexels.com/photos/901964/pexels-photo-901964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Aga Khan Development Network Scholarship (Global)",
    description:
      "Scholarships for undergraduate and graduate studies in various fields.",
    amount: "5000",
    duration: "3 years",
    conditions: "Undergraduate and postgraduate students",
    imageUrl:
      "https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const blogPosts = [
  {
    id: "1",
    title: "Adapting to Student Life Abroad",
    author: "wisdom korsor",
    content:
      "Discover practical tips and personal insights to help you seamlessly transition into student life in a new country. Embrace the challenges and thrive in your study abroad adventure.",
    time: "5mins read",
    imageUrl:
      "https://images.pexels.com/photos/1251861/pexels-photo-1251861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    title: "Navigating the Scholarship Landscape",
    author: "wisdom korsor",
    content:
      "Unlock the secrets to securing the perfect scholarship for your study abroad journey. Explore a wealth of opportunities and tips to fund your international education..",
    time: "5mins read",
    imageUrl:
      "https://media.istockphoto.com/id/1333580948/photo/piggy-bank-with-graduation-cap-on-black-glass-floor-money-saving-concept.jpg?b=1&s=612x612&w=0&k=20&c=Du4GSuhfPEDG23FQafWTFcqELTaqoUC28DanbpoCr4E=",
  },
  {
    id: "3",
    title: "Exploring the virant color of Japan",
    author: "wisdom korsor ",
    content:
      "Discover the rich history, delectable cuisine, and captivating traditions that make Japan a must-visit destination for study abroad students.",
    time: "5mins read",
    imageUrl:
      "https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "4",
    title: "Adapting to Student Life Abroad",
    author: "parma chulo",
    content:
      "Discover practical tips and personal insights to help you seamlessly transition into student life in a new country. Embrace the challenges and thrive in your study abroad adventure.",
    time: "5mins read",
    imageUrl:
      "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
];

export const partners = [
  {
    name: "Kaziranga Universiy",
    imageUrl:
      "https://images.pexels.com/photos/21862234/pexels-photo-21862234/free-photo-of-aerial-view-of-jiujiang-city-above-hukou-jinshawan-school.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://berkeley.edu",
    date: "2021",
  },
  {
    name: "university of sydney",
    imageUrl:
      "https://images.pexels.com/photos/21862234/pexels-photo-21862234/free-photo-of-aerial-view-of-jiujiang-city-above-hukou-jinshawan-school.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://berkeley.edu",
    date: "2023",
  },
  {
    name: "University of Oxford",
    imageUrl:
      "https://images.pexels.com/photos/21862234/pexels-photo-21862234/free-photo-of-aerial-view-of-jiujiang-city-above-hukou-jinshawan-school.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://berkeley.edu",
    date: "2022",
  },
  {
    name: "University of Tokyo",
    imageUrl:
      "https://images.pexels.com/photos/21862234/pexels-photo-21862234/free-photo-of-aerial-view-of-jiujiang-city-above-hukou-jinshawan-school.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://berkeley.edu",
    date: "2022",
  },
];
