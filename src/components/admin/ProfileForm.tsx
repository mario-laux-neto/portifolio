"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Loader2, Upload } from "lucide-react";
import type { Profile } from "@/lib/types";
import { updateProfile, uploadPhoto, uploadResume } from "@/lib/mutations";
import { useToast, toastErrorMessage } from "@/components/admin/ToastProvider";
import { Button, Card, Field, TextArea, TextInput } from "@/components/admin/ui";

export function ProfileForm({ initialProfile }: { initialProfile: Profile | null }) {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<Partial<Profile>>(
    initialProfile ?? { name: "", role: "" }
  );
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile.name?.trim() || !profile.role?.trim()) {
      showToast("error", "Nome e cargo são obrigatórios.");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateProfile({
        name: profile.name,
        role: profile.role,
        hero_bio: profile.hero_bio ?? null,
        about_paragraph_1: profile.about_paragraph_1 ?? null,
        about_paragraph_2: profile.about_paragraph_2 ?? null,
        whatsapp: profile.whatsapp ?? null,
      });
      setProfile(updated);
      showToast("success", "Perfil atualizado com sucesso.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadPhoto(file);
      const updated = await updateProfile({ photo_url: url });
      setProfile(updated);
      showToast("success", "Foto atualizada.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setUploadingPhoto(false);
      e.target.value = "";
    }
  }

  async function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const url = await uploadResume(file);
      const updated = await updateProfile({ resume_url: url });
      setProfile(updated);
      showToast("success", "Currículo atualizado.");
    } catch (error) {
      showToast("error", toastErrorMessage(error));
    } finally {
      setUploadingResume(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-6">
      <Card className="flex items-center gap-6">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-navy-900">
          {profile.photo_url ? (
            <Image src={profile.photo_url} alt="Foto" fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-ink-700">
              Sem foto
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="inline-block">
            <span className="sr-only">Selecionar foto</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
              disabled={uploadingPhoto}
            />
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-navy-600 px-3.5 py-2 text-sm text-ink-300 hover:border-violet-500 hover:text-violet-400">
              {uploadingPhoto ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {uploadingPhoto ? "Enviando..." : "Alterar foto"}
            </span>
          </label>
          <p className="text-xs text-ink-700">Exibida na seção Sobre.</p>
        </div>
      </Card>

      <Card className="flex items-center gap-6">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-ink-700">
          <FileText size={32} />
        </div>
        <div className="space-y-2">
          <label className="inline-block">
            <span className="sr-only">Selecionar currículo</span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleResumeChange}
              disabled={uploadingResume}
            />
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-navy-600 px-3.5 py-2 text-sm text-ink-300 hover:border-violet-500 hover:text-violet-400">
              {uploadingResume ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {uploadingResume ? "Enviando..." : "Alterar currículo (PDF)"}
            </span>
          </label>
          {profile.resume_url && (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-violet-400 underline"
            >
              Ver currículo atual
            </a>
          )}
        </div>
      </Card>

      <Card>
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Nome *">
            <TextInput
              required
              value={profile.name ?? ""}
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>
          <Field label="Cargo *">
            <TextInput
              required
              value={profile.role ?? ""}
              onChange={(e) => update("role", e.target.value)}
            />
          </Field>
          <Field label="Bio do Hero">
            <TextArea
              rows={3}
              value={profile.hero_bio ?? ""}
              onChange={(e) => update("hero_bio", e.target.value)}
            />
          </Field>
          <Field label="Sobre - parágrafo 1">
            <TextArea
              rows={4}
              value={profile.about_paragraph_1 ?? ""}
              onChange={(e) => update("about_paragraph_1", e.target.value)}
            />
          </Field>
          <Field label="Sobre - parágrafo 2">
            <TextArea
              rows={4}
              value={profile.about_paragraph_2 ?? ""}
              onChange={(e) => update("about_paragraph_2", e.target.value)}
            />
          </Field>
          <Field label="WhatsApp (com DDI/DDD, apenas números)">
            <TextInput
              placeholder="5554999999999"
              value={profile.whatsapp ?? ""}
              onChange={(e) => update("whatsapp", e.target.value)}
            />
          </Field>

          <Button type="submit" disabled={saving}>
            {saving && <Loader2 size={16} className="animate-spin" />}
            Salvar alterações
          </Button>
        </form>
      </Card>
    </div>
  );
}
