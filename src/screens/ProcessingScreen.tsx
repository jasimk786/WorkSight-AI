import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { analyzeRecording } from "../services/AIService";
import { useCapture } from "../state/CaptureContext";

type Stage = "todo" | "active" | "done";
const stageLabels = [
  "Uploading recording",
  "Understanding your explanation",
  "Identifying troubleshooting steps",
  "Extracting expert decisions",
  "Creating knowledge",
];

export function ProcessingScreen() {
  const navigate = useNavigate();
  const { session, setDraft } = useCapture();
  const [progress, setProgress] = useState(0);
  const [stages, setStages] = useState<Stage[]>(
    Array(stageLabels.length).fill("todo"),
  );

  useEffect(() => {
    let cancelled = false;
    const stageDuration = 850;

    const analyze = async () => {
      for (let i = 0; i < stageLabels.length; i++) {
        if (cancelled) return;
        setStages((prev) => prev.map((s, idx) => (idx === i ? "active" : s)));
        setProgress(Math.round(((i + 0.5) / stageLabels.length) * 100));
        await wait(stageDuration);
        if (cancelled) return;
        setStages((prev) => prev.map((s, idx) => (idx === i ? "done" : s)));
        setProgress(Math.round(((i + 1) / stageLabels.length) * 100));
      }
      const draft = await analyzeRecording(
        session.machine ?? "",
        session.problem ?? "",
        session.symptoms ?? "",
        session.solution ?? "",
      );
      if (cancelled) return;
      setDraft(draft);
      navigate("/result");
    };
    analyze();
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="proc-wrap fade-in" style={{ background: "var(--surface)", flex: 1 }}>
      <div className="proc-orb">
        <Loader2 size={40} className="spin" />
      </div>
      <h2 style={{ textAlign: "center", maxWidth: 300 }}>
        WorkSight is learning from your experience
      </h2>
      <div className="proc-bar">
        <div className="proc-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="proc-stages">
        {stageLabels.map((label, i) => (
          <div key={label} className={`proc-stage ${stages[i]}`}>
            <span className="stage-ico">
              {stages[i] === "done" ? (
                <Check size={14} />
              ) : stages[i] === "active" ? (
                <Loader2 size={14} className="spin" />
              ) : (
                <span style={{ fontSize: 11 }}>{i + 1}</span>
              )}
            </span>
            {label}
          </div>
        ))}
      </div>
      <p className="muted" style={{ maxWidth: 280, textAlign: "center", fontSize: 14, marginTop: 4 }}>
        We're converting your experience into reusable troubleshooting knowledge.
      </p>
    </div>
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
