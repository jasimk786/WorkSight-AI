import { useState } from "react";
import { BookOpen } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { SearchBar } from "../components/SearchBar";
import { KnowledgeCard } from "../components/KnowledgeCard";
import { knowledgeRepo } from "../services/KnowledgeRepository";
import { useNavigate } from "react-router-dom";

type Filter = "All" | "Machines" | "Faults" | "Recent";
const filters: Filter[] = ["All", "Machines", "Recent", "Faults"];

export function LibraryScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const items = knowledgeRepo.list();

  let filtered = items;
  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (k) =>
        k.machine.toLowerCase().includes(q) ||
        k.problem.toLowerCase().includes(q) ||
        k.solution.toLowerCase().includes(q),
    );
  }
  if (filter === "Recent") filtered = [...filtered].slice(0, 5);

  return (
    <div className="fade-in">
      <AppBar title="Knowledge Library" />
      <div className="screen-pad">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search machines, problems or solutions"
        />
        <div className="filter-row mt-12">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-20">
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-ico">
                <BookOpen size={30} />
              </div>
              <h3>No knowledge captured yet</h3>
              <p>Record your first expert solution.</p>
              <button type="button" className="btn btn-primary" style={{ width: "auto", marginTop: 8 }} onClick={() => navigate("/capture")}>
                Start Capture
              </button>
            </div>
          ) : (
            <div className="stack">
              {filtered.map((k) => (
                <KnowledgeCard key={k.id} knowledge={k} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
