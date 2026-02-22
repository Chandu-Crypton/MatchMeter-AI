

import { useState, useCallback } from 'react';
import analysisEngine from '../utils/analysisEngine';
import type { MatchInsight } from '../types';

interface UseMatchAnalysisReturn {
  scenario: string;
  insight: MatchInsight | null;
  isGenerating: boolean;
  error: string | null;
  updateScenario: (text: string) => void;
  generateInsight: () => void;
  resetInsight: () => void;
}


const useMatchAnalysis = (): UseMatchAnalysisReturn => {
  const [scenario, setScenario] = useState<string>('');
  const [insight, setInsight] = useState<MatchInsight | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsight = useCallback((): void => {
   
    setIsGenerating(true);
    setError(null);

    try {
   
      setTimeout(() => {
        const result = analysisEngine.generateInsight(scenario);
        setInsight(result);
        setIsGenerating(false);
      }, 500);
    } catch (err) {
      setError('Failed to generate insight. Please try again.');
      setIsGenerating(false);
    }
  }, [scenario]);

  const resetInsight = useCallback((): void => {
    setInsight(null);
    setError(null);
  }, []);

  const updateScenario = useCallback((text: string): void => {
    setScenario(text);
  }, []);

  return {
    scenario,
    insight,
    isGenerating,
    error,
    updateScenario,
    generateInsight,
    resetInsight
  };
};

export default useMatchAnalysis;