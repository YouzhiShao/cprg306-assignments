import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to CPRG 306</h1>

      <p>This is the homepage for my CPRG 306 assignments.</p>

      <nav style={{ marginTop: "1.5rem" }}>
        <Link href="/week-2">Go to Week 2 Assignment</Link>
      </nav>
    </main>
  );
}
