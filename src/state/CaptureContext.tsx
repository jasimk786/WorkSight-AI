import { createContext, useContext, useState, type ReactNode } from "react";
import type { CaptureSession, ExpertKnowledge } from "../models/types";

interface CaptureContextValue {
  session: Partial<CaptureSession>;
  setSession: (patch: Partial<CaptureSession>) => void;
  draft: ExpertKnowledge | null;
  setDraft: (k: ExpertKnowledge | null) => void;
  reset: () => void;
}

const CaptureContext = createContext<CaptureContextValue | null>(null);

export function CaptureProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Partial<CaptureSession>>({});
  const [draft, setDraft] = useState<ExpertKnowledge | null>(null);

  const setSession = (patch: Partial<CaptureSession>) =>
    setSessionState((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setSessionState({});
    setDraft(null);
  };

  return (
    <CaptureContext.Provider value={{ session, setSession, draft, setDraft, reset }}>
      {children}
    </CaptureContext.Provider>
  );
}

export function useCapture() {
  const ctx = useContext(CaptureContext);
  if (!ctx) throw new Error("useCapture must be used within CaptureProvider");
  return ctx;
}
