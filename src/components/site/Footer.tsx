import type { Link as LinkRow } from "@/lib/types";
import { resolveIcon } from "@/lib/icon-map";

export function Footer({ links }: { links: LinkRow[] }) {
  return (
    <footer className="border-t border-navy-700/60 py-8">
      <div className="section-shell flex flex-col items-center gap-4 font-mono text-xs text-ink-500 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Mário Laux Neto.</p>
        <div className="flex items-center gap-4 md:hidden">
          {links.map((link) => {
            const Icon = resolveIcon(link.icon);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-ink-500 transition-colors hover:text-violet-400"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
        <p>Feito com Next.js, Tailwind &amp; Supabase.</p>
      </div>
    </footer>
  );
}
