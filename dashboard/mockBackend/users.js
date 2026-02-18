// ============================================
// MOCK USERS API HANDLERS
// ============================================

import { db } from "./database.js";
import { authHandlers } from "./auth.js";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const userHandlers = {
  // GET /{role}/users
  getAllUsers: async (token, role) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const users = db.findAll("users");
    
    return {
      status: 200,
      data: {
        success: true,
        data: {
          users: users,
        },
      },
    };
  },

  // POST /{role}/users
  createUser: async (token, role, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const user = db.create("users", {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      role: data.role,
      isActive: data.isActive !== undefined ? data.isActive : true,
      companyLinks: data.companyLinks || [],
    });

    return {
      status: 201,
      data: {
        success: true,
        message: "User created successfully",
        data: {
          user: user,
        },
      },
    };
  },

  // PUT /{role}/users/{userId}
  updateUser: async (token, role, userId, data) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const user = db.update("users", userId, data);
    if (!user) {
      return {
        status: 404,
        data: { success: false, message: "User not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "User updated successfully",
        data: {
          user: user,
        },
      },
    };
  },

  // DELETE /{role}/users/{userId}
  deleteUser: async (token, role, userId) => {
    await delay();
    
    const auth = authHandlers.verifyToken(token);
    if (!auth.valid) {
      return { status: 401, data: { success: false, message: "Unauthorized" } };
    }

    const deleted = db.delete("users", userId);
    if (!deleted) {
      return {
        status: 404,
        data: { success: false, message: "User not found" },
      };
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "User deleted successfully",
      },
    };
  },
};






