import FlightRow from "./FlightRow";

export default function DeparturesBoard({ flights }) {
  if (flights.length === 0) {
    return <p className="status-msg">No flights match.</p>;
  }
  return (
    <table className="board">
      <thead>
        <tr>
          <th>Flight</th>
          <th>Airline</th>
          <th>Destination</th>
          <th>Gate</th>
          <th>Scheduled</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((f) => (
          <FlightRow key={f.id} flight={f} />
        ))}
      </tbody>
    </table>
  );
}
