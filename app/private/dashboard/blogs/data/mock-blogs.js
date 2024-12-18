export const mockBlogs = [
  {
    _id: "1",
    title: "How to Choose the Right University Abroad",
    slug: "how-to-choose-right-university-abroad",
    excerpt: "A comprehensive guide to selecting the perfect university for your study abroad journey.",
    content: "<h1>How to Choose the Right University Abroad</h1><p>Choosing the right university abroad is a crucial decision...</p>",
    category: "Study Abroad Guide",
    status: "published",
    views: 1500,
    likeCount: 45,
    commentCount: 12,
    createdAt: "2024-03-15",
    author: {
      name: "John Doe",
      email: "john@example.com"
    },
    tags: ["university selection", "study abroad", "education"],
    featured: true
  },
  {
    _id: "2",
    title: "Student Life in London: A First-Hand Experience",
    slug: "student-life-london-first-hand-experience",
    excerpt: "Get insights into what it's like to study and live in London as an international student.",
    content: "<h1>Student Life in London</h1><p>Living in London as a student is an exciting adventure...</p>",
    category: "Student Reviews",
    status: "published",
    views: 1200,
    likeCount: 38,
    commentCount: 8,
    createdAt: "2024-03-14",
    author: {
      name: "Sarah Smith",
      email: "sarah@example.com"
    },
    tags: ["london", "student life", "international student"],
    featured: false
  },
  {
    _id: "3",
    title: "Top Scholarships for International Students 2024",
    slug: "top-scholarships-international-students-2024",
    excerpt: "Discover the best scholarship opportunities available for international students in 2024.",
    content: "<h1>Top Scholarships 2024</h1><p>Finding the right scholarship can make your study abroad dreams...</p>",
    category: "Scholarships",
    status: "draft",
    views: 0,
    likeCount: 0,
    commentCount: 0,
    createdAt: "2024-03-13",
    author: {
      name: "Mike Johnson",
      email: "mike@example.com"
    },
    tags: ["scholarships", "funding", "international education"],
    featured: false
  },
  {
    _id: "4",
    title: "Guide to Student Visa Application",
    slug: "guide-student-visa-application",
    excerpt: "Step-by-step guide to successfully applying for your student visa.",
    content: "<h1>Student Visa Application Guide</h1><p>The visa application process can seem daunting...</p>",
    category: "Visa Guide",
    status: "published",
    views: 2500,
    likeCount: 75,
    commentCount: 20,
    createdAt: "2024-03-12",
    author: {
      name: "Emma Wilson",
      email: "emma@example.com"
    },
    tags: ["visa", "immigration", "study permit"],
    featured: true
  },
  {
    _id: "5",
    title: "10 Must-Visit Places for Students in Paris",
    slug: "10-must-visit-places-students-paris",
    excerpt: "Explore the best spots in Paris that every international student should visit.",
    content: "<h1>Must-Visit Places in Paris</h1><p>Paris offers countless attractions for students...</p>",
    category: "Travel Tips",
    status: "archived",
    views: 800,
    likeCount: 25,
    commentCount: 5,
    createdAt: "2024-03-10",
    author: {
      name: "Alex Brown",
      email: "alex@example.com"
    },
    tags: ["paris", "travel", "student life"],
    featured: false
  }
];

export const blogStats = {
  totalBlogs: 150,
  publishedBlogs: 120,
  draftBlogs: 25,
  archivedBlogs: 5,
  totalViews: 25000,
  totalLikes: 1200,
  totalComments: 450,
  categoryBreakdown: [
    { category: "Study Abroad Guide", count: 45 },
    { category: "Student Reviews", count: 30 },
    { category: "Travel Tips", count: 25 },
    { category: "Events & Updates", count: 20 },
    { category: "FAQs", count: 15 },
    { category: "Scholarships", count: 10 },
    { category: "Visa Guide", count: 5 }
  ]
}; 