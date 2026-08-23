export interface TroubleshootingStep {
  step: number;
  action: string;
  observation: string;
  reason: string;
}

export type KnowledgeStatus = "draft" | "processing" | "processed" | "approved";

export interface ExpertKnowledge {
  id: string;
  machine: string;
  problem: string;
  symptoms: string;
  steps: TroubleshootingStep[];
  solution: string;
  result: string;
  expertReasoning: string;
  videoUrl: string;
  status: KnowledgeStatus;
  createdAt: string;
  confidence: "Low" | "Medium" | "High";
  capturedBy: string;
}

export interface CaptureSession {
  machine: string;
  problem: string;
  symptoms: string;
  solution: string;
  captureMethod: "record" | "upload";
  videoUrl: string;
  durationSec: number;
}
