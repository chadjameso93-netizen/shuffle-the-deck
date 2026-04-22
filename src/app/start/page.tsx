'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalysis } from '@/components/providers/AnalysisProvider';
import type { AnalysisResponse } from '@/lib/types/analysis';

export default function StartPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setLatestAnalysis } = useAnalysis();
  const router = useRouter();

  async function handleSubmit() {
    const trimmed = input.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? 'Analysis failed. Please try again.');
        setLoading(false);
        return;
      }

      const result: AnalysisResponse = await res.json();

      // Primary: set in shared provider
      setLatestAnalysis(result);

      // Fallback: encode in URL so /app/now survives a refresh
      const encoded = encodeURIComponent(JSON.stringify(result));
      router.push('/app/now?a=' + encoded);
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '560px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Describe the situation</h1>
      <p style={{ color: '#555', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Be as specific as you can. What is actually happening right now?
      </p>

      <textarea
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What is happening in this relationship or situation?"
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '1rem',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />

      {error && (
        <p style={{ color: '#c00', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        style={{
          padding: '0.75rem 1.5rem',
          background: loading || !input.trim() ? '#999' : '#000',
          color: '#fff',
          border: 'none',
          fontWeight: 'bold',
          cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
        }}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </main>
  );
}