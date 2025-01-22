export const AGENT_STATUS = {
  active: {
    label: "Active",
    color: "success",
    textColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  inactive: {
    label: "Inactive",
    color: "secondary",
    textColor: "text-gray-500",
    bgColor: "bg-gray-50",
  },
  suspended: {
    label: "Suspended",
    color: "destructive",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
  },
};

export const LEAD_STATUS = {
  new: {
    label: "New",
    color: "default",
    textColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  inProgress: {
    label: "In Progress",
    color: "warning",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  completed: {
    label: "Completed",
    color: "success",
    textColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  cancelled: {
    label: "Cancelled",
    color: "destructive",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
  },
};

export const COMMISSION_STATUS = {
  pending: {
    label: "Pending",
    color: "warning",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  approved: {
    label: "Approved",
    color: "success",
    textColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  paid: {
    label: "Paid",
    color: "default",
    textColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  rejected: {
    label: "Rejected",
    color: "destructive",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
  },
};

export function getStatusConfig(status, type = "agent") {
  const statusMap = {
    agent: AGENT_STATUS,
    lead: LEAD_STATUS,
    commission: COMMISSION_STATUS,
  };

  const config = statusMap[type]?.[status] || {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    color: "default",
    textColor: "text-gray-500",
    bgColor: "bg-gray-50",
  };

  return config;
} 