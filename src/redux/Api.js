import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend-test-api.aircall.io",
  }),
  tagTypes: ["calls"],

  endpoints: (builder) => ({
    getCalls: builder.query({
      query: () => ({
        url: "/calls?offset=2&limit=10",
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      }),
      providesTags: ["calls"],
    }),
  }),
});
export const { useGetCallsQuery } = api;
