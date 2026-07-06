import { getExperiences } from "@/lib/queries";
import { ExperienceManager } from "@/components/admin/ExperienceManager";
import { PageHeader } from "@/components/admin/ui";

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Experiência" description="Histórico profissional exibido no site." />
      <ExperienceManager initialExperiences={experiences} />
    </div>
  );
}
