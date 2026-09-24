"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const [imgError, setImgError] = useState(false);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const hasCoverImage = Boolean(post.coverImage) && !imgError;

  return (
    <article
      className="glass-card blog-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Cover image area */}
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            height: "180px",
            position: "relative",
            overflow: "hidden",
            background: coverGradient(post.slug),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {hasCoverImage ? (
            <>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                className="blog-card-img"
                onError={() => setImgError(true)}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)",
                  pointerEvents: "none",
                }}
              />
            </>
          ) : (
            <span style={{ fontSize: "3.25rem", userSelect: "none" }}>
              {coverEmoji(post.slug)}
            </span>
          )}

          {/* Series badge */}
          {post.series && (
            <span
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.625rem",
                fontWeight: 600,
                padding: "0.25rem 0.625rem",
                borderRadius: "9999px",
                background: "rgba(15, 23, 42, 0.75)",
                color: "var(--accent)",
                border: "1px solid rgba(79, 156, 249, 0.35)",
                backdropFilter: "blur(8px)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                zIndex: 2,
              }}
            >
              <BookOpen size={10} />
              {post.series}
              {post.seriesOrder !== undefined && (
                <span style={{ opacity: 0.7 }}>
                  · Pt. {post.seriesOrder}
                </span>
              )}
            </span>
          )}
        </div>
      </Link>

      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "0.75rem",
        }}
      >
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="pill" style={{ fontSize: "0.6875rem" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.4,
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
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingTop: "0.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            <Calendar size={12} />
            {formattedDate}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            <Clock size={12} />
            {post.readingTime}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.75rem",
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Read <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function coverGradient(slug: string): string {
  const gradients: Record<string, string> = {
    "what_is_mcp_and_why_do_we_need_it":
      "linear-gradient(135deg, #091a28 0%, #102a45 50%, #1e3a5f 100%)",
    "brain-ct-classifier-mil":
      "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    "rag-customer-support-bot":
      "linear-gradient(135deg, #0f0c29 0%, #302b63 100%)",
    "tfidf-faiss-recommendations":
      "linear-gradient(135deg, #1a0533 0%, #2d1b69 100%)",
    "langchain-writing-agent":
      "linear-gradient(135deg, #0a2342 0%, #1b4f8a 100%)",
  };
  return gradients[slug] || "linear-gradient(135deg, #0f1117 0%, #1a1a2e 100%)";
}

function coverEmoji(slug: string): string {
  const emojis: Record<string, string> = {
    "what_is_mcp_and_why_do_we_need_it": "🔌",
    "brain-ct-classifier-mil": "🧠",
    "rag-customer-support-bot": "🤖",
    "tfidf-faiss-recommendations": "🔍",
    "langchain-writing-agent": "✍️",
  };
  return emojis[slug] || "📝";
}
