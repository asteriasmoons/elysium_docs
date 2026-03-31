"use client";

import { useMemo, useState } from "react";
import type { ReactNode, ReactElement } from "react";
import Image from "next/image";

type CodeBlockProps = {
  children: ReactNode;
};

function extractText(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map((child) => extractText(child)).join("");
  }

  if (children && typeof children === "object") {
    const element = children as ReactElement<{ children?: ReactNode }>;
    return extractText(element.props?.children ?? "");
  }

  return "";
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => extractText(children), [children]);

  const renderedChildren =
    children && typeof children === "object"
      ? ((children as ReactElement<{ children?: ReactNode }>).props?.children ??
        children)
      : children;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          padding: "6px",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #03e3fc, #6055f7)",
          color: "#fff",
          fontSize: "0.85rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src={copied ? "/img/icons/check.svg" : "/img/icons/copy.svg"}
          width={16}
          height={16}
          alt={copied ? "Copied" : "Copy"}
        />
      </button>

      <pre>{renderedChildren}</pre>
    </div>
  );
}
