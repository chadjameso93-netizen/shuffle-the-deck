import { getLatestSession } from "@/lib/server/workspace/get-latest-session";
import Link from "next/link";

export default async function Home() {
  const session = await getLatestSession();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>DEFRAG: Operating System</h1>
      <p>The relational reasoning platform.</p>
      
      <div style={{ marginTop: "2rem" }}>
        {session ? (
          <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Active Session Found</h2>
            <p>Title: {session.title}</p>
            <p>Started: {new Date(session.createdAt).toLocaleString()}</p>
            <Link href={`/app/${session.activeSurface}`} style={{ display: "inline-block", marginTop: "1rem", padding: "0.5rem 1rem", background: "#000", color: "#fff", textDecoration: "none", borderRadius: "4px" }}>
              Resume Current Field
            </Link>
          </div>
        ) : (
          <Link href="/start" style={{ display: "inline-block", padding: "0.5rem 1rem", background: "#000", color: "#fff", textDecoration: "none", borderRadius: "4px" }}>
            Start New Analysis
          </Link>
        )}
      </div>
    </main>
  );
}
