import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505",
        color: "#FAF7F2",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A55A", marginBottom: "1rem" }}>
          404
        </p>
        <h1 style={{ fontFamily: "Noto Serif Display, Georgia, serif", fontSize: "3rem", fontWeight: 400, marginBottom: "1.5rem" }}>
          Page not found.
        </h1>
        <Link href="/" style={{ color: "#C9A55A", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Return Home →
        </Link>
      </div>
    </main>
  );
}
