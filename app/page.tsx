import Link from "next/link";
import { absoluteUrl, siteConfig } from "@/lib/site";
import FontToggle from "./components/FontToggle";

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      sameAs: [siteConfig.githubOrgUrl],
      description: siteConfig.description
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${absoluteUrl("/")}#software`,
      name: siteConfig.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      description: siteConfig.description,
      url: absoluteUrl("/"),
      publisher: {
        "@id": `${absoluteUrl("/")}#organization`
      }
    }
  ]
};

const LogoMark = () => (
  <svg
    width="160"
    height="28"
    viewBox="0 0 220 48"
    fill="none"
    aria-label="Genesis Conductor"
    role="img"
  >
    <rect x="3" y="20" width="3" height="8" rx="1.5" fill="currentColor" fillOpacity="0.55" />
    <rect x="10" y="16" width="3" height="16" rx="1.5" fill="currentColor" fillOpacity="0.75" />
    <rect x="17" y="10" width="3" height="28" rx="1.5" fill="currentColor" />
    <rect x="24" y="4" width="3" height="40" rx="1.5" fill="#27e070" />
    <rect x="31" y="10" width="3" height="28" rx="1.5" fill="currentColor" />
    <rect x="38" y="16" width="3" height="16" rx="1.5" fill="currentColor" fillOpacity="0.75" />
    <rect x="45" y="20" width="3" height="8" rx="1.5" fill="currentColor" fillOpacity="0.55" />
    <text
      x="62"
      y="32"
      fontFamily="inherit"
      fontSize="20"
      fontWeight="600"
      letterSpacing="-0.02em"
      fill="currentColor"
    >
      Genesis Conductor
    </text>
  </svg>
);

const features = [
  {
    t: "Pipeline orchestration",
    d: "Define agent graphs as code or YAML. Conductor schedules, retries, and replays."
  },
  {
    t: "Reproducible runs",
    d: "Pin model versions, capture inputs, and replay any run from any step — deterministically."
  },
  {
    t: "Fine-grained traces",
    d: "Every step, every token, every tool call. Search, filter, and diff runs side-by-side."
  },
  {
    t: "Structured evals",
    d: "Run offline evals on every PR. Gate deploys on pass-rate, latency, and cost budgets."
  },
  {
    t: "Cost controls",
    d: "Per-pipeline budgets, per-tenant quotas, and automatic routing to cheaper models on fallback."
  },
  {
    t: "Multi-provider",
    d: "OpenAI, Anthropic, Google, Mistral, local. One SDK, one observability surface."
  }
];

const metrics = [
  { n: "2.4B", l: "Calls orchestrated / week" },
  { n: "99.98%", l: "Uptime, last 90 days" },
  { n: "842ms", l: "Median p95 across the fleet" },
  { n: "42%", l: "Cost reduction vs. self-hosted" }
];

const footerCols = [
  { h: "Product", items: ["Platform", "Pipelines", "Evals", "Pricing", "Changelog"] },
  { h: "Developers", items: ["Docs", "API reference", "SDKs", "Status", "Open source"] },
  { h: "Company", items: ["About", "Customers", "Careers", "Contact", "Security"] },
  { h: "Legal", items: ["Terms", "Privacy", "DPA", "SOC 2", "Subprocessors"] }
];

const codeExample = `// pipelines/ingest.ts
import { pipeline, step } from '@conductor/sdk';

export default pipeline('ingest-prod', () => {
  const raw    = step.fetch('s3://ingest/raw/*');
  const parsed = step.parse(raw, { schema: v7 });
  const routed = step.route(parsed);
  const sum    = step.llm(routed, {
    model: 'claude-sonnet-4-6',
    retries: 3, budget: '$0.01/call',
  });
  step.embed(sum);
  step.store(sum, { dest: 'postgres://…' });
});`;

