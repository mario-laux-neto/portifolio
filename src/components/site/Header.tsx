"use client";

import { useState } from "react";
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

  return (
    <header className="fixed top-0 z-50 w-full border-b border-navy-700/60 bg-navy-950/80 backdrop-blur-md">
      <div className="section-shell flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          aria-label="início"
          className="font-signature text-3xl leading-none text-violet-400 transition-colors hover:text-violet-300 sm:text-4xl"
        >
          mário.
        </Link>

        <nav className="hidden items-center gap-1 font-mono text-sm text-ink-300 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-4 py-2 transition-colors hover:text-violet-400"
            >
              {item.label}
            </a>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 rounded-md border border-violet-500/60 px-4 py-2 text-violet-400 transition-all hover:-translate-y-0.5 hover:bg-violet-500/10"
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
                  className="rounded-md px-2 py-3 text-ink-300 transition-colors hover:text-violet-400"
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
                  className="mt-2 rounded-md border border-violet-500/60 px-4 py-3 text-center text-violet-400"
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
