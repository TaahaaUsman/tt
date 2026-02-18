import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS_FOR_USERMANAGEMENT } from "../ApiEndpoints";
import { mockUsers, shouldUseMockData, mockApiDelay } from "../../utils/mockData";

// Normalize role (superAdmin → super-admin)
const normalizeRole = (role) =>
  role ? role.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : null;

// Pick API by role
const apiFor = (state) => {
  const role = normalizeRole(state.auth.role);
  if (!API_ENDPOINTS_FOR_USERMANAGEMENT[role]) {
    throw new Error(`Invalid role: ${role}`);
  }
  return API_ENDPOINTS_FOR_USERMANAGEMENT[role];
};

// Auth headers
const getAuthHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

/* ===================== THUNKS ===================== */

// GET users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    // Use mock data if backend is unavailable
    if (shouldUseMockData()) {
      await mockApiDelay();
      return mockUsers;
    }

    try {
      const state = getState();
      const token = state.auth.token;
      const url = apiFor(state).getAllUsers;

      const res = await axios.get(url, getAuthHeaders(token));
      return res.data;
    } catch (err) {
      console.warn("API call failed, using mock data:", err.message);
      await mockApiDelay();
      return mockUsers;
    }
  }
);

// CREATE user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const url = apiFor(state).createUser;
      
      const { first_name, last_name, companies, roles, ...rest } = data;
      const allCompanies = state.news?.companies || [];

      const transformedData = {
        ...rest,
        firstName: first_name,
        lastName: last_name,
        companyLinks: companies
          ? companies
              .filter((c) => c.selected)
              .map((company) => {
                const matchedCompany = allCompanies.find(
                  (ac) => ac.name === company.company
                );
                return {
                  companyId: matchedCompany ? matchedCompany.id : company.company,
                  contactWithMessages: company.contactWithMessages,
                  title: company.title,
                };
              })
          : [],
        ...(data.role && { role: data.role }),
        ...(!data.role && roles && roles.length > 0 && { role: roles[0] }),
      };

      console.log(url, transformedData);

      const res = await axios.post(url, transformedData, getAuthHeaders(token));
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to create user"
      );
    }
  }
);

// UPDATE user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const url = apiFor(state).updateUser(id);

      const res = await axios.put(url, data, getAuthHeaders(token));
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// DELETE user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const url = apiFor(state).deleteUser(id);

      await axios.delete(url, getAuthHeaders(token));
      return id;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

/* ===================== SLICE ===================== */

const userManagementSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchUsers.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload?.data || a.payload || [];
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // CREATE
      .addCase(createUser.fulfilled, (s, a) => {
        s.users.push(a.payload?.data || a.payload);
      })

      // UPDATE
      .addCase(updateUser.fulfilled, (s, a) => {
        const updated = a.payload?.data || a.payload;
        s.users = s.users.map((u) =>
          u.id === updated.id ? updated : u
        );
      })

      // DELETE
      .addCase(deleteUser.fulfilled, (s, a) => {
        s.users = s.users.filter((u) => u.id !== a.payload);
      });
  },
});

export default userManagementSlice.reducer;
