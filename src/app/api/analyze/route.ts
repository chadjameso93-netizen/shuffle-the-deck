import { NextResponse } from 'next/server';
import type { AnalysisResponse } from '@/lib/types/analysis';

const BLOCKED_PHRASES = [
  'kill myself', 'end my life', 'hurt myself', 'self harm', 'suicide',
  'kill him', 'kill her', 'kill them', 'hurt them', 'hurt her', 'hurt him',
];

const CRISIS_WORDS = [
  'desperate', 'hopeless', 'unbearable', 'trapped', 'no way out',
  'falling apart', 'can\'t take it', 'breaking down',
];

const SIGNAL_PATTERNS: Array<{ pattern: RegExp; tag: string }> = [
  { pattern: /conflict|argument|fight|disagree/i, tag: 'conflict' },
  { pattern: /pressure|stress|overwhelm|deadline/i, tag: 'pressure' },
  { pattern: /uncertain|unsure|don\'t know|confused/i, tag: 'uncertainty' },
  { pattern: /boundary|limit|too much|stop|enough/i, tag: 'boundary issue' },
  { pattern: /decide|decision|choose|choice|option/i, tag: 'decision tension' },
];

function inferSafety(text: string): AnalysisResponse['safety'] {
  const lower = text.toLowerCase();
  if (BLOCKED_PHRASES.some((p) => lower.includes(p))) return 'blocked';
  if (CRISIS_WORDS.some((w) => lower.includes(w))) return 'review';
  return 'safe';
}

function inferSignals(text: string): string[] {
  const found = SIGNAL_PATTERNS
    .filter(({ pattern }) => pattern.test(text))
    .map(({ tag }) => tag);
  if (found.length === 0) return ['interpersonal tension'];
  return found.slice(0, 4);
}

function buildSummary(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= 80) return `Input describes: "${trimmed}".`;
  return `Input describes: "${trimmed.slice(0, 77)}...".`;
}

function buildNextStep(safety: AnalysisResponse['safety'], signals: string[]): string {
  if (safety === 'blocked') return 'Please reach out to a trusted person or a crisis line.';
  if (safety === 'review') return 'Take a breath. Grounding first — then look at what you can control right now.';
  const primary = signals[0];
  const map: Record<string, string> = {
    'conflict': 'Identify one concrete request you can make without blame.',
    'pressure': 'Break the situation into the smallest next action.',
    'uncertainty': 'Name the one thing you most need clarity on.',
    'boundary issue': 'Decide what you are and are not willing to do — then say it plainly.',
    'decision tension': 'Write out the two real options and what each one costs.',
    'interpersonal tension': 'Notice your role in the dynamic before responding.',
  };
  return map[primary] ?? 'Pause before responding. Clarity comes before action.';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const raw = typeof body?.text === 'string' ? body.text.trim() : '';

    if (!raw) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    const safety = inferSafety(raw);
    const signals = inferSignals(raw);

    const result: AnalysisResponse = {
      summary: buildSummary(raw),
      input: raw,
      safety,
      signals,
      nextStep: buildNextStep(safety, signals),
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}