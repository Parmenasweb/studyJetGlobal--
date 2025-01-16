import connectDB from "@/lib/db";
import Partner from "@/models/Partner";

function serializeData(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export async function getPartners(query = {}) {
  try {
    await connectDB();

    const {
      page = 1,
      limit = 10,
      type,
      status,
      search,
    } = query;

    const skip = (page - 1) * limit;

    // Build query
    const queryObj = {};
    if (type) queryObj.type = type;
    if (status) queryObj.status = status;
    if (search) {
      queryObj.$or = [
        { name: { $regex: search, $options: "i" } },
        { "contactPersons.name": { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query with pagination
    const [partners, total] = await Promise.all([
      Partner.find(queryObj)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Partner.countDocuments(queryObj),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    // Serialize the data to remove Mongoose-specific properties
    return {
      partners: serializeData(partners),
      pagination: {
        total,
        page: Number(page),
        totalPages,
        hasMore,
      },
    };
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
}

export async function getPartner(id) {
  try {
    await connectDB();
    
    const partner = await Partner.findById(id).lean();

    if (!partner) {
      throw new Error("Partner not found");
    }

    return serializeData(partner);
  } catch (error) {
    console.error("Error fetching partner:", error);
    throw error;
  }
}

export async function createPartner(data) {
  try {
    await connectDB();

    // Check if partner with same email exists
    const existingPartner = await Partner.findOne({ email: data.email });
    if (existingPartner) {
      throw new Error("A partner with this email already exists");
    }

    const partner = new Partner(data);
    await partner.save();

    return partner;
  } catch (error) {
    console.error("Error creating partner:", error);
    throw error;
  }
}

export async function updatePartner(id, data) {
  try {
    await connectDB();

    // Check if partner exists
    const partner = await Partner.findById(id);
    if (!partner) {
      throw new Error("Partner not found");
    }

    // Check if email is being changed and if it's already in use
    if (data.email && data.email !== partner.email) {
      const existingPartner = await Partner.findOne({ email: data.email });
      if (existingPartner) {
        throw new Error("A partner with this email already exists");
      }
    }

    // Update partner
    Object.assign(partner, data);
    await partner.save();

    return partner;
  } catch (error) {
    console.error("Error updating partner:", error);
    throw error;
  }
}

export async function deletePartner(id) {
  try {
    await connectDB();

    const partner = await Partner.findById(id);
    if (!partner) {
      throw new Error("Partner not found");
    }

    // Check if partner has referred students
    if (partner.referredStudents?.length > 0) {
      throw new Error("Cannot delete partner with referred students");
    }

    await Partner.findByIdAndDelete(id);

    return { success: true };
  } catch (error) {
    console.error("Error deleting partner:", error);
    throw error;
  }
}

export async function addReferredStudent(partnerId, studentData) {
  try {
    await connectDB();

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      throw new Error("Partner not found");
    }

    // Add student to referredStudents array
    partner.referredStudents.push(studentData);
    await partner.save();

    return partner;
  } catch (error) {
    console.error("Error adding referred student:", error);
    throw error;
  }
}

export async function updateReferredStudent(partnerId, studentId, updateData) {
  try {
    await connectDB();

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      throw new Error("Partner not found");
    }

    // Find and update the referred student
    const studentIndex = partner.referredStudents.findIndex(
      (s) => s.student.toString() === studentId
    );

    if (studentIndex === -1) {
      throw new Error("Student not found in partner's referred students");
    }

    // Update student data
    partner.referredStudents[studentIndex] = {
      ...partner.referredStudents[studentIndex],
      ...updateData,
    };

    await partner.save();

    return partner;
  } catch (error) {
    console.error("Error updating referred student:", error);
    throw error;
  }
}

export async function getPartnerStats(partnerId) {
  try {
    await connectDB();

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      throw new Error("Partner not found");
    }

    const stats = {
      totalStudents: partner.metrics.totalStudents,
      activeStudents: partner.metrics.activeStudents,
      completedStudents: partner.metrics.completedStudents,
      totalCommission: partner.metrics.totalCommission,
      // Calculate monthly stats for the last 12 months
      monthlyStats: await calculateMonthlyStats(partnerId),
    };

    return stats;
  } catch (error) {
    console.error("Error getting partner stats:", error);
    throw error;
  }
}

async function calculateMonthlyStats(partnerId) {
  const partner = await Partner.findById(partnerId);
  const now = new Date();
  const monthlyStats = [];

  // Get last 12 months
  for (let i = 0; i < 12; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

    const monthlyReferrals = partner.referredStudents.filter(
      (s) => s.referralDate >= month && s.referralDate <= nextMonth
    );

    monthlyStats.unshift({
      month: month.toISOString().slice(0, 7),
      referrals: monthlyReferrals.length,
      commission: monthlyReferrals.reduce(
        (sum, s) => sum + (s.commission?.amount || 0),
        0
      ),
    });
  }

  return monthlyStats;
} 