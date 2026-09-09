import { useEffect, useState } from "react";
import { fetchDepartures } from "./api";
import SummaryCards from "./components/SummaryCards";
import DeparturesBoard from "./components/DeparturesBoard";

export default function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetchDepartures("all")
      .then((rows) => {
        if (ignore) return;
        setFlights(rows);
        setLoading(false);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p className="status-msg">Loading departures...</p>;
  if (error) return <p className="status-msg error">Could not load departures: {error}</p>;

  return (
    <main className="app">
      <h1>DFW Departures</h1>
      <SummaryCards flights={flights} />
      <DeparturesBoard flights={flights} />
    </main>
  );
}
