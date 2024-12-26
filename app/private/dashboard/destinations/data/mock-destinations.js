export const mockDestinations = [
  {
    _id: "dest1",
    name: "Canada",
    slug: "canada",
    description: "A world-class education system with diverse opportunities",
    shortDescription: "Top destination for international students",
    imageUrl: "https://example.com/images/canada.jpg",
    coverImage: "https://example.com/images/canada-cover.jpg",
    status: "active",
    featured: true,
    order: 1,
    stats: {
      totalStudents: 642000,
      averageTuition: 25000,
      costOfLiving: 15000,
      workOpportunities: true,
      prVisaOptions: true,
    },
    requirements: {
      languageTest: {
        ielts: {
          min: 6.0,
          recommended: 6.5,
          bands: {
            listening: 6.0,
            reading: 6.0,
            writing: 6.0,
            speaking: 6.0,
          },
        },
        toefl: {
          min: 80,
          recommended: 90,
        },
      },
      academicRequirements: [
        "High school diploma for undergraduate studies",
        "Bachelor's degree for postgraduate studies",
        "Minimum GPA of 3.0 on a 4.0 scale",
      ],
      visaRequirements: [
        "Valid passport",
        "Proof of funds",
        "Study permit",
        "Medical examination",
      ],
    },
    universities: [
      {
        _id: "uni1",
        name: "University of Toronto",
        rank: 1,
        location: "Toronto, Ontario",
        type: "Public",
        established: 1827,
        totalStudents: 90000,
        internationalStudents: 25000,
        tuitionRange: {
          undergraduate: {
            min: 30000,
            max: 45000,
          },
          postgraduate: {
            min: 25000,
            max: 40000,
          },
        },
        programs: ["Engineering", "Business", "Medicine", "Arts", "Science"],
        status: "active",
      },
      {
        _id: "uni2",
        name: "University of British Columbia",
        rank: 2,
        location: "Vancouver, British Columbia",
        type: "Public",
        established: 1908,
        totalStudents: 65000,
        internationalStudents: 18000,
        tuitionRange: {
          undergraduate: {
            min: 28000,
            max: 40000,
          },
          postgraduate: {
            min: 22000,
            max: 35000,
          },
        },
        programs: ["Computer Science", "Business", "Engineering", "Arts", "Science"],
        status: "active",
      },
    ],
    scholarships: [
      {
        _id: "sch1",
        name: "Vanier Canada Graduate Scholarships",
        description: "Prestigious scholarships for doctoral students",
        amount: 50000,
        duration: "3 years",
        deadline: new Date("2024-09-01"),
        eligibility: [
          "Doctoral level students only",
          "Outstanding academic achievement",
          "Research potential",
        ],
        type: "Merit-based",
        status: "active",
      },
      {
        _id: "sch2",
        name: "Lester B. Pearson International Scholarship",
        description: "Full scholarship for international undergraduate students",
        amount: 100000,
        duration: "4 years",
        deadline: new Date("2024-01-15"),
        eligibility: [
          "International students",
          "Academic excellence",
          "Leadership skills",
        ],
        type: "Full-ride",
        status: "active",
      },
    ],
    guides: [
      {
        title: "Study Permit Guide",
        content: "Complete guide to obtaining a Canadian study permit",
        type: "visa",
      },
      {
        title: "Cost of Living Guide",
        content: "Detailed breakdown of living expenses in Canada",
        type: "living",
      },
    ],
    faqs: [
      {
        question: "Can I work while studying in Canada?",
        answer: "Yes, international students can work up to 20 hours per week during regular academic sessions and full-time during scheduled breaks.",
      },
      {
        question: "What are the post-graduation work opportunities?",
        answer: "Graduates can apply for a Post-Graduation Work Permit (PGWP) valid for up to 3 years, depending on the length of their study program.",
      },
    ],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "dest2",
    name: "United Kingdom",
    slug: "united-kingdom",
    description: "Home to some of the world's oldest and most prestigious universities",
    shortDescription: "Excellence in education with rich cultural heritage",
    imageUrl: "https://example.com/images/uk.jpg",
    coverImage: "https://example.com/images/uk-cover.jpg",
    status: "active",
    featured: true,
    order: 2,
    stats: {
      totalStudents: 485000,
      averageTuition: 20000,
      costOfLiving: 12000,
      workOpportunities: true,
      prVisaOptions: true,
    },
    requirements: {
      languageTest: {
        ielts: {
          min: 6.0,
          recommended: 6.5,
          bands: {
            listening: 5.5,
            reading: 5.5,
            writing: 5.5,
            speaking: 5.5,
          },
        },
        toefl: {
          min: 80,
          recommended: 88,
        },
      },
      academicRequirements: [
        "A-levels or equivalent for undergraduate",
        "Bachelor's degree for postgraduate",
        "Specific subject requirements vary by program",
      ],
      visaRequirements: [
        "Valid passport",
        "CAS from university",
        "Proof of funds",
        "English language proficiency",
      ],
    },
    universities: [
      {
        _id: "uni3",
        name: "University of Oxford",
        rank: 1,
        location: "Oxford, England",
        type: "Public",
        established: 1096,
        totalStudents: 24000,
        internationalStudents: 10000,
        tuitionRange: {
          undergraduate: {
            min: 25000,
            max: 39000,
          },
          postgraduate: {
            min: 22000,
            max: 35000,
          },
        },
        programs: ["Arts", "Sciences", "Medicine", "Business", "Law"],
        status: "active",
      },
      {
        _id: "uni4",
        name: "Imperial College London",
        rank: 3,
        location: "London, England",
        type: "Public",
        established: 1907,
        totalStudents: 19000,
        internationalStudents: 12000,
        tuitionRange: {
          undergraduate: {
            min: 29000,
            max: 42000,
          },
          postgraduate: {
            min: 25000,
            max: 38000,
          },
        },
        programs: ["Engineering", "Medicine", "Science", "Business"],
        status: "active",
      },
    ],
    scholarships: [
      {
        _id: "sch3",
        name: "Chevening Scholarships",
        description: "Fully-funded scholarships for international students",
        amount: 35000,
        duration: "1 year",
        deadline: new Date("2024-11-02"),
        eligibility: [
          "International students",
          "Bachelor's degree",
          "Work experience",
        ],
        type: "Full-ride",
        status: "active",
      },
      {
        _id: "sch4",
        name: "Commonwealth Scholarships",
        description: "Scholarships for students from Commonwealth countries",
        amount: 30000,
        duration: "1 year",
        deadline: new Date("2024-12-31"),
        eligibility: [
          "Commonwealth country citizen",
          "First degree",
          "Academic merit",
        ],
        type: "Merit-based",
        status: "active",
      },
    ],
    guides: [
      {
        title: "UK Student Visa Guide",
        content: "Step-by-step guide to obtaining a UK student visa",
        type: "visa",
      },
      {
        title: "Living in the UK",
        content: "Essential information for international students in the UK",
        type: "living",
      },
    ],
    faqs: [
      {
        question: "Can I work while studying in the UK?",
        answer: "Yes, most international students can work up to 20 hours per week during term time and full-time during holidays.",
      },
      {
        question: "What is the Graduate Route visa?",
        answer: "The Graduate Route allows international students to stay in the UK for 2 years (3 years for PhD graduates) after graduation to work or look for work.",
      },
    ],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export default mockDestinations; 