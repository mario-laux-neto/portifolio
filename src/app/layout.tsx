import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Caveat } from "next/font/google";
import { getProfile } from "@/lib/queries";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const name = profile?.name ?? "Mário Laux Neto";
  const role = profile?.role ?? "Desenvolvedor Full-Stack";
  const description = profile?.hero_bio ?? "Portfólio pessoal de desenvolvedor full-stack.";

  return {
    title: `${name} | ${role}`,
    description,
    openGraph: {
      title: `${name} | ${role}`,
      description,
      type: "website",
      locale: "pt_BR",
      images: profile?.photo_url ? [{ url: profile.photo_url }] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-br"
      className={`${manrope.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
