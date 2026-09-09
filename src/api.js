import flights from "./data/flights.json";

let current = flights;

const transitions = {
  "on time": ["boarding", "delayed"],
  delayed: ["boarding", "cancelled"],
};

function advance(rows) {
  return rows.map((f) => {
    const next = transitions[f.status];
    if (!next || Math.random() > 0.15) return f;
    return { ...f, status: next[Math.floor(Math.random() * next.length)] };
  });
}

export function fetchDepartures(terminal, { signal } = {}) {
  return new Promise((resolve, reject) => {
    const delay = 400 + Math.random() * 800;
    const timer = setTimeout(() => {
      if (Math.random() < 0.08) {
        reject(new Error("Departures feed unavailable (simulated)"));
        return;
      }
      current = advance(current);
      const rows = terminal === "all" ? current : current.filter((f) => f.terminal === terminal);
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
