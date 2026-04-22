'use client';

import { useAnalysis } from '@/components/providers/AnalysisProvider';
import type { AnalysisResponse } from '@/lib/types/analysis';

const SAFETY_COLORS: Record<AnalysisResponse['safety'], string> = {
  safe: '#2d6a2d',
  review: '#856400',
  blocked: '#9b1c1c',
};

const SAFETY_LABELS: Record<AnalysisResponse['safety'], string> = {
  safe: 'Safe',
  review: 'Needs Review',
  blocked: 'Blocked',
};

export default function NowPage() {
  const { latestAnalysis } = useAnalysis();

  if (!latestAnalysis) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p style={{ color: '#555' }}>
          No analysis yet.{' '}
          <a href="/start" style={{ color: '#000', fontWeight: 'bold' }}>Start from /start.</a>
        </p>
      </main>
    );
  }

  const safetyColor = SAFETY_COLORS[latestAnalysis.safety];

  return (
    <main style={{ padding: '2rem', maxWidth: '640px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Now</h1>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Summary</h2>
        <p style={{ color: '#333' }}>{latestAnalysis.summary}</p>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Safety</h2>
        <span
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            background: safetyColor,
            color: '#fff',
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
          }}
        >
          {SAFETY_LABELS[latestAnalysis.safety]}
        </span>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Signals</h2>
        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
          {latestAnalysis.signals.map((s) => (
            <li key={s} style={{ marginBottom: '0.25rem', color: '#444' }}>{s}</li>
          ))}
        </ul>
      </section>

      <section
        style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          background: '#f5f5f5',
          borderRadius: '6px',
          borderLeft: '4px solid #000',
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Next Step</h2>
        <p style={{ color: '#222', margin: 0 }}>{latestAnalysis.nextStep}</p>
      </section>

      <a
        href="/start"
        style={{ color: '#555', fontSize: '0.9rem', textDecoration: 'underline' }}
      >
        ← Analyze another situation
      </a>
    </main>
  );
}