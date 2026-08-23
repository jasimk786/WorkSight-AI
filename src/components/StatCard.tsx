interface Props {
  value: number | string;
  label: string;
}

export function StatCard({ value, label }: Props) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
