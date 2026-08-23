import type { TroubleshootingStep } from "../models/types";

interface Props {
  step: TroubleshootingStep;
  editable?: boolean;
  onChange?: (patch: Partial<TroubleshootingStep>) => void;
}

export function StepCard({ step, editable, onChange }: Props) {
  return (
    <div className="card card-pad step-card">
      <div className="step-num">{step.step}</div>
      <div className="step-body">
        {editable ? (
          <input
            className="input step-action"
            value={step.action}
            onChange={(e) => onChange?.({ action: e.target.value })}
          />
        ) : (
          <div className="step-action">{step.action}</div>
        )}
        <div className="step-row">
          <div className="step-row-label">Observation</div>
          {editable ? (
            <textarea
              className="textarea step-row-text"
              value={step.observation}
              onChange={(e) => onChange?.({ observation: e.target.value })}
            />
          ) : (
            <div className="step-row-text">{step.observation}</div>
          )}
        </div>
        <div className="step-row">
          <div className="step-row-label">Why</div>
          {editable ? (
            <textarea
              className="textarea step-row-text"
              value={step.reason}
              onChange={(e) => onChange?.({ reason: e.target.value })}
            />
          ) : (
            <div className="step-row-text">{step.reason}</div>
          )}
        </div>
      </div>
    </div>
  );
}
