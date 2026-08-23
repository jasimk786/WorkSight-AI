import { useNavigate } from "react-router-dom";
import { Globe, Bell, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { StatCard } from "../components/StatCard";
import { knowledgeRepo } from "../services/KnowledgeRepository";

export function ProfileScreen() {
  const navigate = useNavigate();
  const stats = knowledgeRepo.stats();

  const settings = [
    { icon: Globe, label: "Language" },
    { icon: Bell, label: "Notifications" },
    { icon: Shield, label: "Privacy" },
    { icon: HelpCircle, label: "Help" },
  ];

  return (
    <div className="fade-in">
      <AppBar title="Profile" />
      <div className="screen-pad">
        <div className="profile-head">
          <div className="avatar">DT</div>
          <h2>Demo Technician</h2>
          <p className="muted">Senior Maintenance Technician</p>
        </div>

        <div className="stat-grid mt-16">
          <StatCard value={stats.cases} label="Cases" />
          <StatCard value={stats.machines} label="Machines" />
          <StatCard value={stats.solutions} label="Solutions" />
        </div>

        <div className="mt-24">
          <div className="section-title">Settings</div>
          <div className="stack">
            {settings.map((s) => (
              <button key={s.label} type="button" className="setting-row" onClick={() => navigate("/profile")}>
                <span className="setting-ico">
                  <s.icon size={20} />
                </span>
                <span className="setting-label">{s.label}</span>
                <ChevronRight size={18} color="var(--n-300)" />
              </button>
            ))}
          </div>
        </div>

        <p className="muted center mt-24" style={{ fontSize: 12 }}>
          WorkSight AI — Stage 1 Demo
        </p>
      </div>
    </div>
  );
}
