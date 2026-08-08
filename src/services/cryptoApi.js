import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Note: In Vite, env vars must be prefixed with VITE_ (was REACT_APP_ in CRA)
const cryptoApiHeaders = {
  "x-rapidapi-host": import.meta.env.VITE_CRYPTO_RAPIDAPI_HOST,
  "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_CRYPTO_API_URL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),

    // Free-tier: /coins supports orderBy=change, unlike /exchanges which needs a paid plan.
   getTopMovers: builder.query({
     query: ({ direction, count }) =>
       createRequest(`/coins?limit=${count}&orderBy=change&orderDirection=${direction}&timePeriod=24h`),
   }),

    // Note: To access this endpoint you need premium plan
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetTopMoversQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
