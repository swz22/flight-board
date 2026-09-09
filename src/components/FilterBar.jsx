const terminalOptions = ["all", "A", "C", "D", "E"];
const statusOptions = ["on time", "boarding", "delayed", "cancelled"];

export default function FilterBar({
  search,
  onSearchChange,
  terminal,
  onTerminalChange,
  selected,
  onToggleStatus,
}) {
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
      <div className="chips">
        {statusOptions.map((s) => (
          <button
            key={s}
            type="button"
            className={selected.includes(s) ? "chip chip-on" : "chip"}
            aria-pressed={selected.includes(s)}
            onClick={() => onToggleStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
