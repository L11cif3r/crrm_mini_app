import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi"; // 👈 add this
import { customersApi } from "../features/customers/customersApi";
import { leadsApi } from "../features/leads/leadsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,       // 👈 add RTK Query reducer for auth
    [customersApi.reducerPath]: customersApi.reducer,
    [leadsApi.reducerPath]: leadsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)                 // 👈 add RTK Query middleware
      .concat(customersApi.middleware)
      .concat(leadsApi.middleware),
});
