export default function FilterBar({ search, onSearchChange }) {
  return (
    <div className="filters">
      <input
        className="search"
        type="search"
        placeholder="Search flight, airline, or destination"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
