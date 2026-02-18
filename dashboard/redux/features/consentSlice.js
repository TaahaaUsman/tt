import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS_FOR_CONSENTS } from "../ApiEndpoints";
import {
  mockCompanies,
  mockConsents,
  shouldUseMockData,
  mockApiDelay,
} from "../../utils/mockData";

// Normalize role to match API keys (superAdmin → super-admin)
const normalizeRole = (role) =>
  role.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

// Get API group for role
const getConsentApiFor = (state) => {
  const role = state.auth.role;
  const normalized = normalizeRole(role);
  return API_ENDPOINTS_FOR_CONSENTS[normalized];
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
  if (payload?.data?.consents && Array.isArray(payload.data.consents))
    return payload.data.consents;
  if (payload?.data?.companies && Array.isArray(payload.data.companies))
    return payload.data.companies;
  if (payload?.consents && Array.isArray(payload.consents))
    return payload.consents;
  if (payload?.companies && Array.isArray(payload.companies))
    return payload.companies;

  // Find first array inside object
  const arr = Object.values(payload).find((v) => Array.isArray(v));
  return arr || fallback;
};

// Fetch all companies for consents
export const fetchConsentCompanies = createAsyncThunk(
  "consent/fetchConsentCompanies",
  async (_, { getState, rejectWithValue }) => {
    // Use mock data if backend is unavailable
    if (shouldUseMockData()) {
      await mockApiDelay();
      return mockCompanies;
    }

    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const apiEndpoint = getConsentApiFor(state);
      const url = apiEndpoint.getAllCompanies;

      const response = await axios.get(url, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      console.warn("API call failed, using mock data:", error.message);
      await mockApiDelay();
      return mockCompanies;
    }
  }
);

// Fetch all consents
export const fetchAllConsents = createAsyncThunk(
  "consent/fetchAllConsents",
  async (_, { getState, rejectWithValue }) => {
    // Use mock data if backend is unavailable
    if (shouldUseMockData()) {
      await mockApiDelay();
      return mockConsents;
    }

    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const apiEndpoint = getConsentApiFor(state);
      const url = apiEndpoint.getAllConsent;

      const response = await axios.get(url, getAuthHeaders(token));
      return response.data;
    } catch (error) {
      console.warn("API call failed, using mock data:", error.message);
      await mockApiDelay();
      return mockConsents;
    }
  }
);

// Create consent
export const createConsent = createAsyncThunk(
  "consent/createConsent",
  async (consentData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const apiEndpoint = getConsentApiFor(state);
      const url = apiEndpoint.createConsent;

      const response = await axios.post(
        url,
        consentData,
        getAuthHeaders(token)
      );
      console.log(url, response.data);
      return response.data;
    } catch (error) {
      console.error("createConsent error:", error);
      console.error(
        "createConsent error response data:",
        error?.response?.data
      );
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create consent"
      );
    }
  }
);

// Update consent
export const updateConsent = createAsyncThunk(
  "consent/updateConsent",
  async ({ consentId, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const apiEndpoint = getConsentApiFor(state);
      const url = apiEndpoint.updateConsent(consentId);

      const response = await axios.put(url, data, getAuthHeaders(token));
      console.log(url, response.data);
      return response.data;
    } catch (error) {
      console.error("updateConsent error:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update consent"
      );
    }
  }
);

// Delete consent
export const deleteConsent = createAsyncThunk(
  "consent/deleteConsent",
  async (consentId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const apiEndpoint = getConsentApiFor(state);
      const url = apiEndpoint.deleteConsent(consentId);

      await axios.delete(url, getAuthHeaders(token));
      console.log(url, consentId);
      return consentId;
    } catch (error) {
      console.error("deleteConsent error:", error);
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to delete consent"
      );
    }
  }
);

const ConsentSlice = createSlice({
  name: "consent",
  initialState: {
    companies: [],
    consents: [],
    loading: false,
    error: null,
    currentConsent: null,
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentConsent: (state, action) => {
      state.currentConsent = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchConsentCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsentCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = extractArray(action.payload, []);
      })
      .addCase(fetchConsentCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.companies = [];
      })

      //  FETCH ALL CONSENTS
      .addCase(fetchAllConsents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllConsents.fulfilled, (state, action) => {
        state.loading = false;
        state.consents = extractArray(action.payload, []);
      })
      .addCase(fetchAllConsents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.consents = [];
      })

      //  CREATE CONSENT
      .addCase(createConsent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConsent.fulfilled, (state, action) => {
        state.loading = false;
        const created = action.payload?.data || action.payload;
        state.consents.push(created);
        state.currentConsent = created;
      })
      .addCase(createConsent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  UPDATE CONSENT
      .addCase(updateConsent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConsent.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload?.data || action.payload;

        state.consents = state.consents.map((item) =>
          item.id === updated.id ? updated : item
        );

        if (state.currentConsent?.id === updated.id) {
          state.currentConsent = updated;
        }
      })
      .addCase(updateConsent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  DELETE CONSENT
      .addCase(deleteConsent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConsent.fulfilled, (state, action) => {
        state.loading = false;
        state.consents = state.consents.filter(
          (item) => item.id !== action.payload
        );

        if (state.currentConsent?.id === action.payload) {
          state.currentConsent = null;
        }
      })
      .addCase(deleteConsent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentConsent } = ConsentSlice.actions;
export default ConsentSlice.reducer;
