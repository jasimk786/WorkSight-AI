import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { WorkflowStepper } from "../components/WorkflowStepper";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { useCapture } from "../state/CaptureContext";

export function ReviewScreen() {
  const navigate = useNavigate();
  const { session, setSession } = useCapture();
  const [hasRecording] = useState(Boolean(session.videoUrl));

  function retake() {
    setSession({ videoUrl: "", durationSec: 0 });
    navigate("/camera");
  }

  function useThis() {
    navigate("/details");
  }

  const mm = String(Math.floor((session.durationSec ?? 0) / 60)).padStart(2, "0");
  const ss = String((session.durationSec ?? 0) % 60).padStart(2, "0");

  return (
    <div className="fade-in">
      <AppBar title="Review Capture" back />
      <div className="screen-pad">
        <WorkflowStepper current={3} />

        <div className="mt-20 card card-pad">
          {session.videoUrl ? (
            <video src={session.videoUrl} controls playsInline className="review-video" />
          ) : (
            <div
              style={{
                height: 200,
                background: "#06080f",
                borderRadius: "var(--radius)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 13,
                textAlign: "center",
                padding: 20,
              }}
            >
              No recording preview available. You can still continue and describe the problem.
            </div>
          )}
          <div className="review-meta mt-16">
            <span className="chip">Duration {mm}:{ss}</span>
            <span className="chip chip-primary">{session.machine ?? "—"}</span>
            <span className="chip">{session.problem ?? "—"}</span>
          </div>
        </div>

        <div className="card card-pad mt-12" style={{ background: "var(--warning-bg)", borderColor: "transparent" }}>
          <p className="soft" style={{ fontSize: 13, color: "var(--warning)" }}>
            For better AI results, explain what you observed, what you checked, why you checked it,
            and what solved the problem.
          </p>
        </div>

        <div className="btn-row mt-20">
          <SecondaryButton onClick={retake} disabled={!hasRecording}>
            Retake
          </SecondaryButton>
          <PrimaryButton onClick={useThis}>Use This Recording</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
