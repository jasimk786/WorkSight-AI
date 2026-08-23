import { useNavigate } from "react-router-dom";
import { Plus, Clock } from "lucide-react";
import { knowledgeRepo } from "../services/KnowledgeRepository";
import { StatCard } from "../components/StatCard";
import { KnowledgeCard } from "../components/KnowledgeCard";

export function HomeScreen() {
  const navigate = useNavigate();
  const items = knowledgeRepo.list();
  const stats = knowledgeRepo.stats();
  const recent = items.slice(0, 2);

  return (
    <div className="screen-pad fade-in">
      <div className="mt-12">
        <div className="eyebrow">WorkSight AI</div>
        <h1 style={{ marginTop: 4 }}>Good morning, Expert</h1>
        <p className="soft" style={{ marginTop: 6 }}>
          Capture your experience before it gets lost.
        </p>
      </div>

      <div className="hero-card mt-20">
        <h3>Capture Expert Knowledge</h3>
        <p>
          Record yourself solving a real machine problem and let AI turn your experience into
          reusable knowledge.
        </p>
        <button type="button" className="btn" onClick={() => navigate("/capture")}>
          <Plus size={20} /> Start Capture
        </button>
      </div>

      <div className="mt-24">
        <div className="section-title">Knowledge Captured</div>
        <div className="stat-grid">
          <StatCard value={stats.cases} label="Cases" />
          <StatCard value={stats.machines} label="Machines" />
          <StatCard value={stats.solutions} label="Solutions" />
        </div>
      </div>

      <div className="mt-24">
        <div className="row-between mb-12">
          <div className="section-title" style={{ marginBottom: 0 }}>
            Recent Knowledge
          </div>
          <button type="button" className="btn-ghost btn" onClick={() => navigate("/library")}>
            View all
          </button>
        </div>
        {recent.length === 0 ? (
          <div className="card card-pad center muted">No knowledge captured yet.</div>
        ) : (
          <div className="stack">
            {recent.map((k) => (
              <KnowledgeCard key={k.id} knowledge={k} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-24 card card-pad row gap-10" style={{ alignItems: "center" }}>
        <Clock size={18} color="var(--text-muted)" />
        <p className="muted" style={{ fontSize: 13 }}>
          Tip: Speak out loud about what you check and why — it helps the AI learn faster.
        </p>
      </div>
    </div>
  );
}
