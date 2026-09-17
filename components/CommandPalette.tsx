"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FileText,
  Briefcase,
  BookOpen,
  Mail,
  Download,
  ArrowRight,
  Sparkles,
  X,
  Check,
} from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Articles" | "Actions";
  description?: string;
  icon: any;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd+K or Ctrl+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const copyEmail = () => {
    navigator.clipboard.writeText("asifmahmud0396@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Home",
      category: "Navigation",
      description: "Overview, highlights, and bio",
      icon: Sparkles,
      action: () => {
        router.push("/");
        setIsOpen(false);
      },
    },
    {
      id: "nav-projects",
      title: "All Projects",
      category: "Navigation",
      description: "Filter and explore all 5 projects",
      icon: Briefcase,
      action: () => {
        router.push("/projects");
        setIsOpen(false);
      },
    },
    {
      id: "nav-blog",
      title: "Technical Articles",
      category: "Navigation",
      description: "Articles on MIL, RAG, and Vector Search",
      icon: BookOpen,
      action: () => {
        router.push("/blog");
        setIsOpen(false);
      },
    },
    {
      id: "nav-contact",
      title: "Get in Touch",
      category: "Navigation",
      description: "Send a direct message or collaboration inquiry",
      icon: Mail,
      action: () => {
        router.push("/contact");
        setIsOpen(false);
      },
    },

    // Quick Actions
    {
      id: "act-copy-email",
      title: copied ? "Email Copied to Clipboard!" : "Copy Email Address",
      category: "Actions",
      description: "asifmahmud0396@gmail.com",
      icon: copied ? Check : Mail,
      action: copyEmail,
    },
    {
      id: "act-resume",
      title: "Download Resume",
      category: "Actions",
      description: "PDF format with complete career and research info",
      icon: Download,
      action: () => {
        window.open("/asifmahmud0396@gmail.com.pdf", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "act-github",
      title: "Open GitHub Profile",
      category: "Actions",
      description: "github.com/Magnificent-steiner0",
      icon: Github,
      action: () => {
        window.open("https://github.com/Magnificent-steiner0", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "act-linkedin",
      title: "Open LinkedIn Profile",
      category: "Actions",
      description: "linkedin.com/in/asif-mahmud-ontu",
      icon: Linkedin,
      action: () => {
        window.open("https://www.linkedin.com/in/asif-mahmud-ontu/", "_blank");
        setIsOpen(false);
      },
    },

    // Projects
    {
      id: "proj-brain-ct",
      title: "Brain CT MIL Classifier",
      category: "Projects",
      description: "PyTorch, Multiple Instance Learning, 0.89 AUC",
      icon: Briefcase,
      action: () => {
        router.push("/projects/brain-ct-classifier");
        setIsOpen(false);
      },
    },
    {
      id: "proj-support-bot",
      title: "AI Customer Support Bot",
      category: "Projects",
      description: "FastAPI, pgvector, hybrid RAG pipeline",
      icon: Briefcase,
      action: () => {
        router.push("/projects/ai-customer-support-chatbot");
        setIsOpen(false);
      },
    },
    {
      id: "proj-writing-agent",
      title: "Multi-Agent Research & Writing System",
      category: "Projects",
      description: "LangGraph, Planner/Editor/Writer cycle",
      icon: Briefcase,
      action: () => {
        router.push("/projects/ai-writing-agent");
        setIsOpen(false);
      },
    },

    // Articles
    {
      id: "art-ct-mil",
      title: "Explainable Brain CT Classification with MIL",
      category: "Articles",
      description: "Undergraduate thesis architecture and asymmetric loss",
      icon: BookOpen,
      action: () => {
        router.push("/blog/brain-ct-classifier-mil");
        setIsOpen(false);
      },
    },
    {
      id: "art-rag",
      title: "RAG from Scratch: Local Customer Support Bot",
      category: "Articles",
      description: "FastAPI, pgvector, and sentence-transformers",
      icon: BookOpen,
      action: () => {
        router.push("/blog/rag-customer-support-bot");
        setIsOpen(false);
      },
    },
    {
      id: "art-faiss",
      title: "Scaling Recommendations with TF-IDF & FAISS",
      category: "Articles",
      description: "90x latency reduction at 100k scale",
      icon: BookOpen,
      action: () => {
        router.push("/blog/tfidf-faiss-recommendations");
        setIsOpen(false);
      },
    },
  ];

  const filtered = items.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  });

  // Handle arrow keys
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Command Palette"
        id="cmd-palette-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.35rem 0.75rem",
          borderRadius: "8px",
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
          fontSize: "0.8125rem",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-hover)";
          e.currentTarget.style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        <Search size={13} style={{ color: "var(--accent)" }} />
        <span>Search</span>
        <kbd
          style={{
            fontSize: "0.6875rem",
            padding: "0.1rem 0.35rem",
            borderRadius: "4px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "14vh",
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "580px",
          background: "#0c0e15",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "14px",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(56, 189, 248, 0.2)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.875rem 1.25rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Search size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyNavigation}
            placeholder="Type a command, project, or article..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              fontFamily: "inherit",
            }}
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "0.2rem",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results list */}
        <div
          style={{
            maxHeight: "360px",
            overflowY: "auto",
            padding: "0.5rem",
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.625rem 0.875rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.1s ease",
                    background: isSelected ? "rgba(56, 189, 248, 0.1)" : "transparent",
                    border: isSelected ? "1px solid rgba(56, 189, 248, 0.25)" : "1px solid transparent",
                  }}
                >
                  <div
                    style={{
                      width: "1.75rem",
                      height: "1.75rem",
                      borderRadius: "6px",
                      background: isSelected ? "var(--accent)" : "rgba(255, 255, 255, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isSelected ? "#07080b" : "var(--accent)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: isSelected ? "#fff" : "var(--text-primary)",
                        }}
                      >
                        {item.title}
                      </span>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontFamily: "var(--font-mono), monospace",
                          color: "var(--text-muted)",
                          background: "rgba(255, 255, 255, 0.05)",
                          padding: "0.1rem 0.35rem",
                          borderRadius: "4px",
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    {item.description && (
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          margin: 0,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                  {isSelected && (
                    <ArrowRight size={14} style={{ color: "var(--accent)" }} />
                  )}
                </div>
              );
            })
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "2.5rem 1rem",
                color: "var(--text-muted)",
                fontSize: "0.875rem",
              }}
            >
              No matching commands or articles found.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.625rem 1.25rem",
            background: "rgba(0, 0, 0, 0.3)",
            borderTop: "1px solid var(--border)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Asif Mahmud</span>
        </div>
      </div>
    </div>
  );
}
