

import React from 'react';
import type { ProbabilityColor, ConfidenceLevel } from '../types/index'

interface ProbabilityMeterProps {
  probability: number;
}


const ProbabilityMeter: React.FC<ProbabilityMeterProps> = ({ probability }) => {

  const getColor = (prob: number): ProbabilityColor => {
    if (prob >= 70) return 'green';
    if (prob >= 50) return 'yellow';
    if (prob >= 30) return 'orange';
    return 'red';
  };

  const getColorClass = (color: ProbabilityColor): string => {
    const colorMap: Record<ProbabilityColor, string> = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    return colorMap[color];
  };

  const getTextColorClass = (color: ProbabilityColor): string => {
    const colorMap: Record<ProbabilityColor, string> = {
      green: 'text-green-700',
      yellow: 'text-yellow-700',
      orange: 'text-orange-700',
      red: 'text-red-700'
    };
    return colorMap[color];
  };

  const getLabel = (prob: number): string => {
    if (prob >= 70) return 'Strong Favorite';
    if (prob >= 50) return 'Slight Advantage';
    if (prob >= 30) return 'Underdog';
    return 'Heavy Underdog';
  };

  const getConfidenceLevel = (prob: number): ConfidenceLevel => {
    if (prob >= 80) return 'High';
    if (prob >= 60) return 'Medium';
    return 'Low';
  };

  const color: ProbabilityColor = getColor(probability);
  const colorClass: string = getColorClass(color);
  const textColorClass: string = getTextColorClass(color);
  const confidenceLevel: ConfidenceLevel = getConfidenceLevel(probability);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Win Probability
        </h3>
        <span className={`text-sm font-semibold ${textColorClass}`}>
          {getLabel(probability)}
        </span>
      </div>
      
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold inline-block text-indigo-600">
            {probability}%
          </span>
          <span className="text-xs font-semibold inline-block text-indigo-600">
            {100 - probability}%
          </span>
        </div>
        <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200">
          <div
            style={{ width: `${probability}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${colorClass} transition-all duration-1000 ease-out`}
          />
        </div>
      </div>

    
      <div className="mt-4 flex items-center text-xs text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Confidence: {confidenceLevel}</span>
      </div>
    </div>
  );
};

export default ProbabilityMeter;