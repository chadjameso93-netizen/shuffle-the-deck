'use client';

import { useEffect, useState } from 'react';
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
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('defrag.latestAnalysis');
      if (raw) setAnalysis(JSON.parse(raw));
    } catch {
      // sessionStorage unavailable or malformed
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!analysis) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p style={{ color: '#555' }}>
          No analysis yet.{' '}
          <a href="/start" style={{ color: '#000', fontWeight: 'bold' }}>Start from /start.</a>
        </p>
      </main>
    );
  }

  const safetyColor = SAFETY_COLORS[analysis.safety];

  return (
    <main style={{ padding: '2rem', maxWidth: '640px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Now</h1>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Summary</h2>
        <p style={{ color: '#333' }}>{analysis.summary}</p>
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
          {SAFETY_LABELS[analysis.safety]}
        </span>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Signals</h2>
        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
          {analysis.signals.map((s) => (
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
        <p style={{ color: '#222', margin: 0 }}>{analysis.nextStep}</p>
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