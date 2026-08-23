import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pause, Square, X } from "lucide-react";
import { RecordingButton } from "../components/RecordingButton";
import { useCapture } from "../state/CaptureContext";

type Phase = "idle" | "recording" | "paused";

export function CameraScreen() {
  const navigate = useNavigate();
  const { setSession } = useCapture();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const startedAtRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    let active = true;
    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: true,
        });
        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (e) {
        setError(
          "Camera access was blocked. In a real device this opens the live camera preview. You can still continue to review with a sample clip.",
        );
      }
    }
    start();
    return () => {
      active = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (phase !== "recording") return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAtRef.current + elapsedRef.current) / 1000));
    }, 500);
    return () => clearInterval(id);
  }, [phase]);

  function toggleRecord() {
    if (phase === "idle") startRecording();
    else if (phase === "recording") pauseRecording();
    else if (phase === "paused") resumeRecording();
  }

  function startRecording() {
    const stream = streamRef.current;
    if (!stream) {
      setError("No camera stream available.");
      return;
    }
    chunksRef.current = [];
    const rec = new MediaRecorder(stream);
    mediaRef.current = rec;
    rec.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    };
    rec.start();
    startedAtRef.current = Date.now();
    elapsedRef.current = 0;
    setElapsed(0);
    setPhase("recording");
  }

  function pauseRecording() {
    mediaRef.current?.pause();
    elapsedRef.current += Date.now() - startedAtRef.current;
    setPhase("paused");
  }

  function resumeRecording() {
    mediaRef.current?.resume();
    startedAtRef.current = Date.now();
    setPhase("recording");
  }

  function stopRecording() {
    mediaRef.current?.stop();
    setPhase("idle");
  }

  function cancel() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    navigate(-1);
  }

  function useRecording() {
    if (!videoUrl) {
      setError("No recording yet. Tap the red button to start.");
      return;
    }
    setSession({ videoUrl, durationSec: elapsed });
    navigate("/review");
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="app-bar">
        <button type="button" className="icon-btn" onClick={cancel} aria-label="Cancel">
          <X size={22} />
        </button>
        <div className="grow">
          <div className="app-bar-title">Expert Capture</div>
        </div>
      </div>

      <div className="cam-wrap">
        {error && !videoRef.current ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#fff",
              textAlign: "center",
              padding: 20,
              fontSize: 13,
            }}
          >
            {error}
          </div>
        ) : (
          <video ref={videoRef} autoPlay muted playsInline className="cam-preview" />
        )}
        <div className="cam-overlay">
          {phase === "recording" && (
            <div className="rec-pill">
              <span className="rec-dot" /> Recording {mm}:{ss}
            </div>
          )}
          {phase === "paused" && (
            <div className="rec-pill" style={{ background: "rgba(20,24,38,0.8)" }}>
              Paused {mm}:{ss}
            </div>
          )}
          <div className="cam-instruction">
            Explain what you see and why you are checking each component.
          </div>
        </div>
      </div>

      <div className="cam-controls">
        <p className="cam-helper">
          Tell us what you are checking and why. Speak clearly about your decisions.
        </p>
        <div className="cam-controls-row">
          <button
            type="button"
            className="cam-ctrl-icon"
            onClick={phase === "recording" ? pauseRecording : resumeRecording}
            disabled={phase === "idle"}
            aria-label="Pause/Resume"
          >
            <Pause size={20} />
          </button>
          <RecordingButton
            recording={phase === "recording"}
            onToggle={toggleRecord}
          />
          <button
            type="button"
            className="cam-ctrl-icon"
            onClick={stopRecording}
            disabled={phase === "idle"}
            aria-label="Stop"
          >
            <Square size={20} />
          </button>
        </div>
        <div className="btn-row" style={{ width: "100%", marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={cancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={useRecording} disabled={!videoUrl}>
            Use Recording
          </button>
        </div>
        {error && <div className="field-error center">{error}</div>}
      </div>
    </div>
  );
}
