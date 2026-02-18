// ============================================
// MOCK DATABASE - In-Memory Data Storage
// ============================================
// This simulates a database with in-memory storage
// All data persists during the session but resets on page refresh

class MockDatabase {
  constructor() {
    this.data = {
      users: [],
      companies: [],
      news: [],
      consents: [],
      participants: [],
      dashboardStats: null,
      sessions: new Map(), // For tracking active sessions
    };
    this.initializeDefaultData();
  }

  initializeDefaultData() {
    // Initialize with default mock data
    this.data.companies = [
      {
        id: "comp-1",
        name: "Acme Corporation",
        email: "contact@acme.com",
        phone: "+1-555-0101",
        address: "123 Business St, New York, NY 10001",
        status: "active",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15",
      },
      {
        id: "comp-2",
        name: "Tech Solutions Inc",
        email: "info@techsolutions.com",
        phone: "+1-555-0102",
        address: "456 Innovation Ave, San Francisco, CA 94102",
        status: "active",
        createdAt: "2024-02-20",
        updatedAt: "2024-02-20",
      },
      {
        id: "comp-3",
        name: "HealthCare Partners",
        email: "support@healthcarepartners.com",
        phone: "+1-555-0103",
        address: "789 Medical Blvd, Chicago, IL 60601",
        status: "active",
        createdAt: "2024-03-10",
        updatedAt: "2024-03-10",
      },
    ];

    this.data.news = [
      {
        id: "news-1",
        title: "New Wellness Program Launched",
        description: "We're excited to announce our new comprehensive wellness program.",
        content: "This program includes health screenings, fitness tracking, and mental health support.",
        companyId: "comp-1",
        companyName: "Acme Corporation",
        createdAt: "2024-06-01",
        updatedAt: "2024-06-01",
        isActive: true,
      },
      {
        id: "news-2",
        title: "Quarterly Health Report Available",
        description: "The Q2 health report is now available for all participants.",
        content: "Review your health metrics and progress in the dashboard.",
        companyId: "comp-2",
        companyName: "Tech Solutions Inc",
        createdAt: "2024-06-15",
        updatedAt: "2024-06-15",
        isActive: true,
      },
    ];

    this.data.consents = [
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
    ];

    this.data.users = [
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
    ];

    this.data.participants = [
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
    ];

    this.data.dashboardStats = {
      totalEncounters: 1250,
      totalParticipants: 342,
      totalCompanies: 15,
      activeUsers: 28,
      completedEncounters: 980,
      pendingEncounters: 270,
    };
  }

  // Generic CRUD operations
  find(collection, id) {
    return this.data[collection]?.find((item) => item.id === id);
  }

  findAll(collection, filter = null) {
    let items = this.data[collection] || [];
    if (filter) {
      items = items.filter(filter);
    }
    return items;
  }

  create(collection, item) {
    const newItem = {
      ...item,
      id: item.id || `${collection}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data[collection].push(newItem);
    return newItem;
  }

  update(collection, id, updates) {
    const index = this.data[collection].findIndex((item) => item.id === id);
    if (index === -1) return null;
    
    this.data[collection][index] = {
      ...this.data[collection][index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.data[collection][index];
  }

  delete(collection, id) {
    const index = this.data[collection].findIndex((item) => item.id === id);
    if (index === -1) return false;
    
    this.data[collection].splice(index, 1);
    return true;
  }

  // Session management
  createSession(token, userData) {
    this.data.sessions.set(token, {
      user: userData,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
    });
  }

  getSession(token) {
    const session = this.data.sessions.get(token);
    if (!session) return null;
    
    // Check if session expired
    if (new Date(session.expiresAt) < new Date()) {
      this.data.sessions.delete(token);
      return null;
    }
    
    return session;
  }

  deleteSession(token) {
    return this.data.sessions.delete(token);
  }
}

// Export singleton instance
export const db = new MockDatabase();






