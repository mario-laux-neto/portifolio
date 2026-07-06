import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Globe,
  Twitter,
  Facebook,
  Youtube,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
  email: Mail,
  globe: Globe,
  website: Globe,
  twitter: Twitter,
  x: Twitter,
  facebook: Facebook,
  youtube: Youtube,
};

export function resolveIcon(icon: string | null): LucideIcon {
  if (!icon) return LinkIcon;
  return ICON_MAP[icon.toLowerCase()] ?? LinkIcon;
}

export const ICON_OPTIONS = Object.keys(ICON_MAP);
