'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalysis } from '@/components/providers/AnalysisProvider';
import PageShell from '@/components/PageShell';

export default function StartPage() {
  const router = useRouter();
  const { setAnalysis } = useAnalysis();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation: input.trim() }),
      });
      if (!res.ok) throw new Error('Analysis failed');
      const data = await res.json();
      setAnalysis(data);
      const encoded = encodeURIComponent(JSON.stringify(data));
      router.push(`/app/now?a=${encoded}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell maxWidth="600px">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-block',
          fontSize: '2.5rem',
          marginBottom: '0.75rem',
        }}>🃏</div>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}>Shuffle the Deck</h1>
        <p style={{
          fontSize: '1rem',
          color: '#94a3b8',
          lineHeight: '1.6',
        }}>Describe your situation and get a clear-eyed read on what’s actually happening.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What’s going on? Describe the situation in your own words…"
          rows={6}
          style={{
            width: '100%',
            padding: '1rem 1.25rem',
            fontSize: '1rem',
            lineHeight: '1.7',
            color: '#e2e8f0',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px',
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
        />

        {error && (
          <p style={{
            color: '#f87171',
            fontSize: '0.875rem',
            marginTop: '0.5rem',
            marginBottom: '0',
          }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            marginTop: '1rem',
            width: '100%',
            padding: '0.875rem',
            background: loading || !input.trim()
              ? 'rgba(139,92,246,0.3)'
              : 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            letterSpacing: '0.01em',
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Reading the cards…' : 'Analyze'}
        </button>
      </form>
    </PageShell>
  );
}