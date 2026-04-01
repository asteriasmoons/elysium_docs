import Image from "next/image";
import Link from "next/link";
import "../src/components/DocsRoot.css";

const cardStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "24px",
  backdropFilter: "blur(16px)",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(3, 227, 252, 0.05)",
  padding: "3rem 3.5rem",
  maxWidth: "560px",
  width: "100%",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  textAlign: "center" as const,
  gap: "1.5rem",
};

const wrapperStyle = {
  minHeight: "calc(100vh - 68px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
};

const headingStyle = {
  fontSize: "clamp(2rem, 4vw, 2.8rem)",
  fontWeight: 800,
  margin: 0,
  background: "linear-gradient(135deg, #03e3fc, #6055f7)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontFamily: "'Lily Script One', cursive",
};

const paraStyle = {
  color: "rgba(255, 255, 255, 0.65)",
  fontSize: "1.05rem",
  lineHeight: 1.6,
  margin: 0,
};

export default function Home() {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <Image
          src="/img/logo.png"
          alt="Elysium"
          width={144}
          height={144}
          unoptimized
          style={{ borderRadius: "50%" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h1 style={headingStyle}>Elysium Docs</h1>
          <p style={paraStyle}>
            Your all-in-one powerhouse for moderation, automation, embeds, and more — all wrapped up in a sleek, slash-command–only experience.
          </p>
        </div>
        <Link href="/docs/homepage" className="btn-gradient button">
          View Documentation
        </Link>
      </div>
    </div>
  );
}
