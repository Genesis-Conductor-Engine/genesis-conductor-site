import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("layout metadata includes canonical, open graph, and twitter SEO fields", async () => {
  const layout = await read("app/layout.tsx");
  assert.match(layout, /metadataBase:/);
  assert.match(layout, /alternates:\s*{\s*canonical:/s);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(layout, /manifest:\s*\"\/manifest\.webmanifest\"/);
});

test("homepage includes structured data, primary headline, and news channel", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /application\/ld\+json/);
  assert.match(page, /<h1>Genesis Conductor Engine<\/h1>/);
  assert.match(page, /AI-native application scaffolding/i);
  assert.match(page, /news\.genesisconductor\.io/);
});

test("robots and sitemap routes are present", async () => {
  const robots = await read("app/robots.ts");
  const sitemap = await read("app/sitemap.ts");
  assert.match(robots, /export default function robots/);
  assert.match(sitemap, /export default function sitemap/);
});

test("next config redirects /news to the canonical news channel", async () => {
  const nextConfig = await read("next.config.mjs");
  assert.match(nextConfig, /jump\("\/news", NEWS\)/);
  assert.match(nextConfig, /news\.genesisconductor\.io/);
  assert.doesNotMatch(nextConfig, /claude\/cloudflare-deployment/);
});

test("next config redirects /cashflow to the Worker dashboard", async () => {
  const nextConfig = await read("next.config.mjs");
  assert.match(nextConfig, /jump\("\/cashflow", `\$\{DASHBOARD\}\/cashflow`\)/);
  assert.match(nextConfig, /jump\("\/api\/cashflow", `\$\{DASHBOARD\}\/api\/cashflow`\)/);
  assert.match(nextConfig, /cashflow\.genesisconductor\.io/);
});

test("homepage nav links to /cashflow", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /href=\"\/cashflow\"/);
  assert.match(page, /Cashflow/);
});
