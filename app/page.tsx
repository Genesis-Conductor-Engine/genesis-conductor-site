import Link from "next/link";

import { absoluteUrl, siteConfig } from "@/lib/site";

const systemHighlights = [
  {
    label: "Deterministic Delivery",
    copy: "One engine for scoped ideation, implementation, verification, and traceable release motion."
  },
  {
    label: "Topological Reasoning",
    copy: "Stateful orchestration tuned for graph-shaped product logic, multi-agent systems, and complex infrastructure paths."
  },
  {
    label: "Production Surfaces",
    copy: "From cloud runtimes and edge workers to research pipelines and operator tools, the platform stays deployable."
  }
];

const featuredSystems = [
  {
    name: "Genesis Conductor",
    detail: "AI-native application scaffolding with deterministic execution paths for business-to-production delivery."
  },
  {
    name: "Pareto",
    detail: "Optimization and decisioning surfaces designed for rigorous throughput, measurable operator control, and deployable outputs."
  },
  {
    name: "genesis-seismic-log",
    detail: "Seismic Truth-of-Thought verification for measured inference provenance, reproducibility, and high-throughput cloud execution."
  }
];

const executionLanes = [
  "Architect product systems from requirements to runnable code.",
  "Ship SEO-aware, conversion-ready interfaces without bloated front-end scaffolding.",
  "Coordinate cloud, edge, and workflow runtimes with explicit operational traceability.",
  "Publish repo-first projects that are ready for CI, deployment, and ongoing iteration."
];

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/") }#organization`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      sameAs: [siteConfig.githubOrgUrl],
      description: siteConfig.description
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${absoluteUrl("/") }#software`,
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
        "@id": `${absoluteUrl("/") }#organization`
      }
    }
  ]
};

export default function HomePage() {
  return (
    <main className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <header className="hero">
        <nav className="topbar" aria-label="Primary">
          <Link className="brand" href="/">
            Genesis Conductor Engine
          </Link>
          <div className="topbar-actions">
            <Link className="subtle-link" href="#systems">
              Systems
            </Link>
            <Link className="subtle-link" href="#execution">
              Execution
            </Link>
            <Link className="cta-link" href={siteConfig.githubOrgUrl}>
              View GitHub Org
            </Link>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">AI-native application scaffolding</p>
            <h1>Genesis Conductor Engine</h1>
            <p className="hero-text">
              Deterministic product delivery for teams building agentic software, operational platforms,
              and production-grade research systems.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href={siteConfig.repoUrl}>
                Launch the repo
              </Link>
              <Link className="button button-secondary" href="#systems">
                Explore the stack
              </Link>
            </div>
            <p className="hero-note">
              Built for teams that need topology-aware planning, high-signal interfaces, and code that can
              ship without a handoff cliff.
            </p>
          </section>

          <aside className="hero-visual" aria-label="Product visualization">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
            <div className="vector vector-primary">
              <span>deterministic builds</span>
            </div>
            <div className="vector vector-secondary">
              <span>workflow orchestration</span>
            </div>
            <div className="vector vector-tertiary">
              <span>SEO-ready surfaces</span>
            </div>
            <div className="hero-signal">
              <span>signal map</span>
              <strong>strategy - build - verify - deploy</strong>
            </div>
          </aside>
        </div>
      </header>

      <section className="section section-support" id="systems">
        <div className="section-header">
          <p className="eyebrow">System posture</p>
          <h2>One product surface. Multiple execution layers.</h2>
        </div>
        <div className="support-columns">
          {systemHighlights.map((item) => (
            <article key={item.label} className="support-item">
              <h3>{item.label}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-featured">
        <div className="section-header">
          <p className="eyebrow">Featured public systems</p>
          <h2>Public repositories that show how the engine moves from concept to runtime.</h2>
        </div>
        <div className="featured-list">
          {featuredSystems.map((item) => (
            <article key={item.name} className="featured-item">
              <div>
                <p className="feature-label">{item.name}</p>
                <p className="feature-copy">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-execution" id="execution">
        <div className="section-header">
          <p className="eyebrow">Execution lane</p>
          <h2>Built for operators who want less ceremony and more deployed motion.</h2>
        </div>
        <div className="execution-grid">
          <div className="execution-copy">
            <p>
              Genesis Conductor Engine compresses the usual gap between product theory and production
              systems. It is designed for teams shipping developer platforms, knowledge systems, AI-native
              products, and workflow-heavy applications that need a clear operating model.
            </p>
            <p>
              The landing surface stays sparse on purpose: the brand leads, the execution model is legible,
              and the technical story is visible in one scan.
            </p>
          </div>
          <ul className="execution-list">
            {executionLanes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-cta">
        <p className="eyebrow">Start with the repo</p>
        <h2>Use this site as the public entrypoint for the Genesis Conductor Engine ecosystem.</h2>
        <div className="hero-actions">
          <Link className="button button-primary" href={siteConfig.repoUrl}>
            Open repository
          </Link>
          <Link className="button button-secondary" href={siteConfig.githubOrgUrl}>
            Browse the organization
          </Link>
        </div>
      </section>
    </main>
  );
}
