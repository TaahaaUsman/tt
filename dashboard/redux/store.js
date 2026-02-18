import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice"; 
import newsAndFeaturesReducer from "./features/newsAndFeaturesSlice";
import consentReducer from "./features/consentSlice";
import usersReducer from "./features/userManagementSlice";
import dashboardStatsReducer from "./features/dashboardStatsSlice";
import companyReducer from "./features/companySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  news: newsAndFeaturesReducer,
  consent: consentReducer,
  users: usersReducer,
  dashboardStats: dashboardStatsReducer,
  companies: companyReducer,
});

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
