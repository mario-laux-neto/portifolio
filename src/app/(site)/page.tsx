import { getExperiences, getLinks, getProfile, getProjects, getSkills } from "@/lib/queries";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Projects } from "@/components/site/Projects";
import { Contact } from "@/components/site/Contact";

export default async function HomePage() {
  const [profile, skills, experiences, projects, links] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperiences(),
    getProjects(),
    getLinks(),
  ]);

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} skills={skills} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Contact profile={profile} links={links} />
    </>
  );
}
