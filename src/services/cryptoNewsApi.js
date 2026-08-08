import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Using NewsData.io instead —
// direct API key, no RapidAPI middleman, free tier allows commercial use.
// Docs: https://newsdata.io/documentation
export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsdata.io/api/1" }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      // Free tier caps at 10 articles/request — asking for more errors out.
      query: ({ newsCategory, count }) =>
        `/latest?apikey=${import.meta.env.VITE_NEWSDATA_API_KEY}&q=${encodeURIComponent(newsCategory)}&language=en&size=${Math.min(count, 10)}`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
