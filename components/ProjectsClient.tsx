"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/types";

interface ProjectsClientProps {
  projects: Project[];
  allTags: string[];
}

export default function ProjectsClient({ projects, allTags }: ProjectsClientProps) {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div className="container-pad section">
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            All Projects
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "500px" }}>
            A full collection of my projects spanning AI, computer vision, full-stack development, and research.
          </p>
          <div
            style={{
              width: "2.5rem",
              height: "3px",
              borderRadius: "9999px",
              background: "var(--gradient-hero)",
              marginTop: "1rem",
            }}
          />
        </div>

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Project filter"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {allTags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                role="tab"
                aria-selected={isActive}
                id={`filter-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 600 : 400,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 0",
              color: "var(--text-muted)",
            }}
          >
            No projects found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
