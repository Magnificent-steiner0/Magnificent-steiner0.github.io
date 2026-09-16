"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Mail, Download, ExternalLink, MapPin } from "lucide-react";
import { FaLinkedin as Linkedin, FaGithub as Github } from "react-icons/fa";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79, 156, 249, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-pad" style={{ width: "100%", paddingTop: "2rem", paddingBottom: "4rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "3rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left: content */}
          <div ref={titleRef} style={{ maxWidth: "680px" }}>
            {/* Location pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.3rem 0.875rem",
                borderRadius: "9999px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                marginBottom: "1.75rem",
              }}
            >
              <MapPin size={12} style={{ color: "var(--accent)" }} />
              Dhaka, Bangladesh
            </div>

            {/* Name */}
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
                color: "var(--text-primary)",
              }}
            >
              Asif Mahmud
            </h1>

            {/* Title with gradient */}
            <p
              style={{
                fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                fontWeight: 600,
                marginBottom: "1.5rem",
                background: "var(--gradient-hero)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI Engineer &amp; Full Stack Developer
            </p>

            {/* Bio */}
            <p
              style={{
                fontSize: "1.0625rem",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                maxWidth: "560px",
              }}
            >
              AI Engineer with hands-on experience building intelligent
              applications using LLMs, RAG pipelines, and modern full-stack
              technologies. I design and ship production-ready systems — from
              AI-powered customer support bots to recommendation engines —
              using FastAPI, Next.js, and vector databases.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginBottom: "2.5rem",
              }}
            >
              <a
                href="/asifmahmud0396@gmail.com.pdf"
                target="_blank"
                rel="noopener noreferrer"
                id="btn-view-resume"
                style={primaryBtnStyle}
                onMouseEnter={(e) => hoverPrimary(e, true)}
                onMouseLeave={(e) => hoverPrimary(e, false)}
              >
                <ExternalLink size={15} />
                View Resume
              </a>
              <a
                href="/asifmahmud0396@gmail.com.pdf"
                download
                id="btn-download-resume"
                style={outlineBtnStyle}
                onMouseEnter={(e) => hoverOutline(e, true)}
                onMouseLeave={(e) => hoverOutline(e, false)}
              >
                <Download size={15} />
                Download
              </a>
              <a
                href="https://github.com/Magnificent-steiner0"
                target="_blank"
                rel="noopener noreferrer"
                id="btn-github"
                style={outlineBtnStyle}
                onMouseEnter={(e) => hoverOutline(e, true)}
                onMouseLeave={(e) => hoverOutline(e, false)}
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/asif-mahmud-ontu/"
                target="_blank"
                rel="noopener noreferrer"
                id="btn-linkedin"
                style={outlineBtnStyle}
                onMouseEnter={(e) => hoverOutline(e, true)}
                onMouseLeave={(e) => hoverOutline(e, false)}
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
              <Link
                href="/contact"
                id="btn-contact"
                style={ghostBtnStyle}
                onMouseEnter={(e) => hoverGhost(e, true)}
                onMouseLeave={(e) => hoverGhost(e, false)}
              >
                <Mail size={15} />
                Contact
              </Link>
            </div>


          </div>

          {/* Right: avatar placeholder */}
          <div className="hero-avatar" aria-hidden="true">
            <div
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                border: "2px solid var(--border)",
                background: "var(--bg-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle glow ring */}
              <div
                style={{
                  position: "absolute",
                  inset: "-4px",
                  borderRadius: "50%",
                  background: "var(--gradient-hero)",
                  opacity: 0.2,
                  zIndex: -1,
                }}
              />
              🧑‍💻
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-avatar { display: none !important; }
        }
      `}</style>
    </section>
  );
}

const primaryBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.625rem 1.25rem",
  borderRadius: "8px",
  fontSize: "0.875rem",
  fontWeight: 600,
  background: "var(--accent)",
  color: "#fff",
  textDecoration: "none",
  border: "1px solid var(--accent)",
  cursor: "pointer",
  transition: "background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
};

const outlineBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.625rem 1.25rem",
  borderRadius: "8px",
  fontSize: "0.875rem",
  fontWeight: 500,
  background: "transparent",
  color: "var(--text-secondary)",
  textDecoration: "none",
  border: "1px solid var(--border)",
  cursor: "pointer",
  transition: "border-color 0.2s ease, color 0.2s ease, background 0.2s ease",
};

const ghostBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.625rem 1.25rem",
  borderRadius: "8px",
  fontSize: "0.875rem",
  fontWeight: 500,
  background: "transparent",
  color: "var(--text-muted)",
  textDecoration: "none",
  border: "1px solid transparent",
  cursor: "pointer",
  transition: "color 0.2s ease",
};

function hoverPrimary(e: React.MouseEvent, enter: boolean) {
  const el = e.currentTarget as HTMLElement;
  if (enter) {
    el.style.background = "var(--accent-dim)";
    el.style.transform = "translateY(-1px)";
    el.style.boxShadow = "0 4px 16px rgba(79,156,249,0.35)";
  } else {
    el.style.background = "var(--accent)";
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "none";
  }
}

function hoverOutline(e: React.MouseEvent, enter: boolean) {
  const el = e.currentTarget as HTMLElement;
  if (enter) {
    el.style.borderColor = "var(--border-hover)";
    el.style.color = "var(--text-primary)";
    el.style.background = "rgba(255,255,255,0.03)";
  } else {
    el.style.borderColor = "var(--border)";
    el.style.color = "var(--text-secondary)";
    el.style.background = "transparent";
  }
}

function hoverGhost(e: React.MouseEvent, enter: boolean) {
  const el = e.currentTarget as HTMLElement;
  if (enter) {
    el.style.color = "var(--text-secondary)";
  } else {
    el.style.color = "var(--text-muted)";
  }
}
