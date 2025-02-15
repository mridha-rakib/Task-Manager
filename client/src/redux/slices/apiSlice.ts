import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { env } from "../../env";

const baseQuery = fetchBaseQuery({
  baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

export const { usePrefetch } = apiSlice;
