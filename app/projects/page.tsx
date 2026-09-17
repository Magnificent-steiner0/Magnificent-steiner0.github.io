import type { Metadata } from "next";
import { getAllProjects, getAllProjectTags } from "@/lib/content";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata: Metadata = {
  title: "Projects — Asif Mahmud",
  description:
    "Explore projects by Asif Mahmud across AI, machine learning, computer vision, and full-stack development.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const allTags = getAllProjectTags();

  return <ProjectsClient projects={projects} allTags={allTags} />;
}
