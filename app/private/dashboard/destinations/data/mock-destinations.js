export const mockDestinations = [
  {
    _id: "1",
    name: "Canada",
    countryCode: "CA",
    capital: "Ottawa",
    description: "A welcoming country known for its high-quality education and diverse culture.",
    quickFacts: {
      population: "38 million",
      language: "English, French",
      currency: "CAD",
      internationalStudents: "642,000",
      averageCostOfLiving: 15000,
      climateInfo: "Four distinct seasons"
    },
    studyInfo: {
      averageTuitionFee: 25000,
      academicYear: "September to April",
      majorCities: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
      popularPrograms: ["Business", "Engineering", "Computer Science", "Medicine"],
      admissionRequirements: [
        "High School Diploma",
        "IELTS/TOEFL",
        "Statement of Purpose"
      ],
      visaRequirements: [
        "Study Permit",
        "Proof of Funds",
        "Medical Exam"
      ]
    },
    universities: [
      {
        _id: "u1",
        name: "University of Toronto",
        location: "Toronto",
        ranking: 26,
        programs: [
          {
            name: "Computer Science",
            level: "undergraduate",
            duration: "4 years",
            tuitionFee: 45000
          }
        ]
      }
    ],
    scholarships: [
      {
        _id: "s1",
        name: "Vanier Canada Graduate Scholarship",
        amount: 50000,
        criteria: "Academic excellence",
        deadline: "2024-12-01"
      }
    ],
    media: {
      mainImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225",
      flagImage: "https://flagcdn.com/ca.svg",
      galleryImages: [
        "https://images.unsplash.com/photo-1517935706615-2717063c2225",
        "https://images.unsplash.com/photo-1517935706615-2717063c2225"
      ]
    },
    statistics: {
      studentSatisfactionRate: 92,
      employmentRate: 89,
      internationalStudentRatio: 25
    },
    status: "active",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-03-15T00:00:00.000Z"
  },
  {
    _id: "2",
    name: "Australia",
    countryCode: "AU",
    capital: "Canberra",
    description: "World-class education with a fantastic lifestyle and beautiful landscapes.",
    quickFacts: {
      population: "25.69 million",
      language: "English",
      currency: "AUD",
      internationalStudents: "580,000",
      averageCostOfLiving: 20000,
      climateInfo: "Warm and sunny year-round"
    },
    studyInfo: {
      averageTuitionFee: 30000,
      academicYear: "February to November",
      majorCities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
      popularPrograms: ["Business", "Engineering", "Healthcare", "IT"],
      admissionRequirements: [
        "Academic Transcripts",
        "English Proficiency",
        "GTE Statement"
      ],
      visaRequirements: [
        "Student Visa (Subclass 500)",
        "Health Insurance",
        "Financial Requirements"
      ]
    },
    universities: [
      {
        _id: "u2",
        name: "University of Melbourne",
        location: "Melbourne",
        ranking: 33,
        programs: [
          {
            name: "Business Analytics",
            level: "postgraduate",
            duration: "2 years",
            tuitionFee: 42000
          }
        ]
      }
    ],
    scholarships: [
      {
        _id: "s2",
        name: "Australia Awards Scholarships",
        amount: 35000,
        criteria: "Merit-based",
        deadline: "2024-09-30"
      }
    ],
    media: {
      mainImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be",
      flagImage: "https://flagcdn.com/au.svg",
      galleryImages: [
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be",
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be"
      ]
    },
    statistics: {
      studentSatisfactionRate: 88,
      employmentRate: 85,
      internationalStudentRatio: 28
    },
    status: "active",
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-03-10T00:00:00.000Z"
  },
  {
    _id: "3",
    name: "United Kingdom",
    countryCode: "GB",
    capital: "London",
    description: "Home to some of the world's oldest and most prestigious universities.",
    quickFacts: {
      population: "67 million",
      language: "English",
      currency: "GBP",
      internationalStudents: "605,000",
      averageCostOfLiving: 18000,
      climateInfo: "Mild temperatures with frequent rainfall"
    },
    studyInfo: {
      averageTuitionFee: 35000,
      academicYear: "September to June",
      majorCities: ["London", "Manchester", "Edinburgh", "Birmingham"],
      popularPrograms: ["Law", "Business", "Arts", "Engineering"],
      admissionRequirements: [
        "Academic Qualifications",
        "English Language Test",
        "Personal Statement"
      ],
      visaRequirements: [
        "Student Visa",
        "CAS Statement",
        "Maintenance Funds"
      ]
    },
    universities: [
      {
        _id: "u3",
        name: "University of Oxford",
        location: "Oxford",
        ranking: 1,
        programs: [
          {
            name: "Politics and Economics",
            level: "undergraduate",
            duration: "3 years",
            tuitionFee: 40000
          }
        ]
      }
    ],
    scholarships: [
      {
        _id: "s3",
        name: "Chevening Scholarships",
        amount: 45000,
        criteria: "Leadership potential",
        deadline: "2024-11-01"
      }
    ],
    media: {
      mainImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
      flagImage: "https://flagcdn.com/gb.svg",
      galleryImages: [
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
      ]
    },
    statistics: {
      studentSatisfactionRate: 90,
      employmentRate: 87,
      internationalStudentRatio: 22
    },
    status: "active",
    createdAt: "2024-02-01T00:00:00.000Z",
    updatedAt: "2024-03-05T00:00:00.000Z"
  },
  {
    _id: "4",
    name: "United States",
    countryCode: "US",
    capital: "Washington, D.C.",
    description: "Leading destination for international students with diverse educational opportunities.",
    quickFacts: {
      population: "332 million",
      language: "English",
      currency: "USD",
      internationalStudents: "1,075,000",
      averageCostOfLiving: 25000,
      climateInfo: "Varies by region"
    },
    studyInfo: {
      averageTuitionFee: 40000,
      academicYear: "August to May",
      majorCities: ["New York", "Los Angeles", "Chicago", "Boston"],
      popularPrograms: ["STEM", "Business", "Liberal Arts", "Medicine"],
      admissionRequirements: [
        "SAT/ACT Scores",
        "TOEFL/IELTS",
        "Essays"
      ],
      visaRequirements: [
        "F-1 Visa",
        "I-20 Form",
        "Financial Documents"
      ]
    },
    universities: [
      {
        _id: "u4",
        name: "Harvard University",
        location: "Cambridge",
        ranking: 3,
        programs: [
          {
            name: "Business Administration",
            level: "postgraduate",
            duration: "2 years",
            tuitionFee: 55000
          }
        ]
      }
    ],
    scholarships: [
      {
        _id: "s4",
        name: "Fulbright Scholarships",
        amount: 60000,
        criteria: "Academic merit and leadership",
        deadline: "2024-10-15"
      }
    ],
    media: {
      mainImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
      flagImage: "https://flagcdn.com/us.svg",
      galleryImages: [
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
      ]
    },
    statistics: {
      studentSatisfactionRate: 91,
      employmentRate: 92,
      internationalStudentRatio: 20
    },
    status: "active",
    createdAt: "2024-01-20T00:00:00.000Z",
    updatedAt: "2024-03-01T00:00:00.000Z"
  }
]; 