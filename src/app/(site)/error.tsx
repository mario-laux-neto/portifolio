"use client";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-signature text-5xl text-violet-400">mário.</p>
      <h1 className="text-2xl font-semibold text-ink-100">Algo deu errado</h1>
      <p className="max-w-sm text-ink-300">
        Não foi possível carregar esta página. Tente novamente em instantes.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-block rounded-md border border-violet-500 px-6 py-3 font-mono text-sm text-violet-400 transition-all hover:-translate-y-1 hover:bg-violet-500/10"
      >
        Tentar novamente
      </button>
    </div>
  );
}
