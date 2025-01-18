export const destinations = [
  {
    id: "usa",
    name: "United States",
    capital: "Washington, D.C.",
    countryCode: "US",
    region: "North America",
    description: "The United States offers a diverse and innovative education system, home to many of the world's top-ranked universities. Known for its cutting-edge research facilities, flexible study options, and vibrant campus life, the US provides students with unparalleled academic and cultural experiences.",
    media: {
      mainImage: {
        url: "https://media.istockphoto.com/id/533998713/photo/empire-state-building-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=5bB0P-APTz70wzYvKcOXCXiSRoaDaASTpjjvYdDhAbY=",
        alt: "Harvard University Campus"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1526403646408-57b94dc15399",
        alt: "Irish Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b",
          alt: "Columbia University Campus",
          caption: "Iconic American university architecture"
        },
        {
          url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
          alt: "University Library",
          caption: "World-class research facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
          alt: "Graduation Ceremony",
          caption: "Celebrating academic achievements"
        },
        {
          url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
          alt: "Campus Life",
          caption: "Diverse and vibrant student community"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a",
        education: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
        lifestyle: "https://images.unsplash.com/photo-1559278950-fcc3c2974d13",
        career: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
      }
    },
    overview: {
      totalUniversities: "4,000+",
      topRankedUniversities: "200+",
      averageAcceptanceRate: "68%",
      internationalStudents: "1,075,496",
      averageTuitionRange: "$20,000 - $60,000",
      workWhileStudying: "20 hours/week",
      postStudyWork: "12-36 months",
      averageGraduateSalary: "$55,000"
    },
    popularPrograms: [
      {
        name: "Computer Science & IT",
        avgTuition: "$35,000/year",
        duration: "4 years",
        careers: ["Software Engineer", "Data Scientist", "AI Specialist"]
      },
      {
        name: "Business & Management",
        avgTuition: "$40,000/year",
        duration: "4 years",
        careers: ["Business Analyst", "Management Consultant", "Entrepreneur"]
      },
      {
        name: "Engineering",
        avgTuition: "$38,000/year",
        duration: "4 years",
        careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"]
      },
      {
        name: "Medicine & Healthcare",
        avgTuition: "$45,000/year",
        duration: "4 years",
        careers: ["Doctor", "Healthcare Administrator", "Medical Researcher"]
      },
      {
        name: "Data Science & Analytics",
        avgTuition: "$36,000/year",
        duration: "4 years",
        careers: ["Data Analyst", "Business Intelligence", "Data Engineer"]
      }
    ],
    quickFacts: {
      population: "331 million",
      language: "English",
      currency: "USD ($)",
      climate: "Varied (Continental to Subtropical)",
      timeZone: "UTC-4 to UTC-10",
      internationalStudents: 1075496,
      gdp: "$23.0 trillion",
      costOfLiving: {
        monthly: {
          accommodation: "$800-$1,500",
          food: "$400-$600",
          transport: "$50-$100",
          utilities: "$150-$200",
          internet: "$50-$70",
          total: "$1,450-$2,470"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "$20,000-$35,000",
          private: "$35,000-$60,000"
        },
        postgraduate: {
          public: "$25,000-$40,000",
          private: "$40,000-$65,000"
        }
      },
      intakes: [
        {
          season: "Fall",
          months: "August-September",
          applicationDeadline: "January-March",
          description: "Main intake with most program options"
        },
        {
          season: "Spring",
          months: "January",
          applicationDeadline: "September-November",
          description: "Secondary intake with limited programs"
        }
      ],
      academicYear: "August to May",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-7.0",
          toefl: "70-100",
          duolingo: "95-115"
        },
        postgraduate: {
          ielts: "6.5-7.5",
          toefl: "80-110",
          duolingo: "105-125"
        }
      },
      visaInfo: {
        type: "F-1 Student Visa",
        processingTime: "2-4 weeks",
        requirements: [
          "Acceptance letter from a SEVP approved institution",
          "I-20 form",
          "Proof of financial support",
          "Valid passport",
          "Visa application fee payment",
          "SEVIS fee payment",
          "Non-immigrant intent proof"
        ],
        workRights: {
          duringStudy: "20 hours per week during semester, full-time during breaks",
          postStudy: "12 months OPT, additional 24 months for STEM graduates"
        }
      }
    },
    universities: [
      {
        name: "Harvard University",
        location: "Cambridge, Massachusetts",
        ranking: {
          world: 1,
          national: 1
        },
        type: "Private",
        established: 1636,
        totalStudents: 23000,
        internationalStudents: "24%",
        admissionRate: "5%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "$54,768/year",
            admissionRequirements: [
              "High School Diploma",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Essay"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 89,
      employmentRate: 91,
      visaSuccessRate: 92,
      averageGraduateSalary: "$55,000",
      internationalStudentRatio: 5.5
    },
    scholarships: [
      {
        name: "Fulbright Scholarships",
        description: "Merit-based scholarships for international students",
        coverage: ["Tuition", "Living Expenses", "Travel"],
        amount: "Full or Partial",
        eligibility: [
          "Outstanding academic achievement",
          "Leadership qualities",
          "Research proposal"
        ],
        deadline: "February each year"
      }
    ],
    admissionRequirements: {
      undergraduate: [
        "High School Diploma or equivalent",
        "SAT/ACT scores",
        "English proficiency test",
        "Letters of recommendation",
        "Personal statement",
        "Extracurricular activities"
      ],
      postgraduate: [
        "Bachelor's degree",
        "GRE/GMAT scores",
        "English proficiency test",
        "Research proposal (for research programs)",
        "Work experience (for some programs)",
        "Letters of recommendation"
      ],
      documents: [
        "Transcripts",
        "CV/Resume",
        "Portfolio (for specific programs)",
        "Financial statements",
        "Passport copy",
        "Study plan"
      ]
    },
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Dormitory",
            cost: "$800-$1,200/month",
            features: ["Furnished", "Utilities included", "Meal plans available"]
          },
          {
            name: "Private Apartment",
            cost: "$1,200-$2,500/month",
            features: ["Independent living", "More privacy", "Flexible location"]
          },
          {
            name: "Homestay",
            cost: "$800-$1,500/month",
            features: ["Cultural immersion", "Meals included", "Family environment"]
          }
        ],
        averageRent: {
          cityCenter: "$1,500-$3,000",
          outside: "$1,000-$2,000"
        }
      },
      transportation: {
        public: {
          type: ["Bus", "Subway", "Train"],
          monthlyCost: "$50-$100"
        },
        options: [
          "Student transport cards",
          "Bicycle sharing",
          "Ride-sharing services"
        ]
      },
      healthcare: {
        insurance: {
          cost: "$1,000-$2,000/year",
          coverage: ["Medical", "Dental", "Emergency"]
        },
        facilities: ["University health centers", "Public hospitals", "Private clinics"]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "20 hours/week",
        types: ["On-campus jobs", "Internships", "Research assistantships"],
        averagePay: "$12-$15/hour"
      },
      afterGraduation: {
        programs: ["OPT", "STEM Extension"],
        duration: "12-36 months",
        industries: [
          "Technology",
          "Finance",
          "Healthcare",
          "Education",
          "Engineering"
        ]
      },
      jobProspects: {
        topFields: [
          "Information Technology",
          "Engineering",
          "Business",
          "Healthcare",
          "Research"
        ],
        averageSalaries: {
          entry: "$45,000-$65,000",
          experienced: "$70,000-$120,000"
        }
      }
    }
  },
  {
    id: "uk",
    name: "United Kingdom",
    capital: "London",
    countryCode: "GB",
    region: "Europe",
    description: "The UK offers world-renowned education with centuries of academic excellence, featuring prestigious institutions like Oxford and Cambridge. Known for its rich cultural heritage and innovative research opportunities.",
    media: {
      mainImage: {
        url: "https://media.istockphoto.com/id/466597994/photo/house-of-parliament-big-ben.jpg?s=612x612&w=0&k=20&c=7BXNPUk1pMsLndVYIcbAiaQ7vyldl4oKx5NcqA7CbrM=",
        alt: "Oxford University Campus"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1532375810709-75b1da00537c",
        alt: "Union Jack - UK Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1590086782792-42dd2350140d",
          alt: "Cambridge University",
          caption: "Historic Cambridge University buildings"
        },
        {
          url: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261",
          alt: "University of Edinburgh",
          caption: "Scotland's prestigious universities"
        },
        {
          url: "https://images.unsplash.com/photo-1583373834259-46cc92173cb7",
          alt: "British Library",
          caption: "World-renowned research facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
          alt: "Student Life in UK",
          caption: "Multicultural campus experience"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1516624430125-0d96f5c85fd8",
        education: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
        lifestyle: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
        career: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
      }
    },
    overview: {
      totalUniversities: "150+",
      topRankedUniversities: "80+",
      averageAcceptanceRate: "75%",
      internationalStudents: "605,130",
      averageTuitionRange: "£15,000 - £40,000",
      workWhileStudying: "20 hours/week",
      postStudyWork: "2 years",
      averageGraduateSalary: "£30,000"
    },
    popularPrograms: [
      {
        name: "Business & Finance",
        avgTuition: "£20,000/year",
        duration: "3 years",
        careers: ["Investment Banker", "Financial Analyst", "Business Consultant"]
      },
      {
        name: "Computer Science & IT",
        avgTuition: "£35,000/year",
        duration: "4 years",
        careers: ["Software Engineer", "Data Scientist", "AI Specialist"]
      },
      {
        name: "Engineering",
        avgTuition: "£38,000/year",
        duration: "4 years",
        careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"]
      },
      {
        name: "Medicine & Healthcare",
        avgTuition: "£45,000/year",
        duration: "4 years",
        careers: ["Doctor", "Healthcare Administrator", "Medical Researcher"]
      },
      {
        name: "Data Science & Analytics",
        avgTuition: "£36,000/year",
        duration: "4 years",
        careers: ["Data Analyst", "Business Intelligence", "Data Engineer"]
      }
    ],
    quickFacts: {
      population: "67 million",
      language: "English",
      currency: "GBP (£)",
      climate: "Varied (Mediterranean to Subarctic)",
      timeZone: "UTC+0 to UTC+1",
      internationalStudents: 605130,
      gdp: "£2.8 trillion",
      costOfLiving: {
        monthly: {
          accommodation: "£800-£1,500",
          food: "£400-£600",
          transport: "£50-£100",
          utilities: "£150-£200",
          internet: "£50-£70",
          total: "£1,450-£2,470"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "£15,000-£40,000",
          private: "£35,000-£65,000"
        },
        postgraduate: {
          public: "£25,000-£40,000",
          private: "£40,000-£65,000"
        }
      },
      intakes: [
        {
          season: "Fall",
          months: "September-October",
          applicationDeadline: "January-March",
          description: "Main intake with most program options"
        },
        {
          season: "Spring",
          months: "January",
          applicationDeadline: "September-November",
          description: "Secondary intake with limited programs"
        }
      ],
      academicYear: "October to June",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-7.0",
          toefl: "70-100",
          duolingo: "95-115"
        },
        postgraduate: {
          ielts: "6.5-7.5",
          toefl: "80-110",
          duolingo: "105-125"
        }
      },
      visaInfo: {
        type: "Student Visa",
        processingTime: "2-4 weeks",
        requirements: [
          "Acceptance letter from a SEVP approved institution",
          "CAS (Confirmation of Acceptance for Studies)",
          "Proof of financial support",
          "Valid passport",
          "Visa application fee payment",
          "SEVIS fee payment",
          "Non-immigrant intent proof"
        ],
        workRights: {
          duringStudy: "20 hours per week during semester, full-time during breaks",
          postStudy: "2 years"
        }
      }
    },
    universities: [
      {
        name: "University of Oxford",
        location: "Oxford",
        ranking: {
          world: 2,
          national: 1
        },
        type: "Public",
        established: 1096,
        totalStudents: 21000,
        internationalStudents: "30%",
        admissionRate: "15%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "3 years",
            tuitionFee: "£15,000/year",
            admissionRequirements: [
              "A-level grades",
              "IB Diploma",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Essay"
            ]
          }
        ]
      },
      {
        name: "University of Cambridge",
        location: "Cambridge",
        ranking: {
          world: 3,
          national: 1
        },
        type: "Public",
        established: 1209,
        totalStudents: 18000,
        internationalStudents: "35%",
        admissionRate: "10%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "3 years",
            tuitionFee: "£15,000/year",
            admissionRequirements: [
              "A-level grades",
              "IB Diploma",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Essay"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 85,
      employmentRate: 88,
      visaSuccessRate: 90,
      averageGraduateSalary: "£30,000",
      internationalStudentRatio: 5.5
    },
    scholarships: [
      {
        name: "Chevening Scholarships",
        description: "Merit-based scholarships for international students",
        coverage: ["Tuition", "Living Expenses", "Travel"],
        amount: "Full or Partial",
        eligibility: [
          "Outstanding academic achievement",
          "Leadership qualities",
          "Research proposal"
        ],
        deadline: "February each year"
      }
    ],
    admissionRequirements: {
      undergraduate: [
        "High School Diploma or equivalent",
        "A-level grades or equivalent",
        "English proficiency test",
        "Letters of recommendation",
        "Personal statement",
        "Extracurricular activities"
      ],
      postgraduate: [
        "Bachelor's degree",
        "GRE/GMAT scores",
        "English proficiency test",
        "Research proposal (for research programs)",
        "Work experience (for some programs)",
        "Letters of recommendation"
      ],
      documents: [
        "Transcripts",
        "CV/Resume",
        "Portfolio (for specific programs)",
        "Financial statements",
        "Passport copy",
        "Study plan"
      ]
    },
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Dormitory",
            cost: "£800-£1,200/month",
            features: ["Furnished", "Utilities included", "Meal plans available"]
          },
          {
            name: "Private Apartment",
            cost: "£1,200-£2,500/month",
            features: ["Independent living", "More privacy", "Flexible location"]
          },
          {
            name: "Homestay",
            cost: "£800-£1,500/month",
            features: ["Cultural immersion", "Meals included", "Family environment"]
          }
        ],
        averageRent: {
          cityCenter: "£1,500-£3,000",
          outside: "£1,000-£2,000"
        }
      },
      transportation: {
        public: {
          type: ["Bus", "Subway", "Train"],
          monthlyCost: "£50-£100"
        },
        options: [
          "Student transport cards",
          "Bicycle sharing",
          "Ride-sharing services"
        ]
      },
      healthcare: {
        insurance: {
          cost: "£1,000-£2,000/year",
          coverage: ["Medical", "Dental", "Emergency"]
        },
        facilities: ["University health centers", "Public hospitals", "Private clinics"]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "20 hours/week",
        types: ["On-campus jobs", "Internships", "Research assistantships"],
        averagePay: "£12-£15/hour"
      },
      afterGraduation: {
        programs: ["OPT", "STEM Extension"],
        duration: "12-36 months",
        industries: [
          "Technology",
          "Finance",
          "Healthcare",
          "Education",
          "Engineering"
        ]
      },
      jobProspects: {
        topFields: [
          "Information Technology",
          "Engineering",
          "Business",
          "Healthcare",
          "Research"
        ],
        averageSalaries: {
          entry: "£45,000-£65,000",
          experienced: "£70,000-£120,000"
        }
      }
    }
  },
  {
    id: "canada",
    name: "Canada",
    capital: "Ottawa",
    countryCode: "CA",
    region: "North America",
    description: "Canada offers a high-quality education system with a focus on innovation and research. Known for its beautiful natural landscapes and welcoming communities, Canada provides students with a unique educational experience.",
    media: {
      mainImage: {
        url: "https://images.unsplash.com/photo-1652487308772-83c91cdd5dc4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "University of Toronto Campus"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1569976710208-b52636b52c09",
        alt: "Canadian Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1604713847763-7c8ef1d6fec1",
          alt: "McGill University",
          caption: "Historic McGill University campus"
        },
        {
          url: "https://images.unsplash.com/photo-1599687266725-0d4d52716b06",
          alt: "UBC Campus",
          caption: "University of British Columbia"
        },
        {
          url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
          alt: "Research Library",
          caption: "Advanced research facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
          alt: "Student Life",
          caption: "Diverse student community"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1494870363241-b5225be3dada",
        education: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
        lifestyle: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
        career: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
      }
    },
    overview: {
      totalUniversities: "100+",
      topRankedUniversities: "50+",
      averageAcceptanceRate: "70%",
      internationalStudents: "1,075,496",
      averageTuitionRange: "$15,000 - $60,000",
      workWhileStudying: "20 hours/week",
      postStudyWork: "12-36 months",
      averageGraduateSalary: "$55,000"
    },
    popularPrograms: [
      {
        name: "Computer Science & IT",
        avgTuition: "$35,000/year",
        duration: "4 years",
        careers: ["Software Engineer", "Data Scientist", "AI Specialist"]
      },
      {
        name: "Business & Management",
        avgTuition: "$40,000/year",
        duration: "4 years",
        careers: ["Business Analyst", "Management Consultant", "Entrepreneur"]
      },
      {
        name: "Engineering",
        avgTuition: "$38,000/year",
        duration: "4 years",
        careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"]
      },
      {
        name: "Medicine & Healthcare",
        avgTuition: "$45,000/year",
        duration: "4 years",
        careers: ["Doctor", "Healthcare Administrator", "Medical Researcher"]
      },
      {
        name: "Data Science & Analytics",
        avgTuition: "$36,000/year",
        duration: "4 years",
        careers: ["Data Analyst", "Business Intelligence", "Data Engineer"]
      }
    ],
    quickFacts: {
      population: "38 million",
      language: "English, French",
      currency: "CAD ($)",
      climate: "Varied (Mediterranean to Subarctic)",
      timeZone: "UTC-4 to UTC-8",
      internationalStudents: 1075496,
      gdp: "$1.8 trillion",
      costOfLiving: {
        monthly: {
          accommodation: "$800-$1,500",
          food: "$400-$600",
          transport: "$50-$100",
          utilities: "$150-$200",
          internet: "$50-$70",
          total: "$1,450-$2,470"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "$15,000-$35,000",
          private: "$35,000-$60,000"
        },
        postgraduate: {
          public: "$25,000-$40,000",
          private: "$40,000-$65,000"
        }
      },
      intakes: [
        {
          season: "Fall",
          months: "September-December",
          applicationDeadline: "January-March",
          description: "Main intake with most program options"
        },
        {
          season: "Spring",
          months: "January",
          applicationDeadline: "September-November",
          description: "Secondary intake with limited programs"
        }
      ],
      academicYear: "September to April",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-7.0",
          toefl: "70-100",
          duolingo: "95-115"
        },
        postgraduate: {
          ielts: "6.5-7.5",
          toefl: "80-110",
          duolingo: "105-125"
        }
      },
      visaInfo: {
        type: "Student Visa",
        processingTime: "2-4 weeks",
        requirements: [
          "Acceptance letter from a SEVP approved institution",
          "I-20 form",
          "Proof of financial support",
          "Valid passport",
          "Visa application fee payment",
          "SEVIS fee payment",
          "Non-immigrant intent proof"
        ],
        workRights: {
          duringStudy: "20 hours per week during semester, full-time during breaks",
          postStudy: "12 months OPT, additional 24 months for STEM graduates"
        }
      }
    },
    universities: [
      {
        name: "University of Toronto",
        location: "Toronto",
        ranking: {
          world: 18,
          national: 1
        },
        type: "Public",
        established: 1827,
        totalStudents: 70000,
        internationalStudents: "30%",
        admissionRate: "10%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "$35,000/year",
            admissionRequirements: [
              "High School Diploma",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Essay"
            ]
          }
        ]
      },
      {
        name: "McGill University",
        location: "Montreal",
        ranking: {
          world: 24,
          national: 1
        },
        type: "Public",
        established: 1821,
        totalStudents: 35000,
        internationalStudents: "35%",
        admissionRate: "15%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "$35,000/year",
            admissionRequirements: [
              "High School Diploma",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Essay"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 85,
      employmentRate: 88,
      visaSuccessRate: 90,
      averageGraduateSalary: "$55,000",
      internationalStudentRatio: 5.5
    },
    scholarships: [
      {
        name: "Canada Graduate Scholarships",
        description: "Merit-based scholarships for international students",
        coverage: ["Tuition", "Living Expenses", "Travel"],
        amount: "Full or Partial",
        eligibility: [
          "Outstanding academic achievement",
          "Research proposal"
        ],
        deadline: "February each year"
      }
    ],
    admissionRequirements: {
      undergraduate: [
        "High School Diploma or equivalent",
        "SAT/ACT scores",
        "English proficiency test",
        "Letters of recommendation",
        "Personal statement",
        "Extracurricular activities"
      ],
      postgraduate: [
        "Bachelor's degree",
        "GRE/GMAT scores",
        "English proficiency test",
        "Research proposal (for research programs)",
        "Work experience (for some programs)",
        "Letters of recommendation"
      ],
      documents: [
        "Transcripts",
        "CV/Resume",
        "Portfolio (for specific programs)",
        "Financial statements",
        "Passport copy",
        "Study plan"
      ]
    },
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Dormitory",
            cost: "$800-$1,200/month",
            features: ["Furnished", "Utilities included", "Meal plans available"]
          },
          {
            name: "Private Apartment",
            cost: "$1,200-$2,500/month",
            features: ["Independent living", "More privacy", "Flexible location"]
          },
          {
            name: "Homestay",
            cost: "$800-$1,500/month",
            features: ["Cultural immersion", "Meals included", "Family environment"]
          }
        ],
        averageRent: {
          cityCenter: "$1,500-$3,000",
          outside: "$1,000-$2,000"
        }
      },
      transportation: {
        public: {
          type: ["Bus", "Subway", "Train"],
          monthlyCost: "$50-$100"
        },
        options: [
          "Student transport cards",
          "Bicycle sharing",
          "Ride-sharing services"
        ]
      },
      healthcare: {
        insurance: {
          cost: "$1,000-$2,000/year",
          coverage: ["Medical", "Dental", "Emergency"]
        },
        facilities: ["University health centers", "Public hospitals", "Private clinics"]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "20 hours/week",
        types: ["On-campus jobs", "Internships", "Research assistantships"],
        averagePay: "$12-$15/hour"
      },
      afterGraduation: {
        programs: ["OPT", "STEM Extension"],
        duration: "12-36 months",
        industries: [
          "Technology",
          "Finance",
          "Healthcare",
          "Education",
          "Engineering"
        ]
      },
      jobProspects: {
        topFields: [
          "Information Technology",
          "Engineering",
          "Business",
          "Healthcare",
          "Research"
        ],
        averageSalaries: {
          entry: "$45,000-$65,000",
          experienced: "$70,000-$120,000"
        }
      }
    }
  },
  {
    id: "australia",
    name: "Australia",
    capital: "Canberra",
    countryCode: "AU",
    region: "Oceania",
    description: "Australia offers a high-quality education system with a focus on innovation and research. Known for its beautiful natural landscapes and welcoming communities, Australia provides students with a unique educational experience.",
    media: {
      mainImage: {
        url: "https://media.istockphoto.com/id/493621192/photo/melbourne-at-dusk.webp?a=1&b=1&s=612x612&w=0&k=20&c=rJc83LFWzXgVVaUHBcw45kZElqBrT4zaovY6stU0pkQ=",
        alt: "University of Melbourne Campus"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1528163308254-5852067f8e13",
        alt: "New Zealand Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1612815291502-8e62c8e2e5fe",
          alt: "University of Sydney",
          caption: "Iconic University of Sydney quadrangle"
        },
        {
          url: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b",
          alt: "Modern Campus",
          caption: "State-of-the-art facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0",
          alt: "Student Life",
          caption: "Beach lifestyle and studies"
        },
        {
          url: "https://images.unsplash.com/photo-1516624430125-0d96f5c85fd8",
          alt: "Research Facilities",
          caption: "World-class research infrastructure"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be",
        education: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
        lifestyle: "https://images.unsplash.com/photo-1505275350441-83dcda8eeef5",
        career: "https://images.unsplash.com/photo-1497215728101-856f4ea42174"
      }
    },
    overview: {
      totalUniversities: "100+",
      topRankedUniversities: "50+",
      averageAcceptanceRate: "70%",
      internationalStudents: "1,075,496",
      averageTuitionRange: "$15,000 - $60,000",
      workWhileStudying: "20 hours/week",
      postStudyWork: "12-36 months",
      averageGraduateSalary: "$55,000"
    },
    popularPrograms: [
      {
        name: "Computer Science & IT",
        avgTuition: "$35,000/year",
        duration: "4 years",
        careers: ["Software Engineer", "Data Scientist", "AI Specialist"]
      },
      {
        name: "Business & Management",
        avgTuition: "$40,000/year",
        duration: "4 years",
        careers: ["Business Analyst", "Management Consultant", "Entrepreneur"]
      },
      {
        name: "Engineering",
        avgTuition: "$38,000/year",
        duration: "4 years",
        careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"]
      },
      {
        name: "Medicine & Healthcare",
        avgTuition: "$45,000/year",
        duration: "4 years",
        careers: ["Doctor", "Healthcare Administrator", "Medical Researcher"]
      },
      {
        name: "Data Science & Analytics",
        avgTuition: "$36,000/year",
        duration: "4 years",
        careers: ["Data Analyst", "Business Intelligence", "Data Engineer"]
      }
    ],
    quickFacts: {
      population: "25 million",
      language: "English",
      currency: "AUD ($)",
      climate: "Varied (Mediterranean to Subarctic)",
      timeZone: "UTC+8 to UTC+10",
      internationalStudents: 1075496,
      gdp: "$1.4 trillion",
      costOfLiving: {
        monthly: {
          accommodation: "$800-$1,500",
          food: "$400-$600",
          transport: "$50-$100",
          utilities: "$150-$200",
          internet: "$50-$70",
          total: "$1,450-$2,470"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "$15,000-$35,000",
          private: "$35,000-$60,000"
        },
        postgraduate: {
          public: "$25,000-$40,000",
          private: "$40,000-$65,000"
        }
      },
      intakes: [
        {
          season: "Fall",
          months: "February-March",
          applicationDeadline: "January-March",
          description: "Main intake with most program options"
        },
        {
          season: "Spring",
          months: "July",
          applicationDeadline: "September-November",
          description: "Secondary intake with limited programs"
        }
      ],
      academicYear: "February to December",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-7.0",
          toefl: "70-100",
          duolingo: "95-115"
        },
        postgraduate: {
          ielts: "6.5-7.5",
          toefl: "80-110",
          duolingo: "105-125"
        }
      },
      visaInfo: {
        type: "Student Visa",
        processingTime: "2-4 weeks",
        requirements: [
          "Acceptance letter from a SEVP approved institution",
          "I-20 form",
          "Proof of financial support",
          "Valid passport",
          "Visa application fee payment",
          "SEVIS fee payment",
          "Non-immigrant intent proof"
        ],
        workRights: {
          duringStudy: "20 hours per week during semester, full-time during breaks",
          postStudy: "12 months OPT, additional 24 months for STEM graduates"
        }
      }
    },
    universities: [
      {
        name: "University of Sydney",
        location: "Sydney",
        ranking: {
          world: 24,
          national: 1
        },
        type: "Public",
        established: 1850,
        totalStudents: 45000,
        internationalStudents: "30%",
        admissionRate: "10%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "$35,000/year",
            admissionRequirements: [
              "High School Diploma",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Essay"
            ]
          }
        ]
      },
      {
        name: "University of Melbourne",
        location: "Melbourne",
        ranking: {
          world: 33,
          national: 1
        },
        type: "Public",
        established: 1853,
        totalStudents: 35000,
        internationalStudents: "35%",
        admissionRate: "15%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "$35,000/year",
            admissionRequirements: [
              "High School Diploma",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Essay"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 85,
      employmentRate: 88,
      visaSuccessRate: 90,
      averageGraduateSalary: "$55,000",
      internationalStudentRatio: 5.5
    },
    scholarships: [
      {
        name: "Australia Awards",
        description: "Merit-based scholarships for international students",
        coverage: ["Tuition", "Living Expenses", "Travel"],
        amount: "Full or Partial",
        eligibility: [
          "Outstanding academic achievement",
          "Research proposal"
        ],
        deadline: "February each year"
      }
    ],
    admissionRequirements: {
      undergraduate: [
        "High School Diploma or equivalent",
        "SAT/ACT scores",
        "English proficiency test",
        "Letters of recommendation",
        "Personal statement",
        "Extracurricular activities"
      ],
      postgraduate: [
        "Bachelor's degree",
        "GRE/GMAT scores",
        "English proficiency test",
        "Research proposal (for research programs)",
        "Work experience (for some programs)",
        "Letters of recommendation"
      ],
      documents: [
        "Transcripts",
        "CV/Resume",
        "Portfolio (for specific programs)",
        "Financial statements",
        "Passport copy",
        "Study plan"
      ]
    },
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Dormitory",
            cost: "$800-$1,200/month",
            features: ["Furnished", "Utilities included", "Meal plans available"]
          },
          {
            name: "Private Apartment",
            cost: "$1,200-$2,500/month",
            features: ["Independent living", "More privacy", "Flexible location"]
          },
          {
            name: "Homestay",
            cost: "$800-$1,500/month",
            features: ["Cultural immersion", "Meals included", "Family environment"]
          }
        ],
        averageRent: {
          cityCenter: "$1,500-$3,000",
          outside: "$1,000-$2,000"
        }
      },
      transportation: {
        public: {
          type: ["Bus", "Subway", "Train"],
          monthlyCost: "$50-$100"
        },
        options: [
          "Student transport cards",
          "Bicycle sharing",
          "Ride-sharing services"
        ]
      },
      healthcare: {
        insurance: {
          cost: "$1,000-$2,000/year",
          coverage: ["Medical", "Dental", "Emergency"]
        },
        facilities: ["University health centers", "Public hospitals", "Private clinics"]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "20 hours/week",
        types: ["On-campus jobs", "Internships", "Research assistantships"],
        averagePay: "$12-$15/hour"
      },
      afterGraduation: {
        programs: ["OPT", "STEM Extension"],
        duration: "12-36 months",
        industries: [
          "Technology",
          "Finance",
          "Healthcare",
          "Education",
          "Engineering"
        ]
      },
      jobProspects: {
        topFields: [
          "Information Technology",
          "Engineering",
          "Business",
          "Healthcare",
          "Research"
        ],
        averageSalaries: {
          entry: "$45,000-$65,000",
          experienced: "$70,000-$120,000"
        }
      }
    }
  },
  {
    id: "germany",
    name: "Germany",
    capital: "Berlin",
    countryCode: "DE",
    region: "Europe",
    description: "Germany offers a high-quality education system with a focus on innovation and research. Known for its beautiful natural landscapes and welcoming communities, Germany provides students with a unique educational experience.",
    media: {
      mainImage: {
        url: "https://media.istockphoto.com/id/523131495/photo/dusseldorf-harbor-germany.webp?a=1&b=1&s=612x612&w=0&k=20&c=md-AZi21wWhwOKzWj8xk1k2tp9eQP0q905ZnFkNJYqs=",
        alt: "Heidelberg University"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b",
        alt: "German Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1564399580075-5d77847ba2ea",
          alt: "Technical University of Munich",
          caption: "Modern technical education facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1592494804071-faea15d93a8a",
          alt: "Library Hall",
          caption: "Historic university libraries"
        },
        {
          url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
          alt: "Research Lab",
          caption: "Advanced research facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768",
          alt: "Student Life",
          caption: "Vibrant student culture"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
        education: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
        lifestyle: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
        career: "https://images.unsplash.com/photo-1497215728101-856f4ea42174"
      }
    },
    overview: {
      totalUniversities: "100+",
      topRankedUniversities: "50+",
      averageAcceptanceRate: "70%",
      internationalStudents: "1,075,496",
      averageTuitionRange: "€15,000 - €60,000",
      workWhileStudying: "20 hours/week",
      postStudyWork: "12-36 months",
      averageGraduateSalary: "€30,000"
    },
    popularPrograms: [
      {
        name: "Computer Science & IT",
        avgTuition: "€35,000/year",
        duration: "4 years",
        careers: ["Software Engineer", "Data Scientist", "AI Specialist"]
      },
      {
        name: "Business & Management",
        avgTuition: "€40,000/year",
        duration: "4 years",
        careers: ["Business Analyst", "Management Consultant", "Entrepreneur"]
      },
      {
        name: "Engineering",
        avgTuition: "€38,000/year",
        duration: "4 years",
        careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"]
      },
      {
        name: "Medicine & Healthcare",
        avgTuition: "€45,000/year",
        duration: "4 years",
        careers: ["Doctor", "Healthcare Administrator", "Medical Researcher"]
      },
      {
        name: "Data Science & Analytics",
        avgTuition: "€36,000/year",
        duration: "4 years",
        careers: ["Data Analyst", "Business Intelligence", "Data Engineer"]
      }
    ],
    quickFacts: {
      population: "83 million",
      language: "German",
      currency: "EUR (€)",
      climate: "Varied (Mediterranean to Subarctic)",
      timeZone: "UTC+1 to UTC+2",
      internationalStudents: 1075496,
      gdp: "€3.8 trillion",
      costOfLiving: {
        monthly: {
          accommodation: "€800-€1,500",
          food: "€400-€600",
          transport: "€50-€100",
          utilities: "€150-€200",
          internet: "€50-€70",
          total: "€1,450-€2,470"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "€15,000-€35,000",
          private: "€35,000-€60,000"
        },
        postgraduate: {
          public: "€25,000-€40,000",
          private: "€40,000-€65,000"
        }
      },
      intakes: [
        {
          season: "Fall",
          months: "October-November",
          applicationDeadline: "January-March",
          description: "Main intake with most program options"
        },
        {
          season: "Spring",
          months: "April",
          applicationDeadline: "September-November",
          description: "Secondary intake with limited programs"
        }
      ],
      academicYear: "October to July",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-7.0",
          toefl: "70-100",
          duolingo: "95-115"
        },
        postgraduate: {
          ielts: "6.5-7.5",
          toefl: "80-110",
          duolingo: "105-125"
        }
      },
      visaInfo: {
        type: "Student Visa",
        processingTime: "2-4 weeks",
        requirements: [
          "Acceptance letter from a SEVP approved institution",
          "I-20 form",
          "Proof of financial support",
          "Valid passport",
          "Visa application fee payment",
          "SEVIS fee payment",
          "Non-immigrant intent proof"
        ],
        workRights: {
          duringStudy: "20 hours per week during semester, full-time during breaks",
          postStudy: "12 months OPT, additional 24 months for STEM graduates"
        }
      }
    },
    universities: [
      {
        name: "Technical University of Munich",
        location: "Munich",
        ranking: {
          world: 1,
          national: 1
        },
        type: "Public",
        established: 1868,
        totalStudents: 35000,
        internationalStudents: "30%",
        admissionRate: "10%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "€35,000/year",
            admissionRequirements: [
              "High School Diploma",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Essay"
            ]
          }
        ]
      },
      {
        name: "University of Heidelberg",
        location: "Heidelberg",
        ranking: {
          world: 2,
          national: 1
        },
        type: "Public",
        established: 1386,
        totalStudents: 25000,
        internationalStudents: "35%",
        admissionRate: "15%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "€35,000/year",
            admissionRequirements: [
              "High School Diploma",
              "SAT/ACT Scores",
              "Letters of Recommendation",
              "Personal Essay"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 85,
      employmentRate: 88,
      visaSuccessRate: 90,
      averageGraduateSalary: "€30,000",
      internationalStudentRatio: 5.5
    },
    scholarships: [
      {
        name: "DAAD Scholarships",
        description: "Merit-based scholarships for international students",
        coverage: ["Tuition", "Living Expenses", "Travel"],
        amount: "Full or Partial",
        eligibility: [
          "Outstanding academic achievement",
          "Research proposal"
        ],
        deadline: "February each year"
      }
    ],
    admissionRequirements: {
      undergraduate: [
        "High School Diploma or equivalent",
        "SAT/ACT scores",
        "English proficiency test",
        "Letters of recommendation",
        "Personal statement",
        "Extracurricular activities"
      ],
      postgraduate: [
        "Bachelor's degree",
        "GRE/GMAT scores",
        "English proficiency test",
        "Research proposal (for research programs)",
        "Work experience (for some programs)",
        "Letters of recommendation"
      ],
      documents: [
        "Transcripts",
        "CV/Resume",
        "Portfolio (for specific programs)",
        "Financial statements",
        "Passport copy",
        "Study plan"
      ]
    },
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Dormitory",
            cost: "€800-€1,200/month",
            features: ["Furnished", "Utilities included", "Meal plans available"]
          },
          {
            name: "Private Apartment",
            cost: "€1,200-€2,500/month",
            features: ["Independent living", "More privacy", "Flexible location"]
          },
          {
            name: "Homestay",
            cost: "€800-€1,500/month",
            features: ["Cultural immersion", "Meals included", "Family environment"]
          }
        ],
        averageRent: {
          cityCenter: "€1,500-€3,000",
          outside: "€1,000-€2,000"
        }
      },
      transportation: {
        public: {
          type: ["Bus", "Subway", "Train"],
          monthlyCost: "€50-€100"
        },
        options: [
          "Student transport cards",
          "Bicycle sharing",
          "Ride-sharing services"
        ]
      },
      healthcare: {
        insurance: {
          cost: "€1,000-€2,000/year",
          coverage: ["Medical", "Dental", "Emergency"]
        },
        facilities: ["University health centers", "Public hospitals", "Private clinics"]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "20 hours/week",
        types: ["On-campus jobs", "Internships", "Research assistantships"],
        averagePay: "€12-€15/hour"
      },
      afterGraduation: {
        programs: ["OPT", "STEM Extension"],
        duration: "12-36 months",
        industries: [
          "Technology",
          "Finance",
          "Healthcare",
          "Education",
          "Engineering"
        ]
      },
      jobProspects: {
        topFields: [
          "Information Technology",
          "Engineering",
          "Business",
          "Healthcare",
          "Research"
        ],
        averageSalaries: {
          entry: "€45,000-€65,000",
          experienced: "€70,000-€120,000"
        }
      }
    }
  },
  {
    id: "india",
    name: "India",
    capital: "New Delhi",
    countryCode: "IN",
    region: "South Asia",
    description: "India offers a diverse and rich educational experience with its ancient learning traditions and modern technological advancements. Home to prestigious IITs and IIMs, India provides quality education at competitive costs.",
    media: {
      mainImage: {
        url: "https://media.istockphoto.com/id/492494571/photo/morning-in-taj-mahal.webp?a=1&b=1&s=612x612&w=0&k=20&c=tfk79zCVU4pOxm-n1148scQErDQqkF_YdWrkz7ucWeY=",
        alt: "Indian Institute of Technology Delhi"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1532375810709-75b1da00537c",
        alt: "Indian Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667",
          alt: "IIM Ahmedabad",
          caption: "Premier management institutions"
        },
        {
          url: "https://images.unsplash.com/photo-1562774053-701939374585",
          alt: "Research Labs",
          caption: "Modern research facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
          alt: "University Library",
          caption: "Extensive academic resources"
        },
        {
          url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
          alt: "Campus Life",
          caption: "Rich cultural experience"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
        education: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
        lifestyle: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0",
        career: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
      }
    },
    overview: {
      totalUniversities: "1,000+",
      topRankedUniversities: "50+",
      averageAcceptanceRate: "65%",
      internationalStudents: "50,000+",
      averageTuitionRange: "$3,000 - $15,000",
      workWhileStudying: "20 hours/week",
      postStudyWork: "24 months",
      averageGraduateSalary: "$8,000"
    },
    popularPrograms: [
      {
        name: "Computer Science & IT",
        avgTuition: "$5,000/year",
        duration: "4 years",
        careers: ["Software Engineer", "Data Scientist", "IT Consultant"]
      },
      {
        name: "Engineering",
        avgTuition: "$4,500/year",
        duration: "4 years",
        careers: ["Mechanical Engineer", "Civil Engineer", "Electronics Engineer"]
      },
      {
        name: "Business Management",
        avgTuition: "$6,000/year",
        duration: "2 years",
        careers: ["Business Analyst", "Project Manager", "Consultant"]
      }
    ],
    quickFacts: {
      population: "1.4 billion",
      language: "Hindi, English",
      currency: "INR (₹)",
      climate: "Tropical to Temperate",
      timeZone: "UTC+5:30",
      internationalStudents: 50000,
      gdp: "$3.1 trillion",
      costOfLiving: {
        monthly: {
          accommodation: "$200-$500",
          food: "$150-$300",
          transport: "$30-$50",
          utilities: "$50-$100",
          internet: "$20-$40",
          total: "$450-$990"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "₹20,000-₹100,000",
          private: "₹100,000-₹500,000"
        },
        postgraduate: {
          public: "₹30,000-₹150,000",
          private: "₹150,000-₹800,000"
        }
      },
      intakes: [
        {
          season: "Fall",
          months: "July-August",
          applicationDeadline: "April-May",
          description: "Main intake for most universities"
        },
        {
          season: "Spring",
          months: "January-February",
          applicationDeadline: "October-November",
          description: "Limited programs available"
        }
      ],
      academicYear: "July to May",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-6.5",
          toefl: "70-80",
          duolingo: "95-100"
        },
        postgraduate: {
          ielts: "6.5-7.0",
          toefl: "80-90",
          duolingo: "105-110"
        }
      },
      visaInfo: {
        type: "Student Visa (S-1)",
        processingTime: "2-4 weeks",
        requirements: [
          "Offer letter from an Indian university",
          "Valid passport",
          "Financial proof of sufficient funds",
          "Health insurance",
          "Police clearance certificate",
          "Visa application form",
          "Passport-size photographs"
        ],
        workRights: {
          duringStudy: "Part-time work not permitted",
          postStudy: "Up to 2 years post-study work visa available"
        }
      }
    },
    universities: [
      {
        name: "Indian Institute of Technology Delhi",
        location: "New Delhi",
        ranking: {
          world: 185,
          national: 1
        },
        type: "Public",
        established: 1961,
        totalStudents: 8000,
        internationalStudents: "5%",
        admissionRate: "2%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "₹200,000/year",
            admissionRequirements: [
              "JEE Advanced qualification",
              "Class 12 certificates",
              "English proficiency proof",
              "Statement of Purpose"
            ]
          }
        ]
      },
      {
        name: "Indian Institute of Management Ahmedabad",
        location: "Ahmedabad",
        ranking: {
          world: 200,
          national: 1
        },
        type: "Public",
        established: 1961,
        totalStudents: 1200,
        internationalStudents: "8%",
        admissionRate: "1%",
        programs: [
          {
            name: "Master of Business Administration",
            level: "Master",
            duration: "2 years",
            tuitionFee: "₹2,300,000/year",
            admissionRequirements: [
              "CAT/GMAT score",
              "Bachelor's degree",
              "Work experience preferred",
              "Interview"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 82,
      employmentRate: 85,
      visaSuccessRate: 88,
      averageGraduateSalary: "₹600,000",
      internationalStudentRatio: 2.5
    },
    scholarships: [
      {
        name: "Study in India Scholarship",
        description: "Government-funded scholarship for international students",
        coverage: ["Tuition", "Living Expenses", "Travel"],
        amount: "Full or Partial",
        eligibility: [
          "Academic excellence",
          "Valid study visa",
          "Admission to Indian university"
        ],
        deadline: "March each year"
      }
    ],
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Hostel",
            cost: "₹5,000-₹15,000/month",
            features: ["Furnished", "Mess facility", "Wi-Fi", "Security"]
          },
          {
            name: "Private Apartment",
            cost: "₹15,000-₹40,000/month",
            features: ["Independent living", "Fully furnished options", "Modern amenities"]
          },
          {
            name: "Paying Guest",
            cost: "₹8,000-₹20,000/month",
            features: ["Meals included", "Family environment", "Furnished room"]
          }
        ],
        averageRent: {
          cityCenter: "₹20,000-₹40,000",
          outside: "₹10,000-₹25,000"
        }
      },
      transportation: {
        public: {
          type: ["Metro", "Bus", "Auto-rickshaw"],
          monthlyCost: "₹1,000-₹3,000"
        },
        options: [
          "Student metro cards",
          "City bus passes",
          "Ride-sharing services",
          "University shuttle services"
        ]
      },
      healthcare: {
        insurance: {
          cost: "₹15,000-₹25,000/year",
          coverage: ["Medical", "Accident", "Emergency"]
        },
        facilities: [
          "University health centers",
          "Government hospitals",
          "Private hospitals",
          "Specialized clinics"
        ]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "Internships only",
        types: ["Research assistantships", "Campus jobs", "Internships"],
        averagePay: "₹10,000-₹25,000/month"
      },
      afterGraduation: {
        programs: ["Post Study Work Visa", "Employment Visa"],
        duration: "Up to 2 years",
        industries: [
          "Information Technology",
          "Engineering",
          "Business Services",
          "Education",
          "Healthcare"
        ]
      },
      jobProspects: {
        topFields: [
          "Software Development",
          "Data Science",
          "Management",
          "Engineering",
          "Research"
        ],
        averageSalaries: {
          entry: "₹400,000-₹600,000",
          experienced: "₹800,000-₹2,000,000"
        }
      }
    }
  },
  {
    id: "newzealand",
    name: "New Zealand",
    capital: "Wellington",
    countryCode: "NZ",
    region: "Oceania",
    description: "New Zealand offers world-class education with a focus on innovation and practical learning. Known for its stunning landscapes and high quality of life, it provides a unique blend of academic excellence and outdoor adventure.",
    media: {
      mainImage: {
        url: "https://media.istockphoto.com/id/504712721/photo/auckland-dawn.webp?a=1&b=1&s=612x612&w=0&k=20&c=VOU6yKMrPlLw5DrGpkrmqSxm58V4Mm5NEy__JY7ErAQ=",
        alt: "University of Auckland"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1580345527507-63cc7f5d1c87",
        alt: "New Zealand Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1612815291502-8e62c8e2e5fe",
          alt: "Victoria University of Wellington",
          caption: "Stunning campus architecture"
        },
        {
          url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
          alt: "Study Facilities",
          caption: "Modern learning environments"
        },
        {
          url: "https://images.unsplash.com/photo-1528164344705-47542687000d",
          alt: "Student Life",
          caption: "Adventure and education"
        },
        {
          url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
          alt: "Research Facilities",
          caption: "Advanced research facilities"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
        education: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
        lifestyle: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
        career: "https://images.unsplash.com/photo-1497215728101-856f4ea42174"
      }
    },
    overview: {
      totalUniversities: "8",
      topRankedUniversities: "8",
      averageAcceptanceRate: "80%",
      internationalStudents: "120,000+",
      averageTuitionRange: "NZD 22,000 - 35,000",
      workWhileStudying: "20 hours/week",
      postStudyWork: "1-3 years",
      averageGraduateSalary: "NZD 55,000"
    },
    popularPrograms: [
      {
        name: "Environmental Science",
        avgTuition: "NZD 30,000/year",
        duration: "3 years",
        careers: ["Environmental Consultant", "Conservation Officer", "Researcher"]
      }
    ],
    quickFacts: {
      population: "5.1 million",
      language: "English, Māori",
      currency: "NZD ($)",
      climate: "Temperate Maritime",
      timeZone: "UTC+12",
      internationalStudents: 120000,
      gdp: "NZD 360 billion",
      costOfLiving: {
        monthly: {
          accommodation: "NZD 800-1,500",
          food: "NZD 400-600",
          transport: "NZD 100-150",
          utilities: "NZD 150-200",
          internet: "NZD 60-100",
          total: "NZD 1,510-2,550"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "NZD 22,000-32,000",
          private: "NZD 30,000-40,000"
        },
        postgraduate: {
          public: "NZD 26,000-37,000",
          private: "NZD 35,000-45,000"
        }
      },
      intakes: [
        {
          season: "Semester 1",
          months: "February-June",
          applicationDeadline: "October-December",
          description: "Main intake with most program options"
        },
        {
          season: "Semester 2",
          months: "July-November",
          applicationDeadline: "April-May",
          description: "Secondary intake with limited programs"
        }
      ],
      academicYear: "February to November",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-6.5",
          toefl: "80-90",
          duolingo: "95-105"
        },
        postgraduate: {
          ielts: "6.5-7.0",
          toefl: "90-100",
          duolingo: "105-115"
        }
      },
      visaInfo: {
        type: "Student Visa",
        processingTime: "20-25 working days",
        requirements: [
          "Offer of place from an approved institution",
          "Proof of sufficient funds",
          "Return air ticket or proof of funds to buy one",
          "Health insurance",
          "Police clearance certificate",
          "Medical certificate",
          "English proficiency proof"
        ],
        workRights: {
          duringStudy: "20 hours per week during semester, full-time during breaks",
          postStudy: "1-3 years depending on level of study"
        }
      }
    },
    universities: [
      {
        name: "University of Auckland",
        location: "Auckland",
        ranking: {
          world: 85,
          national: 1
        },
        type: "Public",
        established: 1883,
        totalStudents: 42000,
        internationalStudents: "33%",
        admissionRate: "80%",
        programs: [
          {
            name: "Bachelor of Science",
            level: "Bachelor",
            duration: "3 years",
            tuitionFee: "NZD 32,000/year",
            admissionRequirements: [
              "High school qualification",
              "English proficiency",
              "Subject prerequisites",
              "Statement of Purpose"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 90,
      employmentRate: 97,
      visaSuccessRate: 95,
      averageGraduateSalary: "NZD 55,000",
      internationalStudentRatio: 20
    },
    scholarships: [
      {
        name: "New Zealand Excellence Awards",
        description: "Merit-based scholarships for international students",
        coverage: ["Partial Tuition"],
        amount: "NZD 10,000",
        eligibility: [
          "Academic excellence",
          "Offer from NZ university",
          "International student status"
        ],
        deadline: "October each year"
      }
    ],
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Halls",
            cost: "NZD 800-1,200/month",
            features: ["Furnished", "Meals included", "Wi-Fi", "Support staff"]
          },
          {
            name: "Private Apartment",
            cost: "NZD 1,200-2,000/month",
            features: ["Independent living", "Fully furnished options", "Central location"]
          },
          {
            name: "Homestay",
            cost: "NZD 800-1,300/month",
            features: ["Family environment", "Meals included", "Cultural experience"]
          }
        ],
        averageRent: {
          cityCenter: "NZD 1,500-2,500",
          outside: "NZD 1,000-1,800"
        }
      },
      transportation: {
        public: {
          type: ["Bus", "Train", "Ferry"],
          monthlyCost: "NZD 100-150"
        },
        options: [
          "Student transport cards",
          "Bicycle sharing",
          "Ride-sharing services",
          "Walking (most campuses are centrally located)"
        ]
      },
      healthcare: {
        insurance: {
          cost: "NZD 500-700/year",
          coverage: ["Medical", "Dental", "Optical", "Emergency"]
        },
        facilities: [
          "University health services",
          "Public hospitals",
          "Private clinics",
          "24/7 emergency care"
        ]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "20 hours/week",
        types: ["Part-time retail", "Hospitality", "Campus jobs", "Internships"],
        averagePay: "NZD 21.20/hour"
      },
      afterGraduation: {
        programs: ["Post-study work visa", "Skilled Migrant Category"],
        duration: "1-3 years",
        industries: [
          "IT & Technology",
          "Healthcare",
          "Engineering",
          "Education",
          "Tourism"
        ]
      },
      jobProspects: {
        topFields: [
          "Information Technology",
          "Healthcare",
          "Engineering",
          "Education",
          "Hospitality"
        ],
        averageSalaries: {
          entry: "NZD 45,000-55,000",
          experienced: "NZD 70,000-120,000"
        }
      }
    }
  },
  {
    id: "ireland",
    name: "Ireland",
    capital: "Dublin",
    countryCode: "IE",
    region: "Europe",
    description: "Ireland offers a world-class education system with a rich cultural heritage. Known for its friendly people, safe environment, and innovative research opportunities, Ireland provides international students with a unique blend of traditional values and modern education.",
    media: {
      mainImage: {
        url: "https://media.istockphoto.com/id/659151362/photo/dublin-by-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=hYb1V0NJVeSYNd6sfXIdq0V1LhaH3k8Ugk0gBWmhokY=",
        alt: "Trinity College Dublin"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1526403646408-57b94dc15399",
        alt: "Irish Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1564959130747-897fb406b9af",
          alt: "University College Dublin",
          caption: "Modern campus facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1541529086526-db283c563270",
          alt: "Library",
          caption: "Historic libraries and study spaces"
        },
        {
          url: "https://images.unsplash.com/photo-1562774053-701939374585",
          alt: "Research Facilities",
          caption: "Advanced research centers"
        },
        {
          url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
          alt: "Student Life",
          caption: "Vibrant student community"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1549918864-48ac978761a4",
        education: "https://images.unsplash.com/photo-1541449001743-b85d186b6d51",
        lifestyle: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
        career: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
      }
    },
    overview: {
      totalUniversities: "32+",
      topRankedUniversities: "8",
      averageAcceptanceRate: "75%",
      internationalStudents: "32,000+",
      averageTuitionRange: "€9,850 - €25,000",
      workWhileStudying: "20 hours/week",
      postStudyWork: "24 months",
      averageGraduateSalary: "€35,000"
    },
    popularPrograms: [
      {
        name: "Computer Science & IT",
        avgTuition: "€15,000/year",
        duration: "4 years",
        careers: ["Software Engineer", "Data Scientist", "Systems Architect", "IT Consultant"]
      },
      {
        name: "Business & Management",
        avgTuition: "€14,000/year",
        duration: "4 years",
        careers: ["Business Analyst", "Management Consultant", "Marketing Manager", "Entrepreneur"]
      },
      {
        name: "Medicine & Healthcare",
        avgTuition: "€25,000/year",
        duration: "4-6 years",
        careers: ["Doctor", "Medical Researcher", "Healthcare Administrator", "Clinical Specialist"]
      },
      {
        name: "Engineering",
        avgTuition: "€16,000/year",
        duration: "4 years",
        careers: ["Mechanical Engineer", "Civil Engineer", "Software Engineer", "Biomedical Engineer"]
      },
      {
        name: "Arts & Humanities",
        avgTuition: "€12,000/year",
        duration: "3-4 years",
        careers: ["Writer", "Curator", "Teacher", "Cultural Program Manager"]
      }
    ],
    quickFacts: {
      population: "5 million",
      language: "English, Irish (Gaeilge)",
      currency: "Euro (€)",
      climate: "Temperate Maritime",
      timeZone: "GMT+0",
      internationalStudents: 32000,
      gdp: "€404 billion",
      costOfLiving: {
        monthly: {
          accommodation: {
            dublin: "€800-€1,500",
            otherCities: "€500-€900"
          },
          food: "€250-€350",
          transport: {
            publicTransport: "€65-€120",
            bikeShare: "€20"
          },
          utilities: "€100-€150",
          internet: "€40-€60",
          entertainment: "€100-€200",
          insurance: "€40-€50",
          total: {
            dublin: "€1,395-€2,430",
            otherCities: "€1,095-€1,830"
          }
        },
        yearlyExtras: {
          healthInsurance: "€200-€500",
          studentServices: "€100-€200",
          books: "€200-€400"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          eu: "€3,000",
          nonEu: "€9,850-€25,000"
        },
        postgraduate: {
          eu: "€3,000-€30,000",
          nonEu: "€12,000-€35,000"
        }
      },
      intakes: [
        {
          season: "Autumn",
          months: "September",
          applicationDeadline: "July 1st",
          description: "Main intake with most program options"
        },
        {
          season: "Spring",
          months: "January/February",
          applicationDeadline: "November 1st",
          description: "Limited programs available"
        }
      ],
      academicYear: "September to May",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-6.5",
          toefl: "80-90",
          duolingo: "95-105"
        },
        postgraduate: {
          ielts: "6.5-7.0",
          toefl: "90-100",
          duolingo: "105-115"
        }
      },
      visaInfo: {
        type: "Stamp 2 Visa",
        processingTime: "4-8 weeks",
        requirements: [
          "Acceptance letter from an Irish institution",
          "Proof of tuition fee payment",
          "Proof of funds (€7,000 minimum)",
          "Valid passport",
          "Health insurance",
          "English proficiency proof",
          "Medical check (if required)"
        ],
        workRights: {
          duringStudy: "20 hours per week during term, 40 hours during holidays",
          postStudy: "Up to 24 months under Third Level Graduate Programme"
        }
      }
    },
    universities: [
      {
        name: "Trinity College Dublin",
        location: "Dublin",
        ranking: {
          world: 98,
          national: 1
        },
        type: "Public",
        established: 1592,
        totalStudents: 18000,
        internationalStudents: "28%",
        admissionRate: "25%",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "€23,000/year",
            admissionRequirements: [
              "High School Diploma",
              "IELTS 6.5",
              "Mathematics requirement",
              "Personal Statement"
            ]
          }
        ]
      },
      {
        name: "University College Dublin",
        location: "Dublin",
        ranking: {
          world: 173,
          national: 2
        },
        type: "Public",
        established: 1854,
        totalStudents: 33000,
        internationalStudents: "25%",
        admissionRate: "40%",
        programs: [
          {
            name: "Business Studies",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "€20,000/year",
            admissionRequirements: [
              "High School Diploma",
              "IELTS 6.5",
              "Personal Statement",
              "Academic References"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 92,
      employmentRate: 89,
      visaSuccessRate: 95,
      averageGraduateSalary: "€35,000",
      internationalStudentRatio: 12.5
    },
    scholarships: [
      {
        name: "Government of Ireland International Education Scholarships",
        description: "Prestigious scholarship for outstanding international students",
        coverage: ["Full Tuition Fees", "€10,000 Living Expenses Stipend", "Research Support"],
        amount: "Up to €25,000 total value",
        eligibility: [
          "Outstanding academic achievement",
          "Research proposal (for postgraduate)",
          "Not currently residing in Ireland",
          "Letter of acceptance from an eligible Irish institution"
        ],
        deadline: "March each year",
        applicationProcess: [
          "Submit online application",
          "Provide academic transcripts",
          "Submit research proposal",
          "Provide letters of recommendation",
          "Complete interview process if shortlisted"
        ]
      },
      {
        name: "Walsh Fellowships",
        description: "Research scholarships for postgraduate students in agriculture and food science",
        coverage: ["Full Tuition Fees", "Monthly Stipend", "Research Expenses"],
        amount: "€24,000 per year",
        eligibility: [
          "Master's or PhD applicants",
          "Research focus in agriculture/food science",
          "Strong academic background",
          "Research proposal aligned with Teagasc priorities"
        ],
        deadline: "Various deadlines throughout the year",
        applicationProcess: [
          "Submit research proposal",
          "Provide academic transcripts",
          "Submit CV and references",
          "Complete interview if shortlisted"
        ]
      },
      {
        name: "North-South Postgraduate Scholarship",
        description: "Scholarships for students studying across the Ireland-Northern Ireland border",
        coverage: ["Tuition Fees", "Living Expenses"],
        amount: "€15,000",
        eligibility: [
          "Students from Ireland or Northern Ireland",
          "Studying at postgraduate level",
          "Cross-border study requirement",
          "Strong academic record"
        ],
        deadline: "May each year",
        applicationProcess: [
          "Online application submission",
          "Academic references",
          "Personal statement",
          "Interview for shortlisted candidates"
        ]
      }
    ],
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Halls",
            cost: "€600-€800/month",
            features: ["Furnished", "Bills included", "Internet", "Security"]
          },
          {
            name: "Private Rental",
            cost: "€800-€1,200/month",
            features: ["More independence", "Various locations", "Unfurnished options"]
          },
          {
            name: "Homestay",
            cost: "€700-€900/month",
            features: ["Living with Irish family", "Meals included", "Cultural immersion"]
          }
        ]
      },
      transportation: {
        public: {
          types: ["Bus", "Train", "Tram (LUAS)"],
          cost: "€50-€120/month",
          studentDiscount: "Yes"
        },
        cycling: {
          availability: "Extensive bike lanes",
          bikeshare: "Available in major cities"
        }
      },
      healthcare: {
        insurance: "Mandatory",
        cost: "€200-€500/year",
        services: [
          "Access to public healthcare",
          "Campus medical centers",
          "Mental health support"
        ]
      },
      workOpportunities: {
        partTime: {
          hoursPermitted: "20 hours/week during term, 40 hours during holidays",
          averageWage: "€11.30-€15/hour",
          commonJobs: [
            "Retail Assistant",
            "Barista/Café Worker",
            "Restaurant Staff",
            "Campus Ambassador",
            "Research Assistant",
            "IT Support",
            "Library Assistant",
            "Tour Guide"
          ],
          sectors: [
            "Retail",
            "Hospitality",
            "Technology",
            "Education",
            "Tourism"
          ]
        },
        postGraduation: {
          stayBackVisa: "24 months under Third Level Graduate Programme",
          jobSectors: [
            "Technology & IT",
            "Financial Services",
            "Pharmaceutical",
            "Medical Technology",
            "Digital Media",
            "Green Technology",
            "Research & Development"
          ],
          averageSalary: {
            entry: "€30,000-€40,000/year",
            experienced: "€45,000-€75,000/year"
          },
          topEmployers: [
            "Google",
            "Microsoft",
            "Meta",
            "LinkedIn",
            "Pfizer",
            "Bank of Ireland",
            "Deloitte"
          ]
        }
      }
    }
  },
  {
    id: "singapore",
    name: "Singapore",
    capital: "Singapore",
    countryCode: "SG",
    region: "Southeast Asia",
    description: "Singapore is a global education hub with world-class universities and a multicultural environment. Known for its technological advancement and strategic location, it offers excellent career opportunities.",
    media: {
      mainImage: {
        url: "https://images.unsplash.com/photo-1574227492706-f65b24c3688a",
        alt: "National University of Singapore"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1516496636080-14fb876e029d",
        alt: "Singapore Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1533052494972-63e07f31e2a1",
          alt: "Nanyang Technological University",
          caption: "Modern architectural campus"
        },
        {
          url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
          alt: "University Library",
          caption: "State-of-the-art learning facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
          alt: "Research Labs",
          caption: "Advanced research facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e",
          alt: "Student Life",
          caption: "Multicultural campus experience"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        education: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
        lifestyle: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c",
        career: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
      }
    },
    overview: {
      totalUniversities: "34+",
      topRankedUniversities: "6",
      averageAcceptanceRate: "70%",
      internationalStudents: "65,000+",
      averageTuitionRange: "SGD 25,000 - 50,000",
      workWhileStudying: "16 hours/week",
      postStudyWork: "12-24 months",
      averageGraduateSalary: "SGD 45,000"
    },
    popularPrograms: [
      {
        name: "Business & Finance",
        avgTuition: "SGD 35,000/year",
        duration: "3 years",
        careers: ["Financial Analyst", "Investment Banker", "Business Consultant"]
      },
      {
        name: "Computer Science",
        avgTuition: "SGD 38,000/year",
        duration: "4 years",
        careers: ["Software Engineer", "Data Scientist", "AI Specialist"]
      },
      {
        name: "Engineering",
        avgTuition: "SGD 36,000/year",
        duration: "4 years",
        careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"]
      }
    ],
    quickFacts: {
      population: "5.7 million",
      language: "English, Mandarin, Malay, Tamil",
      currency: "SGD ($)",
      climate: "Tropical",
      timeZone: "UTC+8",
      internationalStudents: 65000,
      gdp: "SGD 466 billion",
      costOfLiving: {
        monthly: {
          accommodation: "SGD 800-2,000",
          food: "SGD 400-800",
          transport: "SGD 100-150",
          utilities: "SGD 150-200",
          internet: "SGD 30-50",
          total: "SGD 1,480-3,200"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "SGD 20,000-30,000",
          private: "SGD 25,000-35,000"
        },
        postgraduate: {
          public: "SGD 25,000-35,000",
          private: "SGD 30,000-40,000"
        }
      },
      intakes: [
        {
          season: "Main Intake",
          months: "August-September",
          applicationDeadline: "March-April",
          description: "Primary intake for most programs"
        },
        {
          season: "Secondary Intake",
          months: "January-February",
          applicationDeadline: "September-October",
          description: "Limited program options available"
        }
      ],
      academicYear: "August to May",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-6.5",
          toefl: "80-90",
          duolingo: "95-105"
        },
        postgraduate: {
          ielts: "6.5-7.0",
          toefl: "90-100",
          duolingo: "105-115"
        }
      },
      visaInfo: {
        type: "Student Pass",
        processingTime: "2-4 weeks",
        requirements: [
          "Acceptance letter from institution",
          "Proof of financial means",
          "Health insurance",
          "Medical examination report",
          "Passport validity",
          "Academic transcripts"
        ],
        workRights: {
          duringStudy: "16 hours per week during semester, full-time during breaks",
          postStudy: "1-3 years LTVP under Tech.Pass or other work passes"
        }
      }
    },
    universities: [
      {
        name: "National University of Singapore",
        location: "Singapore",
        ranking: {
          world: 11,
          national: 1
        },
        type: "Public",
        established: 1905,
        totalStudents: 38000,
        internationalStudents: "25%",
        admissionRate: "5%",
        programs: [
          {
            name: "Bachelor of Computing",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "SGD 29,850/year",
            admissionRequirements: [
              "Outstanding academic results",
              "English proficiency",
              "Mathematics and Science prerequisites",
              "Personal statement"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 92,
      employmentRate: 95,
      visaSuccessRate: 98,
      averageGraduateSalary: "SGD 4,500/month",
      internationalStudentRatio: 20
    },
    scholarships: [
      {
        name: "ASEAN Scholarships",
        description: "Full scholarships for ASEAN students",
        coverage: ["Full Tuition", "Living Allowance", "Housing", "Travel"],
        amount: "Full coverage",
        eligibility: [
          "Outstanding academic record",
          "Strong leadership qualities",
          "ASEAN citizenship",
          "English proficiency"
        ],
        deadline: "March each year"
      }
    ],
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Hostels",
            cost: "SGD 400-800/month",
            features: ["Furnished", "Air-conditioning", "Wi-Fi", "Study areas"]
          },
          {
            name: "Private Condominiums",
            cost: "SGD 1,200-2,500/month",
            features: ["Fully furnished", "Swimming pool", "Gym", "Security"]
          },
          {
            name: "HDB Rooms",
            cost: "SGD 700-1,200/month",
            features: ["Local community", "Basic furnishing", "Affordable"]
          }
        ],
        averageRent: {
          cityCenter: "SGD 1,800-3,000",
          outside: "SGD 1,200-2,000"
        }
      },
      transportation: {
        public: {
          type: ["MRT", "Bus", "Taxi"],
          monthlyCost: "SGD 100-150"
        },
        options: [
          "Student concession pass",
          "EZ-Link card",
          "Grab/Gojek services",
          "Extensive MRT network"
        ]
      },
      healthcare: {
        insurance: {
          cost: "SGD 200-300/year",
          coverage: ["Inpatient", "Outpatient", "Personal accident", "Emergency"]
        },
        facilities: [
          "Public hospitals",
          "Private clinics",
          "University health centers",
          "24/7 emergency services"
        ]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "16 hours/week",
        types: ["Part-time retail", "Internships", "Research assistance", "Campus jobs"],
        averagePay: "SGD 10-15/hour"
      },
      afterGraduation: {
        programs: ["Employment Pass", "S Pass", "Tech.Pass"],
        duration: "2-3 years",
        industries: [
          "Technology",
          "Finance",
          "Healthcare",
          "Engineering",
          "Education"
        ]
      },
      jobProspects: {
        topFields: [
          "Financial Services",
          "Information Technology",
          "Healthcare",
          "Engineering",
          "Education"
        ],
        averageSalaries: {
          entry: "SGD 3,500-4,500/month",
          experienced: "SGD 6,000-12,000/month"
        }
      }
    }
  },
  {
    id: "france",
    name: "France",
    capital: "Paris",
    countryCode: "FR",
    region: "Europe",
    description: "France offers prestigious education with a rich cultural heritage. Known for its art, culture, and innovation, France provides quality education at very competitive costs.",
    media: {
      mainImage: {
        url: "https://media.istockphoto.com/id/1145422105/photo/eiffel-tower-aerial-view-paris.webp?a=1&b=1&s=612x612&w=0&k=20&c=XlwXc4XRPlMBfJVjuHwgS4WTPC4G8eJ9pGX_4ATfdQk=",
        alt: "Sorbonne University"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1557655661-61628ce52081",
        alt: "French Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1603975711481-18b7aaca4caa",
          alt: "Sciences Po Paris",
          caption: "Historic academic institutions"
        },
        {
          url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
          alt: "University Library",
          caption: "Rich academic resources"
        },
        {
          url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
          alt: "Research Facilities",
          caption: "Advanced research centers"
        },
        {
          url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
          alt: "Student Life",
          caption: "Cultural academic experience"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        education: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
        lifestyle: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c",
        career: "https://images.unsplash.com/photo-1497215728101-856f4ea42174"
      }
    },
    overview: {
      totalUniversities: "250+",
      topRankedUniversities: "35",
      averageAcceptanceRate: "75%",
      internationalStudents: "358,000+",
      averageTuitionRange: "€170 - €3,770",
      workWhileStudying: "20 hours/week",
      postStudyWork: "24 months",
      averageGraduateSalary: "€35,000"
    },
    popularPrograms: [
      {
        name: "Business & Management",
        avgTuition: "€3,770/year",
        duration: "3 years",
        careers: ["Business Manager", "Marketing Specialist", "Entrepreneur"]
      },
      {
        name: "Engineering",
        avgTuition: "€3,770/year",
        duration: "5 years",
        careers: ["Mechanical Engineer", "Civil Engineer", "Software Engineer"]
      },
      {
        name: "Arts & Design",
        avgTuition: "€3,770/year",
        duration: "3 years",
        careers: ["Art Director", "Fashion Designer", "Interior Designer"]
      }
    ],
    quickFacts: {
      population: "67.4 million",
      language: "French",
      currency: "EUR (€)",
      climate: "Temperate",
      timeZone: "UTC+1",
      internationalStudents: 358000,
      gdp: "EUR 2.6 trillion",
      costOfLiving: {
        monthly: {
          accommodation: "EUR 500-1,000",
          food: "EUR 250-350",
          transport: "EUR 30-75",
          utilities: "EUR 100-150",
          internet: "EUR 20-30",
          total: "EUR 900-1,605"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "EUR 170-601",
          private: "EUR 3,000-10,000"
        },
        postgraduate: {
          public: "EUR 243-380",
          private: "EUR 5,000-15,000"
        }
      },
      intakes: [
        {
          season: "Fall Intake",
          months: "September-October",
          applicationDeadline: "January-March",
          description: "Main intake for most programs"
        },
        {
          season: "Spring Intake",
          months: "January-February",
          applicationDeadline: "September-October",
          description: "Limited programs available"
        }
      ],
      academicYear: "September to June",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0-6.5",
          toefl: "80-90",
          duolingo: "95-105"
        },
        postgraduate: {
          ielts: "6.5-7.0",
          toefl: "90-100",
          duolingo: "105-115"
        }
      },
      visaInfo: {
        type: "Long-stay Student Visa (VLS-TS)",
        processingTime: "2-3 weeks",
        requirements: [
          "Acceptance letter from French institution",
          "Proof of financial means",
          "Health insurance",
          "Accommodation proof",
          "Valid passport",
          "Campus France approval"
        ],
        workRights: {
          duringStudy: "20 hours per week during semester",
          postStudy: "Up to 12 months post-study work permit"
        }
      }
    },
    universities: [
      {
        name: "Sorbonne University",
        location: "Paris",
        ranking: {
          world: 83,
          national: 3
        },
        type: "Public",
        established: 1257,
        totalStudents: 55000,
        internationalStudents: "20%",
        admissionRate: "70%",
        programs: [
          {
            name: "Bachelor in Science",
            level: "Bachelor",
            duration: "3 years",
            tuitionFee: "EUR 170/year (EU), EUR 2,770/year (non-EU)",
            admissionRequirements: [
              "High school diploma",
              "French language proficiency (B2)",
              "Entrance examination",
              "Motivation letter"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 88,
      employmentRate: 92,
      visaSuccessRate: 95,
      averageGraduateSalary: "EUR 35,000/year",
      internationalStudentRatio: 13
    },
    scholarships: [
      {
        name: "Eiffel Excellence Scholarship",
        description: "Merit-based scholarship for international students",
        coverage: ["Monthly Allowance", "Travel", "Health Insurance"],
        amount: "EUR 1,181/month",
        eligibility: [
          "Under 30 years old",
          "Excellent academic record",
          "Non-French nationality",
          "First-time applicant"
        ],
        deadline: "January each year"
      }
    ],
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "CROUS Student Housing",
            cost: "EUR 200-400/month",
            features: ["Subsidized", "Basic furnishing", "Shared facilities"]
          },
          {
            name: "Private Studio",
            cost: "EUR 500-800/month",
            features: ["Independent living", "Furnished options", "City location"]
          },
          {
            name: "Shared Apartment",
            cost: "EUR 400-600/month",
            features: ["Cost-effective", "Social environment", "Furnished"]
          }
        ],
        averageRent: {
          cityCenter: "EUR 800-1,200",
          outside: "EUR 500-800"
        }
      },
      transportation: {
        public: {
          type: ["Metro", "Bus", "Tram", "RER"],
          monthlyCost: "EUR 30-75"
        },
        options: [
          "Student transport card",
          "Vélib (bike sharing)",
          "Walking",
          "Regional trains"
        ]
      },
      healthcare: {
        insurance: {
          cost: "EUR 300/year",
          coverage: ["Basic healthcare", "Emergency", "Specialists", "Prescriptions"]
        },
        facilities: [
          "Public hospitals",
          "University health services",
          "Private clinics",
          "24/7 emergency care"
        ]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "20 hours/week",
        types: ["Part-time service", "Internships", "Teaching assistance", "Research"],
        averagePay: "EUR 10.85/hour"
      },
      afterGraduation: {
        programs: ["APS Permit", "Work Permit", "Talent Passport"],
        duration: "12 months",
        industries: [
          "Technology",
          "Engineering",
          "Research",
          "Education",
          "Tourism"
        ]
      },
      jobProspects: {
        topFields: [
          "Engineering",
          "IT & Digital",
          "Research & Development",
          "Business & Finance",
          "Tourism & Hospitality"
        ],
        averageSalaries: {
          entry: "EUR 30,000-35,000/year",
          experienced: "EUR 45,000-70,000/year"
        }
      }
    }
  },
  {
    id: "dubai",
    name: "Dubai",
    capital: "Dubai",
    countryCode: "AE",
    region: "Middle East",
    description: "The UAE offers modern education with a focus on innovation and technology. Known for its tax-free environment and multicultural atmosphere, it provides excellent opportunities for international students.",
    media: {
      mainImage: {
        url: "https://media.istockphoto.com/id/183371461/photo/city-lights-in-dubai-at-sunset.webp?a=1&b=1&s=612x612&w=0&k=20&c=w1Ctywo-WPcV3ronyQDVCbwq5Hb2J1DI4QwSHsnnZwQ=",
        alt: "Dubai International Academic City"
      },
      flagImage: {
        url: "https://images.unsplash.com/photo-1576604073561-938273f1c6df",
        alt: "UAE Flag"
      },
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1546412414-e1885259563a",
          alt: "University Campus",
          caption: "Modern educational facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
          alt: "Library",
          caption: "Advanced learning resources"
        },
        {
          url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
          alt: "Research Labs",
          caption: "State-of-the-art research facilities"
        },
        {
          url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
          alt: "Student Life",
          caption: "International student experience"
        }
      ],
      sectionImages: {
        overview: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
        education: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
        lifestyle: "https://images.unsplash.com/photo-1583997052830-a631a2916c18",
        career: "https://images.unsplash.com/photo-1582407947304-fd86f028f716"
      }
    },
    overview: {
      totalUniversities: "60+",
      topRankedUniversities: "15",
      averageAcceptanceRate: "70%",
      internationalStudents: "77,000+",
      averageTuitionRange: "AED 40,000 - 120,000",
      workWhileStudying: "Part-time allowed",
      postStudyWork: "1-5 years",
      averageGraduateSalary: "AED 120,000"
    },
    popularPrograms: [
      {
        name: "Business Administration",
        avgTuition: "AED 76,000/year",
        duration: "4 years",
        careers: ["Business Manager", "Entrepreneur", "Consultant"]
      },
      {
        name: "Engineering",
        avgTuition: "AED 82,000/year",
        duration: "4 years",
        careers: ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer"]
      },
      {
        name: "Computer Science",
        avgTuition: "AED 78,000/year",
        duration: "4 years",
        careers: ["Software Developer", "Systems Analyst", "IT Consultant"]
      }
    ],
    quickFacts: {
      population: "3.5 million",
      language: "Arabic, English",
      currency: "AED (د.إ)",
      climate: "Desert",
      timeZone: "UTC+4",
      internationalStudents: 40000,
      gdp: "AED 1.5 trillion",
      costOfLiving: {
        monthly: {
          accommodation: "AED 2,500-5,000",
          food: "AED 1,000-2,000",
          transport: "AED 200-400",
          utilities: "AED 500-800",
          internet: "AED 200-400",
          total: "AED 4,400-8,600"
        }
      }
    },
    studyInfo: {
      averageTuitionFee: {
        undergraduate: {
          public: "AED 40,000-60,000",
          private: "AED 50,000-80,000"
        },
        postgraduate: {
          public: "AED 60,000-80,000",
          private: "AED 70,000-100,000"
        }
      },
      intakes: [
        {
          season: "Fall Intake",
          months: "September",
          applicationDeadline: "May-June",
          description: "Main intake for all programs"
        },
        {
          season: "Spring Intake",
          months: "January",
          applicationDeadline: "October-November",
          description: "Secondary intake with limited programs"
        }
      ],
      academicYear: "September to June",
      englishRequirements: {
        undergraduate: {
          ielts: "6.0",
          toefl: "79-80",
          duolingo: "95-100"
        },
        postgraduate: {
          ielts: "6.5",
          toefl: "90",
          duolingo: "105-110"
        }
      },
      visaInfo: {
        type: "Student Residence Visa",
        processingTime: "2-3 weeks",
        requirements: [
          "Acceptance letter from UAE institution",
          "Passport copy",
          "Passport photos",
          "Bank statements",
          "Health insurance",
          "Medical fitness test"
        ],
        workRights: {
          duringStudy: "Part-time on campus",
          postStudy: "Up to 2 years post-study work visa"
        }
      }
    },
    universities: [
      {
        name: "University of Dubai",
        location: "Dubai",
        ranking: {
          world: 601,
          national: 5
        },
        type: "Private",
        established: 1997,
        totalStudents: 3500,
        internationalStudents: "60%",
        admissionRate: "70%",
        programs: [
          {
            name: "Bachelor of Business Administration",
            level: "Bachelor",
            duration: "4 years",
            tuitionFee: "AED 60,000/year",
            admissionRequirements: [
              "High school certificate (min 80%)",
              "English proficiency",
              "EmSAT or equivalent",
              "Personal statement"
            ]
          }
        ]
      }
    ],
    statistics: {
      studentSatisfactionRate: 89,
      employmentRate: 93,
      visaSuccessRate: 96,
      averageGraduateSalary: "AED 12,000/month",
      internationalStudentRatio: 60
    },
    scholarships: [
      {
        name: "Academic Merit Scholarship",
        description: "Performance-based scholarship for outstanding students",
        coverage: ["Partial Tuition"],
        amount: "Up to 50% of tuition fees",
        eligibility: [
          "Minimum GPA of 3.5",
          "Full-time enrollment",
          "No academic violations",
          "Regular attendance"
        ],
        deadline: "Two months before semester start"
      }
    ],
    livingInfo: {
      accommodation: {
        types: [
          {
            name: "University Residence",
            cost: "AED 2,500-4,000/month",
            features: ["Furnished", "All utilities", "Security", "Internet"]
          },
          {
            name: "Private Studio",
            cost: "AED 3,500-5,500/month",
            features: ["Modern amenities", "Swimming pool", "Gym", "Security"]
          },
          {
            name: "Shared Apartment",
            cost: "AED 2,000-3,500/month",
            features: ["Cost-effective", "Furnished options", "Shared facilities"]
          }
        ],
        averageRent: {
          cityCenter: "AED 4,000-7,000",
          outside: "AED 2,500-4,500"
        }
      },
      transportation: {
        public: {
          type: ["Metro", "Bus", "Tram", "Taxi"],
          monthlyCost: "AED 200-400"
        },
        options: [
          "Student Nol card",
          "RTA public transport",
          "Ride-hailing services",
          "University shuttle"
        ]
      },
      healthcare: {
        insurance: {
          cost: "AED 500-1,000/year",
          coverage: ["Emergency", "Outpatient", "Inpatient", "Dental"]
        },
        facilities: [
          "Private hospitals",
          "University medical centers",
          "Specialized clinics",
          "24/7 emergency services"
        ]
      }
    },
    workOpportunities: {
      duringStudy: {
        hours: "Part-time on campus",
        types: ["Research assistant", "Teaching assistant", "Campus services", "Internships"],
        averagePay: "AED 2,000-3,000/month"
      },
      afterGraduation: {
        programs: ["Post-Study Work Visa", "Employment Visa"],
        duration: "2 years",
        industries: [
          "Banking & Finance",
          "Technology",
          "Tourism & Hospitality",
          "Real Estate",
          "Healthcare"
        ]
      },
      jobProspects: {
        topFields: [
          "Finance & Banking",
          "Information Technology",
          "Tourism & Hospitality",
          "Engineering",
          "Healthcare"
        ],
        averageSalaries: {
          entry: "AED 8,000-12,000/month",
          experienced: "AED 15,000-30,000/month"
        }
      }
    }
  }
]; 