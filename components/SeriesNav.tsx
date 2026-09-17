"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface SeriesPost {
  slug: string;
  title: string;
}

interface SeriesNavProps {
  seriesName: string;
  posts: SeriesPost[];
  currentIndex: number;
}

export default function SeriesNav({ seriesName, posts, currentIndex }: SeriesNavProps) {
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "12px",
        background: "var(--bg-card)",
        overflow: "hidden",
        marginBottom: "2.5rem",
      }}
    >
      {/* Series header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.875rem 1.25rem",
          borderBottom: "1px solid var(--border)",
          background: "rgba(79, 156, 249, 0.05)",
        }}
      >
        <BookOpen size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
        <span
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--accent)",
          }}
        >
          {seriesName}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            marginLeft: "auto",
          }}
        >
          Part {currentIndex + 1} of {posts.length}
        </span>
      </div>

      {/* Post list */}
      <div style={{ padding: "0.5rem 0" }}>
        {posts.map((post, i) => {
          const isCurrent = i === currentIndex;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.625rem 1.25rem",
                textDecoration: "none",
                transition: "background 0.15s ease",
                background: isCurrent ? "rgba(79, 156, 249, 0.08)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isCurrent) {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.03)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = isCurrent
                  ? "rgba(79, 156, 249, 0.08)"
                  : "transparent";
              }}
            >
              {/* Step indicator */}
              <span
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  flexShrink: 0,
                  border: "1.5px solid",
                  ...(isCurrent
                    ? {
                        background: "var(--accent)",
                        borderColor: "var(--accent)",
                        color: "#fff",
                      }
                    : i < currentIndex
                    ? {
                        background: "rgba(79, 156, 249, 0.15)",
                        borderColor: "rgba(79, 156, 249, 0.3)",
                        color: "var(--accent)",
                      }
                    : {
                        background: "transparent",
                        borderColor: "var(--border)",
                        color: "var(--text-muted)",
                      }),
                }}
              >
                {i + 1}
              </span>

              <span
                style={{
                  fontSize: "0.8125rem",
                  lineHeight: 1.4,
                  color: isCurrent
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  fontWeight: isCurrent ? 600 : 400,
                }}
              >
                {post.title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Prev/Next navigation */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid var(--border)",
        }}
      >
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.75rem 1.25rem",
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.15s ease",
              borderRight: nextPost ? "1px solid var(--border)" : "none",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "var(--text-secondary)")
            }
          >
            <ChevronLeft size={14} />
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div style={{ flex: 1 }} />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "0.375rem",
              padding: "0.75rem 1.25rem",
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "var(--text-secondary)")
            }
          >
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {nextPost.title}
            </span>
            <ChevronRight size={14} />
          </Link>
        ) : (
          <div style={{ flex: 1 }} />
        )}
      </div>
    </div>
  );
}
