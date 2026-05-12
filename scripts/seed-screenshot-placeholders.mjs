#!/usr/bin/env node
/**
 * Seed placeholder images at every screenshot path referenced by the docs.
 *
 * VitePress imports the image at build time. If the file is missing the dev
 * server / build fails. This script:
 *   1. Greps every `/screenshots/...` path used in `docs/*.md`
 *   2. Ensures a placeholder .webp / .png exists at each path (won't overwrite real captures)
 *
 * Run after editing docs:
 *   npm run screenshots:seed
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");
const PUBLIC = path.join(DOCS, "public");

// A tiny valid WebP (1×1 transparent pixel, ~38 bytes). Decodes in every
// modern browser; just enough to satisfy VitePress's import-analysis.
const PLACEHOLDER_WEBP = Buffer.from(
  "UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAUAmJaQAA3AA/v3AgAA=",
  "base64",
);
// A tiny valid PNG (1×1 transparent, ~67 bytes).
const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
);

function walkMd(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".vitepress") || entry === "node_modules" || entry === "public") continue;
    const p = path.join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walkMd(p, acc);
    else if (entry.endsWith(".md")) acc.push(p);
  }
  return acc;
}

const RE = /\/(screenshots\/[A-Za-z0-9_\-./]+\.(?:webp|png|jpg|jpeg))/g;
const refs = new Set();

for (const file of walkMd(DOCS)) {
  const text = readFileSync(file, "utf8");
  let m;
  while ((m = RE.exec(text)) !== null) {
    refs.add(m[1]);
  }
}

let created = 0;
let existing = 0;
for (const rel of refs) {
  const target = path.join(PUBLIC, rel);
  if (existsSync(target)) {
    existing += 1;
    continue;
  }
  mkdirSync(path.dirname(target), { recursive: true });
  const ext = path.extname(target).toLowerCase();
  writeFileSync(
    target,
    ext === ".png" ? PLACEHOLDER_PNG : PLACEHOLDER_WEBP,
  );
  created += 1;
}

console.log(`Seeded placeholders: ${created} new, ${existing} already present (total ${refs.size} references).`);
