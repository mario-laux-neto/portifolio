import type { Profile } from "@/lib/types";
import { ChevronDown } from "lucide-react";
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
      className="section-shell relative flex min-h-[92vh] flex-col justify-center gap-6 pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[120px]"
      />

      <Reveal>
        <p className="font-mono text-sm text-cyan-400 sm:text-base">
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
          className="mt-4 inline-block rounded-md border border-cyan-500 px-7 py-4 font-mono text-sm text-cyan-400 shadow-[0_0_25px_-8px_rgba(56,189,248,0.5)] transition-all hover:-translate-y-1 hover:bg-cyan-500/10"
        >
          Entre em contato!
        </a>
      </Reveal>

      <a
        href="#about"
        aria-label="Rolar para a seção Sobre mim"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-500 transition-colors hover:text-cyan-400"
      >
        <ChevronDown className="animate-bounce" size={28} />
      </a>
    </section>
  );
}
