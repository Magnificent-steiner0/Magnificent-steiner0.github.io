"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = useCallback(() => {
    if (project.screenshots.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentImage((prev) => {
          const next = (prev + 1) % project.screenshots.length;
          setNextImage(next);
          return next;
        });
        setFading(false);
      }, 300);
    }, 2000);
  }, [project.screenshots.length]);

  const stopCycling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImage(0);
    setFading(false);
  }, []);

  const hasLive = !!project.liveUrl;
  const hasGithub = !!project.githubUrl;

  return (
    <article
      className="glass-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Screenshot area */}
      <Link
        href={`/projects/${project.slug}`}
        style={{ display: "block", textDecoration: "none" }}
        onMouseEnter={startCycling}
        onMouseLeave={stopCycling}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            overflow: "hidden",
            background: "var(--bg-secondary)",
          }}
        >
          <PlaceholderImage
            index={currentImage}
            slug={project.slug}
            title={project.title}
            fading={fading}
          />
        </div>
      </Link>

      {/* Content */}
      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "0.875rem",
        }}
      >
        {/* Tags & Metric */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.375rem" }}>
          {project.slug === "brain-ct-classifier" && (
            <span className="metric-badge">0.89 Mean AUC</span>
          )}
          {project.slug === "ai-customer-support-chatbot" && (
            <span className="metric-badge">Local RAG • $0 Cost</span>
          )}
          {project.slug === "tfidf-faiss-recommendations" && (
            <span className="metric-badge">~90x Speedup</span>
          )}
          {project.slug === "ai-writing-agent" && (
            <span className="metric-badge">LangGraph 3-Agent</span>
          )}
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono), monospace",
                padding: "0.15rem 0.5rem",
                borderRadius: "4px",
                background: "rgba(255, 255, 255, 0.05)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link
          href={`/projects/${project.slug}`}
          style={{ textDecoration: "none" }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.3,
              margin: 0,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "var(--text-primary)")
            }
          >
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="pill" style={{ fontSize: "0.6875rem" }}>
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span
              className="pill"
              style={{
                fontSize: "0.6875rem",
                background: "rgba(255,255,255,0.04)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "0.625rem", marginTop: "0.25rem" }}>
          <a
            href={project.liveUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            id={`btn-live-${project.slug}`}
            aria-label={`Live demo for ${project.title}`}
            aria-disabled={!hasLive}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.45rem 0.875rem",
              borderRadius: "6px",
              fontSize: "0.8125rem",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid",
              transition: "all 0.2s ease",
              ...(hasLive
                ? {
                    background: "var(--accent)",
                    color: "#fff",
                    borderColor: "var(--accent)",
                    cursor: "pointer",
                  }
                : {
                    background: "transparent",
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                    cursor: "not-allowed",
                    pointerEvents: "none",
                    opacity: 0.5,
                  }),
            }}
          >
            <ExternalLink size={13} />
            Live Demo
          </a>

          <a
            href={project.githubUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            id={`btn-github-${project.slug}`}
            aria-label={`GitHub for ${project.title}`}
            aria-disabled={!hasGithub}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.45rem 0.875rem",
              borderRadius: "6px",
              fontSize: "0.8125rem",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid",
              transition: "all 0.2s ease",
              ...(hasGithub
                ? {
                    background: "transparent",
                    color: "var(--text-secondary)",
                    borderColor: "var(--border)",
                    cursor: "pointer",
                  }
                : {
                    background: "transparent",
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                    cursor: "not-allowed",
                    pointerEvents: "none",
                    opacity: 0.5,
                  }),
            }}
            onMouseEnter={(e) => {
              if (hasGithub) {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text-primary)";
                el.style.borderColor = "var(--border-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (hasGithub) {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--text-secondary)";
                el.style.borderColor = "var(--border)";
              }
            }}
          >
            <Github size={13} />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

// Colored placeholder image component
function PlaceholderImage({
  index,
  slug,
  title,
  fading,
}: {
  index: number;
  slug: string;
  title: string;
  fading: boolean;
}) {
  const colors: Record<string, string[]> = {
    "brain-ct-classifier": ["#0f2027", "#203a43", "#2c5364"],
    "microjobs-portal": ["#0f0c29", "#302b63", "#24243e"],
    "ai-customer-support-chatbot": ["#0f2027", "#1a1a2e", "#16213e"],
    "snake-maramari": ["#0a0a0a", "#1a1a1a", "#0d1117"],
    "ai-writing-agent": ["#1a0533", "#2d1b69", "#11003a"],
  };

  const gradients = [
    ["#0f2027", "#203a43"],
    ["#16213e", "#0f3460"],
    ["#1a0533", "#2d1b69"],
  ];

  const slugColors = colors[slug] || gradients[index % gradients.length];
  const bg = `linear-gradient(135deg, ${slugColors[0]} 0%, ${slugColors[Math.min(1, slugColors.length - 1)]} 100%)`;

  const icons: Record<string, string> = {
    "brain-ct-classifier": "🧠",
    "microjobs-portal": "💼",
    "ai-customer-support-chatbot": "🤖",
    "snake-maramari": "🐍",
    "ai-writing-agent": "✍️",
  };

  const icon = icons[slug] || "📁";
  const labels = ["Overview", "Architecture", "Results"];
  const label = labels[index % labels.length];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.3s ease",
        position: "absolute",
        inset: 0,
      }}
    >
      <span style={{ fontSize: "3rem" }}>{icon}</span>
      <span
        style={{
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}
