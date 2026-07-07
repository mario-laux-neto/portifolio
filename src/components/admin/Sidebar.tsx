"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  FolderKanban,
  Link as LinkIcon,
  LogOut,
  Sparkles,
  UserRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ADMIN_BASE_PATH, ADMIN_LOGIN_PATH } from "@/lib/constants";

const NAV_ITEMS = [
  { href: `${ADMIN_BASE_PATH}/perfil`, label: "Perfil", icon: UserRound },
  { href: `${ADMIN_BASE_PATH}/skills`, label: "Skills", icon: Sparkles },
  { href: `${ADMIN_BASE_PATH}/experiencia`, label: "Experiência", icon: Briefcase },
  { href: `${ADMIN_BASE_PATH}/projetos`, label: "Projetos", icon: FolderKanban },
  { href: `${ADMIN_BASE_PATH}/links`, label: "Links", icon: LinkIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(ADMIN_LOGIN_PATH);
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-navy-700 bg-navy-900 px-4 py-6">
      <p className="mb-8 px-2 font-signature text-3xl text-cyan-400">mário.</p>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-ink-300 hover:bg-navy-800 hover:text-ink-100"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink-500 transition-colors hover:bg-navy-800 hover:text-red-400"
      >
        <LogOut size={16} />
        Sair
      </button>
    </aside>
  );
}
