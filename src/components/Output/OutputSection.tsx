

import React from 'react';
import ProbabilityMeter from './ProbabilityMeter';
import FactorsList from './FactorsList';
import type { MatchInsight } from '../types/index';

interface OutputSectionProps {
  insight: MatchInsight | null;
  isGenerating: boolean;
  error: string | null;
}


const OutputSection: React.FC<OutputSectionProps> = ({ insight, isGenerating, error }) => {

  if (isGenerating) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Match Analysis
          </h2>
        </div>
        <div className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Error
          </h2>
        </div>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  
  if (!insight) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Match Analysis
          </h2>
        </div>
        <div className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 text-gray-300">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">Enter a match scenario and click generate to see AI-powered insights.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Match Analysis
        </h2>
      </div>
      
      <div className="p-6 space-y-6">
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            AI Analysis
          </h3>
          <p className="text-lg text-gray-800 leading-relaxed">
            {insight.analysis}
          </p>
        </div>

       
        <ProbabilityMeter probability={insight.probability} />

      
        {insight.factors && insight.factors.length > 0 && (
          <FactorsList factors={insight.factors} />
        )}

        
        {insight.parsed && (
          <div className="text-xs text-gray-400 border-t pt-4 mt-2">
            <details>
              <summary className="cursor-pointer hover:text-gray-600">Technical details</summary>
              <div className="mt-2 space-y-1">
                <p>Runs: {insight.parsed.runs || 'N/A'}</p>
                <p>Balls: {insight.parsed.balls || 'N/A'}</p>
                <p>Wickets: {insight.parsed.wickets || 'N/A'}</p>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputSection;