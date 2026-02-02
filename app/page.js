import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to CPRG 306</h1>

      <p>This is the homepage for my CPRG 306 assignments.</p>


    <nav className="mt-6 flex flex-col gap-3">
      <Link href="/week-2" className="flex items-center gap-2 underline underline-offset-2 decoration-blue-500">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        Go to Week 2 Assignment
      </Link>

      <Link href="/week-3" className="flex items-center gap-2 underline underline-offset-2 decoration-blue-500">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Go to Week 3 Assignment
      </Link>
      <Link href="/week-4" className="flex items-center gap-2 underline underline-offset-2 decoration-blue-500">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Go to Week 4 Assignment
      </Link>
    </nav>

    </main>
  );
}
