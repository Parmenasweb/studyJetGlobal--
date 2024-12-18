export const mockApplications = [
  {
    _id: "1",
    clientId: {
      _id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
    },
    applicationType: "study",
    status: "processing",
    destination: "Canada",
    submissionDate: new Date("2024-03-01"),
    studyDetails: {
      university: "University of Toronto",
      course: "Computer Science",
      programLevel: "undergraduate",
      startDate: new Date("2024-09-01"),
      tuitionFee: 35000,
      scholarshipAmount: 5000,
    },
    documents: [
      {
        _id: "d1",
        name: "Passport.pdf",
        url: "/uploads/passport.pdf",
        uploadDate: new Date("2024-03-01"),
        status: "approved",
      },
      {
        _id: "d2",
        name: "Transcripts.pdf",
        url: "/uploads/transcripts.pdf",
        uploadDate: new Date("2024-03-02"),
        status: "pending",
      },
    ],
    notes: [
      {
        _id: "n1",
        content: "Initial application review completed",
        author: "advisor@example.com",
        createdAt: new Date("2024-03-01"),
      },
      {
        _id: "n2",
        content: "Additional documents requested",
        author: "advisor@example.com",
        createdAt: new Date("2024-03-02"),
      },
    ],
    timeline: [
      {
        status: "draft",
        date: new Date("2024-03-01"),
        description: "Application created",
        updatedBy: "john.smith@example.com",
      },
      {
        status: "submitted",
        date: new Date("2024-03-02"),
        description: "Application submitted for review",
        updatedBy: "john.smith@example.com",
      },
      {
        status: "processing",
        date: new Date("2024-03-03"),
        description: "Application under review",
        updatedBy: "advisor@example.com",
      },
    ],
  },
  {
    _id: "2",
    clientId: {
      _id: "2",
      name: "Emma Wilson",
      email: "emma.w@example.com",
    },
    applicationType: "work",
    status: "approved",
    destination: "Australia",
    submissionDate: new Date("2024-02-15"),
    workDetails: {
      company: "Tech Solutions Ltd",
      position: "Software Engineer",
      salary: 95000,
      contractDuration: "2 years",
      visaType: "TSS 482",
    },
    documents: [
      {
        _id: "d3",
        name: "Resume.pdf",
        url: "/uploads/resume.pdf",
        uploadDate: new Date("2024-02-15"),
        status: "approved",
      },
      {
        _id: "d4",
        name: "Offer Letter.pdf",
        url: "/uploads/offer-letter.pdf",
        uploadDate: new Date("2024-02-16"),
        status: "approved",
      },
    ],
    notes: [
      {
        _id: "n3",
        content: "All required documents received",
        author: "advisor@example.com",
        createdAt: new Date("2024-02-15"),
      },
      {
        _id: "n4",
        content: "Visa application approved",
        author: "advisor@example.com",
        createdAt: new Date("2024-03-01"),
      },
    ],
    timeline: [
      {
        status: "submitted",
        date: new Date("2024-02-15"),
        description: "Application submitted",
        updatedBy: "emma.w@example.com",
      },
      {
        status: "processing",
        date: new Date("2024-02-20"),
        description: "Application under review",
        updatedBy: "advisor@example.com",
      },
      {
        status: "approved",
        date: new Date("2024-03-01"),
        description: "Application approved",
        updatedBy: "advisor@example.com",
      },
    ],
  },
];

export default mockApplications; 