'use client';

import { createContext, useContext, useState } from 'react';
import type { AnalysisResponse } from '@/lib/types/analysis';

type AnalysisContextValue = {
  latestAnalysis: AnalysisResponse | null;
  setLatestAnalysis: (analysis: AnalysisResponse) => void;
};

const AnalysisContext = createContext<AnalysisContextValue>({
  latestAnalysis: null,
  setLatestAnalysis: () => {},
});

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisResponse | null>(null);

  return (
    <AnalysisContext.Provider value={{ latestAnalysis, setLatestAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis(): AnalysisContextValue {
  return useContext(AnalysisContext);
}