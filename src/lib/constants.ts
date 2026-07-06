// Deliberately un-guessable and kept out of every nav/sitemap/link on the public site.
export const ADMIN_BASE_PATH = "/mln-27x9";
export const ADMIN_LOGIN_PATH = `${ADMIN_BASE_PATH}/login`;

export const STORAGE_BUCKETS = {
  photos: "photos",
  resume: "resume",
  projectMedia: "project-media",
} as const;
