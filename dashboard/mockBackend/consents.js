// ============================================
// MOCK CONSENTS API HANDLERS
// ============================================

import { db } from "./database.js";
import { authHandlers } from "./auth.js";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const consentHandlers = {
  // GET /{role}/consents/companies
  getConsentCompanies: async (token, role) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const companies = db.findAll("companies");
    
    return {
      status: 200,
      data: {
        success: true,
        data: {
          companies: companies,
        },
      },
    };
  },

  // GET /{role}/consents
  getAllConsents: async (token, role) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const consents = db.findAll("consents");
    
    return {
      status: 200,
      data: {
        success: true,
        data: {
          consents: consents,
        },
      },
    };
  },

  // POST /{role}/consents
  createConsent: async (token, role, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    // Get company name
    const company = db.find("companies", data.companyId);
    const companyName = company ? company.name : "Unknown Company";

    const consent = db.create("consents", {
      ...data,
      companyName: companyName,
      isActive: true,
    });

    return {
      status: 201,
      data: {
        success: true,
        message: "Consent created successfully",
        data: {
          consent: consent,
        },
      },
    };
  },

  // PUT /{role}/consents/{consentId}
  updateConsent: async (token, role, consentId, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const consent = db.update("consents", consentId, data);
    if (!consent) {
      return {
        status: 404,
        data: { success: false, message: "Consent not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Consent updated successfully",
        data: {
          consent: consent,
        },
      },
    };
  },

  // DELETE /{role}/consents/{consentId}
  deleteConsent: async (token, role, consentId) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const deleted = db.delete("consents", consentId);
    if (!deleted) {
      return {
        status: 404,
        data: { success: false, message: "Consent not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Consent deleted successfully",
      },
    };
  },
};






