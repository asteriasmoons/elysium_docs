import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const docsDir = path.join(root, "docs");
const outFile = path.join(root, "src", "lib", "docs-data.json");

function getAllDocSlugs(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getAllDocSlugs(fullPath, baseDir);
    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const rel = path.relative(baseDir, fullPath);
      return [rel.replace(/\.mdx$/, "").split(path.sep)];
    }
    return [];
  });
}

const slugs = getAllDocSlugs(docsDir);
const docs = slugs.map((slug) => {
  const filePath = path.join(docsDir, ...slug) + ".mdx";
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content: rawContent } = matter(fileContent);
  const content = rawContent
    .replace(/^import\s+.*from\s+['"].*['"];?\s*$/gm, "")
    .trim();
  return { slug, content };
});

fs.writeFileSync(outFile, JSON.stringify(docs, null, 2));
console.log(`✓ Pre-built ${docs.length} docs to src/lib/docs-data.json`);
