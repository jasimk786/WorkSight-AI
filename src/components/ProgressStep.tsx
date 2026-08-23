interface Props {
  num: number;
  label: string;
  state: "todo" | "active" | "done";
}

export function ProgressStep({ num, label, state }: Props) {
  return (
    <>
      <div className={`step ${state}`}>
        <span className="dot">{state === "done" ? "✓" : num}</span>
        {label}
      </div>
      <span className="step-sep" />
    </>
  );
}
