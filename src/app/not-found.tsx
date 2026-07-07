import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-signature text-5xl text-cyan-400">mário.</p>
      <h1 className="text-6xl font-bold text-ink-100">404</h1>
      <p className="max-w-sm text-ink-300">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-md border border-cyan-500 px-6 py-3 font-mono text-sm text-cyan-400 transition-all hover:-translate-y-1 hover:bg-cyan-500/10"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
