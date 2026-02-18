// ============================================
// MOCK PARTICIPANTS API HANDLERS
// ============================================

import { db } from "./database.js";
import { authHandlers } from "./auth.js";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const participantHandlers = {
  // GET /{role}/participants/form-data
  getParticipantFormData: async (token, role) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    // Return form options
    return {
      status: 200,
      data: {
        success: true,
        data: {
          companies: db.findAll("companies"),
          participantTypes: ["Adult", "Child", "Teen"],
          genders: ["Male", "Female", "Other"],
          races: ["White", "Black", "Asian", "Hispanic", "Other"],
          maritalStatuses: ["Single", "Married", "Divorced", "Widowed"],
        },
      },
    };
  },

  // GET /{role}/participants
  getAllParticipants: async (token, role) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const participants = db.findAll("participants");
    
    return {
      status: 200,
      data: {
        success: true,
        data: {
          participants: participants,
        },
      },
    };
  },

  // GET /{role}/participants/{participantId}
  getParticipantDetails: async (token, role, participantId) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const participant = db.find("participants", participantId);
    if (!participant) {
      return {
        status: 404,
        data: { success: false, message: "Participant not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        data: {
          participant: participant,
        },
      },
    };
  },

  // POST /{role}/participants
  createParticipant: async (token, role, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    // Get company name
    const company = db.find("companies", data.companyId);
    const companyName = company ? company.name : "Unknown Company";

    const participant = db.create("participants", {
      ...data,
      companyName: companyName,
      status: "active",
    });

    return {
      status: 201,
      data: {
        success: true,
        message: "Participant created successfully",
        data: {
          participant: participant,
        },
      },
    };
  },

  // PUT /{role}/participants/{participantId}
  updateParticipant: async (token, role, participantId, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const participant = db.update("participants", participantId, data);
    if (!participant) {
      return {
        status: 404,
        data: { success: false, message: "Participant not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Participant updated successfully",
        data: {
          participant: participant,
        },
      },
    };
  },

  // DELETE /{role}/participants/{participantId}
  deleteParticipant: async (token, role, participantId) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const deleted = db.delete("participants", participantId);
    if (!deleted) {
      return {
        status: 404,
        data: { success: false, message: "Participant not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Participant deleted successfully",
      },
    };
  },
};






