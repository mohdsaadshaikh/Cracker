import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseURL = import.meta.env.VITE_BASE_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseURL,
    credentials: "include",
  }),
  tagTypes: ["Auth", "Expense"],
  keepUnusedDataFor: 0.01,
  endpoints: () => ({}),
});
