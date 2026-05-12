export default function StatsCard({ title, value }) {
  return (
    <div className="card-box">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}