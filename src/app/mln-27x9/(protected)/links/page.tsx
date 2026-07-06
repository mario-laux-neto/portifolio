import { getLinks } from "@/lib/queries";
import { LinksManager } from "@/components/admin/LinksManager";
import { PageHeader } from "@/components/admin/ui";

export default async function AdminLinksPage() {
  const links = await getLinks();

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Links" description="Redes sociais exibidas no site público." />
      <LinksManager initialLinks={links} />
    </div>
  );
}
