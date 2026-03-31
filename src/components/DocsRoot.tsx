"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV, type NavItemType } from "@/data/docsNav";

type NavItemProps = {
  item: NavItemType;
  currentPath: string;
  depth?: number;
  onNavigate?: () => void;
};

function NavItem({ item, currentPath, depth = 0, onNavigate }: NavItemProps) {
  const hasChildren = Boolean(item.children?.length);
  const isActive = currentPath === item.to || currentPath.startsWith(item.to + "/");
  const [open, setOpen] = useState<boolean>(isActive);
  const isExpanded = open || isActive;

  const paddingLeft = `${0.9 + depth * 1}rem`;
  const childPaddingLeft = `${1.9 + depth * 1}rem`;

  if (!hasChildren) {
    return (
      <Link
        href={item.to}
        onClick={onNavigate}
        className={`ely-root-link${currentPath === item.to ? " ely-root-link--active" : ""}`}
        style={{ paddingLeft: item.icon ? paddingLeft : childPaddingLeft }}
      >
        {item.icon && (
          <Image
            src={item.icon}
            width={18}
            height={18}
            className="ely-root-icon"
            alt=""
            unoptimized
          />
        )}
        {item.label}
      </Link>
    );
  }

  return (
    <div className="ely-root-group">
      <div className="ely-root-group-header" onClick={() => setOpen((v) => !v)}>
        <Link
          href={item.to}
          className={`ely-root-link ely-root-link--category${isActive ? " ely-root-link--active" : ""}`}
          style={{ paddingLeft }}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate?.();
          }}
        >
          {item.icon && (
            <Image
              src={item.icon}
              width={18}
              height={18}
              className="ely-root-icon"
              alt=""
              unoptimized
            />
          )}
          {item.label}
        </Link>

        <button
          type="button"
          className="ely-root-caret"
          aria-label={isExpanded ? "Collapse" : "Expand"}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
        >
          {isExpanded ? "▾" : "▸"}
        </button>
      </div>

      {isExpanded && (
        <div className="ely-root-children">
          {item.children?.map((child) => (
            <NavItem
              key={child.to}
              item={child}
              currentPath={currentPath}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type DocsRootProps = {
  children: React.ReactNode;
};

export default function DocsRoot({ children }: DocsRootProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const syncViewport = () => setIsDesktop(window.innerWidth >= 997);

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const handleNavigate = () => {
    if (!isDesktop) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isDesktop && isOpen) {
      document.body.style.setProperty("--ely-shift", "var(--ely-sidebar-width)");
    } else {
      document.body.style.setProperty("--ely-shift", "0px");
    }

    return () => {
      document.body.style.setProperty("--ely-shift", "0px");
    };
  }, [isOpen, isDesktop]);

  return (
    <>
      <header className="ely-root-header">
        <button
          type="button"
          className="ely-root-toggle"
          aria-label="Open navigation"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        <div className="ely-root-header-brand">
          <Image
            src="/img/logo.png"
            width={32}
            height={32}
            alt="Elysium"
            unoptimized
          />
          <span className="ely-root-title">Elysium Docs</span>
        </div>

        <nav className="ely-root-header-nav">
          <Link href="/docs/homepage" className="ely-root-header-link">
            Docs
          </Link>
          <Link href="/updates" className="ely-root-header-link">
            Updates
          </Link>
        </nav>
      </header>

      {!isDesktop && isOpen && (
        <div className="ely-root-overlay" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`ely-root-sidebar${isOpen ? " ely-root-sidebar--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="ely-root-close"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>

        <nav className="ely-root-nav">
          {NAV.map((item) => (
            <NavItem
              key={item.to}
              item={item}
              currentPath={currentPath}
              onNavigate={handleNavigate}
            />
          ))}
        </nav>
      </aside>

      <div
        className={`ely-root-main${isOpen && isDesktop ? " sidebar-open" : ""}`}
        style={{ width: "100%", minWidth: 0 }}
      >
        {children}
      </div>
    </>
  );
}
