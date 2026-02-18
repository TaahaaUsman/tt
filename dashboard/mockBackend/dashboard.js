// ============================================
// MOCK DASHBOARD API HANDLERS
// ============================================

import { db } from "./database.js";
import { authHandlers } from "./auth.js";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardHandlers = {
  // GET /dashboard/stats
  getDashboardStats: async (token) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const stats = db.data.dashboardStats || {
      totalEncounters: 1250,
      totalParticipants: 342,
      totalCompanies: db.findAll("companies").length,
      activeUsers: db.findAll("users", (u) => u.isActive).length,
      completedEncounters: 980,
      pendingEncounters: 270,
    };

    return {
      status: 200,
      data: {
        success: true,
        data: {
          stats: stats,
        },
      },
    };
  },

  // GET /dashboard/stats/detailed
  getDetailedStats: async (token) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const detailedStats = {
      encountersByMonth: [
        { month: "Jan", count: 120 },
        { month: "Feb", count: 145 },
        { month: "Mar", count: 130 },
        { month: "Apr", count: 160 },
        { month: "May", count: 175 },
        { month: "Jun", count: 190 },
      ],
      participantsByStatus: {
        active: db.findAll("participants", (p) => p.status === "active").length,
        inactive: db.findAll("participants", (p) => p.status === "inactive").length,
      },
      riskDistribution: {
        low: 45,
        medium: 120,
        high: 77,
      },
    };

    return {
      status: 200,
      data: {
        success: true,
        data: {
          detailedStats: detailedStats,
        },
      },
    };
  },
};






