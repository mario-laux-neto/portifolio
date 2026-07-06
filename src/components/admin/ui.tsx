"use client";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-mono text-ink-500">{label}</span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-md border border-navy-600 bg-navy-900 px-3 py-2 text-sm text-ink-100 outline-none transition-colors focus:border-violet-500";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClasses} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClasses} ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClasses} ${props.className ?? ""}`} />;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
}) {
  const variants = {
    primary: "bg-violet-500 text-navy-950 hover:bg-violet-400 disabled:opacity-60",
    ghost: "border border-navy-600 text-ink-300 hover:border-violet-500 hover:text-violet-400",
    danger: "text-red-400 hover:bg-red-500/10",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
    />
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-navy-700 bg-navy-800/50 p-6 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-ink-100">{title}</h1>
      {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
    </div>
  );
}
