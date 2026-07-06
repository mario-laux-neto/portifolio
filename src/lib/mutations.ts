"use client";

import { createClient } from "@/lib/supabase/client";
import { STORAGE_BUCKETS } from "@/lib/constants";
import type { TablesInsert, TablesUpdate } from "@/lib/database.types";

const supabase = createClient();

function unwrap<T>({ data, error }: { data: T | null; error: { message: string } | null }): T {
  if (error) throw new Error(error.message);
  return data as T;
}

async function reorder(table: "skills" | "experiences" | "projects" | "links" | "experience_tasks" | "project_images", orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from(table).update({ order_index: index }).eq("id", id)
    )
  );
}

// ---------- Profile ----------

export async function updateProfile(patch: TablesUpdate<"profile">) {
  const { data, error } = await supabase
    .from("profile")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", 1)
    .select()
    .single();
  return unwrap({ data, error });
}

// ---------- Skills ----------

export async function createSkill(name: string, orderIndex: number) {
  const { data, error } = await supabase
    .from("skills")
    .insert({ name, order_index: orderIndex })
    .select()
    .single();
  return unwrap({ data, error });
}

export async function updateSkill(id: string, patch: TablesUpdate<"skills">) {
  const { data, error } = await supabase
    .from("skills")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  return unwrap({ data, error });
}

export async function deleteSkill(id: string) {
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const reorderSkills = (orderedIds: string[]) => reorder("skills", orderedIds);

// ---------- Experiences ----------

export async function createExperience(input: Omit<TablesInsert<"experiences">, "id">) {
  const { data, error } = await supabase
    .from("experiences")
    .insert(input)
    .select()
    .single();
  return unwrap({ data, error });
}

export async function updateExperience(id: string, patch: TablesUpdate<"experiences">) {
  const { data, error } = await supabase
    .from("experiences")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  return unwrap({ data, error });
}

export async function deleteExperience(id: string) {
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const reorderExperiences = (orderedIds: string[]) => reorder("experiences", orderedIds);

export async function createExperienceTask(experienceId: string, description: string, orderIndex: number) {
  const { data, error } = await supabase
    .from("experience_tasks")
    .insert({ experience_id: experienceId, description, order_index: orderIndex })
    .select()
    .single();
  return unwrap({ data, error });
}

export async function updateExperienceTask(id: string, patch: TablesUpdate<"experience_tasks">) {
  const { data, error } = await supabase
    .from("experience_tasks")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  return unwrap({ data, error });
}

export async function deleteExperienceTask(id: string) {
  const { error } = await supabase.from("experience_tasks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const reorderExperienceTasks = (orderedIds: string[]) => reorder("experience_tasks", orderedIds);

export async function createExperienceTag(experienceId: string, tag: string) {
  const { data, error } = await supabase
    .from("experience_tags")
    .insert({ experience_id: experienceId, tag })
    .select()
    .single();
  return unwrap({ data, error });
}

export async function deleteExperienceTag(id: string) {
  const { error } = await supabase.from("experience_tags").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ---------- Projects ----------

export async function createProject(input: Omit<TablesInsert<"projects">, "id">) {
  const { data, error } = await supabase
    .from("projects")
    .insert(input)
    .select()
    .single();
  return unwrap({ data, error });
}

export async function updateProject(id: string, patch: TablesUpdate<"projects">) {
  const { data, error } = await supabase
    .from("projects")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  return unwrap({ data, error });
}

export async function deleteProject(id: string) {
  const { data: images } = await supabase
    .from("project_images")
    .select("image_url")
    .eq("project_id", id);

  if (images?.length) {
    await Promise.all(
      images.map((image) => removeStorageFile(STORAGE_BUCKETS.projectMedia, image.image_url))
    );
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const reorderProjects = (orderedIds: string[]) => reorder("projects", orderedIds);

export async function createProjectTag(projectId: string, tag: string) {
  const { data, error } = await supabase
    .from("project_tags")
    .insert({ project_id: projectId, tag })
    .select()
    .single();
  return unwrap({ data, error });
}

export async function deleteProjectTag(id: string) {
  const { error } = await supabase.from("project_tags").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function createProjectImage(projectId: string, imageUrl: string, orderIndex: number) {
  const { data, error } = await supabase
    .from("project_images")
    .insert({ project_id: projectId, image_url: imageUrl, order_index: orderIndex })
    .select()
    .single();
  return unwrap({ data, error });
}

export async function deleteProjectImage(id: string, imageUrl: string) {
  await removeStorageFile(STORAGE_BUCKETS.projectMedia, imageUrl);
  const { error } = await supabase.from("project_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const reorderProjectImages = (orderedIds: string[]) => reorder("project_images", orderedIds);

// ---------- Links ----------

export async function createLink(input: Omit<TablesInsert<"links">, "id">) {
  const { data, error } = await supabase
    .from("links")
    .insert(input)
    .select()
    .single();
  return unwrap({ data, error });
}

export async function updateLink(id: string, patch: TablesUpdate<"links">) {
  const { data, error } = await supabase
    .from("links")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  return unwrap({ data, error });
}

export async function deleteLink(id: string) {
  const { error } = await supabase.from("links").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const reorderLinks = (orderedIds: string[]) => reorder("links", orderedIds);

// ---------- Storage ----------

function slugifyFilename(file: File) {
  const dotIndex = file.name.lastIndexOf(".");
  const ext = dotIndex >= 0 ? file.name.slice(dotIndex) : "";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
}

async function uploadToBucket(bucket: string, path: string, file: File) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadPhoto(file: File) {
  return uploadToBucket(STORAGE_BUCKETS.photos, `profile/${slugifyFilename(file)}`, file);
}

export async function uploadResume(file: File) {
  return uploadToBucket(STORAGE_BUCKETS.resume, `resume/${slugifyFilename(file)}`, file);
}

export async function uploadProjectMedia(file: File, projectId: string) {
  return uploadToBucket(STORAGE_BUCKETS.projectMedia, `${projectId}/${slugifyFilename(file)}`, file);
}

export async function removeStorageFile(bucket: string, publicUrl: string) {
  const marker = `/object/public/${bucket}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return;
  const path = decodeURIComponent(publicUrl.slice(index + marker.length));
  await supabase.storage.from(bucket).remove([path]);
}
