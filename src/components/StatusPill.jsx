const statusLabels = {
  "on time": "On time",
  boarding: "Boarding",
  delayed: "Delayed",
  cancelled: "Cancelled",
};

export default function StatusPill({ status }) {
  const slug = status.replace(" ", "-");
  return <span className={`pill pill-${slug}`}>{statusLabels[status] ?? status}</span>;
}
