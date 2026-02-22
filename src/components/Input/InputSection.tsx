

import React from 'react';

interface InputSectionProps {
  scenario: string;
  onScenarioChange: (text: string) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
  disabled?: boolean;
}


const InputSection: React.FC<InputSectionProps> = ({ 
  scenario, 
  onScenarioChange, 
  onGenerate, 
  isGenerating = false,
  disabled = false 
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (scenario.trim() && !isGenerating) {
      onGenerate();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onScenarioChange(e.target.value);
  };

  const examples: string[] = [
    "India needs 20 runs in 6 balls, 2 wickets left",
    "Australia requires 45 runs in 4 overs with 5 wickets",
    "England chasing 280, 10 overs left, 3 wickets remaining"
  ];

  const handleExampleClick = (example: string): void => {
    onScenarioChange(example);
  };

  const isButtonDisabled: boolean = !scenario.trim() || isGenerating || disabled;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Match Scenario
        </h2>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="scenario" className="block text-sm font-medium text-gray-700 mb-2">
              Describe the match situation:
            </label>
            <textarea
              id="scenario"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
              placeholder="e.g., India needs 20 runs in 6 balls, 2 wickets left"
              value={scenario}
              onChange={handleChange}
              disabled={isGenerating}
            />
          </div>

         
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleExampleClick(example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                  disabled={isGenerating}
                >
                  {example.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all transform
              ${isButtonDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg'
              }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Insight...
              </span>
            ) : (
              'Generate Insight'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputSection;