import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { WorkflowStepper } from "../components/WorkflowStepper";
import { PrimaryButton } from "../components/PrimaryButton";
import { useCapture } from "../state/CaptureContext";

export function ProblemDetailsScreen() {
  const navigate = useNavigate();
  const { session, setSession } = useCapture();
  const [symptoms, setSymptoms] = useState("");
  const [solution, setSolution] = useState("");

  function analyze() {
    setSession({ symptoms, solution });
    navigate("/processing");
  }

  return (
    <div className="fade-in">
      <AppBar title="Tell us about the problem" back />
      <div className="screen-pad">
        <WorkflowStepper current={2} />
        <p className="muted mt-12" style={{ fontSize: 13 }}>
          These fields are optional — the expert may already explain everything in the video.
        </p>

        <div className="stack-lg mt-16">
          <div className="field">
            <label>Machine</label>
            <input className="input" value={session.machine ?? ""} readOnly />
          </div>
          <div className="field">
            <label>Problem</label>
            <input className="input" value={session.problem ?? ""} readOnly />
          </div>
          <div className="field">
            <label>
              Symptoms <span className="field-optional">(optional)</span>
            </label>
            <textarea
              className="textarea"
              placeholder="What did you observe?"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          <div className="field">
            <label>
              Final solution <span className="field-optional">(optional)</span>
            </label>
            <textarea
              className="textarea"
              placeholder="What fixed the problem?"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </div>

          <PrimaryButton onClick={analyze}>Analyze with AI</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
