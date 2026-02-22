
export interface ParsedScenario {
  runs: number | null;
  balls: number | null;
  wickets: number | null;
  overs: number | null;
  text: string;
}

export interface MatchInsight {
  analysis: string;
  probability: number;
  factors: string[];
  parsed: ParsedScenario;
}

export interface AnalysisResult {
  analysis: string;
  probability: number;
  factors: string[];
  parsed: ParsedScenario;
}

export type ProbabilityColor = 'green' | 'yellow' | 'orange' | 'red';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';