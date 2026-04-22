export type AnalysisResponse = {
  summary: string;
  input: string;
  safety: 'safe' | 'review' | 'blocked';
  signals: string[];
  nextStep: string;
};