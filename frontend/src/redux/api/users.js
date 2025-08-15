import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        withCredentials: true,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        withCredentials: true,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/signOut`,
        method: "POST",
        withCredentials: true,
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        withCredentials: true,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
} = userApiSlice;
