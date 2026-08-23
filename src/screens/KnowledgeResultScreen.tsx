import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Pencil } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { StepCard } from "../components/StepCard";
import { ConfidenceIndicator } from "../components/ConfidenceIndicator";
import { knowledgeRepo } from "../services/KnowledgeRepository";
import { useCapture } from "../state/CaptureContext";
import type { ExpertKnowledge, TroubleshootingStep } from "../models/types";

export function KnowledgeResultScreen() {
  const navigate = useNavigate();
  const { draft, setDraft, reset } = useCapture();
  const [editing, setEditing] = useState(false);

  if (!draft) {
    return (
      <div className="screen-pad fade-in">
        <p className="muted center">No draft available. Start a new capture.</p>
        <PrimaryButton onClick={() => navigate("/capture")}>Start Capture</PrimaryButton>
      </div>
    );
  }

  const [k, setK] = useState<ExpertKnowledge>(draft);

  function updateStep(idx: number, patch: Partial<TroubleshootingStep>) {
    setK((prev) => {
      const steps = prev.steps.map((s, i) => (i === idx ? { ...s, ...patch } : s));
      return { ...prev, steps };
    });
  }

  function approve() {
    const saved = { ...k, status: "approved" as const };
    knowledgeRepo.add(saved);
    setDraft(null);
    reset();
    navigate(`/knowledge/${saved.id}`);
  }

  return (
    <div className="fade-in">
      <AppBar title="Expert Knowledge Created" back />
      <div className="screen-pad">
        <div className="card card-pad">
          <div className="eyebrow">Machine</div>
          <div className="step-action" style={{ marginTop: 4 }}>{k.machine}</div>
          <div className="mt-12" />
          <div className="eyebrow">Problem</div>
          <div className="step-action" style={{ marginTop: 4 }}>{k.problem}</div>
        </div>

        <div className="mt-20">
          <div className="section-title">AI Extracted Troubleshooting</div>
          <div className="stack-lg">
            {k.steps.map((s, i) => (
              <StepCard
                key={i}
                step={s}
                editable={editing}
                onChange={(patch) => updateStep(i, patch)}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 card card-pad">
          <div className="eyebrow">Solution</div>
          {editing ? (
            <input
              className="input step-action mt-8"
              value={k.solution}
              onChange={(e) => setK({ ...k, solution: e.target.value })}
            />
          ) : (
            <div className="step-action mt-8">{k.solution}</div>
          )}
          <div className="mt-16" />
          <div className="eyebrow">Result</div>
          {editing ? (
            <input
              className="input step-action mt-8"
              value={k.result}
              onChange={(e) => setK({ ...k, result: e.target.value })}
            />
          ) : (
            <div className="step-action mt-8">{k.result}</div>
          )}
        </div>

        <div className="mt-16 center">
          <ConfidenceIndicator level={k.confidence} />
        </div>

        <div className="mt-20">
          {editing ? (
            <PrimaryButton onClick={() => setEditing(false)}>
              <Check size={18} /> Done Editing
            </PrimaryButton>
          ) : (
            <div className="btn-row">
              <SecondaryButton onClick={() => setEditing(true)}>
                <Pencil size={18} /> Edit
              </SecondaryButton>
              <PrimaryButton onClick={approve}>
                <Check size={18} /> Approve Knowledge
              </PrimaryButton>
            </div>
          )}
        </div>
        <p className="muted center mt-16" style={{ fontSize: 12 }}>
          You can correct any AI-generated information before saving.
        </p>
      </div>
    </div>
  );
}
