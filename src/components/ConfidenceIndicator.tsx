interface Props {
  level: "Low" | "Medium" | "High";
}

export function ConfidenceIndicator({ level }: Props) {
  const score = level === "High" ? 3 : level === "Medium" ? 2 : 1;
  return (
    <span className="confidence">
      <span className="confidence-bars">
        <span className={score >= 1 ? "on" : ""} />
        <span className={score >= 2 ? "on" : ""} />
        <span className={score >= 3 ? "on" : ""} />
      </span>
      AI Confidence: {level}
    </span>
  );
}
