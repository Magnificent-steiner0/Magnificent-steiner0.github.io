import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import type { Project } from "@/lib/types";

export function generateStaticParams() {
  return getAllProjects().map((p: Project) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Asif Mahmud`,
    description: project.description,
  };
}

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const allProjects: Project[] = getAllProjects();
  const related = allProjects
    .filter(
      (p: Project) =>
        p.slug !== project.slug &&
        p.tags.some((t: string) => project.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      {/* Hero banner */}
      <div
        style={{
          background: projectGradient(project.slug),
          borderBottom: "1px solid var(--border)",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container-pad">
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              marginBottom: "2rem",
              transition: "color 0.2s ease",
            }}
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  background: "rgba(167,139,250,0.15)",
                  color: "var(--accent-2)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              maxWidth: "700px",
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
            }}
          >
            {project.description}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href={project.liveUrl || undefined}
              target="_blank"
              rel="noopener noreferrer"
              id={`detail-live-${project.slug}`}
              aria-disabled={!project.liveUrl}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid",
                transition: "all 0.2s ease",
                ...(project.liveUrl
                  ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)", cursor: "pointer" }
                  : { background: "transparent", color: "var(--text-muted)", borderColor: "var(--border)", cursor: "not-allowed", opacity: 0.5, pointerEvents: "none" }),
              }}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={project.githubUrl || undefined}
              target="_blank"
              rel="noopener noreferrer"
              id={`detail-github-${project.slug}`}
              aria-disabled={!project.githubUrl}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                background: "rgba(255,255,255,0.04)",
                transition: "all 0.2s ease",
                ...(project.githubUrl ? { cursor: "pointer" } : { cursor: "not-allowed", opacity: 0.5, pointerEvents: "none" }),
              }}
            >
              <Github size={14} /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-pad" style={{ padding: "3rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="detail-grid"
        >
          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Overview */}
            <DetailCard title="Overview">
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.9375rem" }}>
                {project.overview}
              </p>
            </DetailCard>

            {/* Problem */}
            <DetailCard title="Problem Statement">
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.9375rem" }}>
                {project.problemStatement}
              </p>
            </DetailCard>

            {/* Architecture */}
            <DetailCard title="Architecture">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {project.architecture.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    <span className="accent-dot" style={{ marginTop: "0.45rem", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailCard>

            {/* Challenges + Solutions side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="cs-grid">
              <DetailCard title="Challenges">
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {project.challenges.map((c, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      <span style={{ color: "#f87171", marginTop: "0.35rem", flexShrink: 0 }}>✗</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </DetailCard>
              <DetailCard title="Solutions">
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {project.solutions.map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      <span style={{ color: "#4ade80", marginTop: "0.35rem", flexShrink: 0 }}>✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </DetailCard>
            </div>

            {/* Lessons */}
            <DetailCard title="Lessons Learned">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {project.lessonsLearned.map((l, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    <span style={{ fontSize: "0.9rem", marginTop: "0.1rem" }}>💡</span>
                    {l}
                  </li>
                ))}
              </ul>
            </DetailCard>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }} className="detail-sidebar">
            {/* Tech stack */}
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>
                Tech Stack
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="pill">{tech}</span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>
                Categories
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag: string) => (
                  <span key={tag} style={{ fontSize: "0.75rem", padding: "0.25rem 0.625rem", borderRadius: "9999px", background: "rgba(167,139,250,0.1)", color: "var(--accent-2)", border: "1px solid rgba(167,139,250,0.2)", fontWeight: 500 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
              Related Projects
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {related.map((p: Project) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="glass-card" style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>{p.title}</h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .cs-grid { grid-template-columns: 1fr !important; } .detail-sidebar { order: -1; } }
      `}</style>
    </div>
  );
}

function DetailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card" style={{ padding: "1.5rem" }}>
      <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function projectGradient(slug: string): string {
  const gradients: Record<string, string> = {
    "brain-ct-classifier": "linear-gradient(180deg, rgba(15,32,39,0.8) 0%, var(--bg-primary) 100%)",
    "microjobs-portal": "linear-gradient(180deg, rgba(15,12,41,0.8) 0%, var(--bg-primary) 100%)",
    "ai-customer-support-chatbot": "linear-gradient(180deg, rgba(15,32,39,0.8) 0%, var(--bg-primary) 100%)",
    "snake-maramari": "linear-gradient(180deg, rgba(10,10,10,0.8) 0%, var(--bg-primary) 100%)",
    "ai-writing-agent": "linear-gradient(180deg, rgba(26,5,51,0.8) 0%, var(--bg-primary) 100%)",
  };
  return gradients[slug] || "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)";
}
