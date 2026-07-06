import { getLinks, getProfile } from "@/lib/queries";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SocialDock } from "@/components/site/SocialDock";
import { FlashlightEffect } from "@/components/site/FlashlightEffect";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, links] = await Promise.all([getProfile(), getLinks()]);

  return (
    <>
      <FlashlightEffect />
      <Header resumeUrl={profile?.resume_url} />
      <SocialDock links={links} />
      <main>{children}</main>
      <Footer links={links} />
    </>
  );
}
