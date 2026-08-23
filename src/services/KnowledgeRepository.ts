import type { ExpertKnowledge } from "../models/types";
import { mockKnowledge } from "../data/mockData";

/**
 * Mock repository. In-memory for now; will later call:
 *   POST /capture, POST /analyze, GET /knowledge, GET /knowledge/{id},
 *   PUT /knowledge/{id}, DELETE /knowledge/{id}
 */
class KnowledgeRepository {
  private items: ExpertKnowledge[] = [...mockKnowledge];

  list(): ExpertKnowledge[] {
    return [...this.items].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  get(id: string): ExpertKnowledge | undefined {
    return this.items.find((k) => k.id === id);
  }

  add(knowledge: ExpertKnowledge): void {
    this.items.unshift(knowledge);
  }

  update(id: string, patch: Partial<ExpertKnowledge>): ExpertKnowledge | undefined {
    const idx = this.items.findIndex((k) => k.id === id);
    if (idx === -1) return undefined;
    this.items[idx] = { ...this.items[idx], ...patch };
    return this.items[idx];
  }

  remove(id: string): boolean {
    const idx = this.items.findIndex((k) => k.id === id);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }

  stats() {
    const cases = this.items.length;
    const machines = new Set(this.items.map((k) => k.machine)).size;
    const solutions = this.items.filter((k) => k.status === "approved").length;
    return { cases, machines, solutions };
  }
}

export const knowledgeRepo = new KnowledgeRepository();
