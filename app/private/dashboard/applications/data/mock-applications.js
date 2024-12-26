export const mockApplications = [
  {
    _id: "app1",
    clientId: {
      _id: "client1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1234567890"
    },
    applicationType: "study",
    status: "pending",
    priority: "high",
    personalInfo: {
      fullName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1234567890",
      whatsapp: "+1234567890",
      dateOfBirth: new Date("1998-05-15"),
      nationality: "United States",
      currentCountry: "United States",
      passportNumber: "US123456",
      passportExpiry: new Date("2028-05-15"),
      gender: "male",
      maritalStatus: "single"
    },
    academicBackground: [
      {
        institution: "UCLA",
        qualification: "Bachelor's Degree",
        fieldOfStudy: "Computer Science",
        grade: "3.8 GPA",
        yearCompleted: 2023
      }
    ],
    studyDetails: {
      destinationCountry: "Canada",
      university: "University of Toronto",
      course: "Master of Computer Science",
      programLevel: "masters",
      majorSubject: "Artificial Intelligence",
      startDate: new Date("2024-09-01"),
      duration: "2 years",
      tuitionFee: 35000,
      scholarshipAmount: 5000
    },
    languageTest: {
      type: "IELTS",
      overallScore: "7.5",
      listeningScore: "7.5",
      readingScore: "7.0",
      writingScore: "7.0",
      speakingScore: "8.0",
      testDate: new Date("2024-01-10")
    },
    financialInfo: {
      fundingSource: "self",
      annualIncome: 60000,
      monthlyIncome: 5000,
      bankStatements: [
        {
          name: "Bank Statement - Jan 2024",
          url: "https://example.com/bank-statement.pdf",
          type: "bank_statement",
          uploadDate: new Date("2024-01-15"),
          status: "approved"
        }
      ]
    },
    documents: [
      {
        name: "Passport",
        url: "https://example.com/passport.pdf",
        type: "passport",
        uploadDate: new Date("2024-01-15"),
        status: "approved"
      },
      {
        name: "Academic Transcript",
        url: "https://example.com/transcript.pdf",
        type: "transcript",
        uploadDate: new Date("2024-01-15"),
        status: "pending"
      }
    ],
    notes: [
      {
        content: "Initial application review completed",
        author: "Admin",
        createdAt: new Date("2024-01-20")
      }
    ],
    timeline: [
      {
        title: "Application Submitted",
        description: "Application received and under initial review",
        status: "completed",
        date: new Date("2024-01-15"),
        updatedBy: "System"
      }
    ],
    progress: 60,
    submissionDate: new Date("2024-01-15"),
    assignedTo: "advisor1",
    reviewedBy: "reviewer1",
    reviewDate: new Date("2024-01-20"),
    decisionDate: null,
    decisionNotes: "",
    internalNotes: "Priority application - strong academic background",
    tags: ["priority", "scholarship-eligible"]
  },
  {
    _id: "app2",
    clientId: {
      _id: "client2",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1987654321"
    },
    applicationType: "work",
    status: "processing",
    priority: "medium",
    personalInfo: {
      fullName: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1987654321",
      whatsapp: "+1987654321",
      dateOfBirth: new Date("1995-08-20"),
      nationality: "United Kingdom",
      currentCountry: "United Kingdom",
      passportNumber: "UK789012",
      passportExpiry: new Date("2027-08-20"),
      gender: "female",
      maritalStatus: "single"
    },
    academicBackground: [
      {
        institution: "University of Manchester",
        qualification: "Master's Degree",
        fieldOfStudy: "Business Administration",
        grade: "Distinction",
        yearCompleted: 2022
      }
    ],
    workDetails: {
      company: "Tech Solutions Ltd",
      jobTitle: "Business Development Manager",
      contractDuration: "2 years",
      expectedSalary: 85000,
      startDate: new Date("2024-07-01"),
      industry: "Technology",
      experienceLevel: "5 years"
    },
    languageTest: {
      type: "IELTS",
      overallScore: "8.0",
      listeningScore: "8.0",
      readingScore: "8.0",
      writingScore: "7.5",
      speakingScore: "8.5",
      testDate: new Date("2024-01-05")
    },
    documents: [
      {
        name: "Resume",
        url: "https://example.com/resume.pdf",
        type: "resume",
        uploadDate: new Date("2024-01-10"),
        status: "approved"
      },
      {
        name: "Work Experience Letters",
        url: "https://example.com/experience.pdf",
        type: "recommendation",
        uploadDate: new Date("2024-01-10"),
        status: "approved"
      }
    ],
    notes: [
      {
        content: "Work visa requirements checked",
        author: "Visa Officer",
        createdAt: new Date("2024-01-25")
      }
    ],
    timeline: [
      {
        title: "Document Verification",
        description: "All required documents verified",
        status: "completed",
        date: new Date("2024-01-20"),
        updatedBy: "Document Officer"
      }
    ],
    progress: 75,
    submissionDate: new Date("2024-01-10"),
    assignedTo: "advisor2",
    reviewedBy: "reviewer2",
    reviewDate: new Date("2024-01-25"),
    decisionDate: null,
    decisionNotes: "",
    internalNotes: "Strong work experience profile",
    tags: ["work-visa", "experienced"]
  }
];

export default mockApplications; 