import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apis } from "./apis/baseApi";
import { Authentication } from "./slice/auth";

export const store = configureStore({
  reducer: {
    [apis.reducerPath]: apis.reducer,
    [Authentication.name]: Authentication.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apis.middleware),
});

setupListeners(store.dispatch);
