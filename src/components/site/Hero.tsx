import type { Profile } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";

function whatsappHref(whatsapp?: string | null) {
  if (!whatsapp) return "#contact";
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function Hero({ profile }: { profile: Profile | null }) {
  return (
    <section
      id="home"
      className="section-shell flex min-h-[92vh] flex-col justify-center gap-6 pt-24"
    >
      <Reveal>
        <p className="font-mono text-sm text-violet-400 sm:text-base">
          Olá, meu nome é
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="text-4xl font-bold leading-[1.1] text-ink-100 sm:text-6xl lg:text-7xl">
          {profile?.name ?? "Mário Laux Neto"}
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <h2 className="text-3xl font-bold leading-[1.1] text-ink-500 sm:text-5xl lg:text-6xl">
          {profile?.role ?? "Full-Stack em desenvolvimento"}
        </h2>
      </Reveal>

      {profile?.hero_bio && (
        <Reveal delay={0.24} className="max-w-xl">
          <p className="text-lg leading-relaxed text-ink-300">
            {profile.hero_bio}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.32}>
        <a
          href={whatsappHref(profile?.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-md border border-violet-500 px-7 py-4 font-mono text-sm text-violet-400 transition-all hover:-translate-y-1 hover:bg-violet-500/10 hover:shadow-[0_10px_30px_-15px_rgba(139,92,246,0.5)]"
        >
          Entre em contato!
        </a>
      </Reveal>
    </section>
  );
}
