# Flight Board

An auto-refreshing DFW flight departures dashboard built with React, Vite, and simulated data.

**Live demo:** https://flight-board-ten.vercel.app/

## Features

- Auto-refreshes every 10 seconds with a last-updated counter
- Simulated flight statuses that change over time
- Debounced search across flight, airline, and destination
- Terminal and status filters with request cancellation to prevent stale responses
- Preserves the last successful data and displays an error after a failed refresh

## React concepts demonstrated

- Component composition and props
- State, controlled inputs, and derived data
- Effects with cleanup for fetching, debouncing, and timers
- Functional state updates
- Request cancellation with `AbortController`

## Data

A local dataset of 30 departures is loaded through a simulated asynchronous data layer in `src/api.js`, with realistic latency and request cancellation. There is no backend or external flight service.

Failure simulation is disabled by default. Append `?failures` to the URL, or visit https://flight-board-ten.vercel.app/?failures, to give each fetch an 8% chance of failing.

## Running locally

```bash
npm install
npm run dev
```
