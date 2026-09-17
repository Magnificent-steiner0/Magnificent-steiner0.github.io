import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllBlogPosts, getBlogBySlug, getSeriesForPost } from "@/lib/content";
import type { BlogPost } from "@/lib/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import SeriesNav from "@/components/SeriesNav";

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Asif Mahmud`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const seriesInfo = getSeriesForPost(post);

  // Basic styling for the MDX content without Tailwind Typography
  const components = {
    h2: (props: any) => (
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }} {...props} />
    ),
    h3: (props: any) => (
      <h3 style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "2rem", marginBottom: "0.875rem" }} {...props} />
    ),
    p: (props: any) => (
      <p style={{ fontSize: "1.0625rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1.5rem" }} {...props} />
    ),
    ul: (props: any) => (
      <ul style={{ color: "var(--text-secondary)", paddingLeft: "1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} {...props} />
    ),
    li: (props: any) => (
      <li style={{ fontSize: "1.0625rem", lineHeight: 1.7 }} {...props} />
    ),
    pre: (props: any) => (
      <pre
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          padding: "1.25rem",
          borderRadius: "8px",
          overflowX: "auto",
          marginBottom: "1.5rem",
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
        }}
        {...props}
      />
    ),
    code: (props: any) => {
      // If it's inline code, apply slight background
      const isInline = !props.className;
      return (
        <code
          style={
            isInline
              ? {
                  background: "rgba(255,255,255,0.1)",
                  padding: "0.2rem 0.4rem",
                  borderRadius: "4px",
                  fontSize: "0.85em",
                  color: "var(--text-primary)",
                  fontFamily: "monospace",
                }
              : { fontFamily: "monospace" }
          }
          {...props}
        />
      );
    },
    a: (props: any) => (
      <a style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent)" }} {...props} />
    ),
    blockquote: (props: any) => (
      <blockquote
        style={{
          borderLeft: "4px solid var(--accent)",
          paddingLeft: "1rem",
          fontStyle: "italic",
          color: "var(--text-muted)",
          marginBottom: "1.5rem",
        }}
        {...props}
      />
    ),
  };

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      {/* Hero banner */}
      <div
        style={{
          background: coverGradient(post.slug),
          borderBottom: "1px solid var(--border)",
          padding: "5rem 0 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container-pad" style={{ position: "relative", zIndex: 2 }}>
          <Link
            href="/blog"
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
            <ArrowLeft size={14} /> Back to Articles
          </Link>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  background: "rgba(79, 156, 249, 0.15)",
                  color: "var(--accent)",
                  border: "1px solid rgba(79, 156, 249, 0.25)",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              maxWidth: "800px",
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1.5rem",
              color: "var(--text-muted)",
              fontSize: "0.9375rem",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Calendar size={15} />
              {formattedDate}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Clock size={15} />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Large emoji background decoration */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-5%",
            top: "50%",
            transform: "translateY(-50%) rotate(-15deg)",
            fontSize: "20rem",
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {coverEmoji(post.slug)}
        </div>
      </div>

      {/* Body */}
      <div className="container-pad" style={{ padding: "4rem 1.5rem" }}>
        <article
          style={{
            maxWidth: "750px",
            margin: "0 auto",
          }}
          className="mdx-content"
        >
          {/* Series navigation */}
          {seriesInfo && (
            <SeriesNav
              seriesName={seriesInfo.series.name}
              posts={seriesInfo.series.posts.map((p: BlogPost) => ({
                slug: p.slug,
                title: p.title,
              }))}
              currentIndex={seriesInfo.currentIndex}
            />
          )}

          <MDXRemote source={post.content} components={components} />

          {/* Bottom series navigation */}
          {seriesInfo && (
            <div style={{ marginTop: "3rem" }}>
              <SeriesNav
                seriesName={seriesInfo.series.name}
                posts={seriesInfo.series.posts.map((p: BlogPost) => ({
                  slug: p.slug,
                  title: p.title,
                }))}
                currentIndex={seriesInfo.currentIndex}
              />
            </div>
          )}
        </article>
      </div>

      <style>{`
        /* Additional globals for MDX content */
        .mdx-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
        }
        .mdx-content th, .mdx-content td {
          border: 1px solid var(--border);
          padding: 0.75rem;
          text-align: left;
        }
        .mdx-content th {
          background: rgba(255,255,255,0.05);
          color: var(--text-primary);
        }
        .mdx-content strong {
          color: var(--text-primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function coverGradient(slug: string): string {
  const gradients: Record<string, string> = {
    "brain-ct-classifier-mil":
      "linear-gradient(135deg, rgba(15,32,39,0.9) 0%, var(--bg-primary) 100%)",
    "rag-customer-support-bot":
      "linear-gradient(135deg, rgba(15,12,41,0.9) 0%, var(--bg-primary) 100%)",
    "tfidf-faiss-recommendations":
      "linear-gradient(135deg, rgba(26,5,51,0.9) 0%, var(--bg-primary) 100%)",
    "langchain-writing-agent":
      "linear-gradient(135deg, rgba(10,35,66,0.9) 0%, var(--bg-primary) 100%)",
  };
  return gradients[slug] || "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)";
}

function coverEmoji(slug: string): string {
  const emojis: Record<string, string> = {
    "brain-ct-classifier-mil": "🧠",
    "rag-customer-support-bot": "🤖",
    "tfidf-faiss-recommendations": "🔍",
    "langchain-writing-agent": "✍️",
  };
  return emojis[slug] || "📝";
}
