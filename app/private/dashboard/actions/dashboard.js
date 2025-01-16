
import connectDB from "@/lib/db";
import Client from "@/models/Client";

export async function getDashboardData() {
  try {
    await connectDB();

    // Get all clients
    const clients = await Client.find({}).lean();

    // Calculate client statistics
    const totalClients = clients.length;
    const activeClients = clients.filter(client => client.status === "active").length;
    const leadClients = clients.filter(client => client.status === "lead").length;

    // Calculate total documents
    const totalDocuments = clients.reduce((sum, client) => 
      sum + (client.documents?.length || 0), 0);

    // Calculate total commission
    const totalCommission = clients.reduce((sum, client) => 
      sum + (client.commission || 0), 0);

    // Calculate monthly commission data
    const monthlyCommissionData = Array.from({ length: 12 }, (_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() - i);
      const monthClients = clients.filter(client => {
        const clientDate = new Date(client.createdAt);
        return clientDate.getMonth() === month.getMonth() &&
               clientDate.getFullYear() === month.getFullYear();
      });
      const monthlyCommission = monthClients.reduce((sum, client) => 
        sum + (client.commission || 0), 0);
      
      return {
        name: month.toLocaleString('default', { month: 'short' }),
        total: monthlyCommission
      };
    }).reverse();

    // Card data for the dashboard
    const cardData = [
      {
        title: "Total Students",
        value: totalClients,
        description: `${activeClients} active students`,
        type: "students",
      },
      {
        title: "Total Documents",
        value: totalDocuments,
        description: "Uploaded documents",
        type: "documents",
      },
      {
        title: "Total Commission",
        value: totalCommission,
        description: `${leadClients} potential leads`,
        type: "revenue",
      },
    ];

    return {
      cardData,
      revenueData: monthlyCommissionData,
      statistics: {
        totalClients,
        activeClients,
        leadClients,
        totalDocuments,
        totalCommission,
      }
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
} 