import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS_FOR_DASHBOARDSTATS } from "../ApiEndpoints";
import { mockDashboardStats, mockDetailedStats, shouldUseMockData, mockApiDelay } from "../../utils/mockData";

// Auth headers
const getAuthHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// ---------- THUNKS ----------

// Basic stats
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { getState, rejectWithValue }) => {
    // Use mock data if backend is unavailable
    if (shouldUseMockData()) {
      await mockApiDelay();
      return mockDashboardStats;
    }

    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const res = await axios.get(
        API_ENDPOINTS_FOR_DASHBOARDSTATS.getDashboardStats,
        getAuthHeaders(token)
      );
      return res.data;
    } catch (err) {
      // Return mock data on error instead of rejecting
      console.warn("API call failed, using mock data:", err.message);
      await mockApiDelay();
      return mockDashboardStats;
    }
  }
);

// Detailed stats
export const fetchDetailedStats = createAsyncThunk(
  "dashboard/fetchDetailedStats",
  async (_, { getState, rejectWithValue }) => {
    // Use mock data if backend is unavailable
    if (shouldUseMockData()) {
      await mockApiDelay();
      return mockDetailedStats;
    }

    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const res = await axios.get(
        API_ENDPOINTS_FOR_DASHBOARDSTATS.getDetailedStats,
        getAuthHeaders(token)
      );
      return res.data;
    } catch (err) {
      // Return mock data on error instead of rejecting
      console.warn("API call failed, using mock data:", err.message);
      await mockApiDelay();
      return mockDetailedStats;
    }
  }
);

// ---------- SLICE ----------

const initialState = {
  stats: null,
  detailedStats: null,
  loading: false,
  error: null,
};

const dashboardStatsSlice = createSlice({
  name: "dashboardStats",
  initialState,
  reducers: {
    clearDashboardStats: (state) => {
      state.stats = null;
      state.detailedStats = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Basic stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Detailed stats
      .addCase(fetchDetailedStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailedStats.fulfilled, (state, action) => {
        state.loading = false;
        state.detailedStats = action.payload;
      })
      .addCase(fetchDetailedStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboardStats } = dashboardStatsSlice.actions;
export default dashboardStatsSlice.reducer;
