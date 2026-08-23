import { useNavigate } from "react-router-dom";
import { Cog, ListChecks, User } from "lucide-react";
import type { ExpertKnowledge } from "../models/types";

interface Props {
  knowledge: ExpertKnowledge;
}

export function KnowledgeCard({ knowledge }: Props) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="card card-pad card-tap full"
      style={{ textAlign: "left", border: "none" }}
      onClick={() => navigate(`/knowledge/${knowledge.id}`)}
    >
      <div className="kc-head">
        <div>
          <div className="kc-title">{knowledge.machine}</div>
          <div className="kc-sub">{knowledge.problem}</div>
        </div>
        <span className="chip chip-success">{knowledge.status === "approved" ? "Approved" : "AI processed"}</span>
      </div>
      <div className="kc-meta">
        <span className="kc-meta-item">
          <ListChecks size={13} /> {knowledge.steps.length} steps
        </span>
        <span className="kc-meta-item">
          <Cog size={13} /> {knowledge.machine.split(" ")[0]}
        </span>
        <span className="kc-meta-item">
          <User size={13} /> {knowledge.capturedBy}
        </span>
      </div>
    </button>
  );
}
