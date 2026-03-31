"use client";

import "@/components/DocsRoot.css";
import Content from "./content.mdx";
import GiscusThread from "@/components/giscusThread";

export default function UpdatesPage() {
  return (
    <main className="docs-content">
      <Content />
      <div className="giscus-wrap">
        <GiscusThread />
      </div>
    </main>
  );
}
