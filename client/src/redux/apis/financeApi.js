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
  }),
});

export const { useGetAllFinancesQuery } = financeApis;
