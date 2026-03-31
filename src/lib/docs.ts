import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type DocEntry = {
  slug: string[];
  content: string;
};

function getAllDocSlugs(dir: string, baseDir = dir): string[][] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getAllDocSlugs(fullPath, baseDir);
    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const relativePath = path.relative(baseDir, fullPath);
      return [relativePath.replace(/\.mdx$/, "").split(path.sep)];
    }
    return [];
  });
}

export async function getAllDocs(): Promise<DocEntry[]> {
  const docsDir = path.join(process.cwd(), "docs");
  const slugs = getAllDocSlugs(docsDir);
  return slugs.map((slug) => {
    const filePath = path.join(docsDir, ...slug) + ".mdx";
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content: rawContent } = matter(fileContent);
    const content = rawContent
      .replace(/^import\s+.*from\s+['"].*['"];?\s*$/gm, "")
      .trim();
    return { slug, content };
  });
}
