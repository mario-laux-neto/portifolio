# Portfólio — Mário Laux Neto

Site pessoal em Next.js (App Router + TypeScript) consumindo o Supabase diretamente
(sem API própria). Site público em Server Components; painel administrativo protegido
por Supabase Auth para editar todo o conteúdo (perfil, skills, experiências, projetos e links).

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4
- Supabase (`@supabase/supabase-js` + `@supabase/ssr`)
- Framer Motion, lucide-react

## Rodando localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie `.env.local.example` para `.env.local` e preencha com as chaves do seu projeto Supabase
   (Project Settings → API):

   ```bash
   cp .env.local.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-anon-key>
   ```

3. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   Site público: [http://localhost:3000](http://localhost:3000)
   Painel admin: `http://localhost:3000/mln-27x9` (veja abaixo sobre essa rota).

## Estrutura de dados (Supabase)

O schema (tabelas `profile`, `skills`, `experiences`, `experience_tasks`, `experience_tags`,
`projects`, `project_tags`, `project_images`, `links`) e os buckets de Storage (`photos`,
`resume`, `project-media`) já devem existir no projeto Supabase. Leitura é pública em todas
as tabelas/buckets; escrita exige um usuário autenticado.

> **Nota desta configuração:** ao integrar o projeto, as políticas de RLS e os buckets de
> Storage só existiam para a tabela `profile` — as demais tabelas tinham RLS habilitado sem
> nenhuma política (bloqueando toda leitura) e os buckets não existiam. Ambos foram criados
> para espelhar exatamente o padrão de `profile` (SELECT público, ALL para `authenticated`).
> Se você recriar o projeto Supabase do zero, replique isso antes de usar o painel.

## Autenticação do admin

- Rota do painel: **`/mln-27x9`** (slug propositalmente discreto — não aparece em nenhum
  menu, link ou sitemap do site público, e é bloqueada via `robots.txt`).
- Login com email/senha via Supabase Auth (`/mln-27x9/login`). Não há cadastro público —
  crie o usuário admin em Supabase Dashboard → Authentication → Users → Add user.
- Um usuário temporário foi criado durante o desenvolvimento
  (`marioneto@unochapeco.edu.br` / senha temporária informada no chat). **Troque essa senha
  imediatamente** em Authentication → Users → selecione o usuário → Reset password.
- Se quiser trocar o slug da rota, edite `ADMIN_BASE_PATH` em `src/lib/constants.ts`.

## Deploy na Vercel

1. Suba o repositório para o GitHub/GitLab/Bitbucket.
2. Importe o projeto em [vercel.com/new](https://vercel.com/new).
3. Configure as variáveis de ambiente no painel do projeto (Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. O build (`next build`) roda `next lint`/checagem de tipos automaticamente.

Nenhuma configuração adicional (`vercel.json`) é necessária — é um projeto Next.js padrão.

## Scripts

```bash
npm run dev     # desenvolvimento (Turbopack)
npm run build   # build de produção
npm run start   # serve o build de produção
npm run lint    # eslint
```
