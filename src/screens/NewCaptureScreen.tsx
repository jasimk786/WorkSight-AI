import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, FolderUp } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { WorkflowStepper } from "../components/WorkflowStepper";
import { PrimaryButton } from "../components/PrimaryButton";
import { useCapture } from "../state/CaptureContext";

export function NewCaptureScreen() {
  const navigate = useNavigate();
  const { session, setSession } = useCapture();
  const [machine, setMachine] = useState(session.machine ?? "");
  const [problem, setProblem] = useState(session.problem ?? "");
  const [method, setMethod] = useState<"record" | "upload" | null>(
    session.captureMethod ?? null,
  );
  const [error, setError] = useState("");

  const canContinue = machine.trim() && problem.trim() && method;

  function handleContinue() {
    if (!canContinue) {
      setError("Please enter machine, problem, and choose a method.");
      return;
    }
    setSession({ machine: machine.trim(), problem: problem.trim(), captureMethod: method });
    navigate(method === "record" ? "/camera" : "/review");
  }

  return (
    <div className="fade-in">
      <AppBar title="Capture Expert Knowledge" back />
      <div className="screen-pad">
        <p className="soft mb-16">Show us how you solve the problem.</p>
        <WorkflowStepper current={1} />

        <div className="mt-24 stack-lg">
          <div className="field">
            <label>Machine</label>
            <input
              className="input"
              placeholder="e.g. CNC Machine A"
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Problem</label>
            <input
              className="input"
              placeholder="e.g. Motor is not starting"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>

          <div>
            <div className="section-title">Capture method</div>
            <div className="stack">
              <button
                type="button"
                className={`option-card ${method === "record" ? "selected" : ""}`}
                onClick={() => setMethod("record")}
              >
                <div className="option-icon">
                  <Video size={22} />
                </div>
                <div>
                  <div className="option-title">Record Video</div>
                  <div className="option-sub">Show and explain the troubleshooting process.</div>
                </div>
              </button>
              <button
                type="button"
                className={`option-card ${method === "upload" ? "selected" : ""}`}
                onClick={() => setMethod("upload")}
              >
                <div className="option-icon">
                  <FolderUp size={22} />
                </div>
                <div>
                  <div className="option-title">Upload Video</div>
                  <div className="option-sub">Use an existing recording.</div>
                </div>
              </button>
            </div>
          </div>

          {error && <div className="field-error">{error}</div>}

          <PrimaryButton onClick={handleContinue} disabled={!canContinue}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
