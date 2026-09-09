export default function SummaryCards({ flights }) {
  const delayed = flights.filter((f) => f.status === "delayed").length;
  const cancelled = flights.filter((f) => f.status === "cancelled").length;

  return (
    <section className="cards">
      <div className="card">
        <span className="card-value">{flights.length}</span>
        <span className="card-label">Departures shown</span>
      </div>
      <div className="card card-delayed">
        <span className="card-value">{delayed}</span>
        <span className="card-label">Delayed</span>
      </div>
      <div className="card card-cancelled">
        <span className="card-value">{cancelled}</span>
        <span className="card-label">Cancelled</span>
      </div>
    </section>
  );
}
