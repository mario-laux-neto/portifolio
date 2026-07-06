import { getSkills } from "@/lib/queries";
import { SkillsManager } from "@/components/admin/SkillsManager";
import { PageHeader } from "@/components/admin/ui";

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Skills" description="Badges exibidas na seção Sobre." />
      <SkillsManager initialSkills={skills} />
    </div>
  );
}
