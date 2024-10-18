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
      invalidatesTags: ["Finance"],
    }),
    updateFinance: builder.mutation({
      query: ({ id, finance }) => ({
        url: `finances/${id}`,
        method: "PATCH",
        body: finance,
      }),
      onQueryStarted,
      invalidatesTags: ["Finance"],
    }),
    deleteFinance: builder.mutation({
      query: (id) => ({
        url: `finances/${id}`,
        method: "DELETE",
      }),
      onQueryStarted,
      invalidatesTags: ["Finance"],
    }),
  }),
});

export const {
  useGetAllFinancesQuery,
  useCreateFinanceMutation,
  useUpdateFinanceMutation,
  useDeleteFinanceMutation,
} = financeApis;
