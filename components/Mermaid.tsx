"use client";

import React, { useEffect, useState, useId } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const rawId = useId();
  // Mermaid ID must be a valid DOM ID without colons
  const uniqueId = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    let isMounted = true;

    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "loose",
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        themeVariables: {
          darkMode: true,
          background: "transparent",
          mainBkg: "#131a29",
          primaryColor: "#1e293b",
          primaryTextColor: "#f1f5f9",
          primaryBorderColor: "#38bdf8",
          lineColor: "#60a5fa",
          secondaryColor: "#0f172a",
          tertiaryColor: "#1e1b4b",
          clusterBkg: "rgba(15, 23, 42, 0.6)",
          clusterBorder: "rgba(56, 189, 248, 0.25)",
          edgeLabelBackground: "#0b0f19",
          actorBkg: "#131a29",
          actorBorder: "#38bdf8",
          actorTextColor: "#f8fafc",
          actorLineColor: "#475569",
          signalColor: "#38bdf8",
          signalTextColor: "#f8fafc",
          labelBoxBkgColor: "#131a29",
          labelBoxBorderColor: "#38bdf8",
          labelTextColor: "#f8fafc",
          loopTextColor: "#94a3b8",
          noteBorderColor: "#6366f1",
          noteBkgColor: "#1e1b4b",
          noteTextColor: "#e0e7ff",
          sequenceNumberColor: "#0f172a",
        },
      });

      // Trim leading/trailing whitespace
      const cleanedChart = chart.trim();

      mermaid
        .render(uniqueId, cleanedChart)
        .then(({ svg }) => {
          if (isMounted) {
            setSvgContent(svg);
            setError(null);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error("Mermaid render error:", err);
            setError(err?.message || "Failed to render diagram");
          }
        });
    } catch (err: any) {
      if (isMounted) {
        setError(err?.message || "Mermaid initialization error");
      }
    }

    return () => {
      isMounted = false;
    };
  }, [chart, uniqueId]);

  if (error) {
    return (
      <div
        style={{
          margin: "1.5rem 0",
          padding: "1rem 1.25rem",
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: "8px",
          color: "#f87171",
          fontSize: "0.875rem",
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Diagram syntax error</p>
        <pre style={{ margin: 0, fontSize: "0.8rem", whiteSpace: "pre-wrap" }}>{chart}</pre>
      </div>
    );
  }

  if (!svgContent) {
    return (
      <div
        style={{
          margin: "2rem 0",
          padding: "3rem 1rem",
          textAlign: "center",
          background: "rgba(15, 23, 42, 0.4)",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "0.875rem",
        }}
      >
        <div style={{ display: "inline-block", width: "1.5rem", height: "1.5rem", border: "2px solid rgba(56, 189, 248, 0.3)", borderTopColor: "#38bdf8", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "0.5rem" }} />
        <div>Rendering diagram...</div>
      </div>
    );
  }

  return (
    <figure
      style={{
        margin: "2.5rem 0",
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(56, 189, 248, 0.2)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 8px 32px -4px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        style={{
          padding: "0.625rem 1rem",
          background: "rgba(30, 41, 59, 0.4)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#38bdf8",
              boxShadow: "0 0 8px #38bdf8",
              display: "inline-block",
            }}
          />
          Architecture Diagram
        </span>
        <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>Interactive Vector</span>
      </div>

      <div
        style={{
          padding: "1.75rem 1.25rem",
          overflowX: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "160px",
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </figure>
  );
}
