import React, { useState } from 'react';
import { SetupStep } from './components/RawInputStep';
import { EvaluationForm } from './components/EvaluationForm';
import { createCriteriaTemplate } from './services/geminiService';
import { CandidateEvaluation, EvaluationCriteria } from './types';
import { LayoutDashboard } from 'lucide-react';
import { ERROR_CRITERIA_EXTRACTION, ERROR_ANALYSIS } from './constants';

/**
 * Main App component for InternEval AI
 * Manages the evaluation workflow from setup to scoring
 */
const App: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateEvaluation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles generation of evaluation forms from reference text
   * @param referenceText - The reference evaluation text
   * @param candidateNames - Array of candidate names
   */
  const handleGenerate = async (referenceText: string, candidateNames: string[]) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Generate the standard template from AI
      const criteriaTemplate: EvaluationCriteria[] = await createCriteriaTemplate(referenceText);

      if (!criteriaTemplate || criteriaTemplate.length === 0) {
        throw new Error(ERROR_CRITERIA_EXTRACTION);
      }

      // Step 2: Create a candidate entry for each name using the template
      const newCandidates: CandidateEvaluation[] = candidateNames.map((name, index) => ({
        id: `cand-${index}-${Date.now()}`,
        name: name,
        positionRecommendation: '', // User will fill this or logic can be added later
        criteria: criteriaTemplate.map((c) => ({ ...c, id: `${c.id}-${index}` })), // Deep copy
      }));

      setCandidates(newCandidates);
    } catch (err) {
      console.error(err);
      setError(ERROR_ANALYSIS);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Updates the score for a specific criterion of a candidate
   * @param candidateId - The candidate's ID
   * @param criteriaId - The criterion's ID
   * @param score - The new score value
   */
  const handleUpdateScore = (candidateId: string, criteriaId: string, score: number) => {
    setCandidates((prev) =>
      prev.map((candidate) => {
        if (candidate.id !== candidateId) {
          return candidate;
        }

        return {
          ...candidate,
          criteria: candidate.criteria.map((item) => {
            if (item.id !== criteriaId) {
              return item;
            }
            return { ...item, score };
          }),
        };
      }),
    );
  };

  /**
   * Resets the application state
   */
  const handleReset = () => {
    setCandidates([]);
    setError(null);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <LayoutDashboard size={24} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                InternEval AI
              </span>
            </div>
            <div className="flex items-center">
              {candidates.length > 0 && (
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Evaluating {candidates.length} Candidate{candidates.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {candidates.length === 0 ? (
          <SetupStep onGenerate={handleGenerate} isProcessing={isProcessing} />
        ) : (
          <EvaluationForm
            candidates={candidates}
            onUpdateScore={handleUpdateScore}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-center text-gray-400 text-sm">
          &copy; {currentYear} InternEval AI. Powered by Google Gemini.
        </div>
      </footer>
    </div>
  );
};

export default App;