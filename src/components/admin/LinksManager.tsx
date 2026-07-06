"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from "lucide-react";
import type { Link as LinkRow } from "@/lib/types";
import { createLink, deleteLink, reorderLinks, updateLink } from "@/lib/mutations";
import { useToast, toastErrorMessage } from "@/components/admin/ToastProvider";
import { ICON_OPTIONS, resolveIcon } from "@/lib/icon-map";
import { Button, Card, Select, TextInput } from "@/components/admin/ui";

const EMPTY_DRAFT = { label: "", url: "", icon: ICON_OPTIONS[0] };

export function LinksManager({ initialLinks }: { initialLinks: LinkRow[] }) {
  const { showToast } = useToast();
  const [links, setLinks] = useState(initialLinks);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.label.trim() || !draft.url.trim()) {
      showToast("error", "Label e URL são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      const created = await createLink({
        label: draft.label.trim(),
        url: draft.url.trim(),
        icon: draft.icon,
        order_index: links.length,
      });
      setLinks((prev) => [...prev, created]);
      setDraft(EMPTY_DRAFT);
      showToast("success", "Link adicionado.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(id: string, patch: Partial<LinkRow>) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    try {
      await updateLink(id, patch);
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remover este link?")) return;
    try {
      await deleteLink(id);
      setLinks((prev) => prev.filter((l) => l.id !== id));
      showToast("success", "Link removido.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= links.length) return;
    const next = [...links];
    [next[index], next[target]] = [next[target], next[index]];
    setLinks(next);
    try {
      await reorderLinks(next.map((l) => l.id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={handleAdd} className="grid gap-3 sm:grid-cols-[1fr_1fr_140px_auto]">
          <TextInput
            placeholder="Label (ex: GitHub)"
            value={draft.label}
            onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))}
          />
          <TextInput
            placeholder="URL"
            value={draft.url}
            onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
          />
          <Select
            value={draft.icon}
            onChange={(e) => setDraft((d) => ({ ...d, icon: e.target.value }))}
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </Select>
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Adicionar
          </Button>
        </form>
      </Card>

      <Card className="space-y-2">
        {links.length === 0 && <p className="text-sm text-ink-500">Nenhum link cadastrado.</p>}
        {links.map((link, i) => {
          const Icon = resolveIcon(link.icon);
          return (
            <div
              key={link.id}
              className="flex flex-wrap items-center gap-3 rounded-md border border-navy-700 px-4 py-3"
            >
              <Icon size={16} className="shrink-0 text-violet-400" />
              <div className="w-40 shrink-0">
                <TextInput
                  value={link.label}
                  onChange={(e) => handleUpdate(link.id, { label: e.target.value })}
                />
              </div>
              <div className="min-w-[12rem] flex-1">
                <TextInput
                  value={link.url}
                  onChange={(e) => handleUpdate(link.id, { url: e.target.value })}
                />
              </div>
              <div className="w-32 shrink-0">
                <Select
                  value={link.icon ?? ICON_OPTIONS[0]}
                  onChange={(e) => handleUpdate(link.id, { icon: e.target.value })}
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="rounded p-1.5 text-ink-500 hover:text-violet-400 disabled:opacity-30"
                  aria-label="Mover para cima"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === links.length - 1}
                  className="rounded p-1.5 text-ink-500 hover:text-violet-400 disabled:opacity-30"
                  aria-label="Mover para baixo"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(link.id)}
                  className="rounded p-1.5 text-ink-500 hover:text-red-400"
                  aria-label="Remover"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
