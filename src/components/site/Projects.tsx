"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  FolderCode,
  Github,
  X,
} from "lucide-react";
import type { Project } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SPAN_PATTERN = ["lg:col-span-4", "lg:col-span-2"];

export function Projects({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  if (!projects.length) return null;

  return (
    <section id="projects" className="section-shell py-24 sm:py-32">
      <SectionHeading index="03." title="Projetos" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            className={SPAN_PATTERN[i % SPAN_PATTERN.length]}
            onPreview={() => setSelected(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  className,
  onPreview,
}: {
  project: Project;
  className: string;
  onPreview: () => void;
}) {
  const cover = project.images[0];

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-navy-700 bg-navy-800/60 transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-navy-900">
        {project.video_url ? (
          <video
            src={project.video_url}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
        ) : cover ? (
          <Image
            src={cover.image_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-navy-500">
            <FolderCode size={40} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-ink-100">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-300">
          {project.description}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded border border-navy-600 px-2 py-0.5 font-mono text-xs text-violet-400"
              >
                {tag.tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-navy-600 px-3 py-2 text-xs font-semibold text-ink-300 transition-colors hover:border-violet-500 hover:text-violet-400"
            >
              <Github size={14} /> Repositório
            </a>
          )}
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex items-center gap-2 rounded-md bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-400 transition-colors hover:bg-violet-500/20"
          >
            <Eye size={14} /> Prévia
          </button>
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-violet-500 px-3 py-2 text-xs font-semibold text-navy-950 transition-colors hover:bg-violet-400"
            >
              <ExternalLink size={14} /> Site
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const images = project.images;

  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-navy-700 bg-navy-800 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-navy-700 p-5">
          <h3 className="text-lg font-semibold text-ink-100">{project.title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-2 text-ink-300 transition-colors hover:bg-navy-700 hover:text-ink-100"
          >
            <X size={20} />
          </button>
        </div>

        {project.video_url ? (
          <div className="p-5">
            <video
              src={project.video_url}
              controls
              className="mx-auto max-h-[360px] w-full rounded-lg bg-navy-950"
            />
          </div>
        ) : images.length > 0 ? (
          <div className="relative h-[360px] w-full overflow-hidden bg-navy-950">
            <Image
              src={images[index].image_url}
              alt={`${project.title} - imagem ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Imagem anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-violet-500 bg-navy-950/60 p-2 text-violet-400 hover:bg-violet-500 hover:text-navy-950"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Próxima imagem"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-violet-500 bg-navy-950/60 p-2 text-violet-400 hover:bg-violet-500 hover:text-navy-950"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex h-[240px] items-center justify-center text-navy-500">
            <FolderCode size={48} />
          </div>
        )}

        {images.length > 1 && !project.video_url && (
          <div className="flex justify-center gap-2 py-4">
            {images.map((image, i) => (
              <button
                key={image.id}
                aria-label={`Ir para imagem ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === index ? "bg-violet-400" : "bg-ink-700"
                }`}
              />
            ))}
          </div>
        )}

        <div className="space-y-4 p-6 text-ink-300">
          <p className="leading-relaxed">{project.description}</p>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-navy-950 px-3 py-1 font-mono text-xs text-violet-400"
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
