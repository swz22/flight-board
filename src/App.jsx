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

  function toggleStatus(status) {
    setStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
    );
  }

  function changeTerminal(next) {
    setTerminal(next);
    setLoading(true);
    setError(null);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchDepartures(terminal, { signal: controller.signal })
      .then((rows) => {
        setFlights(rows);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [terminal]);

  useEffect(() => {
    const id = setTimeout(() => setQuery(search), 300);
    return () => clearTimeout(id);
  }, [search]);

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
      <h1>DFW Departures</h1>
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
