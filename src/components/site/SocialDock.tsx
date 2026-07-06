import type { Link as LinkRow } from "@/lib/types";
import { resolveIcon } from "@/lib/icon-map";

export function SocialDock({ links }: { links: LinkRow[] }) {
  if (!links.length) return null;

  return (
    <div className="fixed bottom-0 left-6 z-40 hidden lg:block xl:left-12">
      <div className="flex flex-col items-center gap-6 after:mt-6 after:block after:h-24 after:w-px after:bg-navy-600">
        {links.map((link) => {
          const Icon = resolveIcon(link.icon);
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-ink-500 transition-all duration-200 hover:-translate-y-1 hover:text-violet-400"
            >
              <Icon size={20} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
