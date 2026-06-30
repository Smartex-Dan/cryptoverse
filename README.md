# Cryptoverse

A cryptocurrency dashboard built with React, Redux Toolkit Query, and Ant Design. Browse live coin prices, view price history charts per coin, and read crypto news — all powered by RapidAPI.

## Tech stack
- React 17 + Redux Toolkit Query (RTK Query)
- Ant Design + Chart.js
- CoinRanking API & Bing News Search API (via RapidAPI)
- Deployed on Netlify

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your own RapidAPI key
npm start
```

## Environment variables

You'll need a free [RapidAPI](https://rapidapi.com/) account, subscribed to:
- [CoinRanking API](https://rapidapi.com/Coinranking/api/coinranking1)
- [Bing News Search API](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1)

Copy `.env.example` to `.env` and drop your key + host values in.

## Build

```bash
npm run build
```

## Notes
- The Exchanges page is wired up but the underlying `/exchanges` endpoint requires a paid RapidAPI plan, so it currently renders empty.
