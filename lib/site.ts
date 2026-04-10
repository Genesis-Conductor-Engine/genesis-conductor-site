const DEFAULT_SITE_URL = "https://genesis-conductor-engine.github.io/genesis-conductor-site";

function resolveSiteUrl(): string {
  const rawValue = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!rawValue) {
    return DEFAULT_SITE_URL;
  }

  try {
    return new URL(rawValue).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "Genesis Conductor Engine",
  shortName: "Genesis Conductor",
  title: "Genesis Conductor Engine | AI-Native Application Scaffolding",
  description:
    "Genesis Conductor Engine is an AI-native application scaffolding platform for deterministic builds, topological reasoning, and production-grade workflow orchestration.",
  keywords: [
    "Genesis Conductor Engine",
    "AI application scaffolding",
    "topological reasoning engine",
    "workflow orchestration",
    "production AI infrastructure",
    "Genesis Conductor",
    "agentic software delivery",
    "deterministic code generation"
  ],
  creator: "Genesis-Conductor-Engine",
  siteUrl: resolveSiteUrl(),
  githubOrgUrl: "https://github.com/Genesis-Conductor-Engine",
  repoUrl: "https://github.com/Genesis-Conductor-Engine/genesis-conductor-site",
  ogImagePath: "/og-image.svg"
} as const;

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalizedPath}`.replace(/([^:]\/)\/+/g, "$1");
}
