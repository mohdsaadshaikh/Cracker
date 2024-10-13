import { onQueryStarted } from "../../lib/handleApiErr";
import { apis } from "./baseApi";

export const authApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "auth/get-my-profile",
      }),
      onQueryStarted,
      providesTags: ["Auth"],
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Auth"],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Auth"],
    }),
    logoutUser: builder.query({
      query: () => ({
        url: "auth/logout",
      }),
      onQueryStarted,
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyLogoutUserQuery,
} = authApi;
