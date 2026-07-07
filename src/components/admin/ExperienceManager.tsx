"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2, X } from "lucide-react";
import type { Experience } from "@/lib/types";
import {
  createExperience,
  createExperienceTag,
  createExperienceTask,
  deleteExperience,
  deleteExperienceTag,
  deleteExperienceTask,
  reorderExperienceTasks,
  reorderExperiences,
  updateExperience,
  updateExperienceTask,
} from "@/lib/mutations";
import { useToast, toastErrorMessage } from "@/components/admin/ToastProvider";
import { Button, Card, Field, TextInput } from "@/components/admin/ui";

export function ExperienceManager({
  initialExperiences,
}: {
  initialExperiences: Experience[];
}) {
  const { showToast } = useToast();
  const [experiences, setExperiences] = useState(initialExperiences);
  const [creating, setCreating] = useState(false);

  async function handleAdd() {
    setCreating(true);
    try {
      const created = await createExperience({
        company: "Nova empresa",
        role: "Cargo",
        period: "Período",
        order_index: 0,
      });
      const next = [{ ...created, tasks: [], tags: [] }, ...experiences];
      setExperiences(next);
      await reorderExperiences(next.map((e) => e.id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remover esta experiência e todas as tarefas/tags associadas?")) return;
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      showToast("success", "Experiência removida.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= experiences.length) return;
    const next = [...experiences];
    [next[index], next[target]] = [next[target], next[index]];
    setExperiences(next);
    try {
      await reorderExperiences(next.map((e) => e.id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      <Button onClick={handleAdd} disabled={creating}>
        {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        Nova experiência
      </Button>

      {experiences.map((experience, i) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          onDelete={() => handleDelete(experience.id)}
          onMoveUp={i > 0 ? () => move(i, -1) : undefined}
          onMoveDown={i < experiences.length - 1 ? () => move(i, 1) : undefined}
        />
      ))}
    </div>
  );
}

function ExperienceCard({
  experience,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  experience: Experience;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const { showToast } = useToast();
  const [fields, setFields] = useState({
    company: experience.company,
    role: experience.role,
    period: experience.period,
  });
  const [tasks, setTasks] = useState(experience.tasks);
  const [tags, setTags] = useState(experience.tags);
  const [newTask, setNewTask] = useState("");
  const [newTag, setNewTag] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSaveFields() {
    if (!fields.company.trim() || !fields.role.trim() || !fields.period.trim()) {
      showToast("error", "Empresa, cargo e período são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      await updateExperience(experience.id, fields);
      showToast("success", "Experiência atualizada.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const created = await createExperienceTask(experience.id, newTask.trim(), tasks.length);
      setTasks((prev) => [...prev, created]);
      setNewTask("");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function handleTaskChange(id: string, description: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, description } : t)));
    try {
      await updateExperienceTask(id, { description });
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function handleTaskDelete(id: string) {
    try {
      await deleteExperienceTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function moveTask(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= tasks.length) return;
    const next = [...tasks];
    [next[index], next[target]] = [next[target], next[index]];
    setTasks(next);
    try {
      await reorderExperienceTasks(next.map((t) => t.id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function handleAddTag(e: React.FormEvent) {
    e.preventDefault();
    if (!newTag.trim()) return;
    try {
      const created = await createExperienceTag(experience.id, newTag.trim());
      setTags((prev) => [...prev, created]);
      setNewTag("");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function handleTagDelete(id: string) {
    try {
      await deleteExperienceTag(id);
      setTags((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          <Field label="Empresa *">
            <TextInput
              value={fields.company}
              onChange={(e) => setFields((f) => ({ ...f, company: e.target.value }))}
            />
          </Field>
          <Field label="Cargo *">
            <TextInput
              value={fields.role}
              onChange={(e) => setFields((f) => ({ ...f, role: e.target.value }))}
            />
          </Field>
          <Field label="Período *">
            <TextInput
              value={fields.period}
              onChange={(e) => setFields((f) => ({ ...f, period: e.target.value }))}
            />
          </Field>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <div className="flex items-center gap-1 rounded-md border border-navy-600 p-1">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={!onMoveUp}
              title="Mover experiência para cima"
              className="rounded p-1.5 text-ink-500 hover:text-cyan-400 disabled:opacity-30"
              aria-label="Mover experiência para cima"
            >
              <ArrowUp size={14} />
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={!onMoveDown}
              title="Mover experiência para baixo"
              className="rounded p-1.5 text-ink-500 hover:text-cyan-400 disabled:opacity-30"
              aria-label="Mover experiência para baixo"
            >
              <ArrowDown size={14} />
            </button>
          </div>
          <button
            type="button"
            onClick={onDelete}
            title="Remover experiência"
            className="rounded p-1.5 text-ink-500 hover:text-red-400"
            aria-label="Remover experiência"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <Button onClick={handleSaveFields} disabled={saving}>
        {saving && <Loader2 size={14} className="animate-spin" />}
        Salvar alterações
      </Button>

      <div>
        <p className="mb-2 text-xs font-mono text-ink-500">Tarefas</p>
        <div className="space-y-2">
          {tasks.map((task, i) => (
            <div key={task.id} className="flex items-center gap-2">
              <TextInput
                value={task.description}
                onChange={(e) => handleTaskChange(task.id, e.target.value)}
              />
              <button
                type="button"
                onClick={() => moveTask(i, -1)}
                disabled={i === 0}
                className="rounded p-1.5 text-ink-500 hover:text-cyan-400 disabled:opacity-30"
                aria-label="Mover para cima"
              >
                <ArrowUp size={13} />
              </button>
              <button
                type="button"
                onClick={() => moveTask(i, 1)}
                disabled={i === tasks.length - 1}
                className="rounded p-1.5 text-ink-500 hover:text-cyan-400 disabled:opacity-30"
                aria-label="Mover para baixo"
              >
                <ArrowDown size={13} />
              </button>
              <button
                type="button"
                onClick={() => handleTaskDelete(task.id)}
                className="rounded p-1.5 text-ink-500 hover:text-red-400"
                aria-label="Remover tarefa"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddTask} className="mt-2 flex gap-2">
          <TextInput
            placeholder="Nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button type="submit" variant="ghost">
            <Plus size={14} />
          </Button>
        </form>
      </div>

      <div>
        <p className="mb-2 text-xs font-mono text-ink-500">Tags</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1.5 rounded border border-navy-600 px-2 py-1 font-mono text-xs text-cyan-400"
            >
              {tag.tag}
              <button
                type="button"
                onClick={() => handleTagDelete(tag.id)}
                aria-label="Remover tag"
                className="text-ink-500 hover:text-red-400"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <form onSubmit={handleAddTag} className="mt-2 flex gap-2">
          <TextInput
            placeholder="Nova tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="max-w-xs"
          />
          <Button type="submit" variant="ghost">
            <Plus size={14} />
          </Button>
        </form>
      </div>
    </Card>
  );
}
