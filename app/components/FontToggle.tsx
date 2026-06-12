"use client";

import { useState, useEffect } from "react";

export default function FontToggle() {
  const [on, setOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Restore persisted preference
    try {
      const stored = localStorage.getItem("ck-be-font") === "1";
      setOn(stored);
      document.documentElement.dataset.beFont = stored ? "1" : "0";
    } catch {
      // localStorage unavailable (private browsing etc.) — silently ignore
    }

    // Inject Tier-2 fallback (Playfair Display) via Google Fonts
    if (!document.getElementById("be-gfont")) {
      const link = document.createElement("link");
      link.id = "be-gfont";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap";
      document.head.appendChild(link);
    }

    // Attempt Tier-1 WOFF2; browser silently falls through to Playfair → Georgia
    // if the URL 404s.
    if (!document.getElementById("be-face")) {
      const style = document.createElement("style");
      style.id = "be-face";
      style.textContent = [
        "@font-face {",
        "  font-family: 'BarcelonaExtropic';",
        "  src: url('https://fonts.genesisconductor.com/fonts/be/v1/barcelona-extropic.woff2') format('woff2');",
        "  font-weight: 100 900;",
        "  font-display: swap;",
        "}"
      ].join("\n");
      document.head.appendChild(style);
    }
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    document.documentElement.dataset.beFont = next ? "1" : "0";
    try {
      localStorage.setItem("ck-be-font", next ? "1" : "0");
    } catch {
      // ignore
    }
  };

  // Avoid hydration mismatch — render nothing until client-side mount
  if (!mounted) return null;

  return (
    <div
      className="ck-font-toggle"
      role="region"
      aria-label="Display face toggle"
    >
      <div className="ck-font-toggle-label">
        <span className="ck-font-toggle-title">Display face</span>
        <span className="ck-font-toggle-value">
          {on ? "Barcelona-Extropic" : "Inter Tight"}
        </span>
      </div>
      <button
        className="ck-font-toggle-btn"
        onClick={toggle}
        aria-pressed={on}
        aria-label={`Switch to ${on ? "Inter Tight" : "Barcelona-Extropic"}`}
      >
        <span className="ck-font-toggle-thumb" aria-hidden="true" />
      </button>
    </div>
  );
}
