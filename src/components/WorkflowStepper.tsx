import { ProgressStep } from "./ProgressStep";

interface Props {
  current: 1 | 2 | 3 | 4;
}

const labels = ["Record", "Describe", "Review", "Save"];

export function WorkflowStepper({ current }: Props) {
  return (
    <div className="stepper no-scroll">
      {labels.map((label, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "active" : "todo";
        return <ProgressStep key={label} num={n} label={label} state={state as "todo" | "active" | "done"} />;
      })}
    </div>
  );
}
