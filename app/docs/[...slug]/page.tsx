import { compile, run } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import NextLink from "next/link";
import CodeBlock from "@/components/CodeBlock";
import OnThisPage from "@/components/OnThisPage";
import { NAV, type NavItemType } from "@/data/docsNav";
import { getAllDocs } from "@/lib/docs";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

function findNavItem(items: NavItemType[], path: string): NavItemType | null {
  for (const item of items) {
    if (item.to === path) return item;
    if (item.children) {
      const found = findNavItem(item.children, path);
      if (found) return found;
    }
  }
  return null;
}

function getAllCategorySlugs(items: NavItemType[]): string[][] {
  const result: string[][] = [];
  for (const item of items) {
    if (item.to.startsWith("/docs/category/")) {
      result.push(item.to.replace("/docs/", "").split("/"));
    }
    if (item.children) result.push(...getAllCategorySlugs(item.children));
  }
  return result;
}

export async function generateStaticParams() {
  const docs = await getAllDocs();
  const docSlugs = docs.map((doc) => ({ slug: doc.slug }));
  const categorySlugs = getAllCategorySlugs(NAV).map((slug) => ({ slug }));
  return [...docSlugs, ...categorySlugs];
}

function flattenNav(items: NavItemType[]): string[] {
  const result: string[] = [];
  for (const item of items) {
    if (!item.to.startsWith("/docs/category/")) result.push(item.to);
    if (item.children?.length) result.push(...flattenNav(item.children));
  }
  return result;
}

type MdxLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: string;
  href?: string;
  children: ReactNode;
};

const CALLOUT_TYPES = new Set(["success", "info", "note", "tip", "warning", "danger"]);

type DirectiveNode = {
  type: "containerDirective" | "leafDirective";
  name?: string;
  data?: { hName?: string; hProperties?: { className?: string[] } };
};

function isDirectiveNode(node: unknown): node is DirectiveNode {
  return (
    typeof node === "object" && node !== null && "type" in node &&
    ((node as { type?: unknown }).type === "containerDirective" ||
      (node as { type?: unknown }).type === "leafDirective")
  );
}

function remarkDocusaurusCallouts() {
  return (tree: unknown) => {
    visit(tree as Parameters<typeof visit>[0], (node: unknown) => {
      if (!isDirectiveNode(node)) return;
      if (typeof node.name === "string" && CALLOUT_TYPES.has(node.name)) {
        const data = node.data || (node.data = {});
        data.hName = "div";
        data.hProperties = { className: ["alert", node.name] };
      }
    });
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const currentPath = `/docs/${slug.join("/")}`;

  // Category page — render child links
  if (slug[0] === "category") {
    const navItem = findNavItem(NAV, currentPath);
    if (!navItem) return <div style={{ padding: "2rem" }}>404 – Category not found</div>;
    return (
      <main style={{ flex: "0 1 900px", minWidth: 0, padding: "2rem", boxSizing: "border-box" }}>
        <h1>{navItem.label}</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
          {navItem.children?.map((child) => (
            <NextLink
              key={child.to}
              href={child.to}
              style={{
                display: "block",
                padding: "1rem 1.25rem",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {child.label}
            </NextLink>
          ))}
        </div>
      </main>
    );
  }

  const docs = await getAllDocs();
  const doc = docs.find((d) => d.slug.join("/") === slug.join("/"));

  if (!doc) {
    return <div style={{ padding: "2rem" }}>404 – Doc not found</div>;
  }

  const compiled = await compile(doc.content, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm, remarkDirective, remarkDocusaurusCallouts],
  });

  const { default: MDXContent } = await run(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  const orderedDocs = flattenNav(NAV);

  const currentDocPath = `/docs/${slug.join("/")}`;
  const currentIndex = orderedDocs.findIndex((path) => path === currentDocPath);

  const previousDoc = currentIndex > 0 ? orderedDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex >= 0 && currentIndex < orderedDocs.length - 1
      ? orderedDocs[currentIndex + 1]
      : null;

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
        alignItems: "flex-start",
        padding: "0 2rem",
        boxSizing: "border-box",
        gap: "2rem",
      }}
    >
      <main
        style={{
          flex: "0 1 900px",
          minWidth: 0,
          padding: "2rem 0",
          boxSizing: "border-box",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
        }}
        className="docs-content"
      >
        <MDXContent components={components} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "3rem",
            paddingTop: "1.5rem",
          }}
        >
          <div>
            {previousDoc ? (
              <NextLink href={previousDoc} className="button btn-gradient">
                ← Previous
              </NextLink>
            ) : null}
          </div>

          <div>
            {nextDoc ? (
              <NextLink href={nextDoc} className="button btn-gradient">
                Next →
              </NextLink>
            ) : null}
          </div>
        </div>
      </main>

      <OnThisPage />
    </div>
  );
}
