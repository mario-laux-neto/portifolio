import type { Metadata } from "next";
import { ToastProvider } from "@/components/admin/ToastProvider";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-950 text-ink-100">
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
