"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "#about", label: "Sobre" },
  { href: "#experience", label: "Experiência" },
  { href: "#projects", label: "Projetos" },
  { href: "#contact", label: "Contato" },
];

export function Header({ resumeUrl }: { resumeUrl?: string | null }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(NAV_ITEMS[0].href);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter((el): el is Element => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-navy-700/60 bg-navy-950/80 backdrop-blur-md">
      <div className="section-shell flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          aria-label="início"
          className="font-signature text-3xl leading-none text-cyan-400 transition-colors hover:text-cyan-300 sm:text-4xl"
        >
          mário.
        </Link>

        <nav className="hidden items-center gap-1 font-mono text-sm text-ink-300 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative rounded-md px-4 py-2 transition-colors hover:text-cyan-400 ${
                active === item.href ? "text-cyan-400" : ""
              }`}
            >
              {item.label}
              {active === item.href && (
                <motion.span
                  layoutId="nav-active-indicator"
                  className="absolute inset-x-4 -bottom-px h-0.5 bg-cyan-400"
                  transition={{ duration: 0.25 }}
                />
              )}
            </a>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 rounded-md border border-cyan-500/60 px-4 py-2 text-cyan-400 transition-all hover:-translate-y-0.5 hover:bg-cyan-500/10"
            >
              Currículo
            </a>
          )}
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="text-ink-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-navy-700/60 bg-navy-950 font-mono text-sm md:hidden"
          >
            <div className="section-shell flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-2 py-3 transition-colors hover:text-cyan-400 ${
                    active === item.href ? "text-cyan-400" : "text-ink-300"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-md border border-cyan-500/60 px-4 py-3 text-center text-cyan-400"
                >
                  Currículo
                </a>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
