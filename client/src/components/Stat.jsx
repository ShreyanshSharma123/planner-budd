function Stat({ title, value }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

export default Stat;
