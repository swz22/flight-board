import flights from "./data/flights.json";

export function fetchDepartures(terminal, { signal } = {}) {
  return new Promise((resolve, reject) => {
    const delay = 400 + Math.random() * 800;
    const timer = setTimeout(() => {
      if (Math.random() < 0.08) {
        reject(new Error("Departures feed unavailable (simulated)"));
        return;
      }
      const rows = terminal === "all" ? flights : flights.filter((f) => f.terminal === terminal);
      resolve(rows);
    }, delay);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
}
