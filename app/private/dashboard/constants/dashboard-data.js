import { mockDeadlines } from "../deadlines/data/mock-deadlines";
import { mockApplications } from "../applications/data/mock-applications";
import { mockClients } from "../students/data/mock-clients";
import { mockFinanceData } from "../finances/data/mock-finances";

// Calculate total applications
const totalApplications = mockApplications.length;
const activeApplications = mockApplications.filter(app => app.status === 'in_progress').length;
const completedApplications = mockApplications.filter(app => app.status === 'completed').length;

// Calculate total students
const totalStudents = mockClients.length;
const activeStudents = mockClients.filter(client => client.status === 'active').length;

// Calculate deadlines statistics
const urgentDeadlines = mockDeadlines.filter(d => d.status === 'urgent').length;
const upcomingDeadlines = mockDeadlines.filter(d => d.status === 'upcoming').length;

// Calculate financial statistics
const totalRevenue = mockFinanceData.transactions
  .filter(t => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpenses = mockFinanceData.transactions
  .filter(t => t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);

// Card data for the dashboard
export const cardData = [
  {
    title: "Total Students",
    value: totalStudents,
    description: `${activeStudents} active students`,
    type: "students",
  },
  {
    title: "Applications",
    value: totalApplications,
    description: `${activeApplications} in progress`,
    type: "applications",
  },
  {
    title: "Deadlines",
    value: urgentDeadlines + upcomingDeadlines,
    description: `${urgentDeadlines} urgent deadlines`,
    type: "deadlines",
  },
  {
    title: "Revenue",
    value: totalRevenue,
    description: `${(totalRevenue - totalExpenses).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} net income`,
    type: "revenue",
  },
];

// Monthly revenue data for the chart
export const revenueData = [
  { name: "Jan", total: 2400 },
  { name: "Feb", total: 3500 },
  { name: "Mar", total: 4200 },
  { name: "Apr", total: 3800 },
  { name: "May", total: 4600 },
  { name: "Jun", total: 5200 },
  { name: "Jul", total: 4800 },
  { name: "Aug", total: 5900 },
  { name: "Sep", total: 6100 },
  { name: "Oct", total: 5600 },
  { name: "Nov", total: 6800 },
  { name: "Dec", total: 7200 },
];

// Recent applications for the dashboard
export const recentApplications = mockApplications
  .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
  .slice(0, 5)
  .map(app => {
    const student = mockClients.find(c => c.id === app.studentId);
    return {
      id: app.id,
      name: student ? `${student.firstName} ${student.lastName}` : 'Unknown Student',
      email: student?.email || 'N/A',
      amount: app.fees || 0,
      status: app.status,
      date: app.submittedAt,
    };
  });

// Statistics for quick insights
export const statistics = {
  totalRevenue: totalRevenue,
  totalExpenses: totalExpenses,
  netIncome: totalRevenue - totalExpenses,
  applicationSuccess: Math.round((completedApplications / totalApplications) * 100),
  studentRetention: Math.round((activeStudents / totalStudents) * 100),
  deadlineCompletion: Math.round(
    (mockDeadlines.filter(d => d.status === 'completed').length / mockDeadlines.length) * 100
  ),
};

// Activity timeline data
export const activityTimeline = [
  ...mockApplications.map(app => ({
    type: 'application',
    title: app.university,
    date: app.submittedAt,
    status: app.status,
  })),
  ...mockDeadlines.map(deadline => ({
    type: 'deadline',
    title: deadline.title,
    date: deadline.date,
    status: deadline.status,
  })),
]
.sort((a, b) => new Date(b.date) - new Date(a.date))
.slice(0, 10);

// Performance metrics
export const performanceMetrics = {
  applicationProcessingTime: 14, // Average days to process applications
  visaSuccessRate: 92, // Percentage of successful visa applications
  scholarshipWinRate: 45, // Percentage of successful scholarship applications
  studentSatisfaction: 4.8, // Out of 5
};

// Top destinations based on applications
export const topDestinations = mockApplications.reduce((acc, app) => {
  const country = app.country;
  acc[country] = (acc[country] || 0) + 1;
  return acc;
}, {});

// Convert to array and sort by count
export const destinationStats = Object.entries(topDestinations)
  .map(([country, count]) => ({
    country,
    count,
    percentage: Math.round((count / totalApplications) * 100),
  }))
  .sort((a, b) => b.count - a.count); 