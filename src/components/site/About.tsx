import Image from "next/image";
import type { Profile, Skill } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About({
  profile,
  skills,
}: {
  profile: Profile | null;
  skills: Skill[];
}) {
  const initials = (profile?.name ?? "M")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <section id="about" className="section-shell py-24 sm:py-32">
      <Reveal>
        <SectionHeading index="01." title="Sobre mim" />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <Reveal delay={0.08} className="space-y-5 text-ink-300">
          {profile?.about_paragraph_1 && <p>{profile.about_paragraph_1}</p>}
          {profile?.about_paragraph_2 && <p>{profile.about_paragraph_2}</p>}

          {skills.length > 0 && (
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-sm sm:grid-cols-3">
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-center gap-2">
                  <span className="text-violet-400">▹</span>
                  {skill.name}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={0.16} className="mx-auto w-full max-w-xs">
          <div className="group relative aspect-square w-full">
            <div className="absolute inset-0 z-0 translate-x-4 translate-y-4 rounded-lg border-2 border-violet-500 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
            <div className="relative z-10 h-full w-full overflow-hidden rounded-lg bg-navy-800 shadow-[0_10px_30px_-15px_rgba(2,6,23,0.7)]">
              {profile?.photo_url ? (
                <Image
                  src={profile.photo_url}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 768px) 70vw, 320px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-signature text-6xl text-violet-400">
                  {initials}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
