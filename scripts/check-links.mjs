#!/usr/bin/env node
/**
 * Walk every .md under docs/, find every markdown link `[text](/path...)` (relative
 * or `#anchor` only), and verify:
 *   - the target .md exists (cleanUrls: /foo → docs/foo.md or docs/foo/index.md)
 *   - the #anchor exists in the target file (matched against H1–H6 headings turned
 *     into VitePress's slug form)
 *
 * Skips: external links (http://, https://, mailto:, tel:), image refs.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".vitepress") || entry === "node_modules" || entry === "public") continue;
    const p = path.join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else if (entry.endsWith(".md")) acc.push(p);
  }
  return acc;
}

// Replicate VitePress's default heading slug generation.
// VitePress uses markdown-it with default GitHub-style slugger:
// lowercase, strip non-alphanumeric except `-`, collapse spaces to `-`.
function slug(heading) {
  return heading
    .toLowerCase()
    // Strip HTML tags (including <span>, <code>, etc.)
    .replace(/<[^>]+>/g, "")
    // Strip markdown emphasis
    .replace(/[`*_~]/g, "")
    // Strip explicit anchor like `{#custom-id}` at end
    .replace(/\{#[^}]+\}\s*$/, "")
    .trim()
    // Replace any run of characters that aren't word-chars or hyphens with a single dash
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    // VitePress prefixes purely-numeric-first slugs with `_`
    .replace(/^(\d)/, "_$1");
}

function extractHeadings(content) {
  const headings = new Set();
  // Markdown headings → slug
  const reHeading = /^(#{1,6})\s+(.+?)\s*$/gm;
  let m;
  while ((m = reHeading.exec(content)) !== null) {
    const text = m[2];
    const customMatch = /\{#([^}]+)\}/.exec(text);
    if (customMatch) headings.add(customMatch[1]);
    headings.add(slug(text));
  }
  // HTML anchors: <a id="..."></a> or <h2 id="...">
  const reHtml = /<(?:[a-z][a-z0-9]*)\b[^>]*\bid=["']([^"']+)["']/gi;
  while ((m = reHtml.exec(content)) !== null) {
    headings.add(m[1]);
  }
  return headings;
}

function resolveTarget(linkPath, fromFile) {
  // linkPath like `/foo`, `/foo/bar`, `/foo#anchor`, `#anchor`
  if (!linkPath || linkPath.startsWith("http") || linkPath.startsWith("mailto:") || linkPath.startsWith("tel:")) {
    return null;
  }
  const [pathPart, anchor] = linkPath.split("#");
  let target;
  if (!pathPart) {
    // Same-page anchor
    target = fromFile;
  } else if (pathPart.startsWith("/")) {
    // Absolute (relative to docs root)
    const stripped = pathPart.replace(/^\//, "").replace(/\/$/, "");
    if (stripped === "") {
      target = path.join(DOCS, "index.md");
    } else {
      const candidates = [
        path.join(DOCS, stripped + ".md"),
        path.join(DOCS, stripped, "index.md"),
      ];
      target = candidates.find(existsSync);
    }
  } else {
    return null; // relative link — skip for now
  }
  return { target, anchor };
}

const files = walk(DOCS);
const fileContents = new Map();
for (const f of files) fileContents.set(f, readFileSync(f, "utf8"));
const fileHeadings = new Map();
for (const [f, c] of fileContents) fileHeadings.set(f, extractHeadings(c));

const issues = [];
const LINK_RE = /(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

for (const f of files) {
  const content = fileContents.get(f);
  let m;
  while ((m = LINK_RE.exec(content)) !== null) {
    const link = m[2];
    const resolved = resolveTarget(link, f);
    if (!resolved) continue;
    const { target, anchor } = resolved;
    if (!target || !existsSync(target)) {
      issues.push({
        file: path.relative(DOCS, f),
        link,
        problem: "target file does not exist",
      });
      continue;
    }
    if (anchor) {
      const headings = fileHeadings.get(target);
      if (!headings.has(anchor)) {
        issues.push({
          file: path.relative(DOCS, f),
          link,
          problem: `anchor #${anchor} missing in ${path.relative(DOCS, target)}`,
          hint: `valid anchors: ${[...headings].slice(0, 8).join(", ")}${headings.size > 8 ? ", …" : ""}`,
        });
      }
    }
  }
}

if (issues.length === 0) {
  console.log("✓ All markdown links resolve.");
} else {
  console.log(`Found ${issues.length} broken link${issues.length === 1 ? "" : "s"}:\n`);
  // Group by file
  const byFile = new Map();
  for (const i of issues) {
    if (!byFile.has(i.file)) byFile.set(i.file, []);
    byFile.get(i.file).push(i);
  }
  for (const [file, list] of byFile) {
    console.log(`  ${file}`);
    for (const i of list) {
      console.log(`    ✗ ${i.link}  — ${i.problem}`);
      if (i.hint) console.log(`        hint: ${i.hint}`);
    }
    console.log();
  }
}
