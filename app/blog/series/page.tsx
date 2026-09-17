import Link from "next/link";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import { getAllSeries } from "@/lib/content";
import type { BlogPost } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Series — Asif Mahmud",
  description:
    "Browse curated blog series on AI, machine learning, and software engineering topics.",
};

export default function SeriesListPage() {
  const allSeries = getAllSeries();

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div className="container-pad section">
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              marginBottom: "1.5rem",
              transition: "color 0.2s ease",
            }}
          >
            <ArrowLeft size={14} /> Back to Articles
          </Link>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Blog Series
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: "500px",
            }}
          >
            Deep dives into specific topics, organized as multi-part series.
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

        {/* Series grid */}
        {allSeries.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {allSeries.map((series) => (
              <Link
                key={series.slug}
                href={`/blog/${series.posts[0].slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: "1.5rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {/* Series icon + title */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                    }}
                  >
                    <div
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "10px",
                        background: "rgba(79, 156, 249, 0.1)",
                        border: "1px solid rgba(79, 156, 249, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <BookOpen
                        size={18}
                        style={{ color: "var(--accent)" }}
                      />
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "1.0625rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {series.name}
                      </h2>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {series.posts.length} part
                        {series.posts.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Post list preview */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.375rem",
                      flex: 1,
                    }}
                  >
                    {series.posts.map((post: BlogPost, i: number) => (
                      <div
                        key={post.slug}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.8125rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <span
                          style={{
                            width: "1.25rem",
                            height: "1.25rem",
                            borderRadius: "50%",
                            background: "rgba(79, 156, 249, 0.1)",
                            border: "1px solid rgba(79, 156, 249, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.625rem",
                            fontWeight: 700,
                            color: "var(--accent)",
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </span>
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {post.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.375rem",
                      paddingTop: "0.5rem",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    {series.tags.slice(0, 4).map((tag: string) => (
                      <span
                        key={tag}
                        className="pill"
                        style={{ fontSize: "0.6875rem" }}
                      >
                        {tag}
                      </span>
                    ))}
                    <span
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "0.75rem",
                        color: "var(--accent)",
                        fontWeight: 500,
                      }}
                    >
                      Start reading <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 0",
              color: "var(--text-muted)",
            }}
          >
            <BookOpen
              size={48}
              style={{ marginBottom: "1rem", opacity: 0.3 }}
            />
            <p>No series yet. Stay tuned for curated multi-part deep dives!</p>
          </div>
        )}
      </div>
    </div>
  );
}
