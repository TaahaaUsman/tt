// ============================================
// MOCK BACKEND - Main Router
// ============================================
// This file intercepts axios requests and routes them to mock handlers

import axios from "axios";
import { authHandlers } from "./auth.js";
import { companyHandlers } from "./companies.js";
import { newsHandlers } from "./news.js";
import { consentHandlers } from "./consents.js";
import { userHandlers } from "./users.js";
import { participantHandlers } from "./participants.js";
import { dashboardHandlers } from "./dashboard.js";

// Check if mock backend should be enabled
export const isMockBackendEnabled = () => {
  return (
    import.meta.env.VITE_USE_MOCK_BACKEND === "true" ||
    !import.meta.env.VITE_BASE_URL ||
    import.meta.env.VITE_BASE_URL.includes("localhost")
  );
};

// Extract token from request headers
const getTokenFromHeaders = (headers) => {
  const authHeader = headers?.Authorization || headers?.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
};

// Extract role from URL
const extractRoleFromUrl = (url) => {
  if (url.includes("/super-admin/")) return "super-admin";
  if (url.includes("/admin/")) return "admin";
  if (url.includes("/health-coaches/")) return "health-coaches";
  return null;
};

// Extract ID from URL (e.g., /users/123 -> 123)
const extractIdFromUrl = (url, prefix) => {
  const regex = new RegExp(`${prefix}/([^/]+)`);
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Main router function
export const mockBackendRouter = async (config) => {
  const { method, url, data, headers } = config;
  const token = getTokenFromHeaders(headers);
  const role = extractRoleFromUrl(url);

  // Extract the path from full URL (remove base URL)
  const baseUrl = import.meta.env.VITE_BASE_URL || "";
  const path = url.replace(baseUrl, "").replace("http://mock-backend.local/", "");

  try {
    let response;

    // Auth endpoints - check both path and full URL
    const isLogin = path.includes("/auth/login") || url.includes("/auth/login") || url.endsWith("auth/login");
    const isLogout = path.includes("/auth/logout") || url.includes("/auth/logout") || url.endsWith("auth/logout");
    
    if (isLogin && method === "POST") {
      console.log("🔐 Mock Backend: Handling login request", data);
      response = await authHandlers.login(data);
      console.log("🔐 Mock Backend: Login response", response);
    } else if (isLogout && method === "POST") {
      console.log("🔐 Mock Backend: Handling logout request", token);
      response = await authHandlers.logout(token);
      console.log("🔐 Mock Backend: Logout response", response);
    }

    // Dashboard endpoints
    else if (url.includes("/dashboard/stats/detailed")) {
      response = await dashboardHandlers.getDetailedStats(token);
    } else if (url.includes("/dashboard/stats")) {
      response = await dashboardHandlers.getDashboardStats(token);
    }

    // Company endpoints
    else if (url.includes("/companies/step1") && method === "POST") {
      response = await companyHandlers.createCompanyStepOne(token, role, data);
    } else if (url.includes("/companies/step2") && method === "PUT") {
      const companyId = extractIdFromUrl(url, "/companies");
      response = await companyHandlers.createCompanyStepTwo(token, role, companyId, data);
    } else if (url.includes("/companies/step3") && method === "PUT") {
      const companyId = extractIdFromUrl(url, "/companies");
      response = await companyHandlers.createCompanyStepThree(token, role, companyId, data);
    } else if (url.includes("/companies") && method === "GET") {
      response = await companyHandlers.getCompanies(token, role);
    } else if (url.includes("/companies") && method === "PUT") {
      const companyId = extractIdFromUrl(url, "/companies");
      response = await companyHandlers.updateCompany(token, role, companyId, data);
    } else if (url.includes("/companies") && method === "DELETE") {
      const companyId = extractIdFromUrl(url, "/companies");
      response = await companyHandlers.deleteCompany(token, role, companyId);
    }

    // News endpoints
    else if (url.includes("/news/getAll") && method === "GET") {
      response = await newsHandlers.getAllNews(token, role);
    } else if (url.includes("/news?companyId=") && method === "GET") {
      const companyId = new URLSearchParams(url.split("?")[1]).get("companyId");
      response = await newsHandlers.getCompanyNews(token, role, companyId);
    } else if (url.includes("/news") && method === "POST") {
      response = await newsHandlers.createNews(token, role, data);
    } else if (url.includes("/news") && method === "PUT") {
      const newsId = extractIdFromUrl(url, "/news");
      response = await newsHandlers.updateNews(token, role, newsId, data);
    } else if (url.includes("/news") && method === "DELETE") {
      const newsId = extractIdFromUrl(url, "/news");
      response = await newsHandlers.deleteNews(token, role, newsId);
    }

    // Consent endpoints
    else if (url.includes("/consents/companies") && method === "GET") {
      response = await consentHandlers.getConsentCompanies(token, role);
    } else if (url.includes("/consents") && method === "GET") {
      response = await consentHandlers.getAllConsents(token, role);
    } else if (url.includes("/consents") && method === "POST") {
      response = await consentHandlers.createConsent(token, role, data);
    } else if (url.includes("/consents") && method === "PUT") {
      const consentId = extractIdFromUrl(url, "/consents");
      response = await consentHandlers.updateConsent(token, role, consentId, data);
    } else if (url.includes("/consents") && method === "DELETE") {
      const consentId = extractIdFromUrl(url, "/consents");
      response = await consentHandlers.deleteConsent(token, role, consentId);
    }

    // User endpoints
    else if (url.includes("/users") && method === "GET") {
      response = await userHandlers.getAllUsers(token, role);
    } else if (url.includes("/users") && method === "POST") {
      response = await userHandlers.createUser(token, role, data);
    } else if (url.includes("/users") && method === "PUT") {
      const userId = extractIdFromUrl(url, "/users");
      response = await userHandlers.updateUser(token, role, userId, data);
    } else if (url.includes("/users") && method === "DELETE") {
      const userId = extractIdFromUrl(url, "/users");
      response = await userHandlers.deleteUser(token, role, userId);
    }

    // Participant endpoints
    else if (url.includes("/participants/form-data") && method === "GET") {
      response = await participantHandlers.getParticipantFormData(token, role);
    } else if (url.includes("/participants") && method === "GET") {
      response = await participantHandlers.getAllParticipants(token, role);
    } else if (url.includes("/participants") && method === "POST") {
      response = await participantHandlers.createParticipant(token, role, data);
    } else if (url.includes("/participants") && method === "PUT") {
      const participantId = extractIdFromUrl(url, "/participants");
      response = await participantHandlers.updateParticipant(token, role, participantId, data);
    } else if (url.includes("/participants") && method === "DELETE") {
      const participantId = extractIdFromUrl(url, "/participants");
      response = await participantHandlers.deleteParticipant(token, role, participantId);
    }

    // Default: endpoint not found
    else {
      response = {
        status: 404,
        data: {
          success: false,
          message: `Mock endpoint not found: ${method} ${url}`,
        },
      };
    }

    // Return axios-compatible response
    return {
      data: response.data,
      status: response.status,
      statusText: response.status >= 200 && response.status < 300 ? "OK" : "Error",
      headers: {},
      config,
    };
  } catch (error) {
    // Return error response
    return {
      data: {
        success: false,
        message: error.message || "Internal server error",
      },
      status: 500,
      statusText: "Internal Server Error",
      headers: {},
      config,
    };
  }
};

// Setup axios interceptor
export const setupMockBackend = () => {
  if (!isMockBackendEnabled()) {
    console.log("Mock backend is disabled. Using real API.");
    return;
  }

  console.log("🚀 Mock Backend Enabled - All API calls will be intercepted");

  // Request interceptor - mark requests for mocking
  axios.interceptors.request.use(
    (config) => {
      const baseUrl = import.meta.env.VITE_BASE_URL || "";
      
      // Mark requests that should be mocked
      if (!baseUrl || (config.url && config.url.startsWith(baseUrl))) {
        config._useMockBackend = true;
        // Change URL to prevent real request (will fail gracefully)
        config.url = config.url.replace(baseUrl, "http://mock-backend.local/");
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle mock responses
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      
      // If this was marked for mock backend, handle it
      if (config && config._useMockBackend && !config._mockHandled) {
        config._mockHandled = true;
        
        try {
          // Restore original URL for routing
          const originalUrl = config.url.replace("http://mock-backend.local/", import.meta.env.VITE_BASE_URL || "");
          const mockConfig = { ...config, url: originalUrl };
          
          const mockResponse = await mockBackendRouter(mockConfig);
          
          // Return success response
          if (mockResponse.status >= 200 && mockResponse.status < 300) {
            return Promise.resolve(mockResponse);
          }
          
          // Return error response
          return Promise.reject({
            response: mockResponse,
            message: mockResponse.data?.message || "Request failed",
          });
        } catch (mockError) {
          return Promise.reject(mockError);
        }
      }

      // For real errors, pass through
      return Promise.reject(error);
    }
  );
};

