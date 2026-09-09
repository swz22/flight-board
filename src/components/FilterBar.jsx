const terminalOptions = ["all", "A", "C", "D", "E"];

export default function FilterBar({ search, onSearchChange, terminal, onTerminalChange }) {
  return (
    <div className="filters">
      <input
        className="search"
        type="search"
        placeholder="Search flight, airline, or destination"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="terminal"
        value={terminal}
        onChange={(e) => onTerminalChange(e.target.value)}
      >
        {terminalOptions.map((t) => (
          <option key={t} value={t}>
            {t === "all" ? "All terminals" : `Terminal ${t}`}
          </option>
        ))}
      </select>
    </div>
  );
}
