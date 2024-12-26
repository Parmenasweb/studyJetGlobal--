export const mockDestinations = [
  {
    id: "1",
    name: "United Kingdom",
    countryCode: "GB",
    capital: "London",
    description: "The United Kingdom is a world leader in many areas of education including engineering, science, art and design, business and management, law and finance.",
    quickFacts: {
      population: "67 million",
      language: "English",
      currency: "British Pound (GBP)",
      internationalStudents: "485,645",
      averageCostOfLiving: 1200,
      climateInfo: "Temperate maritime climate with mild winters and cool summers",
      timeZone: "GMT/BST",
      visaProcessingTime: "3-4 weeks"
    },
    studyInfo: {
      averageTuitionFee: 15000,
      academicYear: "September to June",
      majorCities: ["London", "Manchester", "Edinburgh", "Birmingham"],
      popularPrograms: ["Business", "Engineering", "Computer Science", "Medicine"],
      admissionRequirements: [
        "Academic transcripts",
        "English language proficiency",
        "Statement of purpose",
        "Letters of recommendation"
      ],
      visaRequirements: [
        "Valid passport",
        "CAS from university",
        "Proof of funds",
        "English language qualification"
      ],
      workPermitInfo: "Students can work up to 20 hours per week during term time",
      prEligibility: "Graduate Immigration Route allows 2-year post-study work"
    },
    universities: [
      {
        id: "uk-uni-1",
        name: "University of Oxford",
        location: "Oxford",
        type: "public",
        ranking: 1,
        description: "One of the oldest and most prestigious universities in the world.",
        website: "https://www.ox.ac.uk",
        contactEmail: "admissions@ox.ac.uk",
        contactPhone: "+44 1865 270000",
        status: "active",
        programs: [
          {
            name: "Computer Science",
            level: "Bachelor",
            duration: "3 years",
            tuitionFee: 35000,
            description: "World-leading computer science program",
            intakes: ["September"],
            requirements: ["A-levels", "IELTS 7.0"],
            status: "active"
          }
        ],
        scholarships: [
          {
            name: "Oxford-Weidenfeld Scholarship",
            amount: 40000,
            description: "Full scholarship for outstanding students",
            criteria: "Academic excellence",
            deadline: "2024-01-15",
            type: "merit",
            coverage: "full",
            status: "active",
            applicationProcess: "Online application through university portal",
            requiredDocuments: ["CV", "Research proposal", "References"]
          }
        ],
        facilities: ["World-class libraries", "Research labs", "Sports complex"],
        images: [
          {
            url: "/images/oxford-main.jpg",
            caption: "Oxford Main Building"
          }
        ],
        partnershipDetails: {
          startDate: "2020-01-01",
          endDate: "2025-12-31",
          agreementFile: "oxford-agreement.pdf",
          commissionRate: 10,
          notes: "Premium partnership status"
        }
      }
    ],
    media: {
      mainImage: "/images/uk-main.jpg",
      flagImage: "/images/uk-flag.png",
      galleryImages: [
        "/images/uk-1.jpg",
        "/images/uk-2.jpg"
      ],
      videoUrl: "https://youtube.com/uk-education"
    },
    statistics: {
      studentSatisfactionRate: 92,
      employmentRate: 95,
      internationalStudentRatio: 20,
      visaSuccessRate: 98
    },
    status: "active"
  },
  {
    id: "2",
    name: "Australia",
    countryCode: "AU",
    capital: "Canberra",
    description: "Australia offers a diverse range of study options for international students, with more than 1,100 institutions and over 22,000 courses to choose from.",
    quickFacts: {
      population: "25.69 million",
      language: "English",
      currency: "Australian Dollar (AUD)",
      internationalStudents: "750,000",
      averageCostOfLiving: 1500,
      climateInfo: "Varies from tropical to temperate",
      timeZone: "Multiple zones (AEST/ACST/AWST)",
      visaProcessingTime: "4-6 weeks"
    },
    studyInfo: {
      averageTuitionFee: 25000,
      academicYear: "February to November",
      majorCities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
      popularPrograms: ["Business", "Engineering", "Healthcare", "IT"],
      admissionRequirements: [
        "Academic transcripts",
        "English proficiency (IELTS/TOEFL)",
        "Statement of purpose",
        "References"
      ],
      visaRequirements: [
        "Valid passport",
        "CoE from institution",
        "Financial requirements",
        "Health insurance"
      ],
      workPermitInfo: "Students can work up to 40 hours per fortnight during term",
      prEligibility: "Post-study work visa available for 2-4 years"
    },
    universities: [
      {
        id: "au-uni-1",
        name: "University of Melbourne",
        location: "Melbourne",
        type: "public",
        ranking: 33,
        description: "Australia's leading public research university.",
        website: "https://www.unimelb.edu.au",
        contactEmail: "admissions@unimelb.edu.au",
        contactPhone: "+61 3 9035 5511",
        status: "active",
        programs: [
          {
            name: "Master of Data Science",
            level: "Master",
            duration: "2 years",
            tuitionFee: 45000,
            description: "Advanced program in data science and analytics",
            intakes: ["February", "July"],
            requirements: ["Bachelor degree", "IELTS 6.5"],
            status: "active"
          }
        ],
        scholarships: [
          {
            name: "Melbourne International Scholarship",
            amount: 30000,
            description: "Merit-based scholarship for international students",
            criteria: "Academic excellence and leadership potential",
            deadline: "2024-03-31",
            type: "merit",
            coverage: "partial",
            status: "active",
            applicationProcess: "Automatic consideration with admission",
            requiredDocuments: ["Academic records", "CV", "Statement of purpose"]
          }
        ],
        facilities: ["Research centers", "Modern libraries", "Student housing"],
        images: [
          {
            url: "/images/unimelb-main.jpg",
            caption: "Melbourne University Main Campus"
          }
        ],
        partnershipDetails: {
          startDate: "2021-01-01",
          endDate: "2026-12-31",
          agreementFile: "melbourne-agreement.pdf",
          commissionRate: 15,
          notes: "Gold partner status"
        }
      }
    ],
    media: {
      mainImage: "/images/australia-main.jpg",
      flagImage: "/images/australia-flag.png",
      galleryImages: [
        "/images/australia-1.jpg",
        "/images/australia-2.jpg"
      ],
      videoUrl: "https://youtube.com/study-in-australia"
    },
    statistics: {
      studentSatisfactionRate: 89,
      employmentRate: 93,
      internationalStudentRatio: 28,
      visaSuccessRate: 96
    },
    status: "active"
  }
]; 