"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ADMIN_BASE_PATH } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Informe email e senha.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError("Credenciais inválidas.");
      return;
    }

    router.push(ADMIN_BASE_PATH);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-navy-700 bg-navy-800/60 p-8"
      >
        <h1 className="font-signature text-4xl text-cyan-400">mário.</h1>
        <p className="mt-2 text-sm text-ink-500">Acesso restrito</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-mono text-ink-500">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-navy-600 bg-navy-950 px-3 py-2 text-sm text-ink-100 outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-mono text-ink-500">
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-navy-600 bg-navy-950 px-3 py-2 text-sm text-ink-100 outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-cyan-400 disabled:opacity-60"
        >
          <LogIn size={16} />
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
