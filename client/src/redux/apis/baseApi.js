import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
});

export const apis = createApi({
  reducerPath: "apis",
  baseQuery,
  tagTypes: ["Auth", "Finance"],
  // keepUnusedDataFor: 0.01,
  endpoints: () => ({}),
});
