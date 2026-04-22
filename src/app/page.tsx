import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '480px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>DEFRAG</h1>
      <p style={{ color: '#555', marginBottom: '2rem' }}>
        Structured interpersonal analysis.
      </p>

      <Link
        href="/start"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: '#000',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        Start
      </Link>
    </main>
  );
}