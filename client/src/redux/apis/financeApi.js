import { apis } from "./baseApi";
import { onQueryStarted } from "../../lib/handleApiErr";
import queryGenerator from "../../lib/queryGenerator";

export const financeApis = apis.injectEndpoints({
  endpoints: (builder) => ({
    getAllFinances: builder.query({
      query: (filters) => queryGenerator("finances", filters),
      onQueryStarted,
      providesTags: ["Finance"],
    }),
    createFinance: builder.mutation({
      query: (finance) => ({
        url: "finances",
        method: "POST",
        body: finance,
      }),
      onQueryStarted,
      providesTags: ["Finance"],
    }),
    updateFinance: builder.mutation({
      query: (finance) => ({
        url: `finances/${finance.id}`,
        method: "PATCH",
        body: finance,
      }),
      onQueryStarted,
      providesTags: ["Finance"],
    }),
  }),
});

export const {
  useGetAllFinancesQuery,
  useCreateFinanceMutation,
  useUpdateFinanceMutation,
} = financeApis;
