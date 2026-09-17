import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import SkillSection from "@/components/SkillSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import SectionHeading from "@/components/SectionHeading";
import { getFeaturedProjects } from "@/lib/content";
import { getRecentBlogs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Asif Mahmud — AI Engineer & Full Stack Developer",
  description:
    "Portfolio of Asif Mahmud — AI Engineer specializing in medical imaging, NLP, and full-stack development. KUET CSE graduate.",
};

export default function Home() {
  const recentBlogs = getRecentBlogs(4);
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Hero />

      {/* Featured Projects */}
      <section id="projects" aria-label="Featured Projects" className="section">
        <div className="container-pad">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            <SectionHeading
              title="Featured Projects"
              subtitle="A selection of my best work"
            />
            <Link
              href="/projects"
              id="btn-view-all-projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.875rem",
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              View All Projects <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                borderRadius: "8px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <SkillSection />

      {/* Latest Blogs */}
      <section id="blog" aria-label="Latest Blog Posts" className="section">
        <div className="container-pad">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            <SectionHeading
              title="Latest Articles"
              subtitle="Technical writing on AI & engineering"
            />
            <Link
              href="/blog"
              id="btn-read-all-blogs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.875rem",
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Read All Articles <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {recentBlogs.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <EducationSection />
      <ContactSection />
    </>
  );
}
