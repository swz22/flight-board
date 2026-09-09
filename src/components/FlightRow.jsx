export default function FlightRow({ flight }) {
  return (
    <tr>
      <td className="mono">{flight.flight}</td>
      <td>{flight.airline}</td>
      <td>{flight.destination}</td>
      <td className="mono">{flight.gate ?? "Not available"}</td>
      <td className="mono">{flight.scheduled}</td>
      <td>{flight.status}</td>
    </tr>
  );
}
