interface Props {
  recording: boolean;
  onToggle: () => void;
}

export function RecordingButton({ recording, onToggle }: Props) {
  return (
    <button
      type="button"
      className={`rec-btn ${recording ? "recording" : ""}`}
      aria-label={recording ? "Stop recording" : "Start recording"}
      onClick={onToggle}
    >
      {recording ? <span style={{ width: 22, height: 22, background: "#fff", borderRadius: 6 }} /> : null}
    </button>
  );
}
