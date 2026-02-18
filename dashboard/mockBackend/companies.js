// ============================================
// MOCK COMPANIES API HANDLERS
// ============================================

import { db } from "./database.js";
import { authHandlers } from "./auth.js";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const companyHandlers = {
  // GET /{role}/companies
  getCompanies: async (token, role) => {
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

  // POST /{role}/companies/step1
  createCompanyStepOne: async (token, role, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const company = db.create("companies", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      status: "active",
      ...data,
    });

    return {
      status: 201,
      data: {
        success: true,
        message: "Company created successfully",
        data: {
          company: company,
        },
      },
    };
  },

  // PUT /{role}/companies/{companyId}/step2
  createCompanyStepTwo: async (token, role, companyId, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const company = db.update("companies", companyId, data);
    if (!company) {
      return {
        status: 404,
        data: { success: false, message: "Company not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Company updated successfully",
        data: {
          company: company,
        },
      },
    };
  },

  // PUT /{role}/companies/{companyId}/step3
  createCompanyStepThree: async (token, role, companyId, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const company = db.update("companies", companyId, data);
    if (!company) {
      return {
        status: 404,
        data: { success: false, message: "Company not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Company updated successfully",
        data: {
          company: company,
        },
      },
    };
  },

  // PUT /{role}/companies/{companyId}
  updateCompany: async (token, role, companyId, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const company = db.update("companies", companyId, data);
    if (!company) {
      return {
        status: 404,
        data: { success: false, message: "Company not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Company updated successfully",
        data: {
          company: company,
        },
      },
    };
  },

  // DELETE /{role}/companies/{companyId}
  deleteCompany: async (token, role, companyId) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const deleted = db.delete("companies", companyId);
    if (!deleted) {
      return {
        status: 404,
        data: { success: false, message: "Company not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Company deleted successfully",
      },
    };
  },
};






