import { getProfile } from "@/lib/queries";
import { ProfileForm } from "@/components/admin/ProfileForm";
import { PageHeader } from "@/components/admin/ui";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Perfil"
        description="Informações exibidas no Hero e na seção Sobre do site."
      />
      <ProfileForm initialProfile={profile} />
    </div>
  );
}
