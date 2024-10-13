import { apis } from "./baseApi";

export const financeApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    getAllFinances: (params) => ({
      query: () => ({
        url: "finances",
        params,
      }),
      providesTags: ["Finance"],
    }),
  }),
});

export const { useGetAllFinancesQuery } = financeApis;
