"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from "lucide-react";
import type { Skill } from "@/lib/types";
import { createSkill, deleteSkill, reorderSkills } from "@/lib/mutations";
import { useToast, toastErrorMessage } from "@/components/admin/ToastProvider";
import { Button, Card, TextInput } from "@/components/admin/ui";

export function SkillsManager({ initialSkills }: { initialSkills: Skill[] }) {
  const { showToast } = useToast();
  const [skills, setSkills] = useState(initialSkills);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      showToast("error", "Informe o nome da skill.");
      return;
    }
    setSaving(true);
    try {
      const created = await createSkill(name.trim(), skills.length);
      setSkills((prev) => [...prev, created]);
      setName("");
      showToast("success", "Skill adicionada.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remover esta skill?")) return;
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
      showToast("success", "Skill removida.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= skills.length) return;
    const next = [...skills];
    [next[index], next[target]] = [next[target], next[index]];
    setSkills(next);
    try {
      await reorderSkills(next.map((s) => s.id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={handleAdd} className="flex gap-3">
          <TextInput
            placeholder="Nova skill (ex: TypeScript)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Adicionar
          </Button>
        </form>
      </Card>

      <Card className="space-y-2">
        {skills.length === 0 && (
          <p className="text-sm text-ink-500">Nenhuma skill cadastrada ainda.</p>
        )}
        {skills.map((skill, i) => (
          <div
            key={skill.id}
            className="flex items-center justify-between rounded-md border border-navy-700 px-4 py-2.5"
          >
            <span className="text-sm text-ink-100">{skill.name}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="rounded p-1.5 text-ink-500 hover:text-cyan-400 disabled:opacity-30"
                aria-label="Mover para cima"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === skills.length - 1}
                className="rounded p-1.5 text-ink-500 hover:text-cyan-400 disabled:opacity-30"
                aria-label="Mover para baixo"
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(skill.id)}
                className="rounded p-1.5 text-ink-500 hover:text-red-400"
                aria-label="Remover"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
