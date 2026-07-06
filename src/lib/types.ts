export type { Database } from "./database.types";
import type { Tables } from "./database.types";

export type Profile = Tables<"profile">;
export type Skill = Tables<"skills">;
export type Link = Tables<"links">;

export type ExperienceRow = Tables<"experiences">;
export type ExperienceTask = Tables<"experience_tasks">;
export type ExperienceTag = Tables<"experience_tags">;

export type ProjectRow = Tables<"projects">;
export type ProjectTag = Tables<"project_tags">;
export type ProjectImage = Tables<"project_images">;

export interface Experience extends ExperienceRow {
  tasks: ExperienceTask[];
  tags: ExperienceTag[];
}

export interface Project extends ProjectRow {
  tags: ProjectTag[];
  images: ProjectImage[];
}
