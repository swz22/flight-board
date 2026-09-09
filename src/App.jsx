import { useEffect, useState } from "react";
import { fetchDepartures } from "./api";
import FilterBar from "./components/FilterBar";
import SummaryCards from "./components/SummaryCards";
import DeparturesBoard from "./components/DeparturesBoard";

export default function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [terminal, setTerminal] = useState("all");
  const [statuses, setStatuses] = useState([]);
  const [tick, setTick] = useState(0);
  const [refreshedAt, setRefreshedAt] = useState(null);
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchDepartures(terminal, { signal: controller.signal })
      .then((rows) => {
        setFlights(rows);
        setRefreshedAt(Date.now());
        setSecondsAgo(0);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [terminal, tick]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (refreshedAt === null) return;
    const id = setInterval(() => setSecondsAgo((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [refreshedAt]);

  useEffect(() => {
    const id = setTimeout(() => setQuery(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  function changeTerminal(next) {
    setTerminal(next);
    setLoading(true);
    setError(null);
  }

  function toggleStatus(status) {
    setStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
    );
  }

  const q = query.trim().toLowerCase();
  const visible = flights.filter((f) => {
    const matchesQuery =
      q === "" ||
      f.flight.toLowerCase().includes(q) ||
      f.airline.toLowerCase().includes(q) ||
      f.destination.toLowerCase().includes(q);
    const matchesStatus = statuses.length === 0 || statuses.includes(f.status);
    return matchesQuery && matchesStatus;
  });

  return (
    <main className="app">
      <header className="masthead">
        <h1>DFW Departures</h1>
        {refreshedAt !== null && <span className="updated">updated {secondsAgo}s ago</span>}
      </header>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        terminal={terminal}
        onTerminalChange={changeTerminal}
        selected={statuses}
        onToggleStatus={toggleStatus}
      />
      {error && <p className="status-msg error">Could not load departures: {error}</p>}
      {loading && <p className="status-msg">Loading departures...</p>}
      {!loading && !error && (
        <>
          <SummaryCards flights={visible} />
          <DeparturesBoard flights={visible} />
        </>
      )}
    </main>
  );
}
