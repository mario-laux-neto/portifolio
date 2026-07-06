"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  Loader2,
  Plus,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";
import type { Project } from "@/lib/types";
import {
  createProject,
  createProjectImage,
  createProjectTag,
  deleteProject,
  deleteProjectImage,
  deleteProjectTag,
  removeStorageFile,
  reorderProjectImages,
  reorderProjects,
  updateProject,
  uploadProjectMedia,
} from "@/lib/mutations";
import { STORAGE_BUCKETS } from "@/lib/constants";
import { useToast, toastErrorMessage } from "@/components/admin/ToastProvider";
import { Button, Card, Field, TextArea, TextInput } from "@/components/admin/ui";

export function ProjectsManager({ initialProjects }: { initialProjects: Project[] }) {
  const { showToast } = useToast();
  const [projects, setProjects] = useState(initialProjects);
  const [creating, setCreating] = useState(false);

  async function handleAdd() {
    setCreating(true);
    try {
      const created = await createProject({
        title: "Novo projeto",
        description: "Descrição do projeto",
        order_index: projects.length,
      });
      setProjects((prev) => [...prev, { ...created, tags: [], images: [] }]);
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remover este projeto e todas as mídias associadas?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("success", "Projeto removido.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const next = [...projects];
    [next[index], next[target]] = [next[target], next[index]];
    setProjects(next);
    try {
      await reorderProjects(next.map((p) => p.id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      <Button onClick={handleAdd} disabled={creating}>
        {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        Novo projeto
      </Button>

      {projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={() => handleDelete(project.id)}
          onMoveUp={i > 0 ? () => move(i, -1) : undefined}
          onMoveDown={i < projects.length - 1 ? () => move(i, 1) : undefined}
        />
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  project: Project;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const { showToast } = useToast();
  const [fields, setFields] = useState({
    title: project.title,
    description: project.description,
    github_url: project.github_url ?? "",
    live_url: project.live_url ?? "",
  });
  const [videoUrl, setVideoUrl] = useState(project.video_url);
  const [images, setImages] = useState(project.images);
  const [tags, setTags] = useState(project.tags);
  const [newTag, setNewTag] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  async function handleSaveFields() {
    if (!fields.title.trim() || !fields.description.trim()) {
      showToast("error", "Título e descrição são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      await updateProject(project.id, {
        title: fields.title,
        description: fields.description,
        github_url: fields.github_url || null,
        live_url: fields.live_url || null,
      });
      showToast("success", "Projeto atualizado.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function handleImagesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadingImages(true);
    try {
      let order = images.length;
      for (const file of files) {
        const url = await uploadProjectMedia(file, project.id);
        const created = await createProjectImage(project.id, url, order++);
        setImages((prev) => [...prev, created]);
      }
      showToast("success", "Imagens enviadas.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setUploadingImages(false);
      e.target.value = "";
    }
  }

  async function handleImageDelete(id: string, imageUrl: string) {
    try {
      await deleteProjectImage(id, imageUrl);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function moveImage(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    setImages(next);
    try {
      await reorderProjectImages(next.map((img) => img.id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function handleVideoSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingVideo(true);
    try {
      const url = await uploadProjectMedia(file, project.id);
      await updateProject(project.id, { video_url: url });
      setVideoUrl(url);
      showToast("success", "Vídeo enviado. Ele substitui as imagens no card.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setUploadingVideo(false);
      e.target.value = "";
    }
  }

  async function handleVideoClear() {
    if (!videoUrl) return;
    try {
      await removeStorageFile(STORAGE_BUCKETS.projectMedia, videoUrl);
      await updateProject(project.id, { video_url: null });
      setVideoUrl(null);
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function handleAddTag(e: React.FormEvent) {
    e.preventDefault();
    if (!newTag.trim()) return;
    try {
      const created = await createProjectTag(project.id, newTag.trim());
      setTags((prev) => [...prev, created]);
      setNewTag("");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  async function handleTagDelete(id: string) {
    try {
      await deleteProjectTag(id);
      setTags((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    }
  }

  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Field label="Título *">
            <TextInput
              value={fields.title}
              onChange={(e) => setFields((f) => ({ ...f, title: e.target.value }))}
            />
          </Field>
          <Field label="Descrição *">
            <TextArea
              rows={3}
              value={fields.description}
              onChange={(e) => setFields((f) => ({ ...f, description: e.target.value }))}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="URL do GitHub">
              <TextInput
                value={fields.github_url}
                onChange={(e) => setFields((f) => ({ ...f, github_url: e.target.value }))}
              />
            </Field>
            <Field label="URL do site (live)">
              <TextInput
                value={fields.live_url}
                onChange={(e) => setFields((f) => ({ ...f, live_url: e.target.value }))}
              />
            </Field>
          </div>
        </div>
        <div className="flex items-center gap-1 pt-6">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!onMoveUp}
            className="rounded p-1.5 text-ink-500 hover:text-violet-400 disabled:opacity-30"
            aria-label="Mover para cima"
          >
            <ArrowUp size={14} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!onMoveDown}
            className="rounded p-1.5 text-ink-500 hover:text-violet-400 disabled:opacity-30"
            aria-label="Mover para baixo"
          >
            <ArrowDown size={14} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded p-1.5 text-ink-500 hover:text-red-400"
            aria-label="Remover projeto"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <Button variant="ghost" onClick={handleSaveFields} disabled={saving}>
        {saving && <Loader2 size={14} className="animate-spin" />}
        Salvar campos
      </Button>

      <div className="border-t border-navy-700 pt-5">
        <p className="mb-2 text-xs font-mono text-ink-500">
          Vídeo (se enviado, substitui as imagens no card)
        </p>
        {videoUrl ? (
          <div className="flex items-center gap-3">
            <video src={videoUrl} className="h-20 w-32 rounded object-cover" muted />
            <Button variant="danger" onClick={handleVideoClear} type="button">
              <X size={14} /> Remover vídeo
            </Button>
          </div>
        ) : (
          <label className="inline-block">
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoSelected}
              disabled={uploadingVideo}
            />
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-navy-600 px-3.5 py-2 text-sm text-ink-300 hover:border-violet-500 hover:text-violet-400">
              {uploadingVideo ? <Loader2 size={16} className="animate-spin" /> : <Video size={16} />}
              {uploadingVideo ? "Enviando..." : "Enviar vídeo"}
            </span>
          </label>
        )}
      </div>

      <div className="border-t border-navy-700 pt-5">
        <p className="mb-2 text-xs font-mono text-ink-500">Imagens</p>
        <div className="flex flex-wrap gap-3">
          {images.map((image, i) => (
            <div key={image.id} className="group relative h-24 w-24 overflow-hidden rounded-md">
              <Image src={image.image_url} alt="" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-navy-950/70 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => moveImage(i, -1)}
                  disabled={i === 0}
                  className="rounded bg-navy-800 p-1 text-ink-300 hover:text-violet-400 disabled:opacity-30"
                  aria-label="Mover para trás"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(i, 1)}
                  disabled={i === images.length - 1}
                  className="rounded bg-navy-800 p-1 text-ink-300 hover:text-violet-400 disabled:opacity-30"
                  aria-label="Mover para frente"
                >
                  <ArrowDown size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => handleImageDelete(image.id, image.image_url)}
                  className="rounded bg-navy-800 p-1 text-ink-300 hover:text-red-400"
                  aria-label="Remover imagem"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-navy-600 text-ink-500 hover:border-violet-500 hover:text-violet-400">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImagesSelected}
              disabled={uploadingImages}
            />
            {uploadingImages ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Upload size={18} />
            )}
            <span className="text-xs">Adicionar</span>
          </label>
        </div>
      </div>

      <div className="border-t border-navy-700 pt-5">
        <p className="mb-2 text-xs font-mono text-ink-500">Tags</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1.5 rounded border border-navy-600 px-2 py-1 font-mono text-xs text-violet-400"
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
