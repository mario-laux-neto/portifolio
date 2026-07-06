import { createClient } from "@/lib/supabase/server";
import type { Experience, Link, Profile, Project, Skill } from "@/lib/types";

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  return data;
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("experiences")
    .select("*, experience_tasks(*), experience_tags(*)")
    .order("order_index", { ascending: true })
    .order("order_index", { ascending: true, referencedTable: "experience_tasks" });

  if (!data) return [];

  return data.map((row) => ({
    ...row,
    tasks: row.experience_tasks ?? [],
    tags: row.experience_tags ?? [],
  }));
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, project_tags(*), project_images(*)")
    .order("order_index", { ascending: true })
    .order("order_index", { ascending: true, referencedTable: "project_images" });

  if (!data) return [];

  return data.map((row) => ({
    ...row,
    tags: row.project_tags ?? [],
    images: row.project_images ?? [],
  }));
}

export async function getLinks(): Promise<Link[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("links")
    .select("*")
    .order("order_index", { ascending: true });
  return data ?? [];
}
