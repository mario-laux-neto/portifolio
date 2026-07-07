import { getProfile } from "@/lib/queries";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FlashlightEffect } from "@/components/site/FlashlightEffect";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <>
      <FlashlightEffect />
      <Header resumeUrl={profile?.resume_url} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
