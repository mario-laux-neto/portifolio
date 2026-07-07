import type { Experience as ExperienceType } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience({ experiences }: { experiences: ExperienceType[] }) {
  if (!experiences.length) return null;

  return (
    <section id="experience" className="section-shell py-24 sm:py-32">
      <SectionHeading index="02." title="Onde trabalhei" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {experiences.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 0.08}>
            <article className="group flex h-full flex-col rounded-xl border border-navy-700 bg-navy-800/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/60 hover:shadow-[0_10px_40px_-15px_rgba(56,189,248,0.35)]">
              <p className="font-mono text-xs text-ink-500 sm:text-sm">
                {exp.period}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-ink-100 sm:text-xl">
                {exp.role}
              </h3>
              <p className="font-mono text-sm text-cyan-400">@ {exp.company}</p>

              <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-300">
                {exp.tasks.map((task) => (
                  <li key={task.id} className="flex gap-3">
                    <span className="mt-1 text-cyan-400">▹</span>
                    <span>{task.description}</span>
                  </li>
                ))}
              </ul>

              {exp.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded border border-navy-600 bg-navy-900 px-2.5 py-1 font-mono text-xs text-cyan-400"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
