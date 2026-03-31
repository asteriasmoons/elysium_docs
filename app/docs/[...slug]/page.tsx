import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import NextLink from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import CodeBlock from "@/components/CodeBlock";

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

function getAllDocSlugs(dir: string, baseDir = dir): string[][] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return getAllDocSlugs(fullPath, baseDir);
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const relativePath = path.relative(baseDir, fullPath);
      const slug = relativePath.replace(/\.mdx$/, "").split(path.sep);
      return [slug];
    }

    return [];
  });
}

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), "docs");
  return getAllDocSlugs(docsDir).map((slug) => ({ slug }));
}

export default async function DocPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const filePath = path.join(process.cwd(), "docs", ...slug) + ".mdx";

  if (!fs.existsSync(filePath)) {
    return <div style={{ padding: "2rem" }}>404 – Doc not found</div>;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContent);

  type MdxLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    to?: string;
    href?: string;
    children: ReactNode;
  };

  const CALLOUT_TYPES = new Set(["info", "note", "tip", "warning", "danger"]);

  type DirectiveNode = {
    type: "containerDirective" | "leafDirective";
    name?: string;
    data?: {
      hName?: string;
      hProperties?: {
        className?: string[];
      };
    };
  };

  function isDirectiveNode(node: unknown): node is DirectiveNode {
    return (
      typeof node === "object" &&
      node !== null &&
      "type" in node &&
      (((node as { type?: unknown }).type === "containerDirective") ||
        ((node as { type?: unknown }).type === "leafDirective"))
    );
  }

  function remarkDocusaurusCallouts() {
    return (tree: unknown) => {
      visit(tree as Parameters<typeof visit>[0], (node: unknown) => {
        if (!isDirectiveNode(node)) {
          return;
        }

        if (typeof node.name === "string" && CALLOUT_TYPES.has(node.name)) {
          const data = node.data || (node.data = {});
          data.hName = "div";
          data.hProperties = {
            className: ["alert", node.name],
          };
        }
      });
    };
  }

  const components = {
    Link: ({ to, href, children, ...props }: MdxLinkProps) => {
      const finalHref = href ?? to;

      if (!finalHref) {
        return <span>{children}</span>;
      }

      return (
        <NextLink href={finalHref} {...props}>
          {children}
        </NextLink>
      );
    },

    
    pre: ({ children }: { children: ReactNode }) => (
  <CodeBlock>{children}</CodeBlock>
),

    code: ({ children }: { children: ReactNode }) => (
      <code
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
        }}
      >
        {children}
      </code>
    ),
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "0 2rem",
        boxSizing: "border-box",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: "900px",
          minWidth: 0,
          padding: "2rem 0",
          boxSizing: "border-box",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
        }}
      >
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkDirective, remarkDocusaurusCallouts],
            },
          }}
        />
      </main>
    </div>
  );
}
