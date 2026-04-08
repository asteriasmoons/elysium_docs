import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../src/components/DocsRoot.css";
import DocsRoot from "../src/components/DocsRoot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elysium.lystaria.im"),
  title: {
    default: "Elysium Docs",
    template: "%s · Elysium Docs",
  },
  description:
    "Elysium is a personal growth companion for Discord, blending reading, journaling, and emotional wellness into one beautifully structured system for reflection, habits, and intentional living.",
  applicationName: "Elysium",
  keywords: [
    "Elysium",
    "Discord bot",
    "personal growth",
    "journaling",
    "reading tracker",
    "emotional wellness",
    "habits",
    "reflection",
    "intentional living",
  ],
  authors: [{ name: "asteriasmoons", url: "https://lystaria.im" }],
  creator: "asteriasmoons",
  publisher: "asteriasmoons",

  // ── Open Graph ──────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: "https://elysium.lystaria.im",
    siteName: "Elysium Docs",
    title: "Elysium Docs",
    description:
      "Elysium is a personal growth companion for Discord, blending reading, journaling, and emotional wellness into one beautifully structured system for reflection, habits, and intentional living.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Elysium — Personal Growth Companion for Discord",
      },
    ],
    locale: "en_US",
  },

  // ── Twitter / X ──────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Elysium Docs",
    description:
      "Elysium is a personal growth companion for Discord, blending reading, journaling, and emotional wellness into one beautifully structured system for reflection, habits, and intentional living.",
    images: ["/banner.png"],
    creator: "@asteriasmoons",
  },

  // ── Canonical & alternates ────────────────────────────────────
  alternates: {
    canonical: "https://elysium.lystaria.im",
  },

  // ── Robots ───────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // ── Theme ────────────────────────────────────────────────────
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DocsRoot>{children}</DocsRoot>
      </body>
    </html>
  );
}
