

import React from 'react';

interface FactorsListProps {
  factors: string[];
}


const FactorsList: React.FC<FactorsListProps> = ({ factors }) => {
  if (!factors || factors.length === 0) {
    return null;
  }

  return (
    <div className="border-t pt-4">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
        Key Factors
      </h3>
      <ul className="space-y-2">
        {factors.map((factor: string, index: number) => (
          <li key={index} className="flex items-start text-sm">
            <span className="flex-shrink-0 w-5 h-5 mr-2 text-indigo-500">
              <svg className="w-4 h-4 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-gray-700">{factor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FactorsList;