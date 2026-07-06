import { getProjects } from "@/lib/queries";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { PageHeader } from "@/components/admin/ui";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Projetos" description="Portfólio de projetos exibido no site." />
      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
