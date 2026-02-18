import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS_FOR_COMPANY } from "../ApiEndpoints";

// Normalize role (superAdmin → super-admin)
const normalizeRole = (role) =>
  role.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

// Get API group for role
const getCompanyApiFor = (state) => {
  const role = state.auth.role;
  const normalized = normalizeRole(role);
  return API_ENDPOINTS_FOR_COMPANY[normalized];
};

// Auth headers
const getAuthHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// Extract list safely
const extractArray = (payload, fallback = []) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.data && Array.isArray(payload.data)) return payload.data;
  if (payload?.data?.companies && Array.isArray(payload.data.companies))
    return payload.data.companies;
  if (payload?.companies && Array.isArray(payload.companies))
    return payload.companies;

  const arr = Object.values(payload || {}).find((v) => Array.isArray(v));
  return arr || fallback;
};

/* ===========================
   ASYNC THUNKS
=========================== */

// STEP 1 – Create company
export const createCompanyStepOne = createAsyncThunk(
  "company/createCompanyStepOne",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const api = getCompanyApiFor(state);

      console.log(data);

      const response = await axios.post(
        api.createCompanyStepOne,
        data,
        getAuthHeaders(token)
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create company (Step 1)"
      );
    }
  }
);

// STEP 2 – Update company
export const createCompanyStepTwo = createAsyncThunk(
  "company/createCompanyStepTwo",
  async ({ currentCompany, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const api = getCompanyApiFor(state);

      const response = await axios.put(
        api.createCompanyStepTwo(currentCompany),
        data,
        getAuthHeaders(token)
      );
      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create company (Step 2)"
      );
    }
  }
);

// STEP 3 – Update company
export const createCompanyStepThree = createAsyncThunk(
  "company/createCompanyStepThree",
  async ({ currentCompany, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const api = getCompanyApiFor(state);

      console.log(api.createCompanyStepThree(currentCompany));
      const response = await axios.put(
        api.createCompanyStepThree(currentCompany),
        data,
        getAuthHeaders(token)
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to create company (Step 3)"
      );
    }
  }
);

// UPDATE company
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ currentCompany, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const api = getCompanyApiFor(state);

      const response = await axios.put(
        api.updateCompany(currentCompany),
        data,
        getAuthHeaders(token)
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update company"
      );
    }
  }
);

// DELETE company
export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (companyId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const api = getCompanyApiFor(state);

      await axios.delete(
        api.deleteCompany(companyId),
        getAuthHeaders(token)
      );

      return companyId;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to delete company"
      );
    }
  }
);

/* ===========================
   SLICE
=========================== */

const CompanySlice = createSlice({
  name: "company",

  initialState: {
    companies: [],
    currentCompany: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },

    resetCompanyFlow: (state) => {
      state.currentCompany = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===========================
         STEP 1 – CREATE COMPANY
      =========================== */
      .addCase(createCompanyStepOne.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompanyStepOne.fulfilled, (state, action) => {
        state.loading = false;

        // API returns: data.company
        state.currentCompany =
          action.payload?.data?.company || action.payload;
      })
      .addCase(createCompanyStepOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===========================
         STEP 2 – UPDATE COMPANY
      =========================== */
      .addCase(createCompanyStepTwo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompanyStepTwo.fulfilled, (state, action) => {
        state.loading = false;

        const updated =
          action.payload?.data?.company ||
          action.payload?.data ||
          action.payload;

        state.currentCompany = updated;

        state.companies = state.companies.map((item) =>
          item.id === updated.id ? updated : item
        );
      })
      .addCase(createCompanyStepTwo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===========================
         STEP 3 – FINALIZE COMPANY
         → CLEAR currentCompany
      =========================== */
      .addCase(createCompanyStepThree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompanyStepThree.fulfilled, (state) => {
        state.loading = false;

        // ✅ FLOW COMPLETE → RESET
        state.currentCompany = null;
      })
      .addCase(createCompanyStepThree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===========================
         UPDATE COMPANY (GENERAL)
      =========================== */
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;

        const updated =
          action.payload?.data?.company ||
          action.payload?.data ||
          action.payload;

        state.currentCompany = updated;

        state.companies = state.companies.map((item) =>
          item.id === updated.id ? updated : item
        );
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===========================
         DELETE COMPANY
      =========================== */
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;

        state.companies = state.companies.filter(
          (item) => item.id !== action.payload
        );

        if (state.currentCompany?.id === action.payload) {
          state.currentCompany = null;
        }
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setCurrentCompany,
  resetCompanyFlow,
} = CompanySlice.actions;

export default CompanySlice.reducer;
