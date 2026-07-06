"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Experience as ExperienceType } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience({ experiences }: { experiences: ExperienceType[] }) {
  const [active, setActive] = useState(0);

  if (!experiences.length) return null;
  const current = experiences[active];

  return (
    <section id="experience" className="section-shell py-24 sm:py-32">
      <SectionHeading index="02." title="Onde trabalhei" />

      <div className="flex flex-col gap-2 md:flex-row md:gap-0">
        <div
          role="tablist"
          aria-label="Empresas"
          className="no-scrollbar flex overflow-x-auto md:relative md:w-max md:flex-col md:overflow-visible md:border-l-2 md:border-navy-700"
        >
          {experiences.map((exp, i) => (
            <button
              key={exp.id}
              role="tab"
              id={`tab-${i}`}
              aria-selected={active === i}
              aria-controls={`panel-${i}`}
              onClick={() => setActive(i)}
              className={`relative whitespace-nowrap px-5 py-3 text-left font-mono text-sm transition-colors md:w-full ${
                active === i ? "text-violet-400" : "text-ink-500 hover:text-violet-400"
              }`}
            >
              {exp.company}
              {active === i && (
                <motion.span
                  layoutId="experience-highlight"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-violet-400 md:inset-y-0 md:left-[-2px] md:right-auto md:h-auto md:w-0.5"
                  transition={{ duration: 0.25 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[22rem] flex-1 md:ml-8">
          <div
            key={current.id}
            id={`panel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            className="animate-fade-up"
          >
            <h3 className="text-xl font-semibold text-ink-100 sm:text-2xl">
              {current.role} <span className="text-violet-400">@ {current.company}</span>
            </h3>
            <p className="mt-1 font-mono text-sm text-ink-500">{current.period}</p>

            <ul className="mt-5 space-y-3 text-ink-300">
              {current.tasks.map((task) => (
                <li key={task.id} className="flex gap-3">
                  <span className="mt-1 text-violet-400">▹</span>
                  <span>{task.description}</span>
                </li>
              ))}
            </ul>

            {current.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded border border-navy-600 bg-navy-800 px-2.5 py-1 font-mono text-xs text-violet-400"
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
