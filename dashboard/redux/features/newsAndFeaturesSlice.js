import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_END_POINTS } from "../ApiEndpoints";
import { mockCompanies, mockNews, shouldUseMockData, mockApiDelay } from "../../utils/mockData";


// Normalize role to match API keys (superAdmin → super-admin)
const normalizeRole = (role) => {
  if (!role) return null;
  return role.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

// Get API group for role
const apiFor = (state) => {
  const role = state.auth.role;
  const normalized = normalizeRole(role);
  
  if (!normalized || !API_END_POINTS[normalized]) {
    console.error("apiFor - Invalid role or missing API endpoints for role:", normalized);
    console.error("apiFor - Available roles:", Object.keys(API_END_POINTS));
    throw new Error(`Invalid role: ${role} (normalized: ${normalized})`);
  }
  
  return API_END_POINTS[normalized];
};

// Auth headers
const getAuthHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// Extract list safely from any API response shape
const extractArray = (payload, fallback = []) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.data && Array.isArray(payload.data)) return payload.data;
  if (payload?.data?.companies && Array.isArray(payload.data.companies))
    return payload.data.companies;
  if (payload?.data?.news && Array.isArray(payload.data.news))
    return payload.data.news;
  if (payload?.companies && Array.isArray(payload.companies))
    return payload.companies;
  if (payload?.news && Array.isArray(payload.news)) return payload.news;

  // Find first array inside object
  const arr = Object.values(payload).find((v) => Array.isArray(v));
  return arr || fallback;
};

// Fetch all companies
export const fetchCompanies = createAsyncThunk(
  "news/fetchCompanies",
  async (_, { getState, rejectWithValue }) => {
    // Use mock data if backend is unavailable
    if (shouldUseMockData()) {
      await mockApiDelay();
      return mockCompanies;
    }

    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const url = apiFor(state).getCompanies;

      const response = await axios.get(url, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      console.warn("API call failed, using mock data:", error.message);
      await mockApiDelay();
      return mockCompanies;
    }
  }
);

// Fetch selected company's news
export const fetchCompanyDetails = createAsyncThunk(
  "news/fetchCompanyDetails",
  async (companyId, { getState, rejectWithValue }) => {
    // Use mock data if backend is unavailable
    if (shouldUseMockData()) {
      await mockApiDelay();
      // Filter mock news by companyId if provided
      const filteredNews = companyId 
        ? { ...mockNews, data: { news: mockNews.data.news.filter(n => n.companyId === companyId) } }
        : mockNews;
      return filteredNews;
    }

    try {
      if (!companyId) {
        throw new Error("Company ID is required");
      }
      
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication token is missing");
      }
      
      const apiEndpoints = apiFor(state);
      if (!apiEndpoints || !apiEndpoints.getCompanyDetails) {
        throw new Error("getCompanyDetails endpoint not found for current role");
      }
      
      const url = apiEndpoints.getCompanyDetails(companyId);

      const response = await axios.get(url, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      console.warn("API call failed, using mock data:", error.message);
      await mockApiDelay();
      // Return mock news filtered by companyId
      const filteredNews = companyId 
        ? { ...mockNews, data: { news: mockNews.data.news.filter(n => n.companyId === companyId) } }
        : mockNews;
      return filteredNews;
    }
  }
);

// Create news
export const createNews = createAsyncThunk(
  "news/createNews",
  async (newsData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const url = apiFor(state).newsCreate;

      const response = await axios.post(url, newsData, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create news"
      );
    }
  }
);

// Update news
export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const url = apiFor(state).updateNews(id);

      const response = await axios.put(url, data, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update news"
      );
    }
  }
);

// Delete news
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const url = apiFor(state).deleteNews(id);

      await axios.delete(url, getAuthHeaders(token));
      return id;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to delete news"
      );
    }
  }
);


// Fetch all news
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { getState, rejectWithValue }) => {
    // Use mock data if backend is unavailable
    if (shouldUseMockData()) {
      await mockApiDelay();
      return mockNews;
    }

    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const url = apiFor(state).getAllNews;

      const response = await axios.get(url, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      console.warn("API call failed, using mock data:", error.message);
      await mockApiDelay();
      return mockNews;
    }
  }
);


const NewsAndFeaturesSlice = createSlice({
  name: "news",
  initialState: {
    companies: [],
    companyNews: [],
    allNews: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
        //  FETCH COMPANIES
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = extractArray(action.payload, []);
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.companies = [];
      })

        //  FETCH COMPANY DETAILS (NEWS)
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.companyNews = extractArray(action.payload, []);
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.companyNews = [];
      })

        //  FETCH ALL NEWS
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.allNews = extractArray(action.payload, []);
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allNews = [];
      })


        //  CREATE NEWS
      .addCase(createNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.loading = false;
        const created = action.payload?.data || action.payload;
        state.companyNews.push(created);
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        //  UPDATE NEWS
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload?.data || action.payload;

        state.companyNews = state.companyNews.map((item) =>
          item.id === updated.id ? updated : item
        );
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        //  DELETE NEWS
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.loading = false;
        state.companyNews = state.companyNews.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default NewsAndFeaturesSlice.reducer;




