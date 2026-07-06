interface SectionHeadingProps {
  index: string;
  title: string;
  align?: "left" | "center";
}

export function SectionHeading({ index, title, align = "left" }: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 flex items-center gap-4 ${
        align === "center" ? "justify-center text-center" : ""
      }`}
    >
      <span className="font-mono text-sm text-violet-400">{index}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-ink-100 sm:text-3xl">
        {title}
      </h2>
      {align === "left" && (
        <span className="ml-4 hidden h-px flex-1 bg-navy-600 sm:block" />
      )}
    </div>
  );
}
