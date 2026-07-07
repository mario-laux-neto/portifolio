"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
      <p className="text-ink-100">Algo deu errado ao carregar esta seção.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md border border-cyan-500 px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-500/10"
      >
        Tentar novamente
      </button>
    </div>
  );
}
