

import React from 'react';
import InputSection from './components/Input/InputSection';
import OutputSection from './components/Output/OutputSection';
import useMatchAnalysis from './components/hooks/useMatchAnalysis';

const App: React.FC = () => {
  const {
    scenario,
    insight,
    isGenerating,
    error,
    updateScenario,
    generateInsight
  } = useMatchAnalysis();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      
    
      <header className="pt-6 sm:pt-8 pb-4">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
              Fan Insight Generator
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base md:text-lg">
              AI-powered cricket match analysis simulator
            </p>
          </div>
        </div>
      </header>


      <main className="w-full px-3 sm:px-4 md:px-6 lg:px-10 py-6 md:py-8">
        <div className="w-full max-w-[1500px] mx-auto">

         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            
          
            <div className="w-full">
              <InputSection
                scenario={scenario}
                onScenarioChange={updateScenario}
                onGenerate={generateInsight}
                isGenerating={isGenerating}
              />
            </div>

           
            <div className="w-full">
              <OutputSection
                insight={insight}
                isGenerating={isGenerating}
                error={error}
              />
            </div>

          </div>

          
          <footer className="mt-8 sm:mt-10 text-center text-indigo-200 text-xs sm:text-sm">
            <p>Mock AI analysis based on scenario keywords • No real API used</p>
            <p className="mt-1">
              <span className="inline-flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Built with React & TypeScript
              </span>
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default App;
