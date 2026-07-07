import type { Link as LinkRow, Profile } from "@/lib/types";
import { resolveIcon } from "@/lib/icon-map";
import { Reveal } from "@/components/ui/Reveal";

function whatsappHref(whatsapp?: string | null) {
  if (!whatsapp) return null;
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function Contact({
  profile,
  links,
}: {
  profile: Profile | null;
  links: LinkRow[];
}) {
  const wa = whatsappHref(profile?.whatsapp);

  return (
    <section id="contact" className="section-shell py-24 text-center sm:py-32">
      <Reveal className="mx-auto max-w-xl">
        <p className="font-mono text-sm text-cyan-400">04. O que vem a seguir?</p>
        <h2 className="mt-4 text-4xl font-bold text-ink-100 sm:text-5xl">
          Entre em contato
        </h2>
        <p className="mt-6 leading-relaxed text-ink-300">
          Estou sempre aberto a novas oportunidades e conexões interessantes. Se
          você tem alguma pergunta, projeto ou apenas quer trocar uma ideia,
          ficarei feliz em conversar!
        </p>

        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-md border border-cyan-500 px-8 py-4 font-mono text-sm text-cyan-400 shadow-[0_0_25px_-8px_rgba(56,189,248,0.5)] transition-all hover:-translate-y-1 hover:bg-cyan-500/10"
          >
            Vamos conversar!
          </a>
        )}

        {links.length > 0 && (
          <div className="mt-12 flex justify-center gap-8">
            {links.map((link) => {
              const Icon = resolveIcon(link.icon);
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-ink-300 transition-all hover:-translate-y-1 hover:text-cyan-400"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        )}
      </Reveal>
    </section>
  );
}