export default function HomePage() {
  return (
    <div className="ck-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <FontToggle />

      {/* Navigation */}
      <header className="ck-nav">
        <div className="ck-nav-inner">
          <Link href="/" className="ck-logo">
            <LogoMark />
          </Link>
          <nav aria-label="Primary">
            <ul className="ck-nav-links">
              {["Platform", "Pipelines", "Evals", "Pricing", "Docs", "Changelog"].map((x) => (
                <li key={x}>
                  <Link href={siteConfig.githubOrgUrl}>{x}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ck-nav-spacer" />
          <Link href={siteConfig.githubOrgUrl} className="ck-signin">
            Sign in
          </Link>
          <Link href={siteConfig.repoUrl} className="ck-btn-primary">
            Start free &#8594;
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="ck-hero">
        <div className="ck-hero-glow" aria-hidden="true" />
        <div className="ck-hero-inner">
          <div className="ck-badge">
            <span className="ck-pulse-dot" aria-hidden="true" />
            v2.3 &#8212; structured evals and replay
          </div>
          <h1 className="ck-hero-h1">
            Orchestrate generative AI
            <br />
            <span style={{ color: "var(--fg-2)" }}>at production scale.</span>
          </h1>
          <p className="ck-hero-desc">
            Genesis Conductor runs agent graphs, batch jobs, and data pipelines across model
            providers &#8212; with reproducible runs, fine-grained traces, and replay from any step.
          </p>
          <div className="ck-hero-actions">
            <Link href={siteConfig.repoUrl} className="ck-btn-primary ck-btn-primary-lg">
              Start free &#8594;
            </Link>
            <Link href={siteConfig.githubOrgUrl} className="ck-btn-secondary">
              Book a demo
            </Link>
          </div>
          <div className="ck-social-proof">
            <span>Trusted by platform teams at</span>
            {["NOVA", "Helios", "Axon", "Rift Labs", "Meridian"].map((name) => (
              <span key={name} className="ck-proof-name">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="ck-metrics" aria-label="Key metrics">
        <div className="ck-metrics-grid">
          {metrics.map((m) => (
            <div key={m.l}>
              <div className="ck-metric-n">{m.n}</div>
              <div className="ck-metric-l">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="ck-features">
        <div className="ck-features-inner">
          <span className="ck-section-label">What it does</span>
          <h2 className="ck-features-h2">
            One control plane for every agent, job, and pipeline you run.
          </h2>
          <div className="ck-feature-grid">
            {features.map((f) => (
              <article key={f.t} className="ck-feature-cell">
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="ck-code-section">
        <div className="ck-code-inner">
          <div className="ck-code-copy">
            <span className="ck-section-label">Pipelines as code</span>
            <h2>Declare, don&#8217;t orchestrate.</h2>
            <p>
              Write your pipeline as a typed graph. Conductor handles retries, fan-out, cost caps,
              and routing. Run locally, push to prod, and get traces back for free.
            </p>
            <Link href={siteConfig.githubOrgUrl} className="ck-code-link">
              Read the docs &#8594;
            </Link>
          </div>
          <pre className="ck-pre" aria-label="Pipeline code example">
            {codeExample}
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer className="ck-footer">
        <div className="ck-footer-inner">
          <div className="ck-footer-cols">
            <div className="ck-footer-brand">
              <Link href="/" aria-label="Genesis Conductor home" className="ck-logo">
                <LogoMark />
              </Link>
              <p>
                Enterprise orchestration for generative AI. Built by and for platform teams.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.h} className="ck-footer-col">
                <span className="ck-footer-col-head">{col.h}</span>
                {col.items.map((x) => (
                  <Link key={x} href={siteConfig.githubOrgUrl}>
                    {x}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="ck-footer-bar">
            <span>&#169; 2026 Genesis Labs, Inc.</span>
            <span className="ck-footer-status">
              <span className="ck-status-dot" aria-hidden="true" />
              all systems normal
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
