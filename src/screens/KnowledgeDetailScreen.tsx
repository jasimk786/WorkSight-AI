import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2, Check } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { ConfidenceIndicator } from "../components/ConfidenceIndicator";
import { knowledgeRepo } from "../services/KnowledgeRepository";
import type { ExpertKnowledge } from "../models/types";

export function KnowledgeDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const initial = id ? knowledgeRepo.get(id) : undefined;
  const [k, setK] = useState<ExpertKnowledge | null>(initial ?? null);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!k) {
    return (
      <div className="screen-pad fade-in">
        <AppBar title="Knowledge" back />
        <p className="muted center">Knowledge not found.</p>
      </div>
    );
  }

  function saveEdit() {
    knowledgeRepo.update(k!.id, k!);
    setEditing(false);
  }

  function del() {
    knowledgeRepo.remove(k!.id);
    navigate("/library");
  }

  return (
    <div className="fade-in">
      <AppBar title={k.machine} back />
      <div className="screen-pad">
        <div className="card card-pad">
          <div className="row-between">
            <h3 style={{ fontSize: 18 }}>{k.problem}</h3>
            <ConfidenceIndicator level={k.confidence} />
          </div>
        </div>

        <div className="mt-20 card card-pad stack">
          <div>
            <div className="eyebrow">Problem</div>
            {editing ? (
              <input className="input mt-8" value={k.problem} onChange={(e) => setK({ ...k, problem: e.target.value })} />
            ) : (
              <p className="soft mt-8">{k.problem}.</p>
            )}
          </div>
          <div>
            <div className="eyebrow">Symptoms</div>
            {editing ? (
              <textarea className="textarea mt-8" value={k.symptoms} onChange={(e) => setK({ ...k, symptoms: e.target.value })} />
            ) : (
              <p className="soft mt-8">{k.symptoms}</p>
            )}
          </div>
        </div>

        <div className="mt-20">
          <div className="section-title">Troubleshooting</div>
          <div className="stack">
            {k.steps.map((s, i) => (
              <div key={i} className="card card-pad step-card">
                <div className="step-num">{s.step}</div>
                <div className="step-body">
                  {editing ? (
                    <input className="input step-action" value={s.action} onChange={(e) => {
                      const steps = k.steps.map((x, idx) => idx === i ? { ...x, action: e.target.value } : x);
                      setK({ ...k, steps });
                    }} />
                  ) : (
                    <div className="step-action">{s.action}</div>
                  )}
                  <div className="step-row">
                    <div className="step-row-label">Observation</div>
                    {editing ? (
                      <textarea className="textarea step-row-text" value={s.observation} onChange={(e) => {
                        const steps = k.steps.map((x, idx) => idx === i ? { ...x, observation: e.target.value } : x);
                        setK({ ...k, steps });
                      }} />
                    ) : (
                      <div className="step-row-text">{s.observation}</div>
                    )}
                  </div>
                  <div className="step-row">
                    <div className="step-row-label">Why</div>
                    {editing ? (
                      <textarea className="textarea step-row-text" value={s.reason} onChange={(e) => {
                        const steps = k.steps.map((x, idx) => idx === i ? { ...x, reason: e.target.value } : x);
                        setK({ ...k, steps });
                      }} />
                    ) : (
                      <div className="step-row-text">{s.reason}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 card card-pad stack">
          <div>
            <div className="eyebrow">Expert reasoning</div>
            {editing ? (
              <textarea className="textarea mt-8" value={k.expertReasoning} onChange={(e) => setK({ ...k, expertReasoning: e.target.value })} />
            ) : (
              <p className="soft mt-8" style={{ fontStyle: "italic" }}>"{k.expertReasoning}"</p>
            )}
          </div>
          <div>
            <div className="eyebrow">Solution</div>
            {editing ? (
              <input className="input mt-8" value={k.solution} onChange={(e) => setK({ ...k, solution: e.target.value })} />
            ) : (
              <p className="soft mt-8">{k.solution}.</p>
            )}
          </div>
          <div>
            <div className="eyebrow">Result</div>
            {editing ? (
              <input className="input mt-8" value={k.result} onChange={(e) => setK({ ...k, result: e.target.value })} />
            ) : (
              <p className="soft mt-8">{k.result}.</p>
            )}
          </div>
        </div>

        <div className="mt-20">
          <div className="section-title">Original Recording</div>
          <div className="card card-pad">
            {k.videoUrl ? (
              <video src={k.videoUrl} controls playsInline className="review-video" />
            ) : (
              <div
                style={{
                  height: 180,
                  background: "#06080f",
                  borderRadius: "var(--radius)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 13,
                  textAlign: "center",
                  padding: 20,
                }}
              >
                Recording preview available on device.
              </div>
            )}
          </div>
        </div>

        {editing ? (
          <div className="btn-row mt-20">
            <SecondaryButton onClick={() => setEditing(false)}>Cancel</SecondaryButton>
            <PrimaryButton onClick={saveEdit}>
              <Check size={18} /> Save
            </PrimaryButton>
          </div>
        ) : confirmDelete ? (
          <div className="stack mt-20">
            <p className="soft center">Delete this knowledge permanently?</p>
            <div className="btn-row">
              <SecondaryButton onClick={() => setConfirmDelete(false)}>Cancel</SecondaryButton>
              <button type="button" className="btn btn-danger" onClick={del}>
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="btn-row mt-20">
            <SecondaryButton onClick={() => setConfirmDelete(true)}>
              <Trash2 size={18} /> Delete
            </SecondaryButton>
            <PrimaryButton onClick={() => setEditing(true)}>
              <Pencil size={18} /> Edit Knowledge
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}
