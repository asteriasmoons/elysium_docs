"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type OnThisPageProps = {
  headings?: TocItem[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function OnThisPage({ headings }: OnThisPageProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    if (headings && headings.length > 0) {
      return;
    }

    const found = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".docs-content h2, .docs-content h3",
      ),
    ).map((heading) => {
      if (!heading.id) {
        heading.id = slugify(heading.innerText);
      }

      return {
        id: heading.id,
        text: heading.innerText,
        level: Number(heading.tagName.replace("H", "")),
      };
    });

    window.requestAnimationFrame(() => {
      setItems(found);
    });
  }, [headings]);

  const visibleItems = headings && headings.length > 0 ? headings : items;

  useEffect(() => {
    if (!visibleItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );

        if (visible.length > 0) {
          const nextId = (visible[0].target as HTMLElement).id;
          window.requestAnimationFrame(() => {
            setActiveId(nextId);
          });
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      },
    );

    visibleItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleItems]);

  if (!visibleItems.length) return null;

  return (
    <aside
      className="on-this-page"
      style={{
        position: "sticky",
        top: "2rem",
        alignSelf: "flex-start",
        height: "fit-content",
        maxHeight: "calc(100vh - 4rem)",
        overflowY: "auto",
      }}
    >
      <div className="on-this-page-card">
        <p className="on-this-page-title">On this page</p>

        <nav>
          <ul className="on-this-page-list">
            {visibleItems.map((item) => (
              <li
                key={item.id}
                className={`on-this-page-item level-${item.level} ${
                  activeId === item.id ? "active" : ""
                }`}
              >
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
