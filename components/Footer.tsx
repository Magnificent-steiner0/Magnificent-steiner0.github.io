"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaLinkedin as Linkedin, FaGithub as Github } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        padding: "2.5rem 0",
      }}
    >
      <div className="container-pad">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
            textAlign: "center",
          }}
        >
          {/* Social links */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href="https://github.com/Magnificent-steiner0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                background: "transparent",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--accent)";
                el.style.borderColor = "var(--accent)";
                el.style.background = "var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--text-secondary)";
                el.style.borderColor = "var(--border)";
                el.style.background = "transparent";
              }}
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/asif-mahmud-ontu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                background: "transparent",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--accent)";
                el.style.borderColor = "var(--accent)";
                el.style.background = "var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--text-secondary)";
                el.style.borderColor = "var(--border)";
                el.style.background = "transparent";
              }}
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:asifmahmud0396@gmail.com"
              aria-label="Email"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                background: "transparent",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--accent)";
                el.style.borderColor = "var(--accent)";
                el.style.background = "var(--accent-glow)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "var(--text-secondary)";
                el.style.borderColor = "var(--border)";
                el.style.background = "transparent";
              }}
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                display: "flex",
                gap: "1.5rem",
                listStyle: "none",
                flexWrap: "wrap",
                justifyContent: "center",
                margin: 0,
                padding: 0,
              }}
            >
              {[
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/asifmahmud0396@gmail.com.pdf", label: "Resume" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--text-secondary)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--text-muted)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            © {year} Asif Mahmud
          </p>
        </div>
      </div>
    </footer>
  );
}
