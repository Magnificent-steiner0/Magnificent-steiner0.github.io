"use client";

import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { FaLinkedin as Linkedin, FaGithub as Github } from "react-icons/fa";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Static export: use mailto fallback
    const mailto = `mailto:asifmahmud0396@gmail.com?subject=${encodeURIComponent(
      form.subject || "Portfolio Contact"
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" aria-label="Contact" className="section">
      <div className="container-pad">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Get In Touch
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Have a project in mind or just want to connect? I&apos;m always open to new opportunities.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
          className="contact-grid"
        >
          {/* Form */}
          <div className="glass-card" style={{ padding: "2rem" }}>
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  height: "100%",
                  minHeight: "300px",
                  textAlign: "center",
                }}
              >
                <CheckCircle size={48} style={{ color: "var(--accent)" }} />
                <h3 style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  Your email client should have opened. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  style={inputStyle as React.CSSProperties}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={inputStyle as React.CSSProperties}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle as React.CSSProperties}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="subject" style={labelStyle}>Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    style={inputStyle as React.CSSProperties}
                  />
                </div>
                <div>
                  <label htmlFor="message" style={labelStyle}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    style={{ ...inputStyle, resize: "vertical" } as React.CSSProperties}
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  id="btn-contact-submit"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    background: loading ? "var(--accent-dim)" : "var(--accent)",
                    color: "#fff",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background 0.2s ease",
                    marginTop: "0.25rem",
                  }}
                >
                  <Send size={16} />
                  {loading ? "Opening..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              {
                icon: <Mail size={18} />,
                label: "Email",
                value: "asifmahmud0396@gmail.com",
                href: "mailto:asifmahmud0396@gmail.com",
              },
              {
                icon: <Github size={18} />,
                label: "GitHub",
                value: "Magnificent-steiner0",
                href: "https://github.com/Magnificent-steiner0",
              },
              {
                icon: <Linkedin size={18} />,
                label: "LinkedIn",
                value: "asif-mahmud-ontu",
                href: "https://www.linkedin.com/in/asif-mahmud-ontu/",
              },
              {
                icon: <MapPin size={18} />,
                label: "Location",
                value: "Dhaka, Bangladesh",
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card"
                style={{ padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "8px",
                    background: "var(--accent-glow)",
                    border: "1px solid rgba(91,138,245,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "var(--text-secondary)",
  marginBottom: "0.4rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  borderRadius: "8px",
  border: "1px solid var(--border)",
  background: "var(--bg-secondary)",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease",
  fontFamily: "inherit",
};
