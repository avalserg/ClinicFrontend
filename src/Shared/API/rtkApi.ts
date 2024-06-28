import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_LOCALSTORAGE_KEY } from "@/Shared/const/localStorage";

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: __API__,
    // baseUrl: "https://localhost:7063/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
