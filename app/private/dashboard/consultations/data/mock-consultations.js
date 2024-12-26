export const mockConsultations = [
  {
    _id: "cons1",
    consulteeName: "John Smith",
    email: "john.smith@email.com",
    contactNumber: "+1234567890",
    whatsAppNumber: "+1234567890",
    selectedDate: new Date("2024-02-15"),
    selectedTime: "10:00 AM",
    consultationType: "study",
    preferredMode: "online",
    interestedCountries: ["USA", "Canada"],
    description: "Interested in pursuing Masters in Computer Science",
    status: "pending",
    notes: [
      {
        content: "Initial consultation request received",
        author: "System",
        createdAt: new Date("2024-02-10")
      }
    ]
  },
  {
    _id: "cons2",
    consulteeName: "Emma Wilson",
    email: "emma.wilson@email.com",
    contactNumber: "+1987654321",
    whatsAppNumber: "+1987654321",
    selectedDate: new Date("2024-02-16"),
    selectedTime: "2:00 PM",
    consultationType: "work",
    preferredMode: "in-person",
    interestedCountries: ["Australia", "New Zealand"],
    description: "Looking for work opportunities in IT sector",
    status: "confirmed",
    notes: [
      {
        content: "Consultation scheduled",
        author: "Admin",
        createdAt: new Date("2024-02-11")
      }
    ]
  },
  {
    _id: "cons3",
    consulteeName: "Michael Chen",
    email: "michael.chen@email.com",
    contactNumber: "+1122334455",
    whatsAppNumber: "+1122334455",
    selectedDate: new Date("2024-02-14"),
    selectedTime: "11:30 AM",
    consultationType: "study",
    preferredMode: "online",
    interestedCountries: ["UK", "Ireland"],
    description: "Seeking information about undergraduate programs in Business",
    status: "completed",
    notes: [
      {
        content: "Consultation completed. Student interested in UK universities",
        author: "Advisor",
        createdAt: new Date("2024-02-14")
      }
    ]
  },
  {
    _id: "cons4",
    consulteeName: "Sarah Johnson",
    email: "sarah.j@email.com",
    contactNumber: "+1555666777",
    whatsAppNumber: "+1555666777",
    selectedDate: new Date("2024-02-17"),
    selectedTime: "3:30 PM",
    consultationType: "general",
    preferredMode: "online",
    interestedCountries: ["Germany", "Netherlands"],
    description: "General inquiry about study and work opportunities in Europe",
    status: "pending",
    notes: [
      {
        content: "Follow-up needed regarding visa requirements",
        author: "System",
        createdAt: new Date("2024-02-12")
      }
    ]
  },
  {
    _id: "cons5",
    consulteeName: "David Kim",
    email: "david.kim@email.com",
    contactNumber: "+1777888999",
    whatsAppNumber: "+1777888999",
    selectedDate: new Date("2024-02-18"),
    selectedTime: "1:00 PM",
    consultationType: "study",
    preferredMode: "in-person",
    interestedCountries: ["Japan", "South Korea"],
    description: "Interested in language programs and cultural exchange",
    status: "cancelled",
    notes: [
      {
        content: "Student requested cancellation due to schedule conflict",
        author: "Admin",
        createdAt: new Date("2024-02-13")
      }
    ]
  }
]; 