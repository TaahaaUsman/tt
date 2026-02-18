import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import axios from "axios";
import { API_END_POINTS } from "../ApiEndpoints";

// ========================
// Initial State - Mock data for development without backend
// ========================
const initialState = {
  isLoading: false,
  first_name: "John",
  last_name: "Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  user_id: "mock-user-id-123",
  role: "superadmin", // Can be changed to "healthcoaches" or "admin" for testing different views
  token: "mock-token-12345",
  isActive: true,
  isError: false,
  errorMessage: null,
};

// ========================
// Async Thunk for Login
// ========================
export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_END_POINTS.login, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message ||
            error.response.data.error ||
            "Something went wrong"
        );
      } else {
        return rejectWithValue("Something went wrong");
      }
    }
  }
);

// ========================
// Async Thunk for Logout
// ========================
export const logoutApi = createAsyncThunk(
  "auth/logoutApi",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_END_POINTS.logout,
        {}, // no body needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Even if API fails, we still want to logout locally
      if (error.response) {
        return { success: true, message: "Logout successful" };
      } else {
        return { success: true, message: "Logout successful" };
      }
    }
  }
);

// ========================
// Slice
// ========================
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to initialize mock auth data (useful for development)
    initializeMockAuth: (state) => {
      if (!state.role || !state.token) {
        return initialState;
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== REHYDRATE - Ensure mock data if persisted state is empty =====
      .addCase(REHYDRATE, (state, action) => {
        const persistedAuth = action.payload?.auth;
        // If persisted state doesn't have role or token, use mock data
        if (!persistedAuth?.role || !persistedAuth?.token) {
          return initialState;
        }
        // Otherwise merge persisted state with current state
        return {
          ...state,
          ...persistedAuth,
        };
      })
      // ===== LOGIN REQUEST =====
      .addCase(loginApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = action.payload?.data?.user;
        const tokens = action.payload?.data?.tokens;

        state.first_name = user?.firstName || null;
        state.last_name = user?.lastName || null;
        state.username = user?.username || null;
        state.email = user?.email || null;
        state.user_id = user?.id || null;
        state.role = user?.role || null;
        state.token = tokens?.accessToken || null;
        state.isActive = user?.isActive || false;
        state.isError = false;

        if (tokens?.accessToken) {
          localStorage.setItem("token", tokens.accessToken);
          localStorage.setItem("loginTime", Date.now().toString());
        }
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Login failed";
      })

      // ===== LOGOUT REQUEST =====
      .addCase(logoutApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutApi.fulfilled, (state) => {
        state.isLoading = false;
        state.first_name = null;
        state.last_name = null;
        state.username = null;
        state.email = null;
        state.user_id = null;
        state.role = null;
        state.token = null;
        state.isActive = false;
        state.isError = false;
        state.errorMessage = null;

        localStorage.removeItem("token");
        localStorage.removeItem("loginTime");
      })
      .addCase(logoutApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Logout failed";
      });
  },
});

// ========================
// Export Actions & Reducer
// ========================
export const { logout, initializeMockAuth } = authSlice.actions;
export default authSlice.reducer;
