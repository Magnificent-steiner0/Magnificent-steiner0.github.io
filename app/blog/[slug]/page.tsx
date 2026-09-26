import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllBlogPosts, getBlogBySlug, getSeriesForPost } from "@/lib/content";
import type { BlogPost } from "@/lib/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import SeriesNav from "@/components/SeriesNav";
import Mermaid from "@/components/Mermaid";
import remarkGfm from "remark-gfm";

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

  // MDX content components
  const components = {
    Callout: ({ children, variant = "info", padding = "8px 8px 2px 8px" }: any) => {
      const variants: Record<string, { border: string; bg: string; color: string }> = {
        info:    { border: "#3b82f6", bg: "rgba(23,37,84,0.4)",  color: "#bfdbfe" },
        success: { border: "#10b981", bg: "rgba(6,60,40,0.4)",   color: "#6ee7b7" },
        warning: { border: "#f59e0b", bg: "rgba(69,45,5,0.4)",   color: "#fde68a" },
        danger:  { border: "#ef4444", bg: "rgba(69,10,10,0.4)",  color: "#fca5a5" },
      };
      const v = variants[variant] ?? variants.info;
      return (
        <div style={{ margin: "1rem 0", borderRadius: "8px", borderLeft: `4px solid ${v.border}`, background: v.bg, padding, color: v.color }}>
          {children}
        </div>
      );
    },
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
    ol: (props: any) => (
      <ol style={{ color: "var(--text-secondary)", paddingLeft: "1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} {...props} />
    ),
    li: (props: any) => (
      <li style={{ fontSize: "1.0625rem", lineHeight: 1.7 }} {...props} />
    ),
    table: (props: any) => (
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          margin: "2rem 0",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          background: "rgba(15, 23, 42, 0.5)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "0.9375rem",
          }}
          {...props}
        />
      </div>
    ),
    thead: (props: any) => (
      <thead
        style={{
          background: "rgba(30, 41, 59, 0.7)",
          borderBottom: "2px solid var(--border)",
        }}
        {...props}
      />
    ),
    th: ({ style, ...rest }: any) => (
      <th
        style={{
          padding: "0.875rem 1.25rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          letterSpacing: "0.02em",
          borderBottom: "1px solid var(--border)",
          ...style,
        }}
        {...rest}
      />
    ),
    td: ({ style, ...rest }: any) => (
      <td
        style={{
          padding: "0.875rem 1.25rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          ...style,
        }}
        {...rest}
      />
    ),
    pre: (props: any) => {
      // Check if this pre wraps a mermaid code block
      const child = props.children;
      if (
        child &&
        typeof child === "object" &&
        "props" in child &&
        child.props?.className?.includes("language-mermaid")
      ) {
        const chartCode =
          typeof child.props.children === "string"
            ? child.props.children
            : Array.isArray(child.props.children)
            ? child.props.children.join("")
            : String(child.props.children || "");
        return <Mermaid chart={chartCode} />;
      }

      return (
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
      );
    },
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
    Mermaid: (props: any) => <Mermaid {...props} />,
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
        {post.coverImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${post.coverImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              filter: "blur(50px) brightness(0.2)",
              transform: "scale(1.15)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
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

          {/* Featured Cover Image */}
          {post.coverImage && (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "14px",
                overflow: "hidden",
                marginBottom: "2.5rem",
                border: "1px solid var(--border)",
                boxShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.6)",
                background: "var(--bg-secondary)",
              }}
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 750px"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />

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
          margin-bottom: 2rem;
        }
        .mdx-content th {
          background: rgba(30, 41, 59, 0.7);
          color: var(--text-primary);
          padding: 0.875rem 1.25rem;
          font-weight: 600;
          border-bottom: 2px solid var(--border);
        }
        .mdx-content td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          padding: 0.875rem 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .mdx-content tr:hover td {
          background: rgba(255, 255, 255, 0.02);
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
    "what_is_mcp_and_why_do_we_need_it":
      "linear-gradient(135deg, rgba(9, 26, 40, 0.95) 0%, rgba(16, 42, 69, 0.9) 50%, var(--bg-primary) 100%)",
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
    "what_is_mcp_and_why_do_we_need_it": "🔌",
    "brain-ct-classifier-mil": "🧠",
    "rag-customer-support-bot": "🤖",
    "tfidf-faiss-recommendations": "🔍",
    "langchain-writing-agent": "✍️",
  };
  return emojis[slug] || "📝";
}
