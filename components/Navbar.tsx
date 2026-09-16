"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/asifmahmud0396@gmail.com.pdf", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const BREAKPOINT = 768;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Responsive: track window width
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.3s ease, background 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(8, 9, 13, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="container-pad">
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontWeight: 700,
              fontSize: "1.125rem",
              color: "var(--text-primary)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Asif<span style={{ color: "var(--accent)" }}>.</span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          {!isMobile && (
            <ul
              style={{
                display: "flex",
                gap: "0.25rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        display: "block",
                        padding: "0.375rem 0.875rem",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "var(--accent)" : "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.2s ease, background 0.2s ease",
                        background: isActive ? "rgba(79, 156, 249, 0.08)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.target as HTMLElement).style.color = "var(--text-primary)";
                          (e.target as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.target as HTMLElement).style.color = "var(--text-secondary)";
                          (e.target as HTMLElement).style.background = "transparent";
                        }
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Hamburger button — only on mobile */}
          {isMobile && (
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                padding: "0.5rem",
                borderRadius: "6px",
              }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </nav>

        {/* Mobile dropdown */}
        {isMobile && isOpen && (
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingBottom: "1rem",
              background: "var(--bg-primary)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        display: "block",
                        padding: "0.75rem 0.5rem",
                        fontSize: "0.9375rem",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "var(--accent)" : "var(--text-secondary)",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--border)",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
