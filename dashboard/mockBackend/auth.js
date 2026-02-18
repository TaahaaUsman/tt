// ============================================
// MOCK AUTH API HANDLERS
// ============================================

import { db } from "./database.js";

// Mock users for authentication
const mockUsers = [
  {
    id: "user-1",
    username: "admin",
    password: "admin123", // In real app, this would be hashed
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "superadmin",
    isActive: true,
  },
  {
    id: "user-2",
    username: "healthcoach",
    password: "coach123",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "healthcoaches",
    isActive: true,
  },
  {
    id: "user-3",
    username: "admin2",
    password: "admin123",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    role: "admin",
    isActive: true,
  },
];

// Generate mock JWT token
const generateToken = (userId) => {
  return `mock-token-${userId}-${Date.now()}`;
};

export const authHandlers = {
  // POST /auth/login
  login: async (credentials) => {
    const { username, password } = credentials;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return {
        status: 401,
        data: {
          success: false,
          message: "Invalid username or password",
        },
      };
    }

    if (!user.isActive) {
      return {
        status: 403,
        data: {
          success: false,
          message: "Account is inactive",
        },
      };
    }

    // Generate token
    const token = generateToken(user.id);

    // Create session
    db.createSession(token, {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });

    return {
      status: 200,
      data: {
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
          },
          tokens: {
            accessToken: token,
            refreshToken: `refresh-${token}`,
          },
        },
      },
    };
  },

  // POST /auth/logout
  logout: async (token) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const session = db.getSession(token);
    if (session) {
      db.deleteSession(token);
    }

    return {
      status: 200,
      data: {
        success: true,
        message: "Logout successful",
      },
    };
  },

  // Verify token (used by other handlers)
  verifyToken: (token) => {
    const session = db.getSession(token);
    if (!session) {
      return {
        valid: false,
        error: "Invalid or expired token",
      };
    }
    return {
      valid: true,
      user: session.user,
    };
  },
};
