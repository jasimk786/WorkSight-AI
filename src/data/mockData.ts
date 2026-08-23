import type { ExpertKnowledge } from "../models/types";

export const mockKnowledge: ExpertKnowledge[] = [
  {
    id: "k1",
    machine: "CNC Machine A",
    problem: "Motor not starting",
    symptoms: "Emergency stop normal; no output at motor terminals.",
    steps: [
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
    ],
    solution: "Replace faulty relay",
    result: "Machine successfully restarted",
    expertReasoning:
      "Relay failures are common on this machine model, especially after long production runs.",
    videoUrl: "",
    status: "approved",
    createdAt: "2026-08-20T09:14:00Z",
    confidence: "High",
    capturedBy: "Demo Technician",
  },
  {
    id: "k2",
    machine: "Hydraulic Press B",
    problem: "Low hydraulic pressure",
    symptoms: "Pressure gauge below operating range; slow actuation.",
    steps: [
      {
        step: 1,
        action: "Check oil level",
        observation: "Oil level within range.",
        reason: "Low oil is the most common cause of pressure loss.",
      },
      {
        step: 2,
        action: "Inspect pressure valve",
        observation: "Valve seal damaged.",
        reason: "A damaged seal leaks pressure back to tank.",
      },
      {
        step: 3,
        action: "Check pump",
        observation: "Pump operating normally after valve replacement.",
        reason: "Confirm the fault was downstream of the pump.",
      },
    ],
    solution: "Replace damaged valve seal",
    result: "Pressure restored",
    expertReasoning:
      "Seal degradation is the leading cause of gradual pressure loss on this press series.",
    videoUrl: "",
    status: "approved",
    createdAt: "2026-08-18T13:40:00Z",
    confidence: "High",
    capturedBy: "Demo Technician",
  },
];

export function findKnowledge(id: string): ExpertKnowledge | undefined {
  return mockKnowledge.find((k) => k.id === id);
}
