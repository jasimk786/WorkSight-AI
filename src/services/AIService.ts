import type { ExpertKnowledge, TroubleshootingStep } from "../models/types";

/**
 * Mock AI service. Simulates a 3–5 second processing period and returns
 * realistic sample knowledge derived from the capture session.
 *
 * Later this will call: Flutter → FastAPI → AI → MongoDB
 */
export async function analyzeRecording(
  machine: string,
  problem: string,
  symptoms: string,
  solution: string,
): Promise<ExpertKnowledge> {
  const steps: TroubleshootingStep[] = [
    {
      step: 1,
      action: "Check emergency stop",
      observation: "Emergency stop was normal.",
      reason: "To rule out emergency-stop activation.",
    },
    {
      step: 2,
      action: "Inspect relay",
      observation: "Relay was faulty.",
      reason: "This machine commonly experiences relay failure.",
    },
    {
      step: 3,
      action: "Test relay output",
      observation: "No voltage at relay output.",
      reason: "Confirm the relay is the failed component.",
    },
  ];

  await delay(4200);

  return {
    id: `k_${Date.now()}`,
    machine: machine || "CNC Machine A",
    problem: problem || "Motor not starting",
    symptoms: symptoms || "Emergency stop normal.",
    steps,
    solution: solution || "Replace faulty relay",
    result: "Machine successfully restarted",
    expertReasoning:
      "Relay failures are common on this machine model, especially after long production runs.",
    videoUrl: "",
    status: "processed",
    createdAt: new Date().toISOString(),
    confidence: "High",
    capturedBy: "Demo Technician",
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
