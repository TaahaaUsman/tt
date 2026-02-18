// ============================================
// MOCK DATA FOR DEVELOPMENT WITHOUT BACKEND
// ============================================
// This file contains mock data that will be used when backend is unavailable
// or when API calls fail. This allows components to render and be tested.

// Mock Dashboard Stats
export const mockDashboardStats = {
  success: true,
  data: {
    stats: {
      totalEncounters: 1250,
      totalParticipants: 342,
      totalCompanies: 15,
      activeUsers: 28,
      completedEncounters: 980,
      pendingEncounters: 270,
    },
  },
};

export const mockDetailedStats = {
  success: true,
  data: {
    detailedStats: {
      encountersByMonth: [
        { month: "Jan", count: 120 },
        { month: "Feb", count: 145 },
        { month: "Mar", count: 130 },
        { month: "Apr", count: 160 },
        { month: "May", count: 175 },
        { month: "Jun", count: 190 },
      ],
      participantsByStatus: {
        active: 280,
        inactive: 62,
      },
      riskDistribution: {
        low: 45,
        medium: 120,
        high: 77,
      },
    },
  },
};

// Mock Companies
export const mockCompanies = {
  success: true,
  data: {
    companies: [
      {
        id: "comp-1",
        name: "Acme Corporation",
        email: "contact@acme.com",
        phone: "+1-555-0101",
        address: "123 Business St, New York, NY 10001",
        status: "active",
        createdAt: "2024-01-15",
      },
      {
        id: "comp-2",
        name: "Tech Solutions Inc",
        email: "info@techsolutions.com",
        phone: "+1-555-0102",
        address: "456 Innovation Ave, San Francisco, CA 94102",
        status: "active",
        createdAt: "2024-02-20",
      },
      {
        id: "comp-3",
        name: "HealthCare Partners",
        email: "support@healthcarepartners.com",
        phone: "+1-555-0103",
        address: "789 Medical Blvd, Chicago, IL 60601",
        status: "active",
        createdAt: "2024-03-10",
      },
      {
        id: "comp-4",
        name: "Global Industries",
        email: "hello@globalind.com",
        phone: "+1-555-0104",
        address: "321 Corporate Dr, Houston, TX 77001",
        status: "active",
        createdAt: "2024-04-05",
      },
      {
        id: "comp-5",
        name: "Wellness Corp",
        email: "contact@wellnesscorp.com",
        phone: "+1-555-0105",
        address: "654 Wellness Way, Miami, FL 33101",
        status: "active",
        createdAt: "2024-05-12",
      },
    ],
  },
};

// Mock News & Features
export const mockNews = {
  success: true,
  data: {
    news: [
      {
        id: "news-1",
        title: "New Wellness Program Launched",
        description:
          "We're excited to announce our new comprehensive wellness program.",
        content:
          "This program includes health screenings, fitness tracking, and mental health support.",
        companyId: "comp-1",
        companyName: "Acme Corporation",
        createdAt: "2024-06-01",
        updatedAt: "2024-06-01",
        isActive: true,
      },
      {
        id: "news-2",
        title: "Quarterly Health Report Available",
        description:
          "The Q2 health report is now available for all participants.",
        content: "Review your health metrics and progress in the dashboard.",
        companyId: "comp-2",
        companyName: "Tech Solutions Inc",
        createdAt: "2024-06-15",
        updatedAt: "2024-06-15",
        isActive: true,
      },
      {
        id: "news-3",
        title: "Summer Wellness Challenge",
        description: "Join our summer wellness challenge starting next month.",
        content: "Earn points and rewards for staying active and healthy.",
        companyId: "comp-3",
        companyName: "HealthCare Partners",
        createdAt: "2024-06-20",
        updatedAt: "2024-06-20",
        isActive: true,
      },
    ],
  },
};

// Mock Consents
export const mockConsents = {
  success: true,
  data: {
    consents: [
      {
        id: "consent-1",
        title: "Health Data Consent",
        description: "Consent for collection and use of health data",
        companyId: "comp-1",
        companyName: "Acme Corporation",
        isActive: true,
        createdAt: "2024-01-20",
        updatedAt: "2024-01-20",
      },
      {
        id: "consent-2",
        title: "Medical Records Release",
        description: "Authorization to release medical records",
        companyId: "comp-2",
        companyName: "Tech Solutions Inc",
        isActive: true,
        createdAt: "2024-02-15",
        updatedAt: "2024-02-15",
      },
      {
        id: "consent-3",
        title: "Wellness Program Participation",
        description: "Consent to participate in wellness programs",
        companyId: "comp-3",
        companyName: "HealthCare Partners",
        isActive: true,
        createdAt: "2024-03-10",
        updatedAt: "2024-03-10",
      },
    ],
  },
};

// Mock Users
export const mockUsers = {
  success: true,
  data: {
    users: [
      {
        id: "user-1",
        firstName: "John",
        lastName: "Smith",
        username: "jsmith",
        email: "john.smith@example.com",
        role: "healthcoaches",
        isActive: true,
        createdAt: "2024-01-10",
        companyLinks: [
          {
            companyId: "comp-1",
            companyName: "Acme Corporation",
            title: "Health Coach",
            contactWithMessages: true,
          },
        ],
      },
      {
        id: "user-2",
        firstName: "Sarah",
        lastName: "Johnson",
        username: "sjohnson",
        email: "sarah.johnson@example.com",
        role: "admin",
        isActive: true,
        createdAt: "2024-02-05",
        companyLinks: [
          {
            companyId: "comp-2",
            companyName: "Tech Solutions Inc",
            title: "Administrator",
            contactWithMessages: true,
          },
        ],
      },
      {
        id: "user-3",
        firstName: "Michael",
        lastName: "Brown",
        username: "mbrown",
        email: "michael.brown@example.com",
        role: "healthcoaches",
        isActive: true,
        createdAt: "2024-03-15",
        companyLinks: [
          {
            companyId: "comp-3",
            companyName: "HealthCare Partners",
            title: "Senior Health Coach",
            contactWithMessages: true,
          },
        ],
      },
    ],
  },
};

// Mock Participants
export const mockParticipants = {
  success: true,
  data: {
    participants: [
      {
        id: "part-1",
        firstName: "Alice",
        lastName: "Williams",
        email: "alice.williams@example.com",
        phone: "+1-555-1001",
        dateOfBirth: "1985-05-15",
        companyId: "comp-1",
        companyName: "Acme Corporation",
        status: "active",
        createdAt: "2024-01-25",
      },
      {
        id: "part-2",
        firstName: "Bob",
        lastName: "Davis",
        email: "bob.davis@example.com",
        phone: "+1-555-1002",
        dateOfBirth: "1990-08-22",
        companyId: "comp-2",
        companyName: "Tech Solutions Inc",
        status: "active",
        createdAt: "2024-02-10",
      },
      {
        id: "part-3",
        firstName: "Carol",
        lastName: "Miller",
        email: "carol.miller@example.com",
        phone: "+1-555-1003",
        dateOfBirth: "1988-12-05",
        companyId: "comp-3",
        companyName: "HealthCare Partners",
        status: "active",
        createdAt: "2024-03-20",
      },
    ],
  },
};

// Helper function to check if we should use mock data
export const shouldUseMockData = () => {
  // Check if BASE_URL is set and valid, or if we're in development mode
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // Use mock data if BASE_URL is not set, is localhost with no server, or explicitly enabled
  return (
    !baseUrl ||
    baseUrl.includes("localhost") ||
    import.meta.env.VITE_USE_MOCK_DATA === "true"
  );
};

// Helper to simulate API delay
export const mockApiDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));
