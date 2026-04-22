'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAnalysis } from '@/components/providers/AnalysisProvider';

const SAFETY_LABELS: Record<string, string> = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
};

const SAFETY_COLORS: Record<string, string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

export default function NowPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { analysis, setAnalysis } = useAnalysis();

  useEffect(() => {
    const param = searchParams.get('a');
    if (param && !analysis) {
      try {
        const decoded = JSON.parse(decodeURIComponent(param));
        setAnalysis(decoded);
      } catch {}
    }
  }, [searchParams, analysis, setAnalysis]);

  if (!analysis) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>No analysis found.</p>
          <a href="/start" style={{
            color: '#8b5cf6',
            textDecoration: 'none',
            fontWeight: '600',
          }}>Start a new reading →</a>
        </div>
      </main>
    );
  }

  const safetyColor = SAFETY_COLORS[analysis.safety] || '#94a3b8';

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '2rem 1.5rem',
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '1rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🃏</div>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
          }}>Your Reading</h1>
        </div>

        {/* Summary */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '1.25rem',
        }}>
          <h2 style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem',
          }}>Summary</h2>
          <p style={{
            color: '#e2e8f0',
            fontSize: '1rem',
            lineHeight: '1.7',
            margin: 0,
          }}>{analysis.summary}</p>
        </div>

        {/* Safety */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: safetyColor,
            flexShrink: 0,
            boxShadow: `0 0 8px ${safetyColor}`,
          }} />
          <div>
            <h2 style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.25rem',
            }}>Safety Level</h2>
            <p style={{
              color: safetyColor,
              fontWeight: '700',
              fontSize: '1rem',
              margin: 0,
            }}>{SAFETY_LABELS[analysis.safety] || analysis.safety}</p>
          </div>
        </div>

        {/* Signals */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '1.25rem',
        }}>
          <h2 style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem',
          }}>Signals</h2>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {analysis.signals.map((s: string) => (
              <li key={s} style={{
                color: '#cbd5e1',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '0.4rem',
              }}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Next Step */}
        <div style={{
          background: 'rgba(139,92,246,0.08)',
          border: '1px solid rgba(139,92,246,0.25)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#8b5cf6',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem',
          }}>Next Step</h2>
          <p style={{
            color: '#e2e8f0',
            fontSize: '1rem',
            lineHeight: '1.7',
            margin: 0,
          }}>{analysis.nextStep}</p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="/start"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.4)',
              borderRadius: '10px',
              color: '#a78bfa',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '600',
              letterSpacing: '0.01em',
            }}
          >
            ← Analyze another situation
          </a>
        </div>

      </div>
    </main>
  );
}