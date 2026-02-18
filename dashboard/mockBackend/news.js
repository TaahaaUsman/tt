// ============================================
// MOCK NEWS & FEATURES API HANDLERS
// ============================================

import { db } from "./database.js";
import { authHandlers } from "./auth.js";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const newsHandlers = {
  // GET /{role}/news/getAll
  getAllNews: async (token, role) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const news = db.findAll("news");
    
    return {
      status: 200,
      data: {
        success: true,
        data: {
          news: news,
        },
      },
    };
  },

  // GET /{role}/news?companyId={companyId}
  getCompanyNews: async (token, role, companyId) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const news = db.findAll("news", (item) => item.companyId === companyId);
    
    return {
      status: 200,
      data: {
        success: true,
        data: {
          news: news,
        },
      },
    };
  },

  // POST /{role}/news
  createNews: async (token, role, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    // Get company name
    const company = db.find("companies", data.companyId);
    const companyName = company ? company.name : "Unknown Company";

    const news = db.create("news", {
      ...data,
      companyName: companyName,
      isActive: true,
    });

    return {
      status: 201,
      data: {
        success: true,
        message: "News created successfully",
        data: {
          news: news,
        },
      },
    };
  },

  // PUT /{role}/news/{newsId}
  updateNews: async (token, role, newsId, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const news = db.update("news", newsId, data);
    if (!news) {
      return {
        status: 404,
        data: { success: false, message: "News not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "News updated successfully",
        data: {
          news: news,
        },
      },
    };
  },

  // DELETE /{role}/news/{newsId}
  deleteNews: async (token, role, newsId) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const deleted = db.delete("news", newsId);
    if (!deleted) {
      return {
        status: 404,
        data: { success: false, message: "News not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "News deleted successfully",
      },
    };
  },
};






