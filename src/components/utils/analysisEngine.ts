

import type { ParsedScenario, AnalysisResult } from '../types';



interface KeywordPatterns {
  runs: { pattern: RegExp; weight: number };
  balls: { pattern: RegExp; weight: number };
  wickets: { pattern: RegExp; weight: number };
}

class AnalysisEngine {
  private keywords: KeywordPatterns = {
    runs: {
      pattern: /(\d+)\s*runs?/i,
      weight: 0.4
    },
    balls: {
      pattern: /(\d+)\s*balls?|overs?/i,
      weight: 0.3
    },
    wickets: {
      pattern: /(\d+)\s*wickets?/i,
      weight: 0.3
    }
  };

  
  public parseScenario(scenario: string): ParsedScenario {
    const parsed: ParsedScenario = {
      runs: null,
      balls: null,
      wickets: null,
      overs: null,
      text: scenario.toLowerCase()
    };

 
    const runsMatch = scenario.match(this.keywords.runs.pattern);
    if (runsMatch) {
      parsed.runs = parseInt(runsMatch[1], 10);
    }

   
    const oversMatch = scenario.match(/(\d+)\s*overs?/i);
    if (oversMatch) {
      parsed.overs = parseInt(oversMatch[1], 10);
      parsed.balls = parsed.overs * 6;
    } else {
      const ballsMatch = scenario.match(/(\d+)\s*balls?/i);
      if (ballsMatch) {
        parsed.balls = parseInt(ballsMatch[1], 10);
      }
    }

    // Extract wickets
    const wicketsMatch = scenario.match(this.keywords.wickets.pattern);
    if (wicketsMatch) {
      parsed.wickets = parseInt(wicketsMatch[1], 10);
    }

    return parsed;
  }

 
  private calculateProbability(parsed: ParsedScenario): { probability: number; factors: string[] } {
    let probability = 50; // Base probability
    const factors: string[] = [];

  
    if (!parsed.runs && !parsed.balls && !parsed.wickets) {
      return {
        probability: 50,
        factors: ['Insufficient data for detailed analysis']
      };
    }

  
    if (parsed.runs && parsed.balls) {
      const runRate = (parsed.runs / parsed.balls) * 6;
      
      if (runRate > 12) {
        probability -= 25;
        factors.push(`Very high required run rate (${runRate.toFixed(1)} RPO)`);
      } else if (runRate > 9) {
        probability -= 15;
        factors.push(`High required run rate (${runRate.toFixed(1)} RPO)`);
      } else if (runRate > 7) {
        probability -= 5;
        factors.push(`Moderate required run rate (${runRate.toFixed(1)} RPO)`);
      } else if (runRate < 5) {
        probability += 15;
        factors.push(`Comfortable run rate (${runRate.toFixed(1)} RPO)`);
      } else {
        probability += 5;
        factors.push(`Manageable run rate (${runRate.toFixed(1)} RPO)`);
      }
    }

   
    if (parsed.wickets !== null) {
      if (parsed.wickets <= 2) {
        probability -= 20;
        factors.push('Critical: Only 2 or fewer wickets remaining');
      } else if (parsed.wickets <= 4) {
        probability -= 10;
        factors.push('Pressure: Limited wickets in hand');
      } else if (parsed.wickets >= 7) {
        probability += 15;
        factors.push('Strong position: Plenty of wickets in hand');
      } else {
        probability += 5;
        factors.push('Decent wicket reserve');
      }
    }

    
    if (parsed.balls) {
      if (parsed.balls <= 6) {
        probability -= parsed.wickets && parsed.wickets <= 3 ? 15 : 0;
        factors.push('Final over pressure');
      } else if (parsed.balls <= 30) {
        probability -= 5;
        factors.push('Death overs phase');
      }
    }

   
    if (parsed.text.includes('chase') || parsed.text.includes('chasing')) {
      probability += 5;
      factors.push('Chasing team psychological advantage');
    }

    if (parsed.text.includes('final') || parsed.text.includes('last')) {
      probability -= 10;
      factors.push('Match on the line');
    }

    if (parsed.text.includes('home') || parsed.text.includes('crowd')) {
      probability += 8;
      factors.push('Home crowd advantage');
    }

   
    probability = Math.min(95, Math.max(5, probability));

    return { probability, factors };
  }

 
  private generateAnalysis(
    parsed: ParsedScenario, 
    probability: number, 
    factors: string[]
  ): string {
    if (!parsed.runs && !parsed.balls && !parsed.wickets) {
      return "Enter a match scenario with details like runs needed, balls remaining, or wickets in hand to generate insights.";
    }

    let analysis = '';

    // Create a narrative based on probability
    if (probability >= 75) {
      analysis = 'Strong favorites to win. ';
    } else if (probability >= 60) {
      analysis = 'Clear advantage. ';
    } else if (probability >= 45) {
      analysis = 'Game evenly poised. ';
    } else if (probability >= 30) {
      analysis = 'Need to fight back. ';
    } else {
      analysis = 'Under pressure. ';
    }

    // Add specific scenario description
    if (parsed.runs && parsed.balls) {
      analysis += `Target of ${parsed.runs} runs from ${parsed.balls} balls. `;
    } else if (parsed.runs) {
      analysis += `Need ${parsed.runs} runs to win. `;
    }

    if (parsed.wickets !== null) {
      analysis += `${parsed.wickets} wickets remaining. `;
    }

 
    if (factors.length > 0) {
      analysis += 'Key factors: ' + factors.slice(0, 2).join('; ') + '.';
    }

    return analysis;
  }

  
  public generateInsight(scenario: string): AnalysisResult {
    if (!scenario || scenario.trim() === '') {
      return {
        analysis: 'Please enter a match scenario to generate insights.',
        probability: 50,
        factors: [],
        parsed: this.parseScenario('')
      };
    }

    const parsed = this.parseScenario(scenario);
    const { probability, factors } = this.calculateProbability(parsed);
    const analysis = this.generateAnalysis(parsed, probability, factors);

    return {
      analysis,
      probability: Math.round(probability),
      factors,
      parsed
    };
  }
}


export default new AnalysisEngine();