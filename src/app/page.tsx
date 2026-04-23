import Link from 'next/link';
import PageShell from '@/components/PageShell';

export default function Home() {
  return (
    <PageShell maxWidth="520px">
      <div style={{ textAlign: 'center' }}>

        {/* Logo mark */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'rgba(139,92,246,0.15)',
          border: '1px solid rgba(139,92,246,0.3)',
          fontSize: '1.75rem',
          marginBottom: '1.75rem',
        }}>
          🃏
        </div>

        {/* Brand */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#ffffff',
          letterSpacing: '-0.03em',
          marginBottom: '0.75rem',
          lineHeight: '1.1',
        }}>DEFRAG</h1>

        {/* Descriptor */}
        <p style={{
          fontSize: '1.05rem',
          color: '#94a3b8',
          lineHeight: '1.6',
          marginBottom: '2.5rem',
        }}>Structured interpersonal analysis.</p>

        {/* Primary CTA */}
        <Link
          href="/start"
          style={{
            display: 'inline-block',
            padding: '0.875rem 2.5rem',
            background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: '600',
            letterSpacing: '0.01em',
          }}
        >
          Begin analysis
        </Link>

        {/* Supporting line */}
        <p style={{
          marginTop: '1.5rem',
          fontSize: '0.825rem',
          color: '#475569',
        }}>No account required.</p>

      </div>
    </PageShell>
  );
}